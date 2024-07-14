import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Index.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {
  return (
    <>
      <Header></Header>
      <div className={`${styles.body} shadow`}>
        <section className={styles.hero}>
          <h2>Bem-vindo ao TaskNext</h2>
          <p>Gerencie suas tarefas de forma fácil e eficiente</p>
          <Link className="btn btn-primary" href="/login">
            Começar agora
          </Link>
        </section>
        <section className={styles.features}>
          <h2>Recursos</h2>
          <ul>
            <li>
              <i className="fas fa-list-ul"></i>
              <p>Crie e gerencie suas tarefas</p>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <p>Defina prazos e prioridades</p>
            </li>
            <li>
              <i className="fas fa-chart-bar"></i>
              <p>Visualize seu progresso</p>
            </li>
          </ul>
        </section>
        <section className={styles.callToAction}>
          <h2>Inscreva-se agora</h2>
          <p>E comece a gerenciar suas tarefas de forma eficiente</p>
          <Link className="btn btn-success btn-lg" href="/cadastro">
            Inscrever-se
          </Link>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Home;
