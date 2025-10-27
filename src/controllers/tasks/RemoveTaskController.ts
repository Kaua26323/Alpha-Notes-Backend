import { Request, Response } from "express";
import { CatchErrors } from "../../errors/catchErrors";
import { RemoveTaskService } from "../../services/tasks/RemoveTaskService";

class RemoveTaskController {
  async handle(req: Request, res: Response){
    const taskId  = req.params.id;

    console.log(taskId);

    if(!taskId || taskId === ""){
      throw new CatchErrors("Id invalido", 400);
    };

    const removeTaskService = new RemoveTaskService();

    const deletedTask = await removeTaskService.execute({taskId});

    return res.status(200).json({
      success: true,
      message: "Tarefa deletada",
      removed: deletedTask ,
    });
  }
};

export { RemoveTaskController };