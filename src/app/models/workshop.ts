import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;
export class Workshop {

  id?: number;
  user_id: number = 0;
  // role_id: number = 3; // 3 = Rol miembro
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  speciality?: string = "";
  ciudad?: string = "";
  phone?: string = "";
  facebook?: string = "";
  instagram?: string = "";
  dondeSeEntero?: string = "";
  address?: string = "";
  type_id?: number = 0;
  image: string = "";
  status?: 'APPROVED' | 'PENDING' | 'REJECTED';
  created_at?: any;
  updated_at?: any;


  get imagenUrl(){

    if(!this.image){
      return `${base_url}workshops/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}workshops/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}
