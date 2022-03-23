# MongoDB logLevel is not default

## Description


Set the logLevel as an integer between 0 and 5, where 5 is the most verbose.
The default logLevel is 0 (Informational).

Increasing the verbosity of log levels is useful for debugging purposes for a short period of time.
For more information, see [db.setLogLevel() in the MongoDB documentation](https://docs.mongodb.com/manual/reference/method/db.setLogLevel/).


## Rule
MONGODB_GETPARAMETER

`db.adminCommand( { getParameter: 1, "logLevel": 1 } )`

## Resolution
Turn on or adjust the verbosity of your logs: 
- online: `mongo> db.setLogLevel(1);` or 
- using the adminCommand syntax: `db.adminCommand( { setParameter: 1, logLevel: 2 } )`


Edit mongod.conf and set the following parameter to default:
```
      setParameter:
       logLevel: 0
```    
If you are resettting the log level in your mongod config file, be aware that this will not take effect until the next restart.
