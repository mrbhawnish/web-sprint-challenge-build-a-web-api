const express = require("express");
const ProjectDB = require("../data/helpers/projectModel.js");
const ActionsDB = require("../data/helpers/actionModel.js");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  ActionsDB.get()
    .then((actions) => {
      if (!actions.length) {
        res.status(404).json({ message: "oops! No actions found." });
      }
      res.status(200).json(actions);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong, try again later" });
    });
});

router.get("/:id", (req, res) => {
  ActionsDB.get(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "No data actions found for the current ID." });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong, try again later" });
    });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const newAction = { project_id: id, ...req.body };
  ProjectDB.get(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "There's no project with the specified ID" });
      } else {
        if (!req.body.description || !req.body.notes) {
          return res.status(400).json({
            message: "The request does not include any description or notes",
          });
        }
        ActionsDB.insert(newAction)

          .then((action) => {
            res.status(201).json(action);
          })
          .catch((error) => {
            res.status(500).json({
              errorMessage: "Something went wrong inside, try again later",
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "Something went wrong outside, try again later",
      });
    });
});

router.put("/:id", (req, res) => {
  const updatedAction = { ...req.body };
  ActionsDB.get(req.params.id).then((data) => {
    if (!data) {
      res
        .status(404)
        .json({ message: "No action found with the specified ID" });
    } else {
      if (!req.body.description || !req.body.notes) {
        return res.status(400).json({
          message: "The request does not include any description or notes",
        });
      }
      ActionsDB.update(req.params.id, updatedAction)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(500).json({
            errorMessage: "Something went wrong outside, try again later",
          });
        });
    }
  });
});

router.delete("/:id", (req, res) => {
  ActionsDB.get(req.params.id).then((data) => {
    if (!data) {
      res
        .status(404)
        .json({ message: "No action found with the specified ID" });
    } else {
      ActionsDB.remove(req.params.id)
        .then((data) => {
          res.status(204).json(data);
        })
        .catch((error) => {
          res.status(500).json({
            errorMessage: "Something went wrong outside, try again later",
          });
        });
    }
  });
});
module.exports = router;
