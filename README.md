<div align="center">

# 🔳 QR Profile Generator

**Generate custom-colored, logo-embedded QR codes for user profiles — straight from your database.**

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

[🇮🇷 نسخه فارسی](README.fa.md)

</div>

---

## ✨ Features

- 🎨 **6 color presets** — pick a swatch, the QR recolors instantly
- 🖼️ **Center logo/avatar** — pulled from your database per user
- ⚡ **Server-rendered** — QR data and avatar come from PHP, no manual input needed
- 📥 **One-click PNG download**
- 🕸️ Built on [`qr-code-styling`](https://github.com/kozakdenys/qr-code-styling) — rounded, dot-style QR codes, not the boring square kind
- 🌐 RTL-ready, ships with Persian UI out of the box

---

## 📸 Preview

| Black | Blue | Green |
|:---:|:---:|:---:|
| ⬛ | 🟦 | 🟩 |


---

## 🚀 Setup

1. Requires PHP 7.4+ with a running web server (`php -S localhost:8000` works fine for local testing).
2. Wire `getUserData()` in `index.php` to your real database query:

```php
function getUserData($userId) {
    // Replace with a real PDO/mysqli query
    return [
        'username'    => 'exampleuser',
        'profile_url' => 'https://yoursite.com/u/exampleuser',
        'avatar_path' => 'uploads/default-avatar.png'
    ];
}
```

3. Visit `index.php?id=123` for any user ID.

---

## 🎨 Customizing colors

Edit the swatch buttons in `index.php`:

```html
<button class="swatch" style="background:#2563eb" data-color="#2563eb"></button>
```

Add, remove, or change hex values — `JScript.js` picks them up automatically via `data-color`.

---

## 🧩 Tech notes

- Error correction is locked to `H` — required so the center image doesn't break scannability.
- Username is escaped server-side with `htmlspecialchars()` to prevent stored XSS.
- `qr-code-styling` is loaded from `unpkg` — self-host it if you need offline/air-gapped support.

---

## 📄 License

MIT — feel free to use this file on your own projects!

*(Swap this table for real screenshots once you have them)*

---

## 🗂️ Project structure
