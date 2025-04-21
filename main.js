import { 
    mostrarMenu,
    criarTarefa,
    visualizarTodasTarefas,
    visualizarTarefasNaoConcluidas,
    concluirTarefas, 
    visualizarTarefasConcluidas
    } from "./funcoes.js";

import PromptSync from "prompt-sync"

const prompt = PromptSync()
let opcao = null
do{
mostrarMenu()
opcao = prompt("qual opção desejada? ")
switch(opcao){
    case '1':
        await criarTarefa()
    break;
    case "2":
        await visualizarTodasTarefas()
    break;
    case "3":
        await visualizarTarefasConcluidas()
    break;
    case "4":
        await visualizarTarefasNaoConcluidas()
    break;
    case "5":
        await concluirTarefas()
    break;
    case "6":
        console.log("Saindo do menu")
    break;
    default:
        console.log("Opcoes invalidas")
}}
while(opcao !== '6')

