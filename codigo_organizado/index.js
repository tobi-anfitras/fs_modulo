import ArtigoEsportivoRepository from "./repositories/ArtigoEsportivoRepository.js";
import ArtigoEsportivoService from "./services/ArtigoEsportivoService.js";

/*ponto de entrada main ()*/
const repository = new ArtigoEsportivoRepository();
const service = new ArtigoEsportivoService(repository);
console.log("inicializando testes");

//1.lista inicial
console.log("Lista Inicial", await service.listarTodos());

//2.criar artigo
const novoArtigo = await service.criar("bola de futbol","Jabulane",33.33);
console.log("Artigo Criado", novoArtigo)

//3.buscar por id
const buscar = await service.buscarPorId(2);
console.log("busca ID", buscar)

//4.atualizar
const atualizado = await service.atualizar(1,{preco:129.9})
console.log("artigo 1 atualizado",atualizado)

//5.Remover
const apagar = await service.remover(3);
console.log("artigo 3 apagado",apagar)

//6.lista final
console.log("Lista final", await service.listarTodos());