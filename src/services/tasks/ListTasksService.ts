import { prismaClient } from "../../prisma";

interface ListTasksRequest{ 
  userId: string;
}

class ListTasksService {
  async execute({ userId }: ListTasksRequest){
    const list = await prismaClient.task.findMany({
      where: {
        userId: userId,
      }
    });

    return list;
  }
}

export { ListTasksService };