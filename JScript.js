document.addEventListener("DOMContentLoaded", function () {
  var currentGradient = ["#6a5cff", "#ff5ca8"];

  var qrCode = new QRCodeStyling({
    width: 240,
    height: 240,
    type: "canvas",
    data: "https://example.com",
    margin: 4,
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: {
      type: "rounded",
      gradient: {
        type: "linear",
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: currentGradient[0] },
          { offset: 1, color: currentGradient[1] }
        ]
      }
    },
    cornersSquareOptions: { type: "extra-rounded", color: currentGradient[0] },
    cornersDotOptions: { type: "dot", color: currentGradient[0] },
    backgroundOptions: { color: "#ffffff" },
    image: "logo.png",
    imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.35 }
  });

  qrCode.append(document.getElementById("qrCanvas"));

  function recolorImage(src, hexColor, callback) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = hexColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/png"));
    };
    img.src = src;
  }

  var swatches = document.querySelectorAll(".swatch");
  swatches.forEach(function (btn, i) {
    if (i === 0) btn.classList.add("active");
    btn.addEventListener("click", function () {
      swatches.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentGradient = [btn.dataset.g1, btn.dataset.g2];
      qrCode.update({
        dotsOptions: {
          type: "rounded",
          gradient: {
            type: "linear",
            rotation: Math.PI / 4,
            colorStops: [
              { offset: 0, color: currentGradient[0] },
              { offset: 1, color: currentGradient[1] }
            ]
          }
        },
        cornersSquareOptions: { type: "extra-rounded", color: currentGradient[0] },
        cornersDotOptions: { type: "dot", color: currentGradient[0] }
      });

      recolorImage("logo.png", currentGradient[0], function (tintedDataUrl) {
        qrCode.update({ image: tintedDataUrl });
      });
    });
  });

  // tint once on load so it matches the default active swatch from the start
  recolorImage("logo.png", currentGradient[0], function (tintedDataUrl) {
    qrCode.update({ image: tintedDataUrl });
  });

  function generate() {
    var url = document.getElementById("url").value.trim();
    var out = document.getElementById("out");
    out.innerHTML = "";

    if (!url) {
      out.innerHTML = '<span class="error">لینک را وارد کنید</span>';
      return;
    }

    qrCode.update({ data: url });

    var dl = document.createElement("button");
    dl.textContent = "دانلود PNG";
    dl.addEventListener("click", function () {
      qrCode.download({ name: "qrcode", extension: "png" });
    });
    out.appendChild(dl);
  }

  document.getElementById("gen").addEventListener("click", generate);

  document.getElementById("url").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      generate();
    }
  });
});