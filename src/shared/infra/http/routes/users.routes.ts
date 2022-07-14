import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();
const uploadAvatar = multer(upload.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticate,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
