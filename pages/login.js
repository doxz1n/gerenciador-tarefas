import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Login.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

function Login() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const router = useRouter();

  const valoresIniciais = {
    email: "",
    senha: "",
  };

  const validacaoSchema = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = async (valores, { setSubmitting }) => {
    setErro("");
    setSucesso("");
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: valores.email,
        senha: valores.senha,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSucesso("Login com sucesso");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        router.push(`/tarefas?userId=${data.id}`);
      }, 2000);
    } else {
      setErro(data.msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.hero}>
          <h2> Login </h2>
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
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="nome@dominio.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <Field
                  type="password"
                  className="form-control"
                  name="senha"
                  placeholder="Digite sua senha"
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Entrar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}

export default Login;
