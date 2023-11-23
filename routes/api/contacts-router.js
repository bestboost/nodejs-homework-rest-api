import express from "express";
import ctrl from "../../controllers/contacts.js";
import isValidId from "../../middleweares/isValidId.js";
import isEmptyBody from "../../middleweares/isEmptyBody.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  addSchema,
  contactFavoriteSchema,
} from "../../models/contact-schema.js";

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.addContact, validateBody(addSchema));

router.delete("/:id", isValidId, ctrl.removeContact);

router.put(
  "/:id",
  isEmptyBody,
  isValidId,
  ctrl.updateContact,
  validateBody(addSchema)
);

router.patch(
  "/:id/favorite",
  isEmptyBody,
  isValidId,
  ctrl.updateFavorite,
  validateBody(contactFavoriteSchema)
);

export default router;
