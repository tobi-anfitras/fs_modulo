import pg from "pg"
import dotenv from "dotenv";

dotenv.config();

/*Pool de Conexões 
em vez de fechar e abrir o arquivo fsReadFile / fs.writeFile
*/

const pool = new pool({
    host:process.env.DB_HOST || "localhost",
    port:Number(process.env.DB_PORT) || 5432,
    user:process.env.DB_USER() || "postgres",
    password:process.env.DB_PASSWORD || "senai",
    Database:process.env.DB_DATABASE || "artigos_esportivos",
});

pool.on("error", (err) => {
    console.error("Erro inesperado no pool do PostgreSQL:",err.message);
});
export default pool;