import { UserModel } from 'src/app/models/user.model';

export class HospitalModel {
  constructor(
    public name: string,
    public image?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public user?: UserModel[]
  ) {}
}
