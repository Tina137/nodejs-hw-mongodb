import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const postContact = async (payload) => {
  const newContact = await Contact.create(payload);
  return newContact;
};

export const updateContact = async (contactId, payload) => {
  const contact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};
