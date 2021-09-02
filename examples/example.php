<?php

// This example runs in PHP.  It sends a few database queries to the 
// SingleStore database using a wrapper around the SingleStore REST API.  HTML 
// content is returned.
//
// Here is one way to run these examples:  
//
//     - Ensure that the "composer" and "php" programs are installed locally.
//
//     - In this file, update the S2USER and S2PASS constants with an 
//       appropriate username and password for your SingleStore database.
//       Also, ensure that S2PROXY points to the host and port of the
//       SingleStore HTTP Proxy.
//
//     - Make sure you are in this repo's "php" directory.
//
//     - Run:
//           composer update
//
//     - Run:
//           composer install
//
//     - Start a local PHP server on port 8081:
//
//           php -S 127.0.0.1:8081
//
//       If you need to user a different host or port, substitute with 
//       different values in the above command.
//
//     - In your browser, go to "localhost:8081/example.php" (or substitute with 
//       your custom PHP host/port).
//

require_once(__DIR__ . '/vendor/autoload.php');

const S2USER  = 'root';
const S2PASS  = '';
const S2PROXY = 'localhost:8080';

// Basic auth.
$config = SingleStore\Configuration::getDefaultConfiguration()
              ->setUsername(S2USER)
              ->setPassword(S2PASS)
              ->setHost(S2PROXY);

// If you want use a custom http client, pass a client that implements 
// `GuzzleHttp\ClientInterface`.  Otherwise, `GuzzleHttp\Client` will be 
// used as default.
$apiInstance = new SingleStore\Client\DefaultApi(
    new GuzzleHttp\Client(),
    $config
);

// Create a random string for use in the calls below.
$label = str_shuffle('abcdefghijklmnopqrstuvwxyz');

// Endpoint: /ping
try {
    print('<b><h2>/ping</h2></b>');
    $result = $apiInstance->ping();
    print('<tt>' . $result . '</tt><br>');
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->ping: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

// Endpoint: /api/v1/spec
try {
    print('<b><h2>/api/v1/spec</h2></b>');
    $result = $apiInstance->spec();
    print('<tt>' . $result . '</tt><br>');
} catch (Exception $e) {
    echo 'Exception: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

// Endpoint: /api/v1/exec
try {
    print('<b><h2>/api/v1/exec</h2></b>');

    // This query only requires a SQL statement.
    $execParms_createDB = new \SingleStore\Client\ExecInput();
    $execParms_createDB->setSql(
        'CREATE DATABASE IF NOT EXISTS phptest;');
    $result = $apiInstance->exec($execParms_createDB);
    print('<i>createDB</i>:<br><tt>' . $result . '</tt><br><br>');

    // In this query, we will pass a databse name as well as a SQL statement.
    $execParms_createTbl = new \SingleStore\Client\ExecInput();
    $execParms_createTbl->setDatabase('phptest');
    $execParms_createTbl->setSql(
        'CREATE TABLE IF NOT EXISTS phptable('   .
            'id INT AUTO_INCREMENT PRIMARY KEY,' .
            'label VARCHAR(100),'                .
            'create_time DATETIME,'              .
            'extra_data JSON);');
    $result = $apiInstance->exec($execParms_createTbl);
    print('<i>createTbl</i>:<br><tt>' . $result . '</tt><br><br>');

    // Here, we include a third argument, "Args", which is an array of values
    // that will replace each respective '?' in the SQL statement.  The first
    // replacement is with a random string (passed via the "label" column).
    // The second replacement illustrates passing an arbitrary JSON object to
    // the "extra_data" column, which is of JSON type.
    $extra = [
        'names' => [ 'Fred', 'Bob', 'Jane' ],
        'address' => [
            'city' => 'Raleigh',
            'state' => 'NC'
        ]
    ];
    $execParms_insertTbl = new \SingleStore\Client\ExecInput();
    $execParms_insertTbl->setDatabase('phptest');
    $execParms_insertTbl->setSql(
        'INSERT INTO phptable (label, create_time, extra_data) VALUES (?, NOW(), ?);');
    $execParms_insertTbl->setArgs(array($label, $extra));
    $result = $apiInstance->exec($execParms_insertTbl);
    print('<i>insertTbl</i>:<br><tt>' . $result . '</tt><br><br>');
} catch (Exception $e) {
    echo 'Exception: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

// Endpoint: /api/v1/rows
try {
    print('<b><h2>/api/v1/rows</h2></b>');

    // Issue a query for the row we just inserted, using "Args" to pass in
    // the label we generated above.
    $queryParms_selectOne = new \SingleStore\Client\QueryInput();
    $queryParms_selectOne->setDatabase('phptest');
    $queryParms_selectOne->setSql(
        'SELECT * FROM phptable WHERE label=?;');
    $queryParms_selectOne->setArgs(array($label));
    $result = $apiInstance->rows($queryParms_selectOne);
    print('<i>selectOne</i>:<br><tt>' . $result . '</tt><br><br>');

    // Similar query as above, but for all rows.  No Args required here.
    $queryParms_selectAll = new \SingleStore\Client\QueryInput();
    $queryParms_selectAll->setDatabase('phptest');
    $queryParms_selectAll->setSql(
        'SELECT * FROM phptable;');
    $result = $apiInstance->rows($queryParms_selectAll);
    print('<i>selectAll</i>:<br><tt>' . $result . '</tt><br><br>');
} catch (Exception $e) {
    echo 'Exception: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

// Endpoint: /api/v1/tuples
try {
    print('<b><h2>/api/v1/tuples</h2></b>');

    // Issue a query for the row we just inserted, using "Args" to pass in
    // the label we generated above.
    $queryParms_selectOne = new \SingleStore\Client\QueryInput();
    $queryParms_selectOne->setDatabase('phptest');
    $queryParms_selectOne->setSql(
        'SELECT * FROM phptable WHERE label=?;');
    $queryParms_selectOne->setArgs(array($label));
    $result = $apiInstance->tuples($queryParms_selectOne);
    print('<i>selectOne</i>:<br><tt>' . $result . '</tt><br><br>');

    // Similar query as above, but for all rows.  No Args required here.
    $queryParms_selectAll = new \SingleStore\Client\QueryInput();
    $queryParms_selectAll->setDatabase('phptest');
    $queryParms_selectAll->setSql(
        'SELECT * FROM phptable;');
    $result = $apiInstance->tuples($queryParms_selectAll);
    print('<i>selectAll</i>:<br><tt>' . $result . '</tt><br><br>');
} catch (Exception $e) {
    echo 'Exception: ', $e->getMessage(), PHP_EOL;
}
print('<hr>');

?>

