var OAuth = require('oauth');

exports.OAuthValidator = function(requestUrl, accessUrl, consumerKey, consumerSecret, version, authorize_callback, signatureMethod, nonceSize, customHeaders) {
    
    this.oauth = new OAuth.OAuth(
        requestUrl,
        accessUrl,
        consumerKey,
        consumerSecret,
        version,
        authorize_callback,
        signatureMethod,
        nonceSize,
        customHeaders
    );

    // Overload timestamp/nonce getters as they'll need to match the client values
    this.oauth._getTimestamp = function() {
        return this.timestamp;
    };

    this.oauth._getNonce = function(nonceSize) {
        return this.nonce;
    };
};

/**
 * Validate an Oauth request authorization signature
 */
exports.OAuthValidator.prototype.isValid = function(fullUrl, userKey, userSecret, httpRequestMethod, authString) {
    var authParams = this.getAuthParams(authString);

    if (authParams == false) {
        return false;
    }

    var clientOauthSignature = this.oauth._decodeData(authParams.oauth_signature);

    this.oauth.nonce = authParams.oauth_nonce;
    this.oauth.timestamp = authParams.oauth_timestamp;

    var preparedParams = this.oauth._prepareParameters(userKey, userSecret, httpRequestMethod, fullUrl, {});
    var serverOauthSignature = null;

    for (var i = 0 ; i < preparedParams.length; i++) {
        if (preparedParams[i][0] == 'oauth_signature') {
            serverOauthSignature = preparedParams[i][1];
        }
    }

    return (clientOauthSignature == serverOauthSignature);
};

/**
 * Simple check to make sure the auth header is OAuth
 */
exports.OAuthValidator.prototype.isAuthStringValid = function(authString) {
    var authParts = authString.split(' ');

    return (authParts[0] == 'OAuth');
};

/**
 * Parameterize the authorizaion string
 */
exports.OAuthValidator.prototype.getAuthParams = function(authString) {

    if (! this.isAuthStringValid(authString)) {
        return false;
    }

    var authParts = authString.split(' ');

    // parse Params
    var parseParams = (authParts[1].replace(/\"/g, '').split(',').map(
        function (part) {
            return part.split('=')
        })
    );

    var authParams = {};

    for (var i in parseParams) {
        authParams[parseParams[i][0]] = parseParams[i][1];
    }

    return authParams;
};