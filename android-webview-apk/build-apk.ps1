$ErrorActionPreference = "Stop"

$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $appRoot "..")

$jdkHome = "C:\Program Files\Android\Android Studio\jbr"
$sdkRoot = if ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } elseif ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { "C:\Users\kwg\AppData\Local\Android\Sdk" }
$buildToolsRoot = Join-Path $sdkRoot "build-tools"
$buildTools = Get-ChildItem -LiteralPath $buildToolsRoot -Directory |
    Sort-Object Name -Descending |
    Select-Object -First 1
$platformSource = Join-Path $sdkRoot "platforms\android-36.1\android.jar"

$java = Join-Path $jdkHome "bin\java.exe"
$javac = Join-Path $jdkHome "bin\javac.exe"
$jar = Join-Path $jdkHome "bin\jar.exe"
$keytool = Join-Path $jdkHome "bin\keytool.exe"
$aapt2 = Join-Path $buildTools.FullName "aapt2.exe"
$d8 = Join-Path $buildTools.FullName "d8.bat"
$zipalign = Join-Path $buildTools.FullName "zipalign.exe"
$apksigner = Join-Path $buildTools.FullName "apksigner.bat"

foreach ($tool in @($java, $javac, $jar, $keytool, $aapt2, $d8, $zipalign, $apksigner, $platformSource)) {
    if (-not (Test-Path -LiteralPath $tool)) {
        throw "Required Android build tool was not found: $tool"
    }
}

$env:JAVA_HOME = $jdkHome
$env:PATH = (Join-Path $jdkHome "bin") + [System.IO.Path]::PathSeparator + $env:PATH

function Invoke-Checked {
    param(
        [Parameter(Mandatory = $true)][string]$FilePath,
        [string[]]$Arguments
    )
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed with exit code ${LASTEXITCODE}: $FilePath $($Arguments -join ' ')"
    }
}

$buildDir = Join-Path $appRoot "build"
$distDir = Join-Path $appRoot "dist"
$assetsDir = Join-Path $buildDir "assets"
$siteDir = Join-Path $assetsDir "site"
$lateAssetsDir = Join-Path $buildDir "late-assets"
$lateSiteDir = Join-Path $lateAssetsDir "site"
$resDir = Join-Path $buildDir "res"
$classesDir = Join-Path $buildDir "classes"
$dexDir = Join-Path $buildDir "dex"
$generatedDir = Join-Path $buildDir "generated"
$platform = Join-Path $buildDir "android.jar"
$keystore = Join-Path $appRoot "debug-upload.keystore"
$apk = Join-Path $distDir "compensation-manager-study.apk"

Remove-Item -LiteralPath $buildDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $siteDir, $lateSiteDir, $resDir, $classesDir, $dexDir, $generatedDir, $distDir | Out-Null
Copy-Item -LiteralPath $platformSource -Destination $platform -Force

Get-ChildItem -LiteralPath $projectRoot -File -Include *.html,*.css,*.js,README.md |
    Copy-Item -Destination $siteDir -Force

Copy-Item -LiteralPath (Join-Path $projectRoot "assets") -Destination (Join-Path $siteDir "assets") -Recurse -Force
Copy-Item -LiteralPath (Join-Path $projectRoot "laws") -Destination (Join-Path $lateSiteDir "laws") -Recurse -Force

Get-ChildItem -LiteralPath (Join-Path $appRoot "app\src\main\res") |
    Copy-Item -Destination $resDir -Recurse -Force
New-Item -ItemType Directory -Force -Path (Join-Path $resDir "drawable") | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot "assets\compensation-manager-logo.png") -Destination (Join-Path $resDir "drawable\app_icon.png") -Force

Invoke-Checked $aapt2 @("compile", "--dir", $resDir, "-o", (Join-Path $buildDir "compiled-res.zip"))
Invoke-Checked $aapt2 @(
    "link",
    "-I", $platform,
    "--manifest", (Join-Path $appRoot "app\src\main\AndroidManifest.xml"),
    "-A", $assetsDir,
    "--java", $generatedDir,
    "--auto-add-overlay",
    "-o", (Join-Path $buildDir "app-unsigned.apk"),
    (Join-Path $buildDir "compiled-res.zip")
)

$javaFiles = @()
$javaFiles += Get-ChildItem -LiteralPath $generatedDir -Recurse -Filter *.java | Select-Object -ExpandProperty FullName
$javaFiles += Get-ChildItem -LiteralPath (Join-Path $appRoot "app\src\main\java") -Recurse -Filter *.java | Select-Object -ExpandProperty FullName

Invoke-Checked $javac (@("-encoding", "UTF-8", "-source", "8", "-target", "8", "-bootclasspath", $platform, "-d", $classesDir) + $javaFiles)
Invoke-Checked $jar @("cf", (Join-Path $buildDir "classes.jar"), "-C", $classesDir, ".")
Invoke-Checked $d8 @("--min-api", "23", "--lib", $platform, "--output", $dexDir, (Join-Path $buildDir "classes.jar"))

Copy-Item -LiteralPath (Join-Path $buildDir "app-unsigned.apk") -Destination (Join-Path $buildDir "app-with-dex.apk") -Force
Invoke-Checked $jar @("uf", (Join-Path $buildDir "app-with-dex.apk"), "-C", $dexDir, "classes.dex")
Invoke-Checked $jar @("uf", (Join-Path $buildDir "app-with-dex.apk"), "-C", $lateAssetsDir, ".")
Invoke-Checked $zipalign @("-f", "-p", "4", (Join-Path $buildDir "app-with-dex.apk"), (Join-Path $buildDir "app-aligned.apk"))

if (-not (Test-Path -LiteralPath $keystore)) {
    Invoke-Checked $keytool @(
        "-genkeypair",
        "-keystore", $keystore,
        "-storepass", "android",
        "-keypass", "android",
        "-alias", "compensation-manager",
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", "10000",
        "-dname", "CN=Compensation Manager, OU=Study, O=Codex, L=Seoul, S=Seoul, C=KR"
    )
}

Invoke-Checked $apksigner @(
    "sign",
    "--ks", $keystore,
    "--ks-pass", "pass:android",
    "--key-pass", "pass:android",
    "--out", $apk,
    (Join-Path $buildDir "app-aligned.apk")
)

Invoke-Checked $apksigner @("verify", "--verbose", "--print-certs", $apk)
Write-Host "APK: $apk"
