# backend

# usage

* intall dependencies
> npm install
* run migrations
> sequelize db:migrate
* run local server
> npm start

# debug

* in case of error in migrations do a rollback
> sequelize db:migrate:undo //this will undo the last migration <br>
> sequelize db:migrate:undo:all //this will undo all the migrations