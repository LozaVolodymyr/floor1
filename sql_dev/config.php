<?php
ini_set("display_errors", 1);
//error_reporting(E_ALL ^ E_NOTICE ^ E_STRICT ^ E_DEPRECATED);
error_reporting(E_ALL);
ini_set("memory_limit", "128M");
date_default_timezone_set("Europe/Kiev");
######################################################################
## DB CONFIG
######################################################################
define('DB_SERVER',            'localhost');
define('DB_USER',              'root');
define('DB_PASSWORD',          '');
define('DB_DATABASE',          'parsing');
define('_prefix',              "");
######################################################################
define('_ROOT_HOME_PATH',       dirname(__FILE__)."/");
define('_ROOT_URL',             'http://'.str_replace('www.', '', $_SERVER['HTTP_HOST']).'/');
define('HOST',                  str_replace('www.', '', $_SERVER['HTTP_HOST']));
define('_ENGINE_CORE_PATH',     _ROOT_HOME_PATH.'engine/');
define('_ENGINE_LIB_PATH',      _ENGINE_CORE_PATH.'lib/');
define("SESSION_TIMEOUT",       864000);
define('DIR_IMAGE',             _ROOT_URL.'images/');
?>
