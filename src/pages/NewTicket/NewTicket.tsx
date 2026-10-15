import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./NewTicket.module.css";
import { newTicket } from "../../services/api";
import type { TicketFormData } from "../../models/Ticket";

function NewTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    category: "",
    Prioridades: "",
    status: "Aberto",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await newTicket({
        ...formData,
        status: formData.status ?? "Aberto",
      });
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "",
        status: "Aberto",
      });
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro ao criar o ticket. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.fundo}>
      <div className={Styles.container}>
        <h1 className={Styles.titulo}>Criar Novo Ticket</h1>

        {success && (
          <div className={Styles.sucesso}>Ticket criado com sucesso!</div>
        )}

        {error && <div className={Styles.erro}>{error}</div>}

        <form onSubmit={handleSubmit} className={Styles.formulario}>
          <div className={Styles.campo}>
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ex: Problema com impressora"
            />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Descreva o problema com detalhes..."
            />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="category">Categoria *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Rede">Rede</option>
              <option value="Acesso">Acesso / Login</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={Styles.campo}>
            <label htmlFor="priority">Prioridade *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a prioridade</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div className={Styles.campo}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Resolvido">Resolvido</option>
              <option value="Fechado">Fechado</option>
            </select>
          </div>

          <button type="submit" className={Styles.botao} disabled={loading}>
            {loading ? "Criando..." : "Criar Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTicket;
