import { hash } from "bcryptjs";
import { CatchErrors } from "../../errors/catchErrors";
import { prismaClient } from "../../prisma";
import { sign } from "jsonwebtoken";

interface RegisterUserProps{
  name:     string;
  email:    string;
  password: string
}

class RegisterUserService {
  async execute({name, email, password}: RegisterUserProps){
    const emailAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      }
    });

    if(emailAlreadyExists){
      throw new CatchErrors("Esse usuário já existe...", 400);
    };

    const nameAlreadyExists = await prismaClient.user.findUnique({
      where: {
        name: name
      }
    });

    if(nameAlreadyExists){
      throw new CatchErrors("Esse nome já está sendo usado...", 400);
    };

    const passwordHash = await hash(password, 8);
    
    const user = await prismaClient.user.create({
      data:{
        name:     name,
        email:    email,
        password: passwordHash,
      },
      select:{
        id:    true,
        name:  true,
        email: true,
      }
    });

    const token = sign(
      {
        name:  user.name,
        email: user.email
      },
      process.env.JMT_SECRET as string,
      {
        subject:   user.id,
        expiresIn: "30d",
      }
    );

    return {
      id:    user.id,
      name:  user.name,
      email: user.email,
      token: token,
    };
  }
};

export { RegisterUserService };