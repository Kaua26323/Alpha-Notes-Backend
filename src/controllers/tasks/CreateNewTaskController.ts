import { Request, Response } from "express";
import { CreateNewTaskService } from "../../services/tasks/CreateNewTaskService";

class CreateNewTaskController {
  async handle(req: Request, res: Response){
    const {userId, task,  date, isComplete, description} = req.body;

    const createNewTaskService = new CreateNewTaskService();

    const newTask = await createNewTaskService.execute({
      task,
      date,
      userId,
      isComplete,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Tarefa criada com sucesso!",
      task: newTask,
    });
  };
};

export { CreateNewTaskController };