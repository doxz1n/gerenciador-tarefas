import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const buscaTarefas = async () => {
      try {
        const res = await fetch(`/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTarefas(data.tasks);
          setCarregando(false);

          if (data.tasks.length === 0) {
            router.push(`/tarefas/nova-tarefa`);
          }
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
        setCarregando(false);
      }
    };

    buscaTarefas();
  }, [router]);

  const handleNovaTarefa = () => {
    router.push("/tarefas/nova-tarefa");
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1>Tarefas</h1>
        <button className="btn btn-primary mb-3" onClick={handleNovaTarefa}>
          Criar uma Nova Tarefa
        </button>
        {carregando ? (
          <p>Carregando Informações...</p>
        ) : (
          <ul className="list-group">
            {tarefas.map((task) => (
              <li key={task._id} className="list-group-item">
                <h5>{task.titulo}</h5>
                <p>{task.descricao}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
