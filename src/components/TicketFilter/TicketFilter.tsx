import Styles from "./TicketFilter.module.css";

// TICKET FILTER E FORMS
function TicketFilter() {
  return (
    <div className={Styles.Principal}>
      <img className={Styles.icaixa} src="https://i.imgur.com/YhNdgPN.png" />
      <input
        type="text"
        className={Styles.Entrada}
        placeholder="Insira seu Próximo Produto :)"
      />
      <img src="https://i.imgur.com/l4PnNl4.png" className={Styles.Icone} />
      <select>
        <option value="hardware">HARDWARE</option>
        <option value="software">SOFTWARE</option>
        <option value="rede">REDE</option>
      </select>
      <input type="radio" checked />
      <label className={Styles.baixa}>BAIXA</label>

      <input type="radio" />
      <label className={Styles.Media}>MÉDIA</label>

      <input type="radio" />
      <label className={Styles.alta}>ALTA</label>
      <br></br>
      <label className={Styles.descricaos}>Descrição:</label>
      <br></br>
      <textarea className={Styles.Textareas}></textarea>
    </div>
  );
}

export default TicketFilter;
