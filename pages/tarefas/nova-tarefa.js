import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function NovaTarefa() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const router = useRouter();

  const handleSubmit = async (valores, { setSubmitting }) => {
    setErro("");
    setSucesso("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Usuário não autenticado");
      return;
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: valores.titulo,
        descricao: valores.descricao,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSucesso("Tarefa criada com sucesso");
      setTimeout(() => {
        router.push("/tarefas");
      }, 2000);
    } else {
      const data = await res.json();
      setErro(data.msg);
    }

    setSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1>Criar uma nova tarefa</h1>
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
          initialValues={{ titulo: "", descricao: "" }}
          validationSchema={Yup.object({
            titulo: Yup.string().required("Campo obrigatório"),
            descricao: Yup.string().required("Campo obrigatório"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="titulo">Titulo</label>
                <Field type="text" name="titulo" className="form-control" />
                <ErrorMessage
                  name="titulo"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descricao">Descrição</label>
                <Field type="text" name="descricao" className="form-control" />
                <ErrorMessage
                  name="descricao"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Criar nova tarefa
              </button>
            </Form>
          )}
        </Formik>
        <Footer />
      </div>
    </>
  );
}
