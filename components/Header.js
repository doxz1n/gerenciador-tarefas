import styles from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../public/logo.jpg";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
      </div>
      <Link className={styles.headerTitulo} href="/">
        TaskNext
      </Link>
      <div className={styles.headerLinks}>
        <Link href="/login">Login</Link>
        <Link href="/cadastro">Cadastro</Link>
      </div>
    </header>
  );
};

export default Header;
