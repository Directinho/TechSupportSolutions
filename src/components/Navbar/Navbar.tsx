import Styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={Styles.Navbar}>
      <img src="https://i.imgur.com/y0j2vgz.png" className={Styles.logo}></img>
      <h4 className={Styles.Titulo}>TechSupport Solutions</h4>
      <a href="/novo">
        <img
          src="https://i.imgur.com/559iF7u.png"
          className={Styles.Create}
        ></img>
      </a>
    </div>
  );
}

export default Navbar;
