const express = require('express');
const actionsRouter = require('./actions-router.js');
const projectRouter = require('./project-router');
const server = express();

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectRouter);

module.exports = server

