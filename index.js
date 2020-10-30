require('dotenv').config();
const server = require('./api/server');
const PORT = process.env.PORT || 3000

server.listen(PORT, (req, res) => {
    console.log('API is up and running at ' + PORT)
});