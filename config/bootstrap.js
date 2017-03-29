/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  function ValidationError(message) {
    this.name = 'ValidationError';
    this.message = message;
    this.code = 'E_VALIDATION';
    this.stack = (new Error()).stack;
  }
  ValidationError.prototype = new Error;
  sails.ValidationError = ValidationError;

  function AuthError(message) {
    this.name = 'AuthError';
    this.message = message;
    this.code = 'E_AUTH';
    this.status = 403;
    this.stack = (new Error()).stack;
  }
  AuthError.prototype = new Error;
  sails.AuthError = AuthError;

  function ServerError(message) {
    this.name = 'ServerError';
    this.message = message;
    this.code = 'E_SERVER';
    this.stack = (new Error()).stack;
    this.status = 500;
  }
  ServerError.prototype = new Error;
  sails.ServerError = ServerError;

  function RequestError(message) {
    this.name = 'RequestError';
    this.message = message;
    this.code = 'E_REQUEST';
    this.stack = (new Error()).stack;
    this.status = 400;
  }
  RequestError.prototype = new Error;
  sails.RequestError = RequestError;

  function NotFoundError(message) {
    this.name = 'NotFoundError';
    this.message = message;
    this.code = 'E_NOTFOUND';
    this.stack = (new Error()).stack;
    this.status = 404;
  }
  NotFoundError.prototype = new Error;
  sails.NotFoundError = NotFoundError;

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
