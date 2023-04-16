const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()
const app = express();

const authRoutes = require('./src/Routes/auth.routes');
const propertyRoutes = require('./src/Routes/property.routes');
const userRoutes = require('./src/Routes/user.routes');
const portfolioRoutes = require('./src/Routes/portfolio.routes');

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