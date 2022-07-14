import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editForm:any = FormGroup;
  ID:any;
  arr:any = [];
  dupIndex:any;
  edit!: number;
  flag!: boolean;

 constructor(private api:ApiService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

 ngOnInit(): void {

  this.editForm = new FormGroup({
    proName : new FormControl('',Validators.required),
    qty : new FormControl('',Validators.required),
    price : new FormControl('',Validators.required),
  })
  this.ID=this.config.data.id
        console.log(this.ID)  

this.api.getPro()
.subscribe({
next:(res)=>{
  console.log(res);
  this.arr=res;
   this.dupIndex = this.arr.findIndex((o: { id: any; }) => o.id == this.ID);
console.log( this.arr[this.dupIndex])
this.editForm.controls['proName'].setValue(this.arr[this.dupIndex].proName)
this.editForm.controls['qty'].setValue(this.arr[this.dupIndex].qty)
this.editForm.controls['price'].setValue(this.arr[this.dupIndex].price)

},
})


 }


 updateInfo(){
  
  this.api.updatePro(this.ID,this.editForm.value)
  .subscribe({
    next:()=>{
      
      this.flag=true
      this.ref.close(this.flag);

    },
      error:()=>{
        alert("error in update...")
      }
    })
}
}
