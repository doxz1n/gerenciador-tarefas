import { use, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Login.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import bcrypt from "bcryptjs";
import * as Yup from "yup";

function Empty() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
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

    const senhacripto = await bcrypt.hash(valores.senha, 10);

    const res = await fetch("/api/users/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: valores.email,
        senha: senhacripto,
      }),
    });

    if (res.ok) {
      setSucesso("Login com sucesso");
    } else {
      const data = await res.json();
      setErro(data.msg);
    }
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
                <label for="Email" class="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="nome@dominio.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div class="mb-3">
                <label for="senha" class="form-label">
                  Senha
                </label>
                <Field
                  type="password"
                  class="form-control"
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
                Entras
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}

export default Empty;
