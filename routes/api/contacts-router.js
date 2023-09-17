import express from "express";
// import contactsService from "../../models/contacts/contacts.js";
// import Joi from "joi";
// import { HttpError } from "../../helpers/index.js";
// import contactAddSchema from "../../schemas/contact-schemas.js";
import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

// const contactAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),

// });



contactsRouter.get("/", contactsController.getAll);



contactsRouter.get("/:contactId", contactsController.getById);


contactsRouter.post("/", contactsController.add);


contactsRouter.delete("/:contactId", contactsController.deleteById);



contactsRouter.put("/:contactId", contactsController.updateById);



export default contactsRouter;
