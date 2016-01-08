<? php     $MAX_AGENDAS = 5;
     $MAX_ATTENDS = 10;
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body>
<h2>MTG詳細</h2>
<form id="row0">
  <input type="hidden" name="type" value="1">
  ID:<input type="text" name="id">
  タイトル:<input type="text" name="title">
  日付:<input type="date" name="date">
  開始時間:<input type="time" name="start" value="00:00">
  終了時間:<input type="time" name="end" value="00:00">
</form>

<h2>アジェンダ</h2>
<? php for($i = 1; $i < 1 + $MAX_AGENDAS; $i ++): ?>
<form id="row<? php= $i ?>">
  <input type="hidden" name="type" value="2">
  議題:<input type="text" name="agenda">
  所用時間(分):<input type="number" name="time">
</form>
<? php endfor; ?>

<h2>参加者</h2>
<? php for(; $i < 1 + $MAX_AGENDAS + $MAX_ATTENDS; $i ++): ?>
<form id="row<? php= $i ?>">
  <input type="hidden" name="type" value="3">
  名前:<input type="text" name="name">
</form>
<? php endfor; ?>

<button id="submit">submit</button>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>
