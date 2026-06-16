import express from "express";
import * as announcementsController from "../controllers/announcements.controller.js";
import * as announcementsValidator from "../validators/announcements.validator.js";

const router = express.Router();

router.get(
  "/",
  announcementsValidator.getAnnouncementsValidator,
  announcementsController.getAllAnnouncements,
);

router.get(
  "/:id",
  announcementsValidator.getAnnouncementValidator,
  announcementsController.getAnnouncementById,
);

router.post(
  "/",
  announcementsValidator.createAnnouncementValidator,
  announcementsController.createAnnouncement,
);

router.patch(
  "/:id",
  announcementsValidator.updateAnnouncementValidator,
  announcementsController.updateAnnouncement,
);

router.delete(
  "/:id",
  announcementsValidator.deleteAnnouncementValidator,
  announcementsController.deleteAnnouncement,
);

export default router;
