(function () {
  var clock = document.getElementById("la-time");
  var copy = document.getElementById("copy-email");

  function paintClock() {
    clock.textContent = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());
  }

  paintClock();
  setInterval(paintClock, 30000);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var clips = document.querySelectorAll("video");
    for (var i = 0; i < clips.length; i++) {
      clips[i].removeAttribute("autoplay");
      clips[i].pause();
    }
  }

  function legacyCopy(address) {
    var area = document.createElement("textarea");
    area.value = address;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function selectAddress() {
    var link = document.getElementById("email");
    var range = document.createRange();
    range.selectNodeContents(link);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function mark(ok) {
    copy.textContent = ok ? "copied" : "selected";
    setTimeout(function () {
      copy.textContent = "copy";
    }, 1500);
  }

  copy.addEventListener("click", function () {
    var address = "rajatsavdekar@gmail.com";
    selectAddress();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(
        function () {
          mark(true);
        },
        function () {
          mark(legacyCopy(address));
        }
      );
      return;
    }
    mark(legacyCopy(address));
  });
})();
