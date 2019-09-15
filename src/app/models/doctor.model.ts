import { UserModel } from 'src/app/models/user.model';
import { HospitalModel } from 'src/app/models/hospital.model';
export class DoctorModel {
  constructor(
    public name: string,
    public image?: string,
    public hospital?: HospitalModel | string,
    public user?: UserModel,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
