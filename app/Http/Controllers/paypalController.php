<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class paypalController extends Controller
{
	public function _construct($mode='live')
	{
		if($mode=='live')
			$this->_url='https://www.paypal.com/cgi-bin/webscr';
		else
			$this->_url='https://www.sandbox.paypal.com/cgi-bin/websrc';
	}
    public function run()
    {
    	$postFields='cmd=notify-valite';

    	foreach ($_POST as $key => $value) {
    		$postFields .="&$key=".urlencode($value);
    	}

    	$ch= curl_init();
    	curl_setopt_array($ch, array(
    		CURLOPT_URL=>$this->_url,
    		CURLOPT_RETURNTRANSFER=>true,
    		CURLOPT_POST=>true,
    		CURLOPT_POSTFIELDS=>$postFields
    	));
    $result=curl_exec($ch);
    curl_close($ch);
    }
    echo $result;

}
