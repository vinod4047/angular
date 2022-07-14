import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-bill-cus',
  templateUrl: './bill-cus.component.html',
  styleUrls: ['./bill-cus.component.css']
})
export class BillCusComponent implements OnInit {

  filterTerm!: string;
  user: any=[];
  cId: any;

  constructor(private api:ApiService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
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

  customer(id:number){
    this.cId = id;
    this.ref.close(this.cId);
  }

}
