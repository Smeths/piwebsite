<!DOCTYPE html>
<html>
<head>
<title>
GitHub List
</title>
<link rel="stylesheet" type="text/css" href="style/default.css">
</head>
<body>
<div>
<H1> Repos Listed </H1>
<?php
ini_set('display_errors','On');
echo "<p> Github Projects </p>";
?>
<div>
<table class="center">
  <tr>
    <th>Repo</th>
    <th>Decscription</th>
  </tr>
<?php

# Options for http request
$opts = [
        'http' => [
                'method' => 'GET',
                'header' => [
                        'User-Agent: PHP'
                ]
        ]
];

# setting header options for http request
$context = stream_context_create($opts);

# Making http get request
$url = "https://api.github.com/users/smeths/repos";
$string = file_get_contents($url, false, $context);

# Decoding json for php manipulation
$repos = json_decode($string, true);

# Extracting a particular bit of json information
$count=count($repos);
for ($i = 0; $i < $count; $i++) {
    echo "<tr>";
    echo "<td> <a href=",$repos[$i]['html_url'],">",$repos[$i]['name'],"</a></td>";
    echo "<td>",$repos[$i]['description'],"</td>";
    echo "</tr>";
}
?>
</table>
</div>
</body>
</html>

