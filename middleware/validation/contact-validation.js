import contactSchemas from "../../schemas/contact-schemas.js";

import {validateBody} from "../../decorators/index.js";
import contactAddSchema from "../../schemas/contact-schemas.js";

const addContactValidate = validateBody(contactAddSchema);

export default {
    addContactValidate,
}