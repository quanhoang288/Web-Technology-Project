<?php
class Cache {

	function get($fileName) {
		$fileName = SYSTEM.'tmp/cache/'.$fileName;
		if (file_exists($fileName)) {
			$handle = fopen($fileName, 'rb');
			$variable = fread($handle, filesize($fileName));
			fclose($handle);
			return unserialize($variable);
		} else {
			return null;
		}
	}
	
	function set($fileName,$variable) {
		$fileName = SYSTEM.'tmp/cache/'.$fileName;
		$handle = fopen($fileName, 'a');
		fwrite($handle, serialize($variable));
		fclose($handle);
	}

}
