import { Router } from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { CreateTagController } from "./controllers/Tag/CreateTagController";
import { AuthenticateUserController } from "./controllers/Auth/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/Compliment/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/Compliment/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/Compliment/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/Tag/ListTagsController";
import { ListUsersController } from "./controllers/User/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const authenticateUserController = new AuthenticateUserController();

const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();

/**
 * Rotas de Usuários
 */
router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

/**
 * Rotas de TAG
 */
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

/**
 * Rota de Autenticação
 */
router.post("/login", authenticateUserController.handle);

/**
 * Rota de Elogios
 */
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.get("/compliments/users/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/compliments/users/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

export { router };