<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Basic auth.
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()
              ->setUsername('username')
              ->setPassword('password')
              ->setHost('localhost:8080');

$apiInstance = new OpenAPI\Client\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

# Endpoint: /ping
print('Calling ping...');
try {
    $result = $apiInstance->ping();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->ping: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

# Endpoint: /api/v1/spec
print('Calling spec...');
try {
    $result = $apiInstance->spec();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->spec: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

# Endpoint: /api/v1/exec
print('Calling exec...');
try {
    $execInput = new OpenAPI\Client\Model\ExecInput();
    $execInput->setSql('create database phptest;');
    $result = $apiInstance->exec($execInput);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->exec: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

# Endpoint: /api/v1/rows
print('Calling rows...');
try {
    $execInput = new OpenAPI\Client\Model\ExecInput();
    $execInput->setSql('show databases;');
    $result = $apiInstance->rows($execInput);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->rows: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

# Endpoint: /api/v1/tuples
print('Calling tuples...');
try {
    $execInput = new OpenAPI\Client\Model\ExecInput();
    $execInput->setSql('show databases;');
    $result = $apiInstance->tuples($execInput);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->tuples: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

?>

