# Chef It Up 

This app was made to create a quick and easy way for people who love or want to cook more from home to be able to access a variety of recipes. 

#### Backstory: Chef It Up 

As a recent college graduate, I found myself for the first time in a situation where I was at home alone having to cook for myself every day. Not only did I start to run out of ideas, the ingredients in my fridge often went to waste and I ended up ordering food online, which is both expensive and unhealthy. Through this app I hope that other people in similar situation as me can find it easy to access many different recipes out there. 



## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts
* CSS 
* Bootstrap
* ORM


### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| PUT| /edit | server.js | user can edit their name/email |
| DELETE | /recipes | recipes.js | User can delete recipe from database |
| POST | /:id/comment | recipes.js | user can add comment on individual recipes |

## User Stories db

As a new member of cooking from home team I want to be able to
    1. Search up food recepies based on my current diet 
    2. Save my favorite recipies for future use 
    3. Comment on recipes and delete recipes I no longer need from my favorite list 


## `1` Fork & Clone Project & Install Dependencies
`1` The first thing that we are going to do is `fork` and `clone`
-  `git clone ` https://github.com/ruraliz/Project2_Chef_It_Up.git
- cd into 'project2_Chef_It_Up
- [method-override]

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
npm install bcryptjs connect-flash passport passport-local express-session method-override
```
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

`4` touch .env to add `.env` directory and in `.env` file add `SECRET_SESSION`=alldayidreamaboutsoftwareengineering

`5` Make a commit
```text
git add .
git commit -m "Install dependencies for project"
```
## `2` Getting project to work 

`1` to get access to API
 got to "https://rapidapi.com" to find the recipe-search API or go to  https://rapidapi.com/edamam/api/recipe-search-and-diet to get  'X-RapidAPI-Key' and  'X-RapidAPI-Host'.

`2` Create Database
- npm install sequelize-cl
- npx sequelize-cli db:create chef-it-up

`3` Migrate their database
- npx sequelize-cli db:migrate
- If need to seed data: npm sequelize-cli db:seed:all
`4` To start Server: npm start
`5` HEROKU DEPLOYMENT
`Step 1`: Make sure node_modules/ is in .gitignore
`Step 2`. Make sure you're app is listening for a PORT in the ENV =>  app.listen(process.env.PORT || 3000)
`Step 3`. Get an account with Heroku ( heroku.com )
`Step 4`. Install Heroku on local machine
brew tap heroku/brew && brew install heroku
`Step 5`. Log into Heroku on Terminal
heroku login
`Step 6`. Install sequelize-cli for Heroku to
npm i sequelize-cli
`Step 7`. Add node server.js to script inside `package.json`
`Step 8`. Host the app with
heroku apps:create name-of-your-app
`Step 9`.  Check for Heroku with git remote -v  and commit to Github with add, commit, push
`Step 10`.  Set up the database with heroku
heroku config:set SECRET_SESSION=supersecretkey
  Add everything in .env to Heroku this way
`Step 11`. Create your database!
Install Postgres on Heroku with
heroku addons:create heroku-postgresql:hobby-dev
Check for db with
heroku config
Set up production settings in config.json
``` javascript
"production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
      }
  }
 ```
git add, commit, push to Github first, then
git push heroku main
`Step 12` . Migrate database
Enter bash terminal on Heroku
heroku run bash
Migrate database
npx sequelize-cli db:migrate
If you need to seed database, run the following:
 npx sequelize-cli db:seed:all
Exit bash
exit 
`Step 13`. Test your website by creating a new user!
Open your app with
heroku open
Alternatively, the url will be using the name you gave your app in the url like so: https://name-of-your-app.heroku.com
You can connect to your server with Postico by getting the db url from heroku config
Connect to it in Postico as a new favorite with the host as your DATABASE_URL
You should be able to see your live database now
`14` . AFTER DEPLOYMENT
after making changes to local app, then you want to add, commit, and push to Github
afterwards run the command
git push heroku main

## Wireframe
<img src= "public/assets/Wireframe.jpg">

## The APP 
<img src= "public/assets/home.png">
<img src= "public/assets/myfav.png">
<img src= "public/assets/about.png">
<img src= "public/assets/ind.png">

## Future Improvements
- Make sure all the data sets from the API can be migrated into my database in correct format.
- Add more features within the App so that the user can create a weekly meal plan for the week.
- Allow user to add their own recipe with a create recipe form  
- Make better styling for the 'My recipes" page so that it looks like the example format on screenshots in the home page. 







