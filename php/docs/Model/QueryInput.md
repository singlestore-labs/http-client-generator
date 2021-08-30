# # QueryInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sql** | **string** | The SQL statement to execute. |
**args** | [**AnyOfStringNumberIntegerBoolean[]**](AnyOfStringNumberIntegerBoolean.md) | If specified: A list of arguments to be used in the SQL statement. The command uses question marks (?) for placeholders, which will be replaced by the specified arguments during execution. The command must have exactly as many placeholders as arguments, or the request will fail.  If not specified: The query will be run as-is | [optional]
**database** | **string** | If specified: The database on which the SQL statement must be executed. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
