<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body style="background-color: rgb(150,150,150);width: 100%;min-width: 400px">
	<div style="width: 80%;margin: 40px auto 30px auto;background-color: white">
		<div class="text-center" style="width: 100%;padding: 15px;background-color:#4183D7;height: 50px">
			<p style="text-align: center;font-size: 2rem;color: white">Residencial Moquegua</p>
		</div>
		<br><br>
		<div>
			<div style="border-left: solid;border-color:#26A65B; border-radius:3px;border-width:8px ;padding-left: 10px;height: 30px;margin-bottom: 15px">Asunto: {{ $subject }}</div >
			<br>
		</div>

		<div>
			<div style="border-left: solid;border-color:#26A65B; border-radius:3px;border-width:8px;padding-left: 10px;height: 30px;margin-bottom: 15px">Email: {{ $email }}</div >
			<br>
		</div>

		<div style="border: solid;border-radius: 10px;padding: 20px;border-width: 1px;border-color: rgb(150,150,150);">
			
			<p>{{ $body }}</p>
		</div>
	</div>
	
</body>
</html>