const PORT = 3000
const server = require('./api/server');

server.listen(PORT, (req, res) => {
    console.log('API is up and running at' + PORT)
});