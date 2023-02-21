# Labels for access control in PMM


Label-based access control in PMM allows you to manage who has access to metrics based on labels. By creating roles, you can specify which data can be queried based on specific label criteria, for instance, allowing the QA team to view data related to test environments. 
 
With Label-based access control, you can associate multiple labels with a role, ensuring only data from series that match your defined labels is returned. 


## Predefined vs custom labels

PMM supports predefined as well as custom labels. PMM automatically assigns predefined labels. You can also set predefined labels when an object (Node, Service, or Agent) is created. Custom labels are assigned and updated only by a user.

**Examples**


| **Label Type**| **Object**| **Label name **| **Example** |                                                                                                
|----------|--------|-------|------------------------------|
| **Predefined**  | Node   | node_id |/node_id/123|                                          
|          | Service|service_type   |   - mysql, mongodb, postgresql etc.                                     
| **Custom**| Node, Service, Agent| Any string matching regular expression: <br /> [a-zA-Z_][a-zA-Z0-9_]*. <br /> Also, it cannot start with two underscores.| owner="joe"<br/> _rack="12345"|


## Adding labels in PMM

You can add custom or predefined labels in PMM while adding a service for monitoring in PMM. 

**Using PMM UI**

You can set the labels using User interface as follows:

1. On the *Main* menu, navigate to *Configuration > Add Service*.

2. Select the service you want to add to PMM for monitoring. The page to add the service opens.

3. Enter the details such as *Hostname, Service name, Port, Username, Password,* etc., along with Label or Custom labels.

 ![!](../../_images/PMM_access_control_add_labels_services.png)

 **Using pmm-admin**

 You can also assign labels using `[pmm-admin](../../details/commands/pmm-admin.md)`.