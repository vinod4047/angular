import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {DialogService} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EmpUpdateDialogComponent } from '../emp-update-dialog/emp-update-dialog.component';


@Component({
  selector: 'app-admin-emp-list',
  templateUrl: './admin-emp-list.component.html',
  styleUrls: ['./admin-emp-list.component.css'],
  providers: [DialogService, MessageService]
})
export class AdminEmpListComponent implements OnInit {
  user: any=[]
  popup:boolean = false;
  oId:any;
  bool!: boolean;
  AdmId: any=[];

 
  constructor(private api:ApiService,public dialogService: DialogService, public messageService: MessageService) { }



  ngOnInit(): void {
    this.loadData()
  }
  mydetail(){
    this.bool = !this.bool
  }
  loadData(){
    
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
    
  }
  
  deleteInfo(id:number){

    this.api.deleteEmp(id)
    .subscribe({
      next:(_res)=>{
        this.messageService.add({severity:'error', detail:' Deleted sucessfully'});
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


show(arr:any) {
  const ref = this.dialogService.open(EmpUpdateDialogComponent, {
    data: {
      id:arr.id,

  },
      header: 'Employee Update',
      width: '60%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  ref.onClose.subscribe({
  next:(edit:boolean) =>{
    this.loadData()
   if(edit==true){
       this.messageService.add({severity:'success', summary: 'Success', detail: arr.name+' Information Updated successfully'});
     }
    },
    error:()=>{
      alert('error');
    }
  
  });
}


}