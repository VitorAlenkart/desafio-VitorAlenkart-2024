export class Animal{
    constructor(especie,tamanho,biomaIdeal, carnivoro){
        this.especie = especie
        this.tamanho = tamanho
        this.biomaIdeal = biomaIdeal
    }  
}

class Macaco extends Animal{
    constructor(){
        super("MACACO",1,["savana","floresta"])
    }
}

class Gazela extends Animal{
    constructor(){
        super("GAZELA",2,["savana"])
    }
}

class Leao extends Animal{
    constructor(){
        super("LEAO",3,["savana"])
    }
}

class Leopardo extends Animal{
    constructor(){
        super("LEOPARDO",2,["savana"])
    }
}

class Crocodilo extends Animal{
    constructor(){
        super("CROCODILO",3,["rio"])
    }
}

class Hipopotamo extends Animal{
    constructor(){
        super("HIPOPOTAMO",4,["savana","rio"])
    }
}

let leao = new Leao()
let macaco = new Macaco()
let gazela = new Gazela()
let hipopotamo = new Hipopotamo()
let leopardo = new Leopardo()
let crocodilo = new Crocodilo()

export { leao , macaco , gazela , hipopotamo , leopardo , crocodilo};
