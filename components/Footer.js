import Link from "next/link";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Footer.module.css";

function Footer() {
  const titulo = "TaskNext";
  return (
    <div className={styles.footer}>
      <footer>
        <span className="text-body-secondary">
          TaskNext por{" "}
          <Link href="https://github.com/doxz1n">
            Henrique Sanchez (doxz1n)
          </Link>
        </span>
        {/* <!-- Scripts --> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
      </footer>
    </div>
  );
}

export default Footer;
