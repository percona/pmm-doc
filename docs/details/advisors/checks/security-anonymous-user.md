# Anonymous users

## Description
MySQL allows creating users without names, which can create important security issues. 
Best practices recommend removing anonymous users to secure the MySQL installation.

## Rule
`Select user,host from mysql.user where user = ''`


## Resolution
Remove any user that does not have a name in the mysql.user table.  
```
Delete from mysql.user where user=’’;
FLUSH PRIVILEGES;
```
