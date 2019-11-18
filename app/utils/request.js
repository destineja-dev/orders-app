import 'whatwg-fetch';
import set from 'lodash/set';
import defaultsDeep from 'lodash/defaultsDeep';

const api = {
  base: 'http://localhost:5000/api',
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(endpoint, options) {
  const url = `${api.base}${endpoint}`;
  const defaults = {
    headers: {},
  };

  // use json for put/post
  if (
    options &&
    options.body &&
    /put|post/i.test(options.method) &&
    !/binary/i.test(endpoint)
  ) {
    defaults.headers['Content-Type'] = 'application/json';
    set(options, 'body', JSON.stringify(options.body));
  }

  return fetch(url, defaultsDeep({}, options, defaults))
    .then(response => checkStatus(response, options))
    .then(parseJSON);
}
