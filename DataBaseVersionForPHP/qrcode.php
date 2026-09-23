
<?php
session_start();

/*
check kardan login boodan account ba gereftan id (khodet ba directory haie khodet avazesh kon)
 */
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$userId = (int) $_SESSION['user_id'];

/*
domain ro gozashtam p-k khodet be harchy hast avazesh kon ke / mikhore bere be profile user
 */
$profileUrl = "https://p-k.me/profile.php?id=" . $userId;
?>

