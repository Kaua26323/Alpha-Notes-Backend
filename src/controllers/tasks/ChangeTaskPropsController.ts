import { Request, Response } from "express";
import { CatchErrors } from "../../errors/catchErrors";
import { ChangeTaskPropsService } from "../../services/tasks/ChangeTaskPropsService";

class ChangeTaskPropsController {
  async handle(req: Request, res: Response){
    const {id, task, date, isComplete, description} = req.body;

    if(!id || id === ""){
      throw new CatchErrors("Id invalido!", 400);
    }

    const changeTaskPropsService = new ChangeTaskPropsService();

    const upadatedTask = await changeTaskPropsService.execute({
      id: id,
      task: task ?? null,
      date: date ?? null,
      isComplete: isComplete ?? null,
      description: description ?? null,
    });

    return res.status(200).json(upadatedTask);
  }
}

export { ChangeTaskPropsController };

 