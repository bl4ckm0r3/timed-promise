import Ember from 'ember';

export default class TimedPromise {
  constructor(duration, promise, message="%@ms timer exceeded") {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let timer = Ember.run.later(() => {
        return reject(new Error(Ember.String.fmt(message, duration)));
      }, duration);
      let eventually = promise["finally"] ? "finally" : "always";
      return promise.then(resolve, reject)[eventually](() => {
        Ember.run.cancel(timer);
      });
    });
  }
}
