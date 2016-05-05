Nblog - node project, blog.

Basic skeleton API. We have basic CRUD operations on the following resources: users, categories, and posts.
**Users**

    GET /users - fetch all users
    POST /users - create a new user
    GET /users/:id - fetch a single user by id
    PUT /users/:id - update user
    DELETE /users/:id - delete user

**Categories**

    GET /categories - fetch all categories
    POST /categories - create a new category
    GET /categories/:id - fetch a single category
    PUT /categories/:id - update category
    DELETE /categories/:id - delete category

**Posts**

    GET /posts - fetch all posts
    POST /posts - create a new post
    GET /posts/:id - fetch a single post by id
    PUT /posts/:id - update post
    DELETE /posts/:id - delete post
    GET /posts/category/:id - fetch all posts from a single category
    GET /posts/tags/:slug - fetch all posts from a single tag



**Installation**

Create DB and set config data to _config/config.js_

Then run command-line to load lib to _node_modules_

    npm install

Run migrations

    node migrations/migrate

If everything went well you will see the text _Tables created!!_.


Start server.

    nodemon bin/www

or

    node bin/www


more useful info http://blog.ragingflame.co.za/2014/7/21/using-nodejs-with-mysql
and http://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs

