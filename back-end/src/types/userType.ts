export interface User{
    nome:string,
    telefone:string,
    sexo:string,
    email:string,
    data_nasc:string,
    senha:string,
    cpf:string
    tipo_receber:typeReceiving
}                                                                                                                                                              
export enum typeReceiving {
   mensal,
   diario,
   semanal,
}          