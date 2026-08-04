import fs from "fs/promises";

// --- FUNÇÕES DE PERSISTÊNCIA ---

// Lê o arquivo, converte de JSON (texto) para Objeto JS
async function readFruits() {
  try {
    const data = await fs.readFile("./fruits.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error.message);
    return [];
  }
}

// Converte Objeto JS para JSON (texto) e salva no arquivo
async function writeFruits(fruits) {
  try {
    const data = JSON.stringify(fruits, null, 2);
    await fs.writeFile("./fruits.json", data, "utf-8");
  } catch (error) {
    console.error("Erro ao escrever no arquivo:", error.message);
  }
}

// --- FUNÇÕES DE LÓGICA (CRUD) ---

// Listar todas
async function getAllFruits() {
  return await readFruits();
}

// Buscar por ID
async function getFruitById(id) {
  const fruits = await readFruits();
  return fruits.find(item => item.id === Number(id));
}

// Cadastrar nova fruta
async function createFruit(nome) {
  const fruits = await readFruits();

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);
  await writeFruits(fruits);
  return newFruit;
}

// Atualizar fruta existente
async function updateFruit(id, novoNome) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return null;

  fruits[index].nome = novoNome;
  await writeFruits(fruits);
  return fruits[index];
}

// Remover fruta
async function deleteFruit(id) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return false;

  fruits.splice(index, 1);
  await writeFruits(fruits);
  return true;
}

// --- SEÇÃO DE TESTES ---

console.log("--- Iniciando Testes ---");

// 1. Listar inicial
console.log("Lista Inicial:", await getAllFruits());

// 2. Criar fruta
const novaFruta = await createFruit("Melancia");
const outraFruta = await createFruit("kiwi");
console.log("Fruta Criada:", novaFruta);


// 3. Buscar por ID
const busca = await getFruitById(2);
console.log("Busca ID 2:", busca);

// 4. Atualizar
const atualizada = await updateFruit(1, "Maçã empougante");
await updateFruit(3,"kiwi bolado")
console.log("Fruta Atualizada:", atualizada);

// 5. Deletar
const removida = await deleteFruit(4);
await deleteFruit(5);
console.log("Removido ID 4?", removida);

// 6. Lista Final
console.log("Lista Final:", await getAllFruits());