// MIT License (see LICENSE)
(function () {
  "use strict";
  var app = document.getElementById("app");
  var lang = "ru";
  var player = null;

  try {
    var saved = localStorage.getItem("lang");
    if (saved && window.CONTENT[saved]) lang = saved;
  } catch (e) { /* storage may be unavailable */ }

  function T() { return window.CONTENT[lang]; }

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text) n.textContent = text;
    return n;
  }

  function stopAudio() {
    if (player) { player.pause(); player = null; }
  }

  function chrome() {
    var ui = T().ui;
    document.documentElement.lang = lang;
    document.title = ui.title;
    document.getElementById("title").textContent = ui.title;
    document.getElementById("tagline").textContent = ui.tagline;
    document.getElementById("draft").textContent = ui.draft;
    document.getElementById("disclaimer").textContent = ui.disclaimer;
    document.getElementById("offline").textContent = ui.offline;
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
  }

  function home() {
    stopAudio();
    app.textContent = "";
    app.appendChild(el("h2", null, T().ui.modules));
    T().modules.forEach(function (m) {
      var b = el("button", { "class": "mod", type: "button" });
      b.appendChild(el("strong", null, m.title));
      b.appendChild(document.createTextNode(m.intro));
      b.addEventListener("click", function () { location.hash = "#/" + m.id; });
      app.appendChild(b);
    });
  }

  function module_(id) {
    stopAudio();
    var m = T().modules.filter(function (x) { return x.id === id; })[0];
    if (!m) { location.hash = ""; return; }
    app.textContent = "";
    var back = el("button", { "class": "back", type: "button" }, "← " + T().ui.back);
    back.addEventListener("click", function () { location.hash = ""; });
    app.appendChild(back);

    var listen = el("button", { "class": "listen", type: "button" }, "▶ " + T().ui.listen);
    var soon = el("span", { "class": "soon", role: "status" });
    listen.addEventListener("click", function () {
      stopAudio();
      soon.textContent = "";
      player = new Audio("audio/" + lang + "/" + id + ".mp3");
      player.addEventListener("error", function () { soon.textContent = T().ui.audioSoon; });
      player.play().catch(function () { soon.textContent = T().ui.audioSoon; });
    });
    app.appendChild(listen);
    app.appendChild(soon);

    app.appendChild(el("h2", null, m.title));
    app.appendChild(el("p", null, m.intro));
    m.cards.forEach(function (c) {
      var d = el("section", { "class": "card" });
      d.appendChild(el("h3", null, c.h));
      d.appendChild(el("p", null, c.p));
      app.appendChild(d);
    });
    app.focus();
    window.scrollTo(0, 0);
  }

  function route() {
    chrome();
    var h = location.hash.replace(/^#\//, "");
    if (h) module_(h); else home();
  }

  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
      route();
    });
  });
  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* offline mode optional */ });
  }
})();
