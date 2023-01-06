import { ContactModel } from './ContactModel';

export class UserModel {

  id:             Number;
  email:          String;
  password:       String;
  token:          String;

  contacts: Array<ContactModel>;

}
