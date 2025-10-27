import { CatchErrors } from "../../errors/catchErrors";
import { prismaClient } from "../../prisma";

interface CreateNewTaskRequest{
  task:         string;
  date:         string;
  userId:       string;
  isComplete:   string;
  description?: string;
}

class CreateNewTaskService{
  async execute({task, date, userId, isComplete, description}: CreateNewTaskRequest){
    const hasTask = await prismaClient.task.findFirst({
      where: {
        task: task
      }
    });

    if(hasTask){
      throw new CatchErrors("Essa tarefa já existe", 400);
    };

    const newTask = await prismaClient.task.create({
      data:{ 
        userId: userId,
        task: task,
        date: date,
        isComplete: false,
        description: description ?? "",
      }
    });

    return newTask;
  }
};

export { CreateNewTaskService };