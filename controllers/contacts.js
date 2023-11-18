import { Contact } from "../models/contact.js";

export const listContacts = async (req, res) => {
  const data = await Contact.find();
  return data;
};

export const getById = async (id) => {
  const result = Contact.findById(id);
  return result || null;
};

export const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

export const removeContact = async (id) => {
  const result = Contact.findByIdAndDelete(id);
  return result;
};

export const updateContact = async (id, body) => {
  const result = Contact.findByIdAndUpdate(id, body);
  return result;
};
