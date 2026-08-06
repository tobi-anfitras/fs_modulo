//trabalhar o dados (como são armazenados)
import fs from "fs/peomises"
import ArtigoEsportivo from"../models/ArtigoESportivo.js";
const CAMINHO_ARQUIVO = "./data/ArtigoEsportivo.json";

//trabalhar os dados (como são armazenados)

class ArtigoEsportivoRepository{
   async listarTodos(){
    try{
        const data = await fs.readFile(CAMINHO_ARQUIVO,"utf-8")
        const bruto = JSON.perse(data);
        return bruto.map(ArtigoEsportivo.fromJSON);

    }catch (error){
        console.log("Erro ao ler o arquivo",error.message);
        return [];

   }
 }
    async salvarTodos(artigos){
        try{
            const data = JSON.stringify(artigos, null, 2);
            await fs.writeFile(CAMINHO_ARQUIVO,data,"utf-8");

        }catch (error){
            console.log("Erro ao ler o arquivo",error.message);
            return [];

        }
    }
}

export default ArtigoEsportivoRepository;