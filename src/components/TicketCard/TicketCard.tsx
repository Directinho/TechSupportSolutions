import Styles from './TicketCard.module.css'

function TicketCard(){
    return(
    <div className={Styles.Principal}>
        <div className={Styles.Container}>
            <h2 className={Styles.Titulo}>Teclado</h2>
            <p className={Styles.Descricao}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis amet quas inventore impedit, mollitia voluptates aliquid sunt omnis laboriosam aut?</p>
                <p className={Styles.Categoria}>Categoria: <b>Periféricos</b></p>
                <p className={Styles.Status}>Status: <span className={Styles.Status_Valor}>Em_andamento</span></p>
                <div className={Styles.Prioridade}><b className={Styles.Prioridade_Valor}>Prioridade: </b><br /><b className={Styles.Status}><div className={Styles.Prioridade_Circulo}></div> </b>
                </div>
              </div>
    </div>       
    )
}

export default TicketCard;