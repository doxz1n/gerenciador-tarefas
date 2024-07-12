import connectDB from "../../../lib/dbConnect";
import User from "../../../models/User.js";

export default async function handler(request, response) {
  await connectDB();

  const { method } = request;
  const { nome, email, senha } = request.body;

  switch (method) {
    case "POST":
      try {
        let user = await User.findOne({ email });
        if (user) {
          return response.status(400).json({ msg: "Usuário já cadastrado" });
        }
        user = new User({ nome, email, senha });

        await user.save();
        response.status(201).json({ msg: "Usuário cadastrado com sucesso" });
      } catch (err) {
        response.status(500).json({ msg: `Erro no servidor, ${err}` });
      }
      break;
    default:
      response.status(405).json({ msg: "Método Inválido" });
      break;
  }
}
