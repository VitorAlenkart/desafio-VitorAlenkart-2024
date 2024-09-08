import { macaco } from "./animais.js";

export class Recinto{
    constructor(bioma,tamanhoTotal,animaisExistentes){
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes;
        this.animaisHabilitados = ["LEAO", "LEOPARDO", "CROCODILO", "HIPOPOTAMO", "MACACO", "GAZELA"];
    }

    // Animal candidato é está é permitido no Recinto?
    animalEhHabilitado(animal){
        for(let i = 0; i < this.animaisHabilitados.length; i++){
            if(this.animaisHabilitados[i] == animal){
                return true;
            }
        }
        return false;
    }

    // Tamanho total ocupado pelos animais
    // Verificando:
    // Regra 6: Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
    tamanhoOcupado(tamanho){
        let animaisdiferentes = false;
        let tamanhoOcupado =  0;

        //Verificando se existe animais diferentes no recinto
        for(let i = 0; i < this.animaisExistentes.length; i++){
            
            for(let j = 0; j < this.animaisExistentes.length; j++){
                if(this.animaisExistentes[i].especie != this.animaisExistentes[j].especie){
                    animaisdiferentes = true
                }
            }
        }

        if(animaisdiferentes){
            tamanhoOcupado++;
        }

        // Somando tamanho ocupado por todos os animais do recinto
        for(let i = 0; i < this.animaisExistentes.length; i++){
            if(this.animaisExistentes[i] !== undefined){
                tamanhoOcupado += this.animaisExistentes[i].tamanho;
            }
        }

        return tamanhoOcupado;
    }

    // Animal candidato cabe no recinto?
    cabeAnimal(tamanho){
        let tamanhoOcupado = this.tamanhoOcupado(tamanho)
        
        // Tamanho maximo do recinto menos o espaço ocupado
        // é maior ou igual ao tamanho do animal candidato?
        if((this.tamanhoTotal - tamanhoOcupado) >= tamanho){
            return true
        }else{
            return false
        }
        
        
    }

    // Espaço livre depois da entrada do animal candidato
    espacoLivre(tamanho, especie){
        this.animaisExistentes.push({tamanho:tamanho,especie:especie})
        let tamanhoOcupado = this.tamanhoOcupado(tamanho);
        return this.tamanhoTotal - tamanhoOcupado
    }

    // Tamanho que cada animal ocupa
    tamanhoAnimal(animal){

        switch(animal){
            case 'MACACO':
                return 1;
            case 'LEOPARDO':
                return 2;
            case 'LEAO':
                return 3;
            case 'CROCODILO':
                return 3;
            case 'GAZELA':
                return 2;
            case 'HIPOPOTAMO':
                return 4;
        }

    }

    // Verificando:
    // Regra 1: Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo.
    biomaSuportaAnimal(animal){
        switch(animal){
            case 'MACACO':
                return this.verificarBioma(["savana","floresta"]);
            case 'LEOPARDO':
                return this.verificarBioma(["savana"]);
            case 'LEAO':
                return this.verificarBioma(["savana"]);
            case 'CROCODILO':
                return this.verificarBioma(["rio"]);
            case 'GAZELA':
                return this.verificarBioma(["savana"]);
            case 'HIPOPOTAMO':
                return this.verificarBioma(["savana", "rio"]);
        }
    }

    verificarBioma(bioma){
        for(let i = 0; i < this.bioma.length; i++){
            for(let j = 0; j < bioma.length; j++){
                if(bioma[j] == this.bioma[i]){
                    return  true
                }
            }
        }
        return false;
    }

    
    // Verificando:
    // Regra 2: Animais carnívoros devem habitar somente com a própria espécie;
    // Regra 3: Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s);
    mantemHarmonia(animal, quantidade){
        

        switch(animal){
            case'HIPOPOTAMO': // Se animal for um hipopotamo, verificar Regra 4.
                return this.mantemHarmoniaHipopotamo();

            case'MACACO': // Se animal for um macaco, verificar Regra 5.
                return this.mantemHarmoniaMacaco(this.animaisExistentes,quantidade);

            default:
                // Não existem animais, logo não haverá 
                // quebrar de harmonia 
                if(this.animaisExistentes.length == 0){
                    return true;

                }else{
                    let resultado;

                    // Animal candidato é carnivoro?
                    if(this.ehCanivoro(animal)){ // Sim, então...

                        // Para cada animal no recinto
                        for(let i = 0; i < this.animaisExistentes.length; i++){

                            if(this.animaisExistentes[i].especie == "HIPOPOTAMO"){ // Animal do recinto é um hipopotamo? Sim!
                                return this.mantemHarmoniaHipopotamo(this.bioma,[animal])

                            }else if(animal === this.animaisExistentes[i].especie){ //Animal candidato é igual ao animal do recinto? Sim
                                return  true;

                            }else {
                                return false;
                            }

                        }

                    }else{
                        // Para cada animal no recinto
                        for(let i = 0; i < this.animaisExistentes.length; i++){

                            
                            if(this.animaisExistentes[i].especie == "HIPOPOTAMO"){ // Animal do recinto é um hipopotamo? Sim!
                                return this.mantemHarmoniaHipopotamo(this.bioma,[animal])

                            }else if(this.ehCanivoro(this.animaisExistentes[i].especie)){ // Animal do recinto é carnivoro? Sim
                                return false

                            }else {
                                return true;

                            }
                        }
                        
                    }
                    return resultado
                }
        }
        
    }

    ehCanivoro(animal){
        switch(animal){
            case 'LEAO':
                return true;

            case 'CROCODILO':
                return true;
            
            case 'LEOPARDO':
                return true;

            case 'HIPOPOTAMO': 
                return true;
            default:
                return false;
        }
    }

    // Regra 4: Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
    mantemHarmoniaHipopotamo(bioma = this.bioma, animais = this.animaisExistentes){

        if(bioma.length == 2 && bioma[0] == 'savana' && bioma[1] == 'rio'){
            for(let i = 0; i <animais.length;i++){
                if("HIPOPOTAMO" != animais[i].especie && this.ehCanivoro(animais[i].especie)){
                    return false
                }
            }
            return true
        }else {
            if(animais.length == 0){
                return true;
            }else{
                for(let i = 0; i < animais.length; i++){
                    if("HIPOPOTAMO" != animais[i].especie){
                        return false;
                    }
                }
                return true;
            }

        }
    }

    // Regra 5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
    mantemHarmoniaMacaco(animais = this.animaisExistentes, quantidade){
        if(animais.length == 0 && quantidade == 1){
            return false;
        }else if(animais.length == 0 && quantidade > 1){
            return true
        }else{
            
            for(let i = 0; i < animais.length; i++){
                if(animais[i].especie == "HIPOPOTAMO" ){
                    return this.mantemHarmoniaHipopotamo(this.bioma, [macaco.especie]);
                }else if(this.ehCanivoro(animais[i].especie)){
                    return false;
                }else{
                    return true
                }
            }
            
            
        }
    }

}
