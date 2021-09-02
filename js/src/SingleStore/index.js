/**
 * SingleStore HTTP API Spec
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from './ApiClient';
import Column from './Client/Column';
import ExecInput from './Client/ExecInput';
import ExecOutput from './Client/ExecOutput';
import QueryInput from './Client/QueryInput';
import QueryInputArg from './Client/QueryInputArg';
import QueryOutput from './Client/QueryOutput';
import QueryOutputError from './Client/QueryOutputError';
import ResultSet from './Client/ResultSet';
import RowValue from './Client/RowValue';
import StreamOutput from './Client/StreamOutput';
import StreamResult from './Client/StreamResult';
import DefaultApi from './Client/DefaultApi';


/**
* JS API client generated by OpenAPI Generator.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var SingleStoreClient = require('SingleStore/index'); // See note below*.
* var xxxSvc = new SingleStoreClient.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new SingleStoreClient.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['SingleStore/index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new SingleStoreClient.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new SingleStoreClient.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module SingleStore/index
* @version 0.0.1
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:SingleStore/ApiClient}
     */
    ApiClient,

    /**
     * The Column model constructor.
     * @property {module:SingleStore/Client/Column}
     */
    Column,

    /**
     * The ExecInput model constructor.
     * @property {module:SingleStore/Client/ExecInput}
     */
    ExecInput,

    /**
     * The ExecOutput model constructor.
     * @property {module:SingleStore/Client/ExecOutput}
     */
    ExecOutput,

    /**
     * The QueryInput model constructor.
     * @property {module:SingleStore/Client/QueryInput}
     */
    QueryInput,

    /**
     * The QueryInputArg model constructor.
     * @property {module:SingleStore/Client/QueryInputArg}
     */
    QueryInputArg,

    /**
     * The QueryOutput model constructor.
     * @property {module:SingleStore/Client/QueryOutput}
     */
    QueryOutput,

    /**
     * The QueryOutputError model constructor.
     * @property {module:SingleStore/Client/QueryOutputError}
     */
    QueryOutputError,

    /**
     * The ResultSet model constructor.
     * @property {module:SingleStore/Client/ResultSet}
     */
    ResultSet,

    /**
     * The RowValue model constructor.
     * @property {module:SingleStore/Client/RowValue}
     */
    RowValue,

    /**
     * The StreamOutput model constructor.
     * @property {module:SingleStore/Client/StreamOutput}
     */
    StreamOutput,

    /**
     * The StreamResult model constructor.
     * @property {module:SingleStore/Client/StreamResult}
     */
    StreamResult,

    /**
    * The DefaultApi service constructor.
    * @property {module:SingleStore/Client/DefaultApi}
    */
    DefaultApi
};
