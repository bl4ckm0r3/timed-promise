import Ember from 'ember';

export default (duration, promise) => {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let timer = Ember.run.later(() => {
      return reject(new Error(Ember.String.fmt("%@ms timer exceeded", duration)));
    }, duration);
    return promise.then(resolve, reject).finally(()=>{
      Ember.run.cancel(timer);
    });
  });
};
