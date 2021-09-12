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
