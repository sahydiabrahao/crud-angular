import { PhoneModel } from './PhoneModel';

export class ContactModel {

  id:             Number;
  name:           String;
  cpf:            String;
  date:           String;
  zip_code:       String;
  email:          String;
  user_id:        Number;

  phones:         Array<PhoneModel>;


}
