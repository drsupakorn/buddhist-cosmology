
(() => {
  const ORIGINAL_URL = "https://drsupakorn.github.io/buddhist-cosmology/";
  const ENGLISH_URL =
    "https://translate.google.com/translate" +
    "?sl=th&tl=en&u=" + encodeURIComponent(ORIGINAL_URL);

  const topbar = document.querySelector(".topbar-inner");
  if (!topbar || document.querySelector(".language-tools")) return;

  const tools = document.createElement("div");
  tools.className = "language-tools";
  tools.innerHTML = `
    <div class="language-switch" role="group" aria-label="Language">
      <a id="language-th" href="${ORIGINAL_URL}" aria-current="true">ไทย</a>
      <a id="language-en" href="${ENGLISH_URL}">English</a>
    </div>

    <details class="language-help">
      <summary aria-label="Other languages and translation help">
        🌐 Other languages / Help
      </summary>

      <div class="language-panel">
        <h2>Other languages · ภาษาอื่น</h2>

        <p lang="en">
          The English button opens an automatic full-page translation of this
          GitHub-hosted article. For another language, use your browser’s
          built-in Translate feature.
        </p>

        <p>
          ปุ่ม English เปิดคำแปลอัตโนมัติทั้งหน้าของบทความที่โฮสต์บน GitHub
          หากต้องการภาษาอื่น โปรดใช้ระบบ Translate ของเบราว์เซอร์
        </p>

        <ul class="browser-list">
          <li>
            <strong>Chrome</strong>
            <span lang="en">Open the menu <b>⋮</b>, choose <b>Translate</b>, then select a language.</span><br>
            เปิดเมนู <b>⋮</b> เลือก <b>Translate</b> แล้วเลือกภาษา
          </li>
          <li>
            <strong>Safari on iPhone or iPad</strong>
            <span lang="en">Tap the page menu in the address bar, then choose <b>Translate Website</b>.</span><br>
            แตะเมนูหน้าเว็บในแถบที่อยู่ แล้วเลือก <b>Translate Website</b>
          </li>
          <li>
            <strong>Microsoft Edge</strong>
            <span lang="en">Use <b>Translate</b> from the browser menu or the translation icon.</span><br>
            เลือก <b>Translate</b> จากเมนูหรือไอคอนแปลภาษา
          </li>
        </ul>

        <div class="copy-row">
          <input class="page-url" id="cosmology-page-url"
                 type="text" aria-label="Current page address" readonly>
          <button class="copy-button" id="cosmology-copy-url"
                  type="button">Copy URL</button>
        </div>

        <p class="copy-status" id="cosmology-copy-status"
           role="status" aria-live="polite"></p>

        <p class="translation-note">
          <strong>Important · ข้อควรทราบ:</strong><br>
          <span lang="en">
            This method works on the GitHub article. It may not work on Gamma
            presentations. Automatic translation may also be less precise for
            Buddhist and philosophical terms.
          </span><br>
          วิธีนี้ใช้กับบทความบน GitHub แต่อาจใช้ไม่ได้กับหน้า Gamma
          และศัพท์พุทธศาสนาหรือปรัชญาอาจแปลคลาดเคลื่อนได้
        </p>
      </div>
    </details>
  `;

  topbar.appendChild(tools);

  const pageUrl = document.getElementById("cosmology-page-url");
  const copyButton = document.getElementById("cosmology-copy-url");
  const copyStatus = document.getElementById("cosmology-copy-status");
  const help = document.querySelector(".language-help");

  if (pageUrl) pageUrl.value = window.location.href;

  async function copyCurrentUrl() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        pageUrl.focus();
        pageUrl.select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
      }
      copyStatus.textContent = "URL copied · คัดลอกที่อยู่หน้าเว็บแล้ว";
      copyButton.textContent = "Copied";
    } catch (error) {
      pageUrl.focus();
      pageUrl.select();
      copyStatus.textContent =
        "Press and hold the URL, then choose Copy · แตะค้างที่ URL แล้วเลือก Copy";
    }

    window.setTimeout(() => {
      copyButton.textContent = "Copy URL";
    }, 2200);
  }

  if (copyButton) copyButton.addEventListener("click", copyCurrentUrl);

  document.addEventListener("click", (event) => {
    if (help && help.open && !help.contains(event.target)) {
      help.removeAttribute("open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && help) {
      help.removeAttribute("open");
    }
  });
})();
