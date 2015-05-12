import Ember from 'ember';

export default (duration, promise) => {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let timer = Ember.run.later(() => {
      return reject(new Error(Ember.String.fmt("%@ms timer exceeded", duration)));
    }, duration);
    let eventually = promise["finally"] ? "finally" : "always";
    return promise.then(resolve, reject)[eventually](() => {
      Ember.run.cancel(timer);
    });
  });
};
