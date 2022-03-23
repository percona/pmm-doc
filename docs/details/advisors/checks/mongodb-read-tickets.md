# MongoDB read ticket is more than 128

## Description
This check warns if the read ticket is more than 128 since this can cause performance issues.

Ideally, the number of tickets should be based on the number of CPU available.
The default read ticket is 128.

It can be adjusted for your mongod and your mongos nodes.

For more information, see [wiredTigerConcurrentReadTransactions in the MongoDB documentation](https://docs.mongodb.com/manual/reference/parameters/#mongodb-parameter-param.wiredTigerConcurrentReadTransactions).



## Rule
MONGODB_GETPARAMETER

`db.adminCommand( { setParameter: 1, "wiredTigerConcurrentReadTransactions": "128"  } )`

## Resolution
To adjust the verbosity of your logs online: `mongo> db.adminCommand( { setParameter: 1, "wiredTigerConcurrentReadTransactions": "128"  } );`

Edit mongod.conf and set the below parameter to default.
```
          setParameter:
            wiredTigerConcurrentReadTransactions: 256
```
If resetting the read ticket in your mongod config file, be aware that this will not take effect until the next restart.
