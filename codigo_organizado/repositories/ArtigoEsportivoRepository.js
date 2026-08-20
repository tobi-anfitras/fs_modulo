/* import fs from "fs/promises";
import ArtigoEsportivo from "../models/ArtigoEsportivo.js";
const CAMINHO_ARQUIVO = "./data/artigosEsportivos.json";

//trabalhar os dados (como são armazenados)

class ArtigoEsportivoRepository {
    async listarTodos(){
    try{
        const data = await fs.readFile(CAMINHO_ARQUIVO, "utf-8");
        const bruto = JSON.parse(data);
        return bruto.map(ArtigoEsportivo.fromJSON);
    
    }
    catch(error) {
        console.error("Erro ao ler o arquivo", error.message);
        return [];
    }}

    async salvarTodos(artigos){
        try{
            const data = JSON.stringify(artigos, null, 2);
            await fs.writeFile(CAMINHO_ARQUIVO, data, "utf-8");
        }
        catch (error){
            console.error("Erro ao escrever o arquivo", error.message);
            return[];
        }
    }
    
}

export default ArtigoEsportivoRepository
*/

import pool from "..config/databse,js";
import ArtigoEsportivo from "../models/ArtigoEsportivo.js";

class ArtigoEsportivoRepository{
    async listarTodos(){
        try{
            const {rows} = await pool.query(
                "SELECT id,nome,categoria, preco FROM artigos_esportivos ORDER BY id"
            );
            return rows.map(ArtigoEsportivo.fromJSON);
        }

        catch(error){
            console.log("Erro ao ler o arquivo", error.mensage);
            return[];
        }
    }

        async buscarporId(id){
     try{
            const {rows} = await pool.query(
                "SELECT id,nome,categoria, preco FROM artigos_esportivos WEHRE id = $1",[id]
            );
            return rows[0] ? ArtigoEsportivo.fromJSON(rows[0]) : null;
        }

        catch(error){
            console.log("Erro ao buscar o ID", error.mensage);
            return null;
        }
    
    }
     async criar(nome,categoria,preco){
     try{
            const {rows} = await pool.query(
                `INSERT INTO artigos_esportivos (nome,categoria, preco)
                VALUES ($1, $2, $3)
                RETURNING id, nome, categoria, preco`,
                [nome, categoria, preco]
            );
            return ArtigoEsportivo.fromJSON(rows[0]);
        }

        catch(error){
            console.log("Erro ao criar o arquivo", error.message);
            throw error;
        }
    
    }

    async atualizar(id,dadosNovos){
        
     try{
            const atual = await this.buscarporId(id);
            if(!atual) return null;

            const nome = dadosNovos.nome ?? atual.nome;
            const categoria = dadosNovos.categoria ?? atual.categoria;
            const preco = dadosNovos.peco ?? atual.preco;

            const {rows} = await pool.query (
                `UPDATE artigos_esportivos
                SET nome=$1, categoria=$2, preco=$3
                WHERE id = $4
                RETURNING id,nome,categoria,preco`,
                [nome,categoria,preco,id]
            );
            return rows[0] ? ArtigoEsportivo.fromJSON(rows[0]) : null;
        }

        catch(error){
            console.log("Erro ao buscar o ID", error.mensage);
            return null;
        }
        
    
    }

    async remover(id){
     try{
            const {rowCount} = await pool.query(
                "DELETE FROM artigos_esportivos WHERE id = $1",
                [id]
                
            );
                return rowCount > 0;
            
        }
    

        catch(error){
            console.log("Erro ao remover o arquivo", error.message);
            throw error;
        }
    }

}
export default ArtigoEsportivoRepository;

