document.addEventListener("DOMContentLoaded", () => {
    // --- Configuration ---
    const PROFILE_URL = "https://pk.me/profile/username"; // inja link qrcode 
    const LOGO_URL = "logo.png"; //logo ro man logo.png gereftam age avaz mikoni injast

    let currentGradient = ["#6a5cff", "#ff5ca8"];

    // --- QR Code Logic ---
    const qrContainer = document.getElementById("qrCanvas");
    if (!qrContainer) return;

    const qrCode = new QRCodeStyling({
        width: 240,
        height: 240,
        type: "canvas",
        data: PROFILE_URL,
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
        imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.35 }
    });

    qrCode.append(qrContainer);

    // taghir rang logo bara match shodan ba rang qrcode
    const recolorLogo = (src, color, callback) => {
        if (!src) return callback(null);

        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return callback(null);

            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            callback(canvas.toDataURL("image/png"));
        };

        img.onerror = () => {
            console.warn("Logo not found or blocked by CORS. Rendering QR without logo.");
            callback(null);
        };

        img.src = src;
    };

    // bara taghir rang logo
    recolorLogo(LOGO_URL, currentGradient[0], (tintedLogo) => {
        if (tintedLogo) qrCode.update({ image: tintedLogo });
    });

    // logic taghir rang
    document.querySelectorAll(".swatch").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".swatch").forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            currentGradient = [button.dataset.g1, button.dataset.g2];

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

            recolorLogo(LOGO_URL, currentGradient[0], (tintedLogo) => {
                if (tintedLogo) qrCode.update({ image: tintedLogo });
            });
        });
    });

    // bara download png qrcode
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            qrCode.download({ name: "my-profile-qrcode", extension: "png" });
        });
    }
});