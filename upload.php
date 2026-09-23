<?php
// ---- pretend DB layer: swap this for your real query ----
// e.g. SELECT username, profile_url, avatar_path FROM users WHERE id = ?
function getUserData($userId) {
    // Placeholder — replace with real DB call (PDO/mysqli)
    return [
        'username'     => 'pksocialgroup',
        'profile_url'  => 'https://yoursite.com/u/pksocialgroup',
        'avatar_path'  => 'uploads/default-avatar.png' // fallback if user has no photo
    ];
}

$userId = isset($_GET['id']) ? $_GET['id'] : null;
$user = getUserData($userId);

$safeUsername = htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8');
$safeUrl      = htmlspecialchars($user['profile_url'], ENT_QUOTES, 'UTF-8');
$safeAvatar   = htmlspecialchars($user['avatar_path'], ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet">
<meta charset="UTF-8">
<title>کیو آر کد پروفایل</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="card"
     id="qrData"
     data-url="<?php echo $safeUrl; ?>"
     data-avatar="<?php echo $safeAvatar; ?>">

  <h2>کیو آر کد پروفایل</h2>

  <div id="qrWrap">
    <div id="qrBox"><div id="qrCanvas"></div></div>
  </div>

  <p class="label">انتخاب رنگ</p>
  <div class="swatches" id="swatches">
    <button class="swatch" style="background:#000000" data-color="#000000"></button>
    <button class="swatch" style="background:#1a1a1a" data-color="#1a1a1a"></button>
    <button class="swatch" style="background:#2563eb" data-color="#2563eb"></button>
    <button class="swatch" style="background:#059669" data-color="#059669"></button>
    <button class="swatch" style="background:#dc2626" data-color="#dc2626"></button>
    <button class="swatch" style="background:#7c3aed" data-color="#7c3aed"></button>
  </div>

  <button id="downloadBtn">دانلود PNG</button>

  <p class="username">@<?php echo $safeUsername; ?></p>
</div>

<script src="https://unpkg.com/qr-code-styling@1.6.0/lib/qr-code-styling.js"></script>
<script src="JScript.js"></script>
</body>
</html>