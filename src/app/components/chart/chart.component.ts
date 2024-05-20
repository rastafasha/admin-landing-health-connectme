import { Component, OnInit, Input } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

declare let Chart;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  payments: Payment;
  error:string;
  usuarios: User[]=[];
  user: User;

  public total_mes = 0;
  public total_ventas = 0;
  public current_month;
  public last_month;
  public dinero_ganado = 0;
  public total_ventas_ant = 0;
  public total_ganado_ant = 0;
  public mes_anterior;
  public mes_actual;
  public num_user = 0;
  public current_year: number = new Date().getFullYear();
  public url;
  public last_sellers : Array<any> = [];
  public num_productos = 0;
  public num_ventas = 0;
  public num_comentarios = 0;

  data:any;

  public total_ganado = {
    enero : 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre:0,
  }

  public total_ganado_last = {
    enero : 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre:0,
  }



  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      // label: '$ in millions',
      label: 'Ganado ' + this.current_year,
      data: [this.total_ganado.enero, this.total_ganado.febrero, this.total_ganado.marzo, this.total_ganado.abril, this.total_ganado.mayo, this.total_ganado.junio, this.total_ganado.julio, this.total_ganado.agosto, this.total_ganado.septiembre, this.total_ganado.octubre, this.total_ganado.noviembre, this.total_ganado.diciembre],


      // ⤵️ Add these
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered

      // ⤵️ Add these
      pointRadius: 2,
      borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      pointBackgroundColor: '#2D2F33',
      pointHoverBackgroundColor: '#2D2F33',
      borderWidth: 2, // main line width
      hoverBorderWidth: 0, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0.3, // makes line more squiggly
    }
  ];
  chartLabels: string[] = [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ];
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: false,

    // ⤵️ Remove the grids
    scales: {
      xAxis: {
        display: false,
        grid: {
          // drawBorder: false // removes random border at bottom
        }
      },
      yAxis: {
        display: false
      }
    },

    // ⤵️ Remove the main legend
    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: false, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#2D2F33',
        titleFont: {
          size: 18
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    }

  };

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // this.cargarVentas();
  }

  cargarVentas(){


        this.data_ventas();
        this.loadUsuarios();
  }



  data_ventas(){
    this.last_sellers = [];
    this.paymentService.getRecientes().subscribe(
      response =>{
        this.last_sellers = response;
        console.log(this.last_sellers);
      },
      error=>{

      }
    );
  }

  loadUsuarios(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.usuarios = res;
        error => this.error = error;
        console.log(this.usuarios);
      }
    );
  }




}
