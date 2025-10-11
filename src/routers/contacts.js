import express from 'express';

import {
  getContactsController,
  getContactsControllerById,
  postContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', getContactsControllerById);
router.post('/', ctrlWrapper(postContactController));
router.patch('/:contactId', patchContactController);
router.delete('/:contactId', deleteContactController);

export default router;
