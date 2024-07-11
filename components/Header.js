import styles from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../public/logo.jpg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header
      className={`${styles.header} d-flex justify-content-between align-items-center`}
    >
      <div className={styles.headerLogo}>
        <a href="https://www.tasknext.com">
          <Image src={logo} alt="Logo" />
        </a>
      </div>
      <div
        className={`${styles.headerTitulo} mx-auto text-white text-center font-weight-bold`}
      >
        TaskNext
      </div>
      <div className={`${styles.headerLinks} d-flex align-items-center`}>
        <a href="https://www.tasknext.com/login">Login</a>
        <a href="https://www.tasknext.com/signup">Cadastro</a>
      </div>
    </header>
  );
};

export default Header;
