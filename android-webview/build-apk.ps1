$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$androidRoot = $PSScriptRoot
$sdkRoot = if ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } elseif ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { "C:\Users\Administrator\AppData\Local\Android\Sdk" }
$jbrRoot = if ($env:JAVA_HOME) { $env:JAVA_HOME } else { "C:\Program Files\Android\Android Studio\jbr" }

$env:JAVA_HOME = $jbrRoot
$env:PATH = "$(Join-Path $jbrRoot "bin");$env:PATH"

function Invoke-Tool {
    param(
        [Parameter(Mandatory = $true)][string]$FilePath,
        [string[]]$Arguments = @()
    )

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$FilePath failed with exit code $LASTEXITCODE"
    }
}

function Invoke-Javac {
    param(
        [Parameter(Mandatory = $true)][string]$FilePath,
        [Parameter(Mandatory = $true)][string[]]$Arguments,
        [Parameter(Mandatory = $true)][string]$LogPath
    )

    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        & $FilePath @Arguments 2> $LogPath
        $exitCode = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $previousErrorActionPreference
    }

    if ($exitCode -ne 0) {
        if (Test-Path $LogPath) {
            Get-Content -LiteralPath $LogPath | Write-Error
        }
        throw "$FilePath failed with exit code $exitCode"
    }
}

function Remove-DirectoryIfSafe {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$AllowedParent
    )

    $fullPath = [System.IO.Path]::GetFullPath($Path)
    $fullParent = [System.IO.Path]::GetFullPath($AllowedParent).TrimEnd([System.IO.Path]::DirectorySeparatorChar)
    if (-not $fullPath.StartsWith($fullParent, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to remove $fullPath because it is outside $fullParent"
    }

    if (Test-Path $fullPath) {
        Remove-Item -Recurse -Force -LiteralPath $fullPath
    }
}

$javaBin = Join-Path $jbrRoot "bin"
$javac = Join-Path $javaBin "javac.exe"
$jar = Join-Path $javaBin "jar.exe"
$keytool = Join-Path $javaBin "keytool.exe"

$platform = Get-ChildItem -Directory (Join-Path $sdkRoot "platforms") | Sort-Object Name -Descending | Select-Object -First 1
$buildTools = Get-ChildItem -Directory (Join-Path $sdkRoot "build-tools") | Sort-Object Name -Descending | Select-Object -First 1

if (-not $platform) { throw "Android SDK platform not found under $sdkRoot\platforms" }
if (-not $buildTools) { throw "Android SDK build tools not found under $sdkRoot\build-tools" }
if (-not (Test-Path $javac)) { throw "javac not found at $javac" }

$sdkAndroidJar = Join-Path $platform.FullName "android.jar"
$aapt = Join-Path $buildTools.FullName "aapt.exe"
$aapt2 = Join-Path $buildTools.FullName "aapt2.exe"
$d8 = Join-Path $buildTools.FullName "d8.bat"
$zipalign = Join-Path $buildTools.FullName "zipalign.exe"
$apksigner = Join-Path $buildTools.FullName "apksigner.bat"

$workspaceBuildRoot = Join-Path $androidRoot "build"
$workspaceOutputsDir = Join-Path $workspaceBuildRoot "outputs"
$toolBuildRoot = Join-Path ([System.IO.Path]::GetTempPath()) "compensation-manager-android-build"
$toolSourceRoot = Join-Path $toolBuildRoot "src\main"
$assetsDir = Join-Path $toolBuildRoot "assets"
$resDir = Join-Path $toolBuildRoot "res"
$classesDir = Join-Path $toolBuildRoot "classes"
$dexDir = Join-Path $toolBuildRoot "dex"
$compiledResDir = Join-Path $toolBuildRoot "compiled-res"
$genDir = Join-Path $toolBuildRoot "gen"
$outputsDir = Join-Path $toolBuildRoot "outputs"

Remove-DirectoryIfSafe -Path $workspaceBuildRoot -AllowedParent $androidRoot
Remove-DirectoryIfSafe -Path $toolBuildRoot -AllowedParent ([System.IO.Path]::GetTempPath())

New-Item -ItemType Directory -Force -Path $assetsDir, $resDir, $classesDir, $dexDir, $compiledResDir, $genDir, $outputsDir, $workspaceOutputsDir, (Join-Path $toolBuildRoot "src") | Out-Null
Copy-Item -Recurse -Force -LiteralPath (Join-Path $androidRoot "src\main") -Destination (Join-Path $toolBuildRoot "src")

$androidJar = Join-Path $toolBuildRoot "android.jar"
Copy-Item -Force -LiteralPath $sdkAndroidJar -Destination $androidJar

Get-ChildItem -Path (Join-Path $projectRoot "*") -File -Include *.html, *.css, *.js | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $assetsDir
}

foreach ($folder in @("assets")) {
    $source = Join-Path $projectRoot $folder
    if (Test-Path $source) {
        Copy-Item -Recurse -Force -LiteralPath $source -Destination $assetsDir
    }
}

$lawFileMap = @(
    @{ Source = "토지보상법-핵심조문.md"; Target = "land-compensation-act-core.md" },
    @{ Source = "토지보상법-시행령-핵심조문.md"; Target = "land-compensation-enforcement-decree-core.md" },
    @{ Source = "토지보상법-시행규칙-핵심조문.md"; Target = "land-compensation-enforcement-rule-core.md" }
)
$lawsDest = Join-Path $assetsDir "laws"
New-Item -ItemType Directory -Force -Path $lawsDest | Out-Null
foreach ($lawFile in $lawFileMap) {
    Copy-Item `
        -LiteralPath (Join-Path (Join-Path $projectRoot "laws") $lawFile.Source) `
        -Destination (Join-Path $lawsDest $lawFile.Target)
}

$lawGuideData = Join-Path $assetsDir "law-guide-data.js"
if (Test-Path $lawGuideData) {
    $lawGuideText = Get-Content -Raw -Encoding UTF8 -LiteralPath $lawGuideData
    foreach ($lawFile in $lawFileMap) {
        $lawGuideText = $lawGuideText.Replace("laws/$($lawFile.Source)", "laws/$($lawFile.Target)")
    }
    Set-Content -NoNewline -Encoding UTF8 -LiteralPath $lawGuideData -Value $lawGuideText
}

$drawableDir = Join-Path $resDir "drawable"
New-Item -ItemType Directory -Force -Path $drawableDir | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot "assets\favicon.png") -Destination (Join-Path $drawableDir "app_icon.png")

$javaFiles = Get-ChildItem -Recurse -Filter *.java -LiteralPath (Join-Path $toolSourceRoot "java")
Invoke-Javac `
    -FilePath $javac `
    -Arguments (@("-encoding", "UTF-8", "-Xlint:-options", "-source", "1.8", "-target", "1.8", "-classpath", $androidJar, "-d", $classesDir) + $javaFiles.FullName) `
    -LogPath (Join-Path $toolBuildRoot "javac.err.log")

$classesJar = Join-Path $toolBuildRoot "classes.jar"
Push-Location $classesDir
try {
    Invoke-Tool $jar @("cf", $classesJar, ".")
} finally {
    Pop-Location
}

Invoke-Tool $d8 @("--lib", $androidJar, "--min-api", "23", "--output", $dexDir, $classesJar)

Invoke-Tool $aapt2 @("compile", "--dir", $resDir, "-o", $compiledResDir)
$compiledResources = Get-ChildItem -Recurse -Filter *.flat -LiteralPath $compiledResDir

$unsignedApk = Join-Path $toolBuildRoot "app-unsigned.apk"
$linkArgs = @(
    "link",
    "-I", $androidJar,
    "--manifest", (Join-Path $toolSourceRoot "AndroidManifest.xml"),
    "--java", $genDir,
    "--min-sdk-version", "23",
    "--target-sdk-version", "36",
    "-A", $assetsDir,
    "-o", $unsignedApk
)
$linkArgs += $compiledResources.FullName
Invoke-Tool $aapt2 $linkArgs

Push-Location $dexDir
try {
    Invoke-Tool $aapt @("add", $unsignedApk, "classes.dex")
} finally {
    Pop-Location
}

$alignedApk = Join-Path $toolBuildRoot "app-aligned.apk"
Invoke-Tool $zipalign @("-f", "-p", "4", $unsignedApk, $alignedApk)

$keystore = Join-Path $androidRoot "debug.keystore"
if (-not (Test-Path $keystore)) {
    Invoke-Tool $keytool @(
        "-genkeypair",
        "-keystore", $keystore,
        "-storepass", "android",
        "-alias", "androiddebugkey",
        "-keypass", "android",
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", "10000",
        "-dname", "CN=Android Debug,O=Android,C=US"
    )
}

$finalApk = Join-Path $outputsDir "compensation-manager-study.apk"
Invoke-Tool $apksigner @(
    "sign",
    "--ks", $keystore,
    "--ks-pass", "pass:android",
    "--key-pass", "pass:android",
    "--out", $finalApk,
    $alignedApk
)

Invoke-Tool $apksigner @("verify", "--verbose", "--print-certs", $finalApk)

$workspaceApk = Join-Path $workspaceOutputsDir "compensation-manager-study.apk"
Copy-Item -Force -LiteralPath $finalApk -Destination $workspaceApk

Write-Host "APK written to $workspaceApk"
