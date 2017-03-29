'use strict'
/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function success (data, options) {
  let req = this.req;
  let res = this.res;

  res.status(200);

  let toReturn = {};
  let url = req.url;
  if(!Array.isArray(data)) {
    toReturn = data;
  } else {
    const skip = req.param('skip') || 0
    const limit = req.param('limit') || 250
    if(url.indexOf('limit='+limit) === -1) {
      url += '&limit='+limit
    }
    if(url.indexOf('skip=') === -1) {
      url += '&skip='+skip
    }
    toReturn = {
      skip: parseInt(skip),
      limit: parseInt(limit)
    }
    if(data.length > 0) {
      if(skip > 0) {
        let temp = url;
        let newSkip = skip;
        if(data.length < limit) {
          newSkip = skip-limit;
        }
        if(newSkip < 0) {
          newSkip = skip-data.length;
        }
        if(newSkip < limit || newSkip < 0) {
          newSkip = 0;
        }
        toReturn.previous = temp.replace('skip='+skip, 'skip='+newSkip)
      }
      if(!(data.length < limit)) {
        let temp = url;
        let newSkip = parseInt(skip)+parseInt(data.length);
        toReturn.next = temp.replace('skip='+skip, 'skip='+newSkip)
      }
    }
    toReturn.results = data;
  }

  return res.jsonx(toReturn);
};
