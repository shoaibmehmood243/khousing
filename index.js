const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
dotenv.config()
const app = express();

const authRoutes = require('./src/Routes/auth.routes');
const propertyRoutes = require('./src/Routes/property.routes');
const userRoutes = require('./src/Routes/user.routes');
const portfolioRoutes = require('./src/Routes/portfolio.routes');
const leaseRoutes = require('./src/Routes/lease.routes');
const paymentRoutes = require('./src/Routes/payments.routes');
const billRoutes = require('./src/Routes/bill.routes');
const paymentMethodRoutes = require('./src/Routes/payment-method.routes');
const plaidClient = require('./src/Utilities/plaidClient');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Kulfi housing app working.')
})

app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);
app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/lease', leaseRoutes);
app.use('/payment', paymentRoutes);
app.use('/bill', billRoutes);
app.use('/payment-method', paymentMethodRoutes);

app.post('/create_link_token', async function (request, response) {
    const plaidRequest = {
        user: {
            client_user_id: 'user',
        },
        client_name: 'Plaid Test App',
        products: ['auth'],
        language: 'en',
        country_codes: ['US'],
    };
    try {
        const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
        response.json(createTokenResponse.data);
    } catch (error) {
        response.status(500).send("failure");
        // handle error
    }
});

app.post("/auth/plaid", async function(request, response) {
   try {
       const access_token = request.body.access_token;
       const plaidRequest = {
           access_token: access_token,
       };
       const plaidResponse = await plaidClient.authGet(plaidRequest);
       response.json(plaidResponse.data);
   } catch (e) {

       response.status(500).send("failed");
   }
});

app.post('/exchange_public_token', async function (
    request,
    response,
    next,
) {
    const publicToken = request.body.public_token;
    try {
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = plaidResponse.data.access_token;
        response.json({ accessToken });
    } catch (error) {
        response.status(500).send("failed");
    }
});

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.code === 401) {
        err.status = 401;
    }
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})