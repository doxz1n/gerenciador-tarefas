import bcrypt from "bcryptjs";
import { jwtSecret, jwtExpiresIn } from "../../../lib/config.js";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/dbConnect.js";
import User from "../../../models/User.js";

export default async function handler(req, res) {
  // Conecta ao banco de dados
  await connectDB();

  const { method } = req;

  // Verifica se o método é POST
  if (method !== "POST") {
    return res.status(405).json({ msg: "Método invalido" });
  }

  // Extrai email e senha do corpo da requisição
  const { email, senha } = req.body;

  try {
    // Procura usuário pelo email
    const user = await User.findOne({ email });

    // Se usuário não encontrado, retorna erro 400
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    // Verifica se a senha é válida
    const senhaValida = await bcrypt.compare(senha, user.senha);

    // Se senha inválida, retorna erro 400
    if (!senhaValida) {
      return res.status(400).json({ msg: "Senha inválida" });
    }

    // Gera token JWT com ID do usuário
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
    const id = user._id;
    // Retorna token com status 200
    res.status(200).json({ token, id });
  } catch (error) {
    // Retorna erro interno com status 500
    res.status(500).json({ msg: error });
  }
}
