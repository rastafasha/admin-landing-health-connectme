import { Currencies } from "./currencies";

export class Plan {
  id: number;
  name: string;
  price: any;
  color: string;
  tiempo: string;
  description: string;
  adicional: string;
  currency_id: Currencies ;
  created_at: string;
  updated_at: string;
  status?: 'APPROVED' | 'PENDING' | 'REJECTED';



  constructor(id, name, price, color, description  ){
    this.id = id;
    this.name = name;
    this.price = price;
    this.color = color;
    this.description = description;
  }


}
