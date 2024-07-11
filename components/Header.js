import styles from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../public/logo.jpg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href="https://www.tasknext.com">
          <Image src={logo} alt="Logo" />
        </Link>
      </div>
      <div className={styles.headerTitulo}>TaskNext</div>
      <div className={styles.headerLinks}>
        <Link href="https://www.tLinksknext.com/login">Login</Link>
        <Link href="https://www.tasknext.com/signup">Cadastro</Link>
      </div>
    </header>
  );
};

export default Header;
