const { Client, Environment } = require('dwolla-v2');

// Dwolla configuration
const dwolla = new Client({
    key: 'PjpJGd6umDgteDbGTaEw5xhzI3qAIjH81Li0kx3th7gDVqecKi',
    secret: 'D0ArYufxD2rogiQZ7TmnYzGB8Vly2TSSOvSmREOb2axcpbI0oB',
    environment: 'sandbox', // Use Environment.Production for live environment
});

module.exports = dwolla;