# node-oauth-validator

[![Build Status](https://travis-ci.org/blackstar257/node-oauth-validator.svg?branch=master)](https://travis-ci.org/blackstar257/node-oauth-validator)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/blackstar257/node-oauth-validator/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/blackstar257/node-oauth-validator/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/blackstar257/node-oauth-validator/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/blackstar257/node-oauth-validator/?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/57944319ad952900448ada5c/badge.svg)](https://www.versioneye.com/user/projects/57944319ad952900448ada5c)

Simple server side Oauth validation. We're talking one legged Oauth here.

## Installation

    $ npm install git://github.com/jschneider98/node-oauth-validator.git --save

## Usage

```javascript
var OAuthValidator = require('node-oauth-validator');

// Should be retrieved from request header
var authString = 'OAuth oauth_consumer_key="consumer_key",oauth_nonce="8OBpuvFSRwgdU7Q0oFkqa13XwGfGMXym",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1452891729",oauth_token="user_key",oauth_version="1.0A",oauth_signature="Qp6Q5fp2fJ6Y6SelcPGGK%2Fs%2FluI%3D"'

var requestUrl = 'http://localhost:3000';
var accessUrl = requestUrl;
var fullUrl = requestUrl + '/test/param_1=test';
var consumerKey = 'consumer_key';
var consumerSecret = 'consumer_secret';
var oauthVersion = '1.0A';
var signatureMethod = 'HMAC-SHA1';
var callback = null;

var httpRequestMethod = 'GET';
var userKey = 'user_key';
var userSecret = 'user_secret';

var oauthValidator = new OAuthValidator.OAuthValidator(
    requestUrl,
    accessUrl,
    consumerKey,
    consumerSecret,
    oauthVersion,
    callback,
    signatureMethod
);

var isValid = oauthValidator.isValid(
        fullUrl,
        userKey,
        userSecret,
        httpRequestMethod,
        authString
    );

console.log('isValid: ' + isValid);

```

## Tests

    $ npm test
