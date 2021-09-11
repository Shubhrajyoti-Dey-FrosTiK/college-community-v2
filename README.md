# College Community v2

This is a project to build a community for the college

## Dependencies :

NodeJS :  https://nodejs.org/en/

Yarn :  ```npm install --global yarn```

## How to get started ?

Clone the repo 

Then ```cd college-community-v2 ```

## First follow these initial steps to setup the environment variables :

1. Go to the root folder ( folder which contains the server files and the ```/client``` folder )
2. Create a ```.env``` file
3. In the file created create two constansts : 

    ```SECRET_KEY``` which should be a randomly generated string ( Any rnadom string )
    
    ```MONGO_CONNECTION_URL``` which should be the connection URL of your MongoDB database 



## Now follow these steps to start everything up :

There are servers which we need to start. One is the server side for the API endpoints to be active 

Another is the ```/client``` side which is our frontend. 

So open **2 terminals** and follow these steps seperately 

### To Start the backend server :

Go into this state of the directory ```DIR_PATH/college-community-v2/```

Run ```yarn install```

Then ```yarn start```

### To Start the frontend server :

```cd client```

Now you are in this state of the directory ```DIR_PATH/college-community-v2/client/```

Run ```yarn install```

Then ```yarn start```

**( Donot use npm in any part of the app. Only use yarn to install any dependency )**

## Basics about the app 

The app is a MERN stack app and the frontend will be running on ``` http://localhost:3000/ ``` and the backend will be running on ```http://localhost:5050/ ```
