document.addEventListener("DOMContentLoaded", () => {
    // --- Configuration ---
    const PROFILE_URL = "https://your-social-media.com/profile/username"; // Change this
    const LOGO_URL = "logo.png"; // Ensure this file exists in the same folder

    // --- Translations ---
    const translations = {
        fa: {
            title: "QR Code پروفایل",
            label: "انتخاب رنگ",
            downloadBtn: "دانلود QR Code",
            langToggle: "EN",
            swatches: ["بنفش و صورتی", "آبی", "بنفش و صورتی روشن", "سبز", "نارنجی و صورتی", "زرد و نارنجی"]
        },
        en: {
            title: "Profile QR Code",
            label: "Choose Color",
            downloadBtn: "Download QR Code",
            langToggle: "FA",
            swatches: ["Purple & Pink", "Blue", "Light Purple & Pink", "Green", "Orange & Pink", "Yellow & Orange"]
        }
    };

    let currentLang = "fa";
    let currentGradient = ["#6a5cff", "#ff5ca8"];

    // --- Language Switcher Logic ---
    const updateLanguage = (lang) => {
        currentLang = lang;
        const t = translations[lang];
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
        
        // Update text content
        document.title = t.title;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (t[key]) el.textContent = t[key];
        });

        // Update aria-labels for swatches
        document.querySelectorAll("[data-i18n-aria]").forEach((el, index) => {
            if (t.swatches[index]) {
                el.setAttribute("aria-label", t.swatches[index]);
            }
        });

        // Update toggle button text
        document.getElementById("langToggle").textContent = t.langToggle;
    };

    document.getElementById("langToggle").addEventListener("click", () => {
        updateLanguage(currentLang === "fa" ? "en" : "fa");
    });

    // Initialize language
    updateLanguage("fa");

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
        // Logo configuration (centered by default)
        imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.35 }
    });

    qrCode.append(qrContainer);

    // Helper: Recolor logo to match the primary gradient color
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
            callback(null); // Fails gracefully
        };
        
        img.src = src;
    };

    // Apply initial logo color
    recolorLogo(LOGO_URL, currentGradient[0], (tintedLogo) => {
        if (tintedLogo) qrCode.update({ image: tintedLogo });
    });

    // Color swatches logic
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

            // Recolor logo on color change
            recolorLogo(LOGO_URL, currentGradient[0], (tintedLogo) => {
                if (tintedLogo) qrCode.update({ image: tintedLogo });
            });
        });
    });

    // Download button logic
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            qrCode.download({ name: "my-profile-qrcode", extension: "png" });
        });
    }
});