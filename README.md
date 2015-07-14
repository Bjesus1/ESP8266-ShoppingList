# ESP8266-ShoppingList
A button that adds products to a shopping list

##How it works##

You can see in the image above a scheme of how this project works.

![alt tag](https://github.com/Bjesus1/ESP8266-ShoppingList/blob/master/ESP8266withNode.png)

**Let us now do a walkthrough of the project:**

**1)** After the press of the button, the ESP that is constantly trying to connect to our wifi, sends the information of the product ( lets consider that this button corresponds to the product ) to our node server through a POST method;

**2)** The server will now save that information in our database;

**3)** The person wants to see now the products list. She can do it by insert the server ip in the url, at port 3020, with /order.This will trigger a GET request to our server.

**4)** Our node server will now request data to his database;

**5)** It will receive the data and prepare it;

**6)** The person can see the results in a webpage.
