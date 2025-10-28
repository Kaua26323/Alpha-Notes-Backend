import { compare } from "bcryptjs";
import { CatchErrors } from "../../errors/catchErrors";
import { prismaClient } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserProps{
  email:    string;
  password: string;
};

class AuthUserService{
  async execute({email, password}: AuthUserProps ){
    const user = await prismaClient.user.findUnique({
      where:{
        email: email,
      }
    });

    if(!user){
      throw new CatchErrors("E-mail/Senha incorretos", 400);
    };

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new CatchErrors("E-mail/Senha incorretos", 400);
    };

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
    } 
  }
}

export { AuthUserService };