import connectDB from "../../../lib/dbConnect";
import User from "../../../models/User.js";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { nome, email, senha } = req.body;

  switch (method) {
    case "POST":
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: "Usuário já cadastrado" });
        }
        user = new User({ nome, email, senha });

        await user.save();
        res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
      } catch (err) {
        res.status(500).json({ msg: `Erro no servidor, ${err}` });
      }
      break;
    case "GET":
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ msg: `Erro no servidor, ${err}` });
      }
      break;
    default:
      res.status(405).json({ msg: "Método Inválido" });
      break;
  }
}
