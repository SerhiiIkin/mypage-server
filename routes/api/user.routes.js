import Router from "express";

import {
    createUser,
    getAllUsers,
    deleteUser,
    updateTokenExpiryUser,
    updateMessagesUser,
    deleteMessage,
} from "../../controllers/users.js";
import { checkUsername } from "../../middlewares.js";

const route = new Router();

route.post("/", checkUsername, createUser);
route.get("/", getAllUsers);
route.put("/token/:id", updateTokenExpiryUser);
route.put("/messages/:id", updateMessagesUser);
route.delete("/messages/:id", deleteMessage);
route.delete("/:id", deleteUser);

export default route;
