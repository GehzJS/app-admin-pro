/*====================================================================================*/
/*  CREACIÓN DEL MODELO PARA LOS USUARIOS
/*====================================================================================*/
export class UserModel {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public image?: string,
    public role?: string,
    public google?: boolean,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
