import express from "express";
import ctrl from "../../controllers/contacts-controller.js";
import isValidId from "../../middleweares/isValidId.js";
import isEmptyBody from "../../middleweares/isEmptyBody.js";
import authenticate from "../../middleweares/authenticate.js";
import validateBody from "../../decorators/validaterBody.js";
import { addSchema, contactFavoriteSchema } from "../../models/Contact.js";

const contactRouter = express.Router();

// contactRouter.use(authenticate);

contactRouter.get("/", ctrl.listContacts);

contactRouter.get("/:id", isValidId, ctrl.getById);

contactRouter.post("/", ctrl.addContact, validateBody(addSchema));

contactRouter.delete("/:id", isValidId, ctrl.removeContact);

contactRouter.put(
  "/:id",
  isEmptyBody,
  isValidId,
  ctrl.updateContact,
  validateBody(addSchema)
);

contactRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  isValidId,
  ctrl.updateFavorite,
  validateBody(contactFavoriteSchema)
);

export default contactRouter;
