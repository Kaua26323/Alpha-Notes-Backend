import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";
import { CatchErrors } from "./errors/catchErrors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Error🔥", err);

  if(err instanceof CatchErrors){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  };

  if(err instanceof Error){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  };

  return res.status(500).json("Server internal error...");
  
})


app.listen(3333, () => console.log("Servido rodando em 3333"));

