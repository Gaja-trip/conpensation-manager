(() => {
  const root = document.documentElement;
  const protectedPage = root.dataset.accessScope === "protected";
  if (!protectedPage) return;

  const storageKey = "compensation-manager-learning-access";
  const accessValue = "granted";
  const requiredPassword = "k";

  const readAccess = () => {
    try {
      return window.sessionStorage.getItem(storageKey) === accessValue;
    } catch {
      return false;
    }
  };

  const writeAccess = () => {
    try {
      window.sessionStorage.setItem(storageKey, accessValue);
    } catch {
      // The current page can still be opened for this browser session.
    }
  };

  const setLockedState = (locked) => {
    root.classList.toggle("access-locked", locked);
    root.classList.toggle("access-granted", !locked);
  };

  const showGate = () => {
    if (!document.body || document.querySelector(".access-gate")) return;

    const gate = document.createElement("section");
    gate.className = "access-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "access-gate-title");
    gate.innerHTML = `
      <div class="access-gate__panel">
        <div class="access-gate__logo" aria-hidden="true"></div>
        <p class="eyebrow">Private Learning</p>
        <h1 id="access-gate-title">학습 자료 접근</h1>
        <p class="access-gate__description">기본강의, 문제풀이, 분석자료는 비공개 학습 공간입니다. 암호를 입력해 계속하세요.</p>
        <form class="access-gate__form" novalidate>
          <label for="learning-access-password">접근 암호</label>
          <div class="access-gate__field">
            <input id="learning-access-password" name="password" type="password" autocomplete="current-password" required>
            <button class="button primary" type="submit">입장</button>
          </div>
          <p class="access-gate__error" aria-live="polite" hidden>암호가 맞지 않습니다. 다시 입력해 주세요.</p>
        </form>
        <a class="access-gate__home" href="index.html">메인 페이지로 돌아가기</a>
      </div>
    `;

    document.body.prepend(gate);

    const form = gate.querySelector("form");
    const input = gate.querySelector("input");
    const error = gate.querySelector(".access-gate__error");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (input.value === requiredPassword) {
        writeAccess();
        setLockedState(false);
        gate.remove();
        return;
      }

      error.hidden = false;
      input.select();
      input.focus();
    });

    input.focus();
  };

  if (readAccess()) {
    setLockedState(false);
    return;
  }

  setLockedState(true);
  if (document.body) {
    showGate();
  } else {
    document.addEventListener("DOMContentLoaded", showGate, { once: true });
  }
})();
