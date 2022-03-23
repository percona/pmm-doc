# There are users without passwords

## Description
MySQL allows creating users with an empty string. 

This can lead to important security issues and should be fixed to secure your installation.

To identify user without a password:
`SELECT User, Host, authentication_string FROM mysql.user where authentication_string = '';`

Having accounts with empty passwords means that your MySQL installation is unprotected until you fix this issue.
For more information, see [Pluggable Authentication in the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/pluggable-authentication.html).


## Resolution
Assign a password to each MySQL root account that does not have one. 
To prevent clients from connecting as anonymous users without a password, either assign a password to each anonymous account or remove the accounts.
 
