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

import ApiClient from '../ApiClient';

/**
 * The QueryInputArg model module.
 * @module SingleStore/Client/QueryInputArg
 * @version 0.0.1
 */
class QueryInputArg {
    /**
     * Constructs a new <code>QueryInputArg</code>.
     * An argument to be used in a SQL statement. This argument will be parsed into a golang type based on the default JSON parsing rules and then passed to the Go SQL driver for safe interpolation.
     * @alias module:SingleStore/Client/QueryInputArg
     */
    constructor() { 
        
        QueryInputArg.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>QueryInputArg</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:SingleStore/Client/QueryInputArg} obj Optional instance to populate.
     * @return {module:SingleStore/Client/QueryInputArg} The populated <code>QueryInputArg</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QueryInputArg();

        }
        return obj;
    }


}






export default QueryInputArg;

