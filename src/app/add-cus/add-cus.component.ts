import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-cus',
  templateUrl: './add-cus.component.html',
  styleUrls: ['./add-cus.component.css']
})
export class AddCusComponent implements OnInit {
  cusform:any = FormGroup;
  cusId:any;
  arr: any =[];
  index: any;
 
  constructor(private api:ApiService,private route:Router,public ref: DynamicDialogRef,private messageService:MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.cusform = new FormGroup({
    name : new FormControl('',Validators.required),
    contact : new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
    email : new FormControl('',[Validators.required,Validators.email]),
  })
  }

  get f() { return this.cusform.controls; } 


  onSubmit(){


    this.api.getCus()
    .subscribe({
      next:(res)=>{
        const gMail = res.find((a:any)=>{
          
          return a.email===this.cusform.value.email 
        });
        
        if(!gMail){

            this.cusId=this.cusform.value.email;

            this.api.postCus(this.cusform.value)
            .subscribe({
              next:()=>{
                this.api.getCus()
                .subscribe((res)=>{
                  this.arr=res;
                  console.log(this.arr);
                  
                   this.index = this.arr.findIndex((o: { email: any; }) => o.email == this.cusId);
                   this.cusId = this.arr[this.index].id
                   console.log(this.cusId);
              this.ref.close(this.cusId);
              })
            
              },
              error:()=>{
                alert("error in adding product")
              }
            })
            
        }else{
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Gmail is already exist'});
        }
      }
    })  

    
}
}
