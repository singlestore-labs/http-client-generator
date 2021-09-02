// This example runs on Node.js, and assumes that @singlestore/http-client-js
// has been published to an accessible registry.  It creates an HTTP server
// and whenever the baseURL is hit, it sends a few database queries to the 
// SingleStore database using a JavaScript wrapper around the SingleStore
// REST API.  HTML content is returned, and status is written to the console.
//
// Here is one way to run these examples:  
//
//     - Ensure that the "npm" and "node" programs are installed locally.
//
//     - In this file, update the S2USER and S2PASS constants with an 
//       appropriate username and password for your SingleStore database.
//       Also, ensure that S2PROXY points to the host and port of the 
//       SingleStore HTTP Proxy.
//
//     - Make sure you are in this repo's "js" directory.
//
//     - Run:
//           npm install @singlestore/http-client-js --save
//
//     - Run:
//           npm run build
//
//     - Start a Node.js server with this example:
//
//           node example.js
//
//       By default, the server will run on localhost:8081.  If you need to 
//       use a different host or port for the Node.js server, be sure to 
//       update the "nodeHost" and/or "nodePort" constants below.
//
//     - In your browser, go to "localhost:8081" (or substitute with your 
//       custom values for "nodeHost"/"nodePort").
//

const S2USER  = 'root';
const S2PASS  = '';
const S2PROXY = 'localhost:8080';

const http = require('http');

const nodeHost = '127.0.0.1';
const nodePort = 8081;

var SingleStoreClient = require('@singlestore/http-client-js');

const server = http.createServer(async function(req, res) {
    console.log("Handling request...");
    var defaultClient = SingleStoreClient.ApiClient.instance;

    // Configure HTTP basic authorization: BasicAuth
    var BasicAuth = defaultClient.authentications['BasicAuth'];
    BasicAuth.username = S2USER;
    BasicAuth.password = S2PASS;

    // Set the SingleStore proxy's host and port.
    defaultClient.basePath = 'http://' + S2PROXY;
    console.log("Using SingleStore Proxy on " + defaultClient.basePath);

    // Here's one way to initialize a query's parameters -- pass the SQL 
    // into the constructor of the input object.
    execParms_createDB = {
        execInput: 
            new SingleStoreClient.ExecInput(
                'CREATE DATABASE IF NOT EXISTS jstest;')
    };

    // In this query, we'll provide a database to the query as well.  Since 
    // this query uses multiple fields in the input object, we'll initialize
    // using the dictionary form instead of the simple constructor above.
    execParms_createTbl = {
        execInput: {
            database: 'jstest',
            sql: 'CREATE TABLE IF NOT EXISTS jstable('   +
                    'id INT AUTO_INCREMENT PRIMARY KEY,' +
                    'label VARCHAR(100),'                +
                    'create_time DATETIME);'
        }
    };

    // Similar in form to the previous query, this one passes a random string
    // in for the "label" column value using the "args" array and a matching 
    // '?' in the SQL statement.
    label = Math.random().toString(36).replace(/[^a-z]+/g, '');
    execParms_insertTbl = {
        execInput: {
            database: 'jstest',
            sql: 'INSERT INTO jstable (label, create_time) VALUES (?, NOW());',
            args: [ label ]
        }
    };

    // Now we will issue a query for the row we just inserted, using the
    // "args" to pass the label.  Both the "rows" and the "tuples" endpoint
    // will use the same input.
    queryParms_selectOne = {
        queryInput: {
            database: 'jstest',
            sql: 'SELECT * FROM jstable WHERE label=?;',
            args: [ label ]
        }
    };

    // Issue a similar query, but for all rows.
    queryParms_selectAll = {
        queryInput: {
            database: 'jstest',
            sql: 'SELECT * FROM jstable;',
        }
    };

    // This is where we'll populate the page content.
    content = '';
    code = 200;

    // Get the API handle.
    var api = new SingleStoreClient.DefaultApi();

    // Issue each API request in a promise.
    console.log("Executing queries...");
    await Promise
    .all([ 
        // Endpoint: /ping
        api.ping(), 

        // Endpoint: /api/v1/spec
        api.spec(),
    
        // Endpoint: /api/v1/exec
        api.exec(execParms_createDB),
        api.exec(execParms_createTbl),
        api.exec(execParms_insertTbl),

        // Endpoint: /api/v1/rows
        api.rows(queryParms_selectOne),
        api.rows(queryParms_selectAll),

        // Endpoint: /api/v1/tuples
        api.tuples(queryParms_selectOne),
        api.tuples(queryParms_selectAll),
    ])
    .then(function(result) {
        console.log('Resolving ping...');
        content += '<b><h2>/ping</h2></b>';
        content += '<tt>' + result[0].toString() + '</tt><br>';
        content += '<hr>';

        console.log('Resolving spec...');
        content += '<b><h2>/api/v1/spec</h2></b>';
        content += '<tt>' + result[1].toString() + '</tt><br>';
        content += '<hr>';

        console.log('Resolving exec...');
        content += '<b><h2>/api/v1/exec</h2></b>';
        content += '<i>createDB</i>:<br><tt>'  + JSON.stringify(result[2]) + '</tt><br><br>';
        content += '<i>createTbl</i>:<br><tt>' + JSON.stringify(result[3]) + '</tt><br><br>';
        content += '<i>insertTbl</i>:<br><tt>' + JSON.stringify(result[4]) + '</tt><br><br>';
        content += '<hr>';

        console.log('Resolving rows...');
        content += '<b><h2>/api/v1/rows</h2></b>';
        content += '<i>selectOne</i>:<br><tt>' + JSON.stringify(result[5]) + '</tt><br><br>';
        content += '<i>selectAll</i>:<br><tt>' + JSON.stringify(result[6]) + '</tt><br><br>';
        content += '<hr>';

        console.log('Resolving tuples...');
        content += '<b><h2>/api/v1/tuples</h2></b>';
        content += '<i>selectOne</i>:<br><tt>' + JSON.stringify(result[7]) + '</tt><br><br>';
        content += '<i>selectAll</i>:<br><tt>' + JSON.stringify(result[8]) + '</tt><br><br>';
    })
    .catch(function(error) {
        console.log(error);
        code = 500;
        content = error.toString();
    });

    res.statusCode = code;
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
    console.log("Request completed.");
});

server.listen(nodePort, nodeHost, () => {
    console.log(`Server running at http://${nodeHost}:${nodePort}/`);
});

