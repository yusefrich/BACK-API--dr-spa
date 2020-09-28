
# JWT auth api

boilerplate for a auth api created with node.

## Easy guide to my projects

[Here you can find all the info needed to guide you through my projects](https://github.com/yusefrich/WIKI--my-profile-guide/wiki "my profile guide").
## Getting Started

This project was created using sequelize, node and express and using sql as database

### App Prerequisites

* Install node stable version

[download](https://nodejs.org/en/)

* Create a file named nodemon.json using the nodemon.json.example file

> this file contains the sql database data for the api to work

* Install insomnia

[download](https://insomnia.rest/download/)

* Import the insomnia.json to see all the rotes and bodyes

>create a role, register a user and then signin using the signin route and use the returned token to change the envirioment token in the Manage Environment (Ctrl+E) and paste the current token in his field

### My Application Instalation process

* Download this repo

```
git clone repo-name
```
* On the root of this project run

```
npm install
```
* set up database

```
npx sequelize-cli db:migrate
```
* populate database

```
npx sequelize-cli db:seed:all
```
* Run the application with

```
npm start
```

## Authors


* **yusef richard** - *application short description*



# Contact

 *NAME*: Yusef Richard de Oliveira Alves <p>
 *EDUCATION*: Udacity Full Stack, bachelor degree in computer science <p>
 *EMAIL*:richard.alves.dev@gmail.com <p>
