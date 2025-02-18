
export class Type {
  id: number;
  name: string;
  state: any;
  created_at: string;
  updated_at: string;



  constructor(id, name, state ){
    this.id = id;
    this.name = name;
    this.state = state;
  }


}
