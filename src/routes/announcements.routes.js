import express from "express";
import * as announcementsController from "../controllers/announcements.controller.js";
import * as announcementsValidator from "../validators/announcements.validator.js";

const router = express.Router();

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     description: Retrieve a list of all announcements with optional filtering and sorting
 *     tags: [Announcements]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search string to filter announcements by title
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort order - newest (default) or oldest
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination (default 1)
 *     responses:
 *       200:
 *         description: Successfully retrieved list of announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *       400:
 *         description: Validation error in query parameters
 */
router.get(
  "/",
  announcementsValidator.getAnnouncementsValidator,
  announcementsController.getAllAnnouncements,
);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get announcement by ID
 *     description: Retrieve a specific announcement by its unique identifier
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error - invalid ID format
 *       404:
 *         description: Announcement not found
 */
router.get(
  "/:id",
  announcementsValidator.getAnnouncementValidator,
  announcementsController.getAnnouncementById,
);

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a new announcement
 *     description: Create a new announcement with the provided details
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - category
 *               - contactInfo
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *                 description: The announcement title
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 description: The announcement description
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 exclusiveMinimum: true
 *                 description: The item price
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *                 description: The announcement category
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *                 description: Contact information (phone or email)
 *     responses:
 *       201:
 *         description: Successfully created announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error in request body
 */
router.post(
  "/",
  announcementsValidator.createAnnouncementValidator,
  announcementsController.createAnnouncement,
);

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Update an announcement
 *     description: Update an existing announcement by its ID with the provided details
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *                 description: The announcement title
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 description: The announcement description
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 exclusiveMinimum: true
 *                 description: The item price
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *                 description: The announcement category
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *                 description: Contact information (phone or email)
 *     responses:
 *       200:
 *         description: Successfully updated announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error in request body or parameters
 *       404:
 *         description: Announcement not found
 */
router.patch(
  "/:id",
  announcementsValidator.updateAnnouncementValidator,
  announcementsController.updateAnnouncement,
);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an announcement
 *     description: Delete an announcement by its ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The announcement ID
 *     responses:
 *       204:
 *         description: Successfully deleted announcement
 *       400:
 *         description: Validation error - invalid ID format
 *       404:
 *         description: Announcement not found
 */
router.delete(
  "/:id",
  announcementsValidator.deleteAnnouncementValidator,
  announcementsController.deleteAnnouncement,
);

export default router;
