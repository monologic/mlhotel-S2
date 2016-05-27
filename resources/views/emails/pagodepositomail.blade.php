<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
		.centrado-porcentual {
			background-color: #ecf0f1;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    transform: translate(-50%, -50%);
		    -webkit-transform: translate(-50%, -50%);
		}
	</style>
</head>
<body bgcolor="#7f8c8d">
	<div class="centrado-porcentual">
  	<h2>Confirmación de Reserva</h2>
  	<p>
  		Estimado Cliente:
  	</p>
  	<p>Le agradecemos su preferencia!</p>
	<p>Ud. ha realizado la siguiente reserva:</p>
	<p>Fecha Ingreso o Check in : {{ $fecha_inicio }}</p>
	<p>Fecha Salida o Check out: {{ $fecha_fin }}</p>
  	<p>
  		<table>
  			@foreach ($habtiposcount as $habtipo)
			    <tr>
			    	<td>{{ $habtipo['count'] }}</td>
			    	<td>{{ $habtipo['nombre'] }}</td>
			    </tr>
			@endforeach
  		</table>
  	</p>
  	<p>El horario de Check-in es {{ $checkin }} y el Check-out es {{ $checkout }}.</p>
  	<p>
  		El pago de la reserva, tal como lo solicitó será efectuada vía depósito bancario en nuestra cuenta en el Banco BANCO Nro de cuenta NRO_CUENTA por el importe de IMPORTE_TOTAL * 0.20. Le rogamos se sirva enviarnos el voucher del depósito a efectos de confirmar su reserva vía correo electrónico a la dirección EMAIL
  	</p>
</div>
</body>
</html>