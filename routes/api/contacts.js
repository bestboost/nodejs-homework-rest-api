import express from "express";
import {
  listContacts,
  // getById,
  // removeContact,
  // addContact,
  // updateContact,
} from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

router.post("/", async (req, res, next) => {
  res.json(contacts[0]);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

router.put("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

export default router;
