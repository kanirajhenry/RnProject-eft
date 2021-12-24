import React, { Component } from 'react';
import Axios from 'axios';

const client = Axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  timeout: 10000,
});

/**
 * Request Wrapper with default success/error actions
 */
const httpRequest = async function (options) {

  const onSuccess = function (response) {
    console.log(options.url)
    console.debug('Request Successful!', response);
    return response.data;
  }

  const onError = function (error) {
    if (error.response) {
      console.warn('Status:', error.response.status);
    } else if (error.request) {
      // Server Error Like 404,500 Internal error //
       console.warn(error.request);
    }
    else {
      // Something else happened while setting up the request
      // triggered the error
    }
    // Server Error Like 404,500 Internal error //
    return Promise.reject(error.response || error.message || error.config || error.request);
  }

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
export { httpRequest, client };