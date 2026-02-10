import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const sql = neon(process.env.DATABASE_URL);

  const { username, password, birthdate, email } = req.body;

  try {
    await sql`
      INSERT INTO usuarios (username, password, birthdate, email)
      VALUES (${username}, ${password}, ${birthdate}, ${email})
    `;
    return res.status(200).json({ message: "Sucesso!" });
  } catch (error) {
    console.error("Erro no banco:", error);
    return res.status(500).json({ error: error.message });
  }
}
