import { Router } from "express";
import { RegisterUserController } from "./controllers/user/RegisterUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateNewTaskController } from "./controllers/tasks/CreateNewTaskController";
import { ListTasksController } from "./controllers/tasks/ListTasksController";
import { ChangeTaskPropsController } from "./controllers/tasks/ChangeTaskPropsController";
import { RemoveTaskController } from "./controllers/tasks/RemoveTaskController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//    User Routes
router.post("/register", new RegisterUserController().handle);
router.post("/login", new AuthUserController().handle);

//    Task Routes
router.post("/newTask",  isAuthenticated, new CreateNewTaskController().handle);
router.get("/listTasks", isAuthenticated, new ListTasksController().handle);
router.patch("/upadateTask", isAuthenticated, new ChangeTaskPropsController().handle);
router.delete("/deleteTask/:id", isAuthenticated, new RemoveTaskController().handle);

export { router };

