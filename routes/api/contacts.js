import express from "express";
import {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} from "../../controllers/contacts.js";
import { HttpError } from "../../helpers/HttpError.js";
import { addSchema, contactFavoriteSchema } from "../../models/contact.js";
import { isValidId } from "../../middleweares/isValidId.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isValidId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      const errorPath = error.details[0].context.label;
      const errorMessage = `missing required ${errorPath} field`;
      throw HttpError(400, errorMessage);
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isValidId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isValidId, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      const errorPath = error.details[0].context.label;
      const errorMessage = `missing required ${errorPath} field`;
      throw HttpError(400, errorMessage);
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch(":/id/favorite", isValidId, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      const errorPath = error.details[0].context.label;
      const errorMessage = `missing required ${errorPath} field`;
      throw HttpError(400, errorMessage);
    }

    const { id } = req.params;
    const result = await updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
