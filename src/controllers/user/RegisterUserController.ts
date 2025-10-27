import { Request ,Response } from "express";
import { RegisterUserService } from "../../services/user/RegisterUserService";

class RegisterUserController {
  async handle(req: Request, res: Response){
    const { name, email, password } = req.body; 
    console.log("Nome", name);
    console.log("email",email);
    console.log("password", password);

    const registerUserService = new RegisterUserService();

    const newUser = await registerUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso.",
      user: newUser,
    });
  }
};

export { RegisterUserController };