import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        <span>Developed with ❤️ by </span>
        <a
          href="https://github.com/ShubhamSj07"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shubham Jadhav
        </a>
      </div>
    </div>
  );
}

export default Footer;
