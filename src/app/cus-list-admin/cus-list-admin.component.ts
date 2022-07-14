import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cus-list-admin',
  templateUrl: './cus-list-admin.component.html',
  styleUrls: ['./cus-list-admin.component.css'],
  providers:[MessageService]
})
export class CusListAdminComponent implements OnInit {
  popup:boolean = false;
  oId:any;
  user: any=[]
  public val= this.user.id;
  bool!: boolean;
  AdmId: any=[];
  constructor(private api:ApiService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  mydetail(){
    this.bool = !this.bool
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

    this.api.getEmp()
    .subscribe({
      next:(res)=>{
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
    
  }
  


  deleteInfo(id:number){
    this.messageService.add({severity:'error', detail:' Deleted sucessfully'});
    this.api.deleteCus(id)
    .subscribe({
      next:(_res)=>{
        alert("deleted information.")
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
    this.oId=oid
};

 

}
