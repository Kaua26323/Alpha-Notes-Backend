import { CatchErrors } from "../../errors/catchErrors";
import { prismaClient } from "../../prisma";

interface ChangeTaskRequest {
  id:           string;
  task?:        string;
  date?:        Date;
  isComplete?:  boolean;
  description?: string;
}

class ChangeTaskPropsService{
  async execute({id, task, date, description, isComplete}: ChangeTaskRequest){
    const hasTask = await prismaClient.task.findUnique({
      where: {
        id: id,
      }
    });

    if(!hasTask){
      throw new CatchErrors("Tarefa não encontrada", 400);
    };

    const upadatedTask = await prismaClient.task.update({
      where: {
        id: id,
      },
      data: {
        task: task ?? hasTask.task,
        date: date ?? hasTask.date,
        isComplete:  isComplete ?? hasTask.isComplete,
        description: description ?? hasTask.description
      }
    });
    
    return upadatedTask;
  }
}

export { ChangeTaskPropsService };