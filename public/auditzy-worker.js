// public/auditzy-worker.js
self.addEventListener("message", function (e) {
  if (e.data === "loadAuditzy") {
    self.importScripts("https://rum.auditzy.com/GcPricZc-www.buywow.in.js");
    self.postMessage("loaded");
  }
});
