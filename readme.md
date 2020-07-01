## Instructions

### Installation

To run and install application you must have the latest version of Node.JS and NPM.
We won't provide the explanation on how to install node.js and npm. Google it.

To install the libraries from the bash (terminal/shell) just type
```
npm install
```
in the root of the project

To run application, just type in the root of the project

```
npm start
```


### Project info
There are 4 api calls on this project

#### Sign in
```
POST /sign-in
```

POST Body object
```
{
    password: 'password',
    email: 'email',
}
```

Response
```
{
    access_token: '00000000-0000-0000-0000-000000000000',
}
```



#### List users

```
GET /users
```

Response example
```
[
    {
        user_id: 1,
        name: 'User The One',
        title: 'Pljeskavica master',
        active: true,
    },
]
```



#### Get single user
```
GET /users/:userId
```

Response example
```
{
    user_id: 1,
    name: 'User The One',
    title: 'Pljeskavica master',
    active: true,
}
```

#### Get user accounts

```
GET /users/:userId/accounts
```

Response example
```
[
    {
        account_id: 1,
        name: `Wife's account`,
        active: true,
        money: 100,
    },
],
```

## Tests

Use defined endpoints to write API tests on your own, all routes should be covered. Cypress is preferred testing framework but if you are not familiar with it your are free to choose different framework.

## ~~ AA ~~ 

## How to build and run
 
```
docker build -t tradcore-qa-test:local . && docker run -ti --rm -p3111:3000 tradcore-qa-test:local
```
