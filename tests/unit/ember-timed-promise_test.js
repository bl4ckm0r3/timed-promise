import Ember from 'ember';

import {
  test
} from 'ember-qunit';

import TimedPromise from 'ember-timed-promise/timed-promise';


module('TimedPromise');

test("ember-timed-promise is thenable", () => {
  expect(1);
  let defaultTime = 200;
  let testPromise = new Ember.RSVP.Promise((res)=>{setTimeout(res, 10);});
  equal(typeof((new TimedPromise(defaultTime, testPromise)).then), "function");
});

test("ember-timed-promise resolves correctly", function() {
  expect(1);
  let defaultTime = 200;
  let resultObject = {"success" : true};
  let testPromise = new Ember.RSVP.Promise((resolve)=>{return resolve(resultObject);});
  return new TimedPromise(defaultTime, testPromise).then((result) => {
      equal(result, resultObject, "promise resolved correctly");
    });
});

test("ember-timed-promise fails when timed out - catch", () => {
  expect(1);
  let defaultTime = 10;
  let failingTime = 20;
  let testPromise = new Ember.RSVP.Promise((res)=>{setTimeout(res, failingTime);});
  return new TimedPromise(defaultTime, testPromise).then(() => {
    ok(false, "This success shouldn't be called");
  }).catch((reason) => {
      ok(reason["message"].indexOf("timer exceeded") !== -1, "promise failed correctly");
    });
});

test("ember-timed-promise fails when timed out - fail", () => {
  expect(1);
  let defaultTime = 10;
  let failingTime = 20;
  let testPromise = new Ember.RSVP.Promise((res)=>{setTimeout(res, failingTime);});
  return new TimedPromise(defaultTime, testPromise).then((value) => {
      ok(false, "This success shouldn't be called");
    }, (reason) => {
      ok(reason["message"].indexOf("timer exceeded") !== -1, "promise failed correctly");
  });
});

test("ember-timed-promise succeeds before timingOut", () => {
  expect(2);
  let defaultTime = 200;
  let succeedingTime = 10;
  let testPromise = new Ember.RSVP.Promise((res) => {
    Ember.run.later(res, succeedingTime);
  });
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

test("ember-timed-promises can be nested", () => {
   expect(2);
   let defaultTime = 1000;
   let succeedingTime = 10;
   let testPromise = new Ember.RSVP.Promise((res) => {
      res(ok(true, "it called nested"));
   });
   let testTimedPromise = new TimedPromise(succeedingTime, testPromise);

   return new TimedPromise(defaultTime * 2, testTimedPromise).then(() => {
      ok(true, "It called outer");
   });
});

test("ember-timed-promises accepts custom message", () => {
  expect(1);
  let defaultTime = 20;
  let succeedingTime = 100;
  let customReason = "custom reason";
  let testPromise = new Ember.RSVP.Promise((res) => {
    Ember.run.later(res, succeedingTime);
  });
  return new TimedPromise(defaultTime, testPromise, customReason).catch((reason) => {
      equal(reason.message, customReason, "Using Custom Error Message");
    });
});
