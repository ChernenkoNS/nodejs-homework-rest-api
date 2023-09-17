import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { HttpError } from "../helpers/index.js";

import contactsService from "../models/contacts/contacts.js";

import contactAddSchema from "../schemas/contact-schemas.js";

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);

  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactsService.updateContactById(contactId, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found111`);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
