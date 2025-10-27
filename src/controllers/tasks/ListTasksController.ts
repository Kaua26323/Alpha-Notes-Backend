import { Request, Response } from "express";
import { ListTasksService } from "../../services/tasks/ListTasksService";
import { CatchErrors } from "../../errors/catchErrors";

class ListTasksController {
  async handle(req: Request, res: Response){
    const { userId } = req.query;

    if (typeof userId !== "string" || !userId) {
      throw new CatchErrors("ID invalido!", 400);
    };

    const listTasksService = new ListTasksService();

    const listTasks = await listTasksService.execute({
      userId
    });

    return res.status(200).json(listTasks);
  }
}

export { ListTasksController };