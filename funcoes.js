import fs from "fs/promises"
import PromptSync from "prompt-sync"


const prompt = PromptSync()
const caminhoDoArquivo = "./tarefas.json"

export async function mostrarMenu() {
    console.log(`
      1. Criar uma nova tarefa:
  
        - ○ O usuário deve fornecer um título e uma descrição.
        - ○ O sistema deve atribuir um id automaticamente (o maior id
        - existente + 1).
        - ○ A tarefa será salva no arquivo tarefas.json.
  
      2. Visualizar todas as tarefas:
  
        - ○ Exibir todas as tarefas cadastradas no arquivo tarefas.json.
  
      3. Visualizar apenas tarefas concluídas:
  
        - ○ Filtrar e exibir apenas as tarefas cujo status concluida seja
      true.
  
      4. Visualizar apenas tarefas não concluídas:
  
        - ○ Filtrar e exibir apenas as tarefas cujo status concluida seja
      false.
  
      5. Concluir uma tarefa:
  
        - ○ O usuário informa o id da tarefa que deseja concluir.
        - ○ O sistema atualiza a tarefa correspondente, alterando o status
        concluida para true.
        - ○ O arquivo tarefas.json é atualizado com essa modificação.
  
      6. Sair:
  
        - Finaliza a execução do programa.
  
  `)
  }
  
  export async function lerTarefas() {
    try{
    const arquivo = await fs.readFile(caminhoDoArquivo, "utf-8")
    return JSON.parse(arquivo)
  }catch(error){
    console.error(`Erro ao ler o arquivo: ${error.message}`)
    return undefined
  }
  }
  
  export async function salvarTarefas(tarefas) {
    const concluindoTarefa = JSON.stringify(tarefas, "", 2)
  
    try{
    await fs.writeFile(caminhoDoArquivo,  concluindoTarefa, "utf-8")
    console.log("Arquivo atualizado com sucesso! ")
    }catch(error){
        console.log("Erro ao escrever no arquivo: ", error)
    }
  }
  
  export async function criarTarefa() {
    const titulo = prompt('Qual o titulo? ')
    const descricao = prompt('Qual a descricao?  ') 
  
      const arquivo = await lerTarefas()
      
      if(arquivo.length == 0){
        novoId = 1
      }
      const novoId = arquivo[arquivo.length - 1].id + 1
  
      const novaTarefa = {
        id: novoId,
        titulo,
        descricao,
        concluida: false
      }
      arquivo.push(novaTarefa)
      await salvarTarefas(arquivo)
  }
  
  
  export async function visualizarTodasTarefas() {
  
  const mostrarArquivo = await lerTarefas()
  
  console.log(mostrarArquivo)
  
  }
  
  export async function visualizarTarefasConcluidas() {
    const arquivo = await lerTarefas()
    const concluida = arquivo.filter(elemen => elemen.concluida == true )
    console.log(concluida)
  }
  
  export async function visualizarTarefasNaoConcluidas() {
    const arquivo = await lerTarefas()
    const naoConcluida = arquivo.filter(elemen => elemen.concluida == false )
    console.log(naoConcluida)
  }
  
  export async function concluirTarefas() {
    const idAtualizado = prompt("Diga o id da tarefa que deseja concluir: ")
  
    const arquivo = await lerTarefas()
    
    const tarefa = arquivo.find(eleme => eleme.id === parseInt(idAtualizado)) 
      if(tarefa){
        tarefa.concluida = true
        await salvarTarefas(arquivo)
        console.log("Tarefa concluida! ")
      }else{
        console.log("Tarefa nao concluida! ")
      }
  }
