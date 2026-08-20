import ArtigoEsportivoRepository from 
"./repositores/ArtigoEsportivoRepository.js";
import ArtigoEsportivoService from "./services/ArtigoEsportivoService.js";

/*Ponto de entrada main ()*/

const repository = new ArtigoEsportivoRepository();
const service = new ArtigoEsportivoService(repository);
console.log("Iniciando Testes");

//1. Lista Inicial 
console.log("Lista Inicial", await service.listarTodos());

//2. Criar Artigo
const novoArtigo = await service.criar("Raquete", "wilson" ,38.52);
console.log("Artigo Criado", novoArtigo);

//3. Buscar por ID
const busca = await service.buscarPorId(2);
console.log("Busca ID", busca);

//.4 Atualizar 

const atualizado = await service.atualizar(1, {preco: 129.9});
console.log("Artigo Atualizado:",atualizado);

//5. Remover

const removido = await service.remover(3);
console.log("Removido Id",removido);

//6. Lista Final

console.log("Lista Final", await service.listarTodos());

