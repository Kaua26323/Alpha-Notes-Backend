"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const RegisterUserController_1 = require("./controllers/user/RegisterUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const CreateNewTaskController_1 = require("./controllers/tasks/CreateNewTaskController");
const ListTasksController_1 = require("./controllers/tasks/ListTasksController");
const ChangeTaskPropsController_1 = require("./controllers/tasks/ChangeTaskPropsController");
const RemoveTaskController_1 = require("./controllers/tasks/RemoveTaskController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
//    User Routes
router.post("/register", new RegisterUserController_1.RegisterUserController().handle);
router.post("/login", new AuthUserController_1.AuthUserController().handle);
//    Task Routes
router.post("/newTask", isAuthenticated_1.isAuthenticated, new CreateNewTaskController_1.CreateNewTaskController().handle);
router.get("/listTasks", isAuthenticated_1.isAuthenticated, new ListTasksController_1.ListTasksController().handle);
router.patch("/upadateTask", isAuthenticated_1.isAuthenticated, new ChangeTaskPropsController_1.ChangeTaskPropsController().handle);
router.delete("/deleteTask/:id", isAuthenticated_1.isAuthenticated, new RemoveTaskController_1.RemoveTaskController().handle);
