import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = async (contactList) => await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

export async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  }
  
export async function getContactById(contactId) {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id == contactId); 
    return result || null; 
  }
  
export async function removeContact(contactId) {
    const contactList = await listContacts();
    const index = contactList.findIndex(item => item.id == contactId);

    if (index === -1) return null;

    const [result] = contactList.splice(index, 1);
    await updateContacts(contactList);
    return result;
  }
  
export async function addContact(name, email, phone) {
    const contactList = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }

    contactList.push(newContact);
    await updateContacts(contactList)
    return newContact;
  }
