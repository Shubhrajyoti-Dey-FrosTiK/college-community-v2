# College Community v2

This is a project to build a community for the college

## Major Dependencies :

NodeJS :  https://nodejs.org/en/

Yarn :  ```npm install --global yarn```

## Basic Warning :

From now on donot use npm in any part of this project. Only use ```yarn``` to install any dependency 

Use this syntax to add any package to the project :

```
yarn add <package_name>
```

Consult this website to work with yarn https://classic.yarnpkg.com/en/docs

## How to get started ?

Clone the repo 

Then go into the folder by the command

```
cd college-community-v2
```

## First follow these initial steps to setup the environment variables :

1. Go to the root folder ( folder which contains the server files and the ```/client``` folder )
2. Create a file named ```.env``` 
3. In the file created create these constanst variables : 

    ```SECRET_KEY``` which should be a randomly generated string ( Any rnadom string )
    
    ```MONGO_CONNECTION_URL``` which should be the connection URL of your MongoDB database 
    
    ```SALT_ROUNDS``` which is used for ecryption. ( More details about it provided below )
    
### Salt

Salt is used for encrypting / decrypting in BcryptJS for secure authorization of passwords.

```SALT_ROUNDS``` :- This is basically a random no from the enclosed list below. 

Please choose any number from this list only :

```
rounds=8 : ~40 hashes/sec
rounds=9 : ~20 hashes/sec
rounds=10: ~10 hashes/sec
rounds=11: ~5  hashes/sec
rounds=12: 2-3 hashes/sec
rounds=13: ~1 sec/hash
rounds=14: ~1.5 sec/hash
rounds=15: ~3 sec/hash
rounds=25: ~1 hour/hash
rounds=31: 2-3 days/hash

So choose a number from the list { 8,9,10,11,12,13,14,15,25,31 }
```

If you want more information about BcryptJS then visit https://www.npmjs.com/package/bcrypt

So basically a sample ```.env``` file shouuld look like this 

### Sample ```.env``` file :

```
SECRET_KEY="some_random_string"
MONGO_CONNECTION_URL='<mongoDB_connection_URL>'
SALT_ROUNDS=15
```


## Now follow these steps to start everything up :

There are servers which we need to start. One is the server side for the API endpoints to be active 

Another is the ```/client``` side which is our frontend. 

So open **2 terminals** and follow these steps seperately 

### To Start the backend server :

Go into this state of the directory ```DIR_PATH/college-community-v2/```

Then run these commands :

```
yarn install
```

```
yarn start
```

Now your backend server should have started successfully

### To Start the frontend server :

Now switch to the other terminal first

Now go to the root directory ( The directory which includes ```server.js``` ) 

Then run

```
cd client
```

Now you are in this state of the directory ```DIR_PATH/college-community-v2/client/```

Now run these commands

```
yarn install
```

```
yarn start
```

Now your frontend server should have started successfully

## Basics about the app 

The app is a MERN stack app and the frontend will be running on ``` http://localhost:3000/ ``` and the backend will be running on ```http://localhost:5050/ ```

--------

## Guide to API Calling in Frontend :

Here in this project we will be using ```axios``` to do the API calling.

In the repo ```axios``` is already present in the ```package.json``` of the ```/client``` folder (which is the frontend here)

So in this project there is no additional need to add ```axios``` to your project.

If you are starting a new project in case you need to add ```axios``` as a dependency in your project.

To do this run the following command :

```
yarn add axios
```
OR
```
npm i axios
```

This is the official documentation of ```axios``` https://axios-http.com/docs/intro

### Discussing some basic concepts :

**Requests**

Requests in short are process of calling the server to push or get some data from the server. We generally use 4 types of requests namely ```GET , POST , PUT , DELETE```.Each request has some parts and we generally use two parts to make a successful request namely ```headers``` and ```body```. Headers generally consists of stuff like Auth Tokens etc and the body consisits of all tyoes of data which the server requires to give a response. We will discuss in brief about each type of request below

**GET Request :**

This type of a request is generally used to fetch sone data from the server side. We cannot dont create a ```body``` of this type of a request and pass the required specified details via the headers of this request. This is a small code example of ```GET Request``` using ```axios``` 

```js
axios.get('/api/user/',{
       headers:{     
       "authorization":"<YOUR_AUTHORIZATION_TOKEN>",
       "ANY_OTHER_INFO": "<INFO>"
       }
}).then(response => console.log(response));
```
So basically the above code is an example of a ```GET Requst``` using ```axios```. Here as an example we have passed an ```Authorization_Token``` but anything can be passed. Here we will for example get the details of the user

```"/api/user/"``` is the ```URL``` of the website where you want to send the request. In our project (before production) it will be pointing to ```http://localhost:5050/api/user``` as here in our project (before production) a frontend `proxy` is used which is defined in the `package.json` of the `/client` folder . So when we write here `/api/user` here in our project it will be directly pointing to ```http://localhost:5050/api/user```

```.then()``` is basically an event which will trigger after the response is received in from the server side. In this example we are just printing the response got from our server.


**POST Request :**

This type of a request is used to push some data to the server (eg. pushing data to our database etc). Here the data is passed within the ```body``` and headers are used for any other purposes like authentication etc. This is a code example of creating a ```POST Request``` using ```axios```

```js
axios.post('/api/signup/',{
         "email" : "sample@gmail.con",
         "<ANY_OTHER_FIELD>" : "<INFO>" 
       },{
         headers:{
          "authorization":"<YOUR_AUTHORIZATION_TOKEN>"
         }
}).then(response => console.log(response));
```
This is basically a ```POST Request``` using ```axios``` where here as an example we have used the ```body``` to pass on the email and other details of an user to push into for example a DB and ther ```headers``` to authenticate the user. At last we are just printing the responses.

**PUT Request**

This type of a request is sent to server when we want ot update anything. For example updating the profile of a person in a database. We pass all the info to be editteed in the ```body``` of the request and use ```headers``` for the same purpose as discussed before. This is a code example of a ```PUT Request``` using ```axios```.

```js
axios.put('/api/user/',{
         "email":m,
         "<ANY_OTHER_FIELD>" : "<INFO>"
       },{
         headers:{
           "authorization":"<YOUR_AUTHORIZATION_TOKEN>"
         }
}).then(response => console.log(response));
```
Here basically we are just sending the email and other info to the server. The server will then for example find the entry in the database using the primary key and will update the details according to the ```body``` passed. Rest all the explainations to the code is similiar to the above mentioned requests.

**DELETE Request**

As the name suggests, this type of a request is used to delete something. For example deleting some entry from the database. We cannot pass anythng in the ```body``` here and everything is passed by the ```headers``` of the request. This is a code example of a ```DELETE Request``` using ```axios```.

```js
 axios.delete('/api/user/',{
       headers:{
         "authorization":"<YOUR_AUTHORIZATION_TOKEN>",
         "<PRIMARY_KEY>":"<DB_PRIMARY_KEY>
       }
}).then(response => console.log(response));
```
Here as an example we have passed the ```primary key``` and the auth token. So here the server will check the database and delete the specified entry.

If you wish to know more about requests please visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods


