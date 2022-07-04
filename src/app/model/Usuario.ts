import { Postagem } from "./Postagem"

export class Usuario {   
    public id: number
    public nome: string
    public usuario: string
    public senha: string
    public foto: string
    public tipo: string

    // Relacionamento
    public postagem: Postagem[]
    //Os atributos devem ter exatamente o mesmo nome da nossa classe model no BackEnd
}