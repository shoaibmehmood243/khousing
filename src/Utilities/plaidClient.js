const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': '645ba48a0c0d250013a7855f',
            'PLAID-SECRET': '9af27831a83f3d72f7aead78aef311',
        },
    },
});

const plaidClient = new PlaidApi(configuration);

module.exports = plaidClient;