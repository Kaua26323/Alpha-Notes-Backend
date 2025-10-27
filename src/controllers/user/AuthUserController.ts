import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response){
    const {email, password} = req.body;

    const authUserService = new AuthUserService();

    const authUser = await authUserService.execute({
      email,
      password,
    });
    
    return res.status(200).json({
      success: true,
      message: "Login feito com sucesso!",
      user: authUser,
    });
  }
}

export { AuthUserController };