// regras de negôcio - CRUD

import ArtigoEsportivo from "../models/ArtigoESportivo.js";

class ArtigoEsportivoService {
    constructor(repository) {
        this.repository = repository;
    }

    async listarTodos(){
        return await this.repository.listarTodos();

    }
    async buscarPorId(id){
        const artigos = await this.repository.listarTodos();
        return artigos.find((item) => item.id === Number(id));
    }

    async criar(nome,categoria,preco){
        const artigos = await this.repository.listarTodos();

        const novoId =
            artigos.length > 0 ? artigos[artigos.length - 1].id + 1: 1;
            const novoArtigo = new ArtigoEsportivo(novoId,nome,categoria,preco);
        artigos.push(novoArtigo);
        await this.repository.salvarTodos(artigos);
        return novoArtigo;

    }

    async atualizar(id,dadosNovos){
        const artigos = await this.repository.listartodos;
        const index = artigos.findIndex((item) => item.id === Number(id));

        if(index === -1) return null;

        artigos[index] = { ...artigos[index],...dadosNovos};
        await this.repository.salvarTodos(artigos);
        return artigos[index];

    }

    async remover(id){
        const artigos = await this.repository.listarTodos();
        const index = artigos.findIndex((item) => item.id === Number(id));

        if(index === -1) return false;

        artigos.splice(index,1)
        await this.repository.salvarTodos(artigos);
        return true
    }
    
}

export default ArtigoEsportivoService;