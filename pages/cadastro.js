import Header from "../components/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer"
import styles from "../styles/CadastroUsr.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Cadastro() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const router = useRouter();

  const valoresIniciais = {
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  };

  const validacaoSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    senha: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Campo obrigatório"),
    confirmaSenha: Yup.string()
      .oneOf([Yup.ref("senha"), null], "As senhas não são iguais")
      .required("Campo obrigatório"),
  });

  const handleSubmit = async (valores, { setSubmitting }) => {
    setErro("");
    setSucesso("");

    const senhacripto = await bcrypt.hash(valores.senha, 10);

    const res = await fetch("/api/users/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: valores.nome,
        email: valores.email,
        senha: senhacripto,
      }),
    });

    if (res.ok) {
      setSucesso(
        "Usuário registrado com sucesso, redirencionando para página de login"
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      const data = await res.json();
      setErro(data.msg);
    }

    setSubmitting(false);
  };

  return (
    <>
      <Header></Header>
      <div className={`${styles.body} shadow`}>
        <div className={styles.hero}>
          <h2> Cadastro </h2>
        </div>
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}
        {sucesso && (
          <div className="alert alert-success" role="alert">
            {sucesso}
          </div>
        )}
        <Formik
          initialValues={valoresIniciais}
          validationSchema={validacaoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className="mb-3">
                <label for="nome" className="form-label">
                  Nome Completo
                </label>
                <Field
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Nome Completo"
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="email" className="form-label">
                  E-mail
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="nome@dominio.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="nome" className="form-label">
                  Senha
                </label>
                <Field
                  type="password"
                  name="senha"
                  className="form-control"
                  placeholder="Senha (Mínimo de 6 caracteres)"
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="nome" className="form-label">
                  Confirmar Senha
                </label>
                <Field
                  type="password"
                  name="confirmaSenha"
                  className="form-control"
                  placeholder="Confirmar Senha"
                />
                <ErrorMessage
                  name="confirmaSenha"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Registrar-se
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Cadastro;
