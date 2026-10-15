import Styles from "./TicketFilter.module.css";

function TicketFilter() {
  return (
    <div className={Styles.Principal}>
      <div className={Styles.Filtros}>
        <div className={Styles.Produto}>
          <img
            className={Styles.icaixa}
            src="https://i.imgur.com/zY0QLNe.gif"
            alt="Produto"
          />

          <input
            type="text"
            className={Styles.Entrada}
            placeholder="Insira seu Próximo Produto :)"
          />

          <img
            src="https://i.imgur.com/l4PnNl4.png"
            className={Styles.Icone}
            alt="Filtrar"
          />

          <select className={Styles.Select} defaultValue="hardware">
            <option value="hardware">HARDWARE</option>
            <option value="software">SOFTWARE</option>
            <option value="rede">REDE</option>
          </select>
        </div>

        <div className={Styles.Prioridades}>
          <label className={`${Styles.Opcao} ${Styles.baixa}`}>
            <input
              type="radio"
              name="prioridade"
              value="baixa"
              defaultChecked
            />
            <span>BAIXA</span>
          </label>

          <label className={`${Styles.Opcao} ${Styles.Media}`}>
            <input type="radio" name="prioridade" value="media" />
            <span>MÉDIA</span>
          </label>

          <label className={`${Styles.Opcao} ${Styles.alta}`}>
            <input type="radio" name="prioridade" value="alta" />
            <span>ALTA</span>
          </label>
        </div>
      </div>

      <div className={Styles.Descricao}>
        <label htmlFor="descricao" className={Styles.descricaos}>
          Descrição:
        </label>

        <textarea
          id="descricao"
          className={Styles.Textareas}
          placeholder="Descreva o problema..."
        />
      </div>
    </div>
  );
}

export default TicketFilter;
