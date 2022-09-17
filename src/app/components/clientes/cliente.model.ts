export interface Usuario {
    //? identifica que o atributo é opcional
    _id? : number
    nome: string
    sobrenome: string
    CPF: string
    email: string
    endereco: string
    telefone: string
    password: string
}