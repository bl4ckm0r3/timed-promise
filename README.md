# Ember-timed-promise

This is an extension of Ember.RSVP.Promise that allow the user to set a Timer
that will reject the promise if not resolved in time.
It uses ES6 syntax internally and babel to compile to ES5 friendly code


## Basic Usage
It works like a normal promise, only it accepts a time (in ms) and a promise/jQuery Deferred as an input and a custom message error (Will default to "<time>ms timer exceeded").

#### Ember.RSVP.Promise
```javascript
let prom = new Ember.RSVP.Promise((resolve, reject) =>{
  Ember.run.later(function() {
    resolve({
      response: true
    });
  }, 150); // This will delay the promise execution of 150ms
});

// The promise will reject and throw an error after 100ms
return new TimedPromise(100, prom, "It Failed!").then((response) => {
    Ember.Logger.log(response); // Will log {response : true}
  }, (reason) => {
    Ember.Logger.log(reason);
    // Will log Error("It Failed!")
});
```

#### jQuery Deferred
```javascript
let prom = Ember.$.getJSON("https://api.github.com/repos/emberjs/ember.js/pulls");
return new TimedPromise(2000, prom).then((response) => {
   Ember.Logger.log(response); // Will have an array of pulls from the ember repo
}).catch((reason) => {
   Ember.Logger.log(reason); // Why did you fail?
   });
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200/tests.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
