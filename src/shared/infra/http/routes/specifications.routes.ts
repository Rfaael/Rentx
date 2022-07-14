import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRoutes };
