import * as animais from "./animais.js";
import { Recinto } from "./Recinto.js";

class RecintosZoo {

    constructor(){
        this.recintos = [
            new Recinto(["savana"],10, [animais.macaco, animais.macaco, animais.macaco]),
            new Recinto(["floresta"], 5, []),
            new Recinto(["savana","rio"], 7, [animais.gazela]),
            new Recinto(["rio"], 8, []),
            new Recinto(["savana"], 9, [animais.leao])
        ]
    }

    analisaRecintos(animal, quantidade) {

        
        // Animal candidato está habilitado para o recinto?
        if(this.recintos[0].animalEhHabilitado(animal)){ // Sim, então...

            // A quantidade de animais é válida?
            if(quantidade <= 0){ // Não, então defina erro e retorne o objeto 
                this.erro = "Quantidade inválida";
                return this

            }else{ // Sim, então...

                // Acessando todos os recintos(um de cada vez)
                for(let i = 0; i < this.recintos.length; i++){
                    if(this.recintos[i].biomaSuportaAnimal(animal)){

                        // O animal candidato mantém harmonia no recinto
                        // se conviver com animais que já estão no recinto? 
                        if(this.recintos[i].mantemHarmonia(animal, quantidade)){ // Sim, então...

                            let tamanhoAnimal = this.recintos[i].tamanhoAnimal(animal)*quantidade

                            if(this.recintos[i].cabeAnimal(tamanhoAnimal, animal)){
                                if(this.recintosViaveis == undefined){
                                    this.recintosViaveis = []
                                }
                                let espacoLivre = this.recintos[i].espacoLivre(tamanhoAnimal, animal);
                                this.recintosViaveis.push(`Recinto ${i+1} (espaço livre: ${espacoLivre} total: ${this.recintos[i].tamanhoTotal})`)
                            } 
                        }
                    }
                } 
                if(this.recintosViaveis == undefined){
                    this.erro = "Não há recinto viável"
                }
                return this;
            }
        }else{ // Animal candidato não habilitado para o recinto
            
            this.erro = "Animal inválido";
            return this
        }
        
       
        
    }

}

export { RecintosZoo as RecintosZoo };
