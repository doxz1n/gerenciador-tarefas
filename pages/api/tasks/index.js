import connectDB from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import Task from "../../../models/Task";
import User from "../../../models/User";
import { jwtSecret } from "../../../lib/config";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "Acesso Negado" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    switch (method) {
      case "GET":
        try {
          const userTasks = await Task.find({ userId });
          res.status(200).json({ tasks: userTasks });
        } catch (err) {
          res.status(401).json({ msg: "Token inválido" });
        }
        break;

      case "POST":
        const { titulo, descricao } = req.body;
        if (!titulo || !descricao) {
          return res
            .status(400)
            .json({ msg: "Todos os campos são obrigatórios" });
        }

        try {
          const userExists = await User.findById(userId);
          if (!userExists) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
          }

          const task = new Task({ userId, titulo, descricao });
          await task.save();
          res.status(201).json({ msg: "Tarefa cadastrada com Sucesso" });
        } catch (err) {
          res.status(500).json({ msg: `Erro no servidor, ${err.message}` });
        }
        break;

      default:
        res.status(405).json({ msg: "Método Inválido" });
        break;
    }
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
}
