!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n=null,e=!1;t.startBtn.addEventListener("click",(function(){e||(n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16)),e=!0}),1e3))})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),e=!1}))}();
//# sourceMappingURL=01-color-switcher.7aa83c93.js.map