# MongoDB write ticket is more than 128.

## Description
This check warns if the write ticket is more than 128 as this can cause performance issues.

Ideally, the number of tickets should be based on the number of CPU available.
The default write ticket is 128.

It can be adjusted for your mongod and your mongos nodes.

For more information, see [wiredTigerConcurrentWriteTransactions in the MongoDB documentation](https://docs.mongodb.com/manual/reference/parameters/#mongodb-parameter-param.wiredTigerConcurrentWriteTransactions).


## Rule
MONGODB_GETPARAMETER

`db.adminCommand( { setParameter: 1, "wiredTigerConcurrentWriteTransactions": "128"  } )`

## Resolution
Adjust the verbosity of your logs online: `mongo> db.adminCommand( { setParameter: 1, "wiredTigerConcurrentWriteTransactions": "128"  } )`

Edit mongod.conf and set the below parameter to default:
```
       setParameter:
         wiredTigerConcurrentWriteTransactions: 128
```
If resetting the write ticket in your mongod config file, be aware that this will not take effect until the next restart.
