# ESP8266-ShoppingList
A button that adds products to a shopping list.

##How it works##

You can see in the image above a scheme of how this project works.

![alt tag](https://github.com/Bjesus1/ESP8266-ShoppingList/blob/master/ESP8266withNode.png)

**Let us now do a walkthrough of the project:**

* After the press of the button, the ESP that is constantly trying to connect to our wifi, sends the information of the product ( lets consider that this button corresponds to the product ) to our node server through a POST method;

* The server will now save that information in our database;

* The person wants to see now the products list. She can do it by insert the server ip in the url, at port 3020, with /order.This will trigger a GET request to our server.

* Our node server will now request data to his database;

* It will receive the data and prepare it;

* The person can see the results in a webpage with the server ip as url with /order.


##Wiring it##




##ESP8266 with USB##



In order to transfer your programe, you must connect the ***GPIO_0*** to the ground energy part in your breadboard, as the image suggest. 

**Don't forget** to change you wireless definitions in the ESP8266 code to yours and to change the ***GPIO_0*** to positive in the breadboard.


##Node.js - Runing our server##

First, you need to install nodejs.
To do it, go to the following link ( https://nodejs.org ) and read their instructions.

Now, that you have install, open up node console and go the our server directory: 

`cd xxx\ESP8266-ShoppingList\serverESP8266`

Once you've completed this step, run `node server.js`. Our server is now listening and waiting for requests.


##MySQL and dependencies##

The file named package.json has all the dependencies that our project need. To install them, you need to run `npm install` in our server directory using the node command prompt before you start our server.

You also need to install mysql. I recommend using **Xampp** for those who do not know how to work very well with DB.
Open up Xampp control panel and activate the xampp and mysql services. 
Insert on your browser `localhost/phpmyadmin` and import our database example.


##Updates##

*Reset button ( web )* - A button in our browser that deletes all the table's ( products ) data from our database.
