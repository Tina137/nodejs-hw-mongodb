import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  postContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContactsController(req, res, next) {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContactsControllerById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function postContactController(req, res) {
  try {
    const newContact = await postContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const result = await deleteContact(contactId);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({ status: 200, message: 'Contact deleted successfully' });
}
