const express = require("express");
const ProjectDB = require("../data/helpers/projectModel.js");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  ProjectDB.get()
    .then((projects) => {
      if (!projects.length) {
        res.status(404).json({ message: "oops! No projects found." });
      }
      res.status(200).json(projects);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong, try again later" });
    });
});

router.get("/:id", (req, res) => {
  ProjectDB.get(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "No projects found for the current ID." });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong, try again later" });
    });
});

router.get("/:id/actions", (req, res) => {
  ProjectDB.getProjectActions(req.params.id)
    .then((data) => {
      if (!data.length) {
        res
          .status(404)
          .json({ message: "No actions found for the current ID." });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong, try again later" });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;

  if (!req.body.description || !req.body.name) {
    res.status(400).json({ message: "Description or name is missing." });
  }
  ProjectDB.insert(newProject)

    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "Something went wrong inside, try again later",
      });
    });
});

router.put("/:id", (req, res) => {
  const updatedProject = req.body;
  ProjectDB.get(req.params.id).then((data) => {
    if (!data) {
      res
        .status(404)
        .json({ message: "No project found with the specified ID" });
    } else {
      if (!req.body.description || !req.body.name) {
        return res.status(400).json({
          message: "The request does not include any description or name",
        });
      }
      ProjectDB.update(req.params.id, updatedProject)
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
  ProjectDB.get(req.params.id).then((data) => {
    if (!data) {
      res
        .status(404)
        .json({ message: "No project found with the specified ID" });
    } else {
      ProjectDB.remove(req.params.id)
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

module.exports = router;
