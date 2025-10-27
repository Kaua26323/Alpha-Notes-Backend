import { prismaClient } from "../../prisma";

interface RemoveTaskRequest {
  taskId: string;
};

class RemoveTaskService {
  async execute({ taskId }: RemoveTaskRequest){
    const removed = await prismaClient.task.delete({
      where: {
        id: taskId,
      }
    });
    
    return removed;
  }
};


export { RemoveTaskService };