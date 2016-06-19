# Tech test

## Running it

Since my code uses some features of the kind-of-recent ES6, node v6.x.x is needed to run it (it might run on older versions, using the --harmony flag, but I developed against 6.0.0);

To run it just do

```
npm install
npm start
```

And a server will be available in **localhost:3000**.

If you're using an older version of node, I've included a Dockerfile and respective npm scripts to quickly run the app. In this case run:

```
npm install
npm run docker:build
npm run docker:run
```

And, once again, server will be available in the same port (3000).

## Testing it

I've included unit tests for the core part of the application (the file datastore). I'm using **mocha** as the test runner and **chai** for the assertations; Ro run the tests just do:

```
npm test
```

If you're under docker environment, just launch a shell inside the container with:

```
npm run docker:shell
```

And you'll be able to run the test commands.

## Some context and choices I made

The form supplied wasn't enough to implement the other CRUD functions. Because of that, I changed it a little bit keeping the main idea.

The app is able to list, create, update and delete names leveraging the functionality of my file-persisted datastore through a simple Web app written on top of **express.js**;

I tried to seperate the concerns as much as possible (routes/controllers/views) lefting only aside models because I think it would be an overkill adding another layer that would behave pretty much as the datastore api itself.

The datastore is a simple abstraction of a javascript array that is persisted in a file everytime a change is made.

## Things that I would improve if it was a real project

- CSRF protection (using tokens within forms);
- Change to a more performant datastore;
- Clearly seperate the API and the view (probably using express for the backend API and a JS framework for the frontend - Angular/React/Ember);
- Implement real models with expressive relationships in their APIs;
- Improve data validation (both in the backend and the resulting frontend UX);
- Many other things that would come with the new requirements for the application.

Thanks for the time spent reviewing my test.

Hugo Mendes

0x6875676f (at) gmail (dot) com

me (at) hugomarisco (dot) in
