# MongoDB journal enabled

## Description
This check warns if the journal is not enabled. 
This is dangerous because you could have a serious issue for data durability in case of a failure.


For Production systems, enable journal to ensure that data files are valid/recoverable.

It is always recommended to enable the journal. 

More recent versions of MongoDB don’t allow turning off the journal. 
MongoDB enables journaling by default in recent versions (4.0 +).

For more information, see the [Journaling section in the MongoDB documentation](https://docs.mongodb.com/manual/core/journaling/).



## Rule
```
 storage_journal = parsed.get("storage.journal", {})
 journal_enabled = (storage_journal.get("enabled") == "true")
```


## Resolution

Please Perform the steps mentioned below to enable journaling 

1. Enable journal. 
2. Edit mongod.conf and set the following parameter:
```
storage:
  journal:
	enabled: true
```
3. Perform a rolling restart of your mongod (data bearing) nodes.
