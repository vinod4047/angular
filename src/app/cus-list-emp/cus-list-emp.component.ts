import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cus-list-emp',
  templateUrl: './cus-list-emp.component.html',
  styleUrls: ['./cus-list-emp.component.css']
})
export class CusListEmpComponent implements OnInit {

  user: any=[]
  public val= this.user.id;
  popup!: boolean;
  EmpId: any=[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    this.loadData();
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

  loadData(){
    
    this.api.getCus()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.user=res;
      },
      error:(_err)=>{
        alert("error in loadData")
      }
    })
    
  }
  

 

}
