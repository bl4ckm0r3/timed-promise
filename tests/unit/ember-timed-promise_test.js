import Ember from 'ember';

import {
  test
} from 'ember-qunit';

import TimedPromise from 'ember-timed-promise/timed-promise';


module('TimedPromise');

test("ember-timed-promise is thenable", function() {
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

test("ember-time-promise fails when timed out - catch", function() {
  expect(1);
  let defaultTime = 10;
  let failingTime = 20;
  let testPromise = new Ember.RSVP.Promise((res)=>{setTimeout(res, failingTime);});
  return new TimedPromise(defaultTime, testPromise).then(() => {
    ok(false, "This success shouldn't be called");
  }).catch(function(reason) {
      ok(reason["message"].indexOf("timer exceeded") !== -1, "promise failed correctly");
    });
});

test("ember-time-promise fails when timed out - fail", function() {
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

test("ember-time-promise succeeds before timingOut", function() {
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
