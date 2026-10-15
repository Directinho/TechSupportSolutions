import { createServer } from "node:http";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const dataFile = resolve(directory, "data.json");
const port = Number(process.env.API_PORT ?? 3001);
const maxBodySize = 1024 * 1024;

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

mkdirSync(directory, { recursive: true });
if (!existsSync(dataFile)) {
  writeFileSync(dataFile, JSON.stringify({ tickets: [] }, null, 2));
}

function readTickets() {
  const database = JSON.parse(readFileSync(dataFile, "utf8"));
  if (!database || !Array.isArray(database.tickets)) {
    throw new Error("O arquivo de dados da API está inválido.");
  }
  return database.tickets;
}

function writeTickets(tickets) {
  const temporaryFile = `${dataFile}.tmp`;
  writeFileSync(temporaryFile, `${JSON.stringify({ tickets }, null, 2)}\n`);
  renameSync(temporaryFile, dataFile);
}

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodySize) {
      throw new ApiError(413, "O corpo da requisição excede o limite permitido.");
    }
    chunks.push(chunk);
  }

  if (size === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ApiError(400, "O corpo da requisição não contém JSON válido.");
  }
}

function normalizeTicket(input, existing) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ApiError(400, "Os dados do chamado são inválidos.");
  }

  const ticket = {
    ...existing,
    title: input.title ?? existing?.title,
    description: input.description ?? existing?.description,
    category: input.category ?? existing?.category,
    priority: input.priority ?? existing?.priority,
    status: input.status ?? existing?.status ?? "Aberto",
  };
  const requiredFields = ["title", "description", "category", "priority"];
  if (
    requiredFields.some(
      (field) => typeof ticket[field] !== "string" || !ticket[field].trim(),
    )
  ) {
    throw new ApiError(
      400,
      "Título, descrição, categoria e prioridade são obrigatórios.",
    );
  }
  if (typeof ticket.status !== "string" || !ticket.status.trim()) {
    throw new ApiError(400, "O status do chamado é inválido.");
  }
  return ticket;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const ticketPath = url.pathname.match(/^\/tickets\/(\d+)$/);
    const ticketsPath = url.pathname === "/tickets";

    if (ticketsPath && request.method === "GET") {
      return sendJson(response, 200, readTickets());
    }

    if (ticketsPath && request.method === "POST") {
      const input = await readJson(request);
      const tickets = readTickets();
      const id = tickets.reduce((highest, ticket) => Math.max(highest, ticket.id), 0) + 1;
      const ticket = { id, ...normalizeTicket(input) };
      writeTickets([...tickets, ticket]);
      return sendJson(response, 201, ticket);
    }

    if (ticketPath) {
      const id = Number(ticketPath[1]);
      const tickets = readTickets();
      const index = tickets.findIndex((ticket) => ticket.id === id);
      if (index === -1) {
        throw new ApiError(404, "Chamado não encontrado.");
      }

      if (request.method === "GET") {
        return sendJson(response, 200, tickets[index]);
      }

      if (request.method === "PUT") {
        const input = await readJson(request);
        const ticket = {
          id,
          ...normalizeTicket(input, tickets[index]),
        };
        tickets[index] = ticket;
        writeTickets(tickets);
        return sendJson(response, 200, ticket);
      }

      if (request.method === "DELETE") {
        tickets.splice(index, 1);
        writeTickets(tickets);
        response.writeHead(204);
        return response.end();
      }
    }

    if (ticketsPath || ticketPath) {
      response.setHeader("Allow", ticketsPath ? "GET, POST" : "GET, PUT, DELETE");
      throw new ApiError(405, "Método não permitido.");
    }
    throw new ApiError(404, "Rota não encontrada.");
  } catch (error) {
    if (error instanceof ApiError) {
      return sendJson(response, error.status, { message: error.message });
    }
    console.error("Erro interno na API:", error);
    return sendJson(response, 500, { message: "Erro interno na API." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`API local disponível em http://127.0.0.1:${port}`);
});

server.on("error", (error) => {
  console.error("Não foi possível iniciar a API local:", error);
  process.exitCode = 1;
});
