import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Verificar se DATABASE_URL está configurado
if (!process.env.DATABASE_URL) {
  console.error("❌ ERRO: DATABASE_URL não está configurado no arquivo .env");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// Teste de conexão ao inicializar
async function testConnection() {
  try {
    console.log("🔄 Testando conexão com banco de dados...");
    const result = await sql`SELECT NOW()`;
    console.log("✅ Conexão com banco de dados estabelecida!");
    return true;
  } catch (error) {
    console.error("❌ Erro na conexão com banco de dados:");
    console.error("   Detalhes:", error.message);
    console.error("   CODE:", error.code);
    return false;
  }
}

app.post("/register", async (req, res) => {
  const { username, password, birthdate, email } = req.body;

  // Validação básica
  if (!username || !password || !birthdate || !email) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    await sql`
      INSERT INTO usuarios (username, password, birthdate, email)
      VALUES (${username}, ${password}, ${birthdate}, ${email})
    `;
    return res.status(200).json({ message: "Sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir usuário:", error.message);

    // Mensagens de erro mais claras
    if (
      error.message.includes("usuarios") ||
      error.message.includes("relation")
    ) {
      return res.status(500).json({
        error: "Tabela de usuários não existe. Execute: npm run init-db",
      });
    }
    if (error.message.includes("duplicate")) {
      return res.status(400).json({
        error: "Usuário ou email já cadastrado",
      });
    }

    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  const connected = await testConnection();
  if (connected) {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
  } else {
    console.log(
      `⚠️  Servidor rodando na porta ${PORT}, mas sem conexão com banco de dados`,
    );
  }
});
