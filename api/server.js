const express = require('express');
const actionsRouter = require('./actions-router.js');

const server = express();

server.use("/api/actions", actionsRouter);

module.exports = server

