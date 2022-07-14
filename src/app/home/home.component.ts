import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popup!: boolean;
  EmpId: any=[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getEmp()
    .subscribe({
      next:(res)=>{
        const eId = localStorage.getItem('EmpId');
        
        this.EmpId = res.find((a:any)=>{
          if(a.id == eId){    
             return a
          }
         
        });

      }})
  }
  mydetail(){
    this.popup = !this.popup
  }
}
