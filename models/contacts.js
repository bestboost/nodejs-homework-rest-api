import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const contactsPath = path.join(__dirname, "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  console.log("removeContact  index :", index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  console.log("removeContact  esult:", result);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  (contacts[index] = { id, ...body }),
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
