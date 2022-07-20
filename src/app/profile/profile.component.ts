import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  empdata: any=[];
  bill: any=[];
  details :any =[];

  constructor(public api:ApiService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.empdata = this.config.data
    console.log(this.empdata);
    this.api.getOrd()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.bill=res;
   this.details = this.bill.filter((emp:any) => emp.empId == this.empdata.id)
    console.log(this.details);
    console.log(this.details.length);
    
      },
      error:(_err)=>{
        alert("error in loadData")
      }
    })
   
    
  }
  
}
