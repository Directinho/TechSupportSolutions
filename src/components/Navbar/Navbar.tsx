import Styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={Styles.Navbar}>
      <a href="/" className={Styles.brand}>
        <img
          src="https://i.imgur.com/y0j2vgz.png"
          className={Styles.logo}
          alt="Logo TechSupport"
        />

        <h4 className={Styles.Titulo}>TechSupport Solutions</h4>
      </a>

      <a href="/novo" className={Styles.createLink}>
        <img
          src="https://i.imgur.com/559iF7u.png"
          className={Styles.Create}
          alt="Criar novo"
        />
      </a>
    </div>
  );
}

export default Navbar;
