export interface UsuarioAdmin {
    //? identifica que o atributo é opcional
    _id?: string
    usuario: string
    nome: string
    password: string
    master?: boolean
}