import {
   test
} from 'ember-qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';
import {
   defineFixture,
   request,
   raw
} from 'ic-ajax';
import TimedPromise from 'ember-timed-promise/timed-promise';

var App;

module('TimedPromise', {
  setup: () => {
    App = startApp();
    defineFixture('/users', {
      response : {
       users : [
          {
             id: 1,
             name: "marco"
          },
          {
             id: 2,
             name: "bl4ckm0r3"
          }
       ],
      jqXHR: {},
      textStatus: 'success'
      }
    });
  },
  teardown: () => {
    Ember.run(App, 'destroy');
  }
});

test("ember-time-promise succeeds with request", () => {
  expect(2);
  let defaultTime = 200;
  let testPromise = request("/users");
  return new TimedPromise(defaultTime, testPromise).then(() => {
      ok(true, "success!");
    }, (reason) => {
      ok(false, "This reject shouldn't be called");
    }).catch((reason) => {
      ok(false, "This catch shouldn't be called");
    }).finally(() => {
      ok(true, "This finally should be called");
    });
});

test("ember-time-promise succeeds with raw", () => {
  expect(2);
  let defaultTime = 1000;
  let testPromise = raw("/users");
  return new TimedPromise(defaultTime, testPromise).then(() => {
      ok(true, "success!");
    }, (reason) => {
      ok(false, "This reject shouldn't be called");
    }).catch((reason) => {
      ok(false, "This catch shouldn't be called");
    }).finally(() => {
      ok(true, "This finally should be called");
    });
});

test("ember-time-promise succeeds with getJSON", () => {
  expect(2);
  let defaultTime = 2000;
  let testPromise = Ember.$.getJSON("https://api.github.com/repos/emberjs/ember.js/pulls");
  return new TimedPromise(defaultTime, testPromise).then((pulls) => {
      Ember.Logger.log(pulls);
      ok(true, "success!");
    }, (reason) => {
      ok(false, "This reject shouldn't be called");
    }).catch((reason) => {
      ok(false, "This catch shouldn't be called");
    }).finally(() => {
      ok(true, "This finally should be called");
    });
});
