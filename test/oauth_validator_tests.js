var should = require('chai').should();
var OAuthValidator = require('../lib/oauth_validator').OAuthValidator;

var authString = 'OAuth oauth_consumer_key="consumer_key",oauth_nonce="8OBpuvFSRwgdU7Q0oFkqa13XwGfGMXym",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1452891729",oauth_token="user_key",oauth_version="1.0A",oauth_signature="Qp6Q5fp2fJ6Y6SelcPGGK%2Fs%2FluI%3D"'

var requestUrl = 'http://localhost:3000';
var accessUrl = requestUrl;
var fullUrl = requestUrl + '/test/param_1=test';
var consumerKey = 'consumer_key';
var consumerSecret = 'consumer_secret';
var oauthVersion = '1.0A';
var signatureMethod = 'HMAC-SHA1';

var httpRequestMethod = 'GET';
var userKey = 'user_key';
var userSecret = 'user_secret';

var oauthValidator = new OAuthValidator(
    requestUrl,
    accessUrl,
    consumerKey,
    consumerSecret,
    oauthVersion,
    null,
    signatureMethod
);


describe('#OAuthValidator.isAuthStringValid()', function() {

    it('Test isAuthStringValid() is true', function() {
        oauthValidator.isAuthStringValid(authString).should.equal(true);
    });

    it('Test isAuthStringValid() is false', function() {
        oauthValidator.isAuthStringValid('bad string').should.equal(false);
    });
});

describe('#OAuthValidator.getAuthParams()', function() {

    it('Test getAuthParams() is false', function() {
        oauthValidator.getAuthParams('bad string').should.equal(false);
    });

    var authParams = oauthValidator.getAuthParams(authString);

    it('Test getAuthParams() is an object', function() {
        (authParams).should.be.a('object');
    });

    it('Test getAuthParams() has oauth_consumer_key property', function() {
        (authParams).should.have.property('oauth_consumer_key');
    });

    it('Test getAuthParams() has oauth_nonce property', function() {
        (authParams).should.have.property('oauth_nonce');
    });

    it('Test getAuthParams() has oauth_signature_method property', function() {
        (authParams).should.have.property('oauth_signature_method');
    });

    it('Test getAuthParams() has oauth_timestamp property', function() {
        (authParams).should.have.property('oauth_timestamp');
    });

    it('Test getAuthParams() has oauth_token property', function() {
        (authParams).should.have.property('oauth_token');
    });

    it('Test getAuthParams() has oauth_version property', function() {
        (authParams).should.have.property('oauth_version');
    });

    it('Test getAuthParams() has oauth_signature property', function() {
        (authParams).should.have.property('oauth_signature');
    });
});

describe('#OAuthValidator.isValid()', function() {

    it('Test isValid() is false', function() {
        oauthValidator.isValid(
            fullUrl,
            userKey,
            'bad_user_key',
            httpRequestMethod,
            {},
            authString
        ).should.equal(false);
    });

    it('Test isValid() is true', function() {
        oauthValidator.isValid(
            fullUrl,
            userKey,
            userSecret,
            httpRequestMethod,
            {},
            authString
        ).should.equal(true);
    });
});