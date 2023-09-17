import { HttpError } from "../helpers/index.js";
import contactsService from "../models/contacts/contacts.js";
import contactAddSchema from "../schemas/contact-schemas.js";




const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
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

  } catch (error) {
    next(error);
  }
}

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
