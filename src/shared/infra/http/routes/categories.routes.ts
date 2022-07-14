import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategories/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategory/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCategoryController.handle
);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticate,
    ensureAdmin,
    importCategoryController.handle
);

export { categoriesRoutes };
