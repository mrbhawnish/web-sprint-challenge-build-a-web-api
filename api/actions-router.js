const express = require('express');
const dbConfig = require('../data/dbConfig.js');
const ActionsDB = require('../data/helpers/actionModel.js');
const { route } = require('./server.js');
const router = express.Router();

router.use(express.json());

router.get("/", (req,res) => {
     ActionsDB.get()
     .then(actions => {
        if(!actions.length){
            res.status(404).json({message: "oops! No actions found."})
        }
        res.status(200).json(actions)
     } )
     .catch(error => {
         res.status(500).json({errorMessage: "Something went wrong, try again later"})
     })
});

router.get('/:id', (req,res) => {
    ActionsDB.get(req.params.id)
    .then(data => {
        if(!data){
            res.status(404).json({ message: "No data actions found for the current ID."})
        } 
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Something went wrong, try again later"})
    })
});

router.post("/:id", (req,res) => {
     const {id} = req.params;
     const newAction = {project_id: id, ...req.body}
     if(!id) {
         res.status(404).json({message: "current ID does not exist"})
     } else if(!req.body.notes || !req.body.description ){
        res.status(400).json({message: "The action post is incomplete"})
     } else {
          
     }
});



module.exports = router