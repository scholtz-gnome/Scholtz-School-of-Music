const express = require("express");
const resourcesRouter = express.Router();
const resourcesController = require("../controllers/resourcesController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

resourcesRouter.get("/", resourcesController.resources_get);
resourcesRouter.get("/custom", resourcesController.custom_get);
resourcesRouter.get("/upload", resourcesController.upload_get);
resourcesRouter.post("/upload", upload.single("resource"), resourcesController.upload_post);
resourcesRouter.post("/download/:id", resourcesController.download_post);

module.exports = resourcesRouter;