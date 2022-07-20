import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers:[MessageService]
})
export class OrderListComponent implements OnInit {
  user: any=[]
  oId:any;
  popup:boolean = false;
  Form: any;
  public val= this.user.id;
  AdmId: any=[];
  bool!: boolean;

  constructor(private api:ApiService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.api.getEmp()
    .subscribe({
      next:(res)=>{
        this.user=res;
        const aId = localStorage.getItem('AdmId');
        
        this.AdmId = res.find((a:any)=>{
          if(a.id == aId){    
             return a
          }
         
        });
      },
      error:(_err)=>{
        alert("error in loadData")
      }
    })
    this.loadData();
    
  }


  mydetail(){
    this.bool = !this.bool
  }

  loadData(){
    
    this.api.getOrd()
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
  
  deleteInfo(id:number){
    this.messageService.add({severity:'error', detail:' Deleted sucessfully'});
    this.api.deleteOrd(id)
    .subscribe({
      next:(_res)=>{
        this.popup = !this.popup
        this.loadData()

      },
      error:()=>{
        alert("error in delete..")
      }
    })
  }

  myFunction(oid:number) {
    this.popup = !this.popup
    console.log(oid)
    this.oId=oid
};
    

}
