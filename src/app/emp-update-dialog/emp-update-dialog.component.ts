import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-emp-update-dialog',
  templateUrl: './emp-update-dialog.component.html',
  styleUrls: ['./emp-update-dialog.component.css'],

})
export class EmpUpdateDialogComponent implements OnInit {
  Id:any;
  editForm:any = FormGroup;
  arr:any = [];
  dupIndex:any;  
  sa!:any;
  edit!: boolean;
  val:any;
  user: any=[];
  act!: string[];
  selectedCity1!: string;
              
      constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private api:ApiService,private activeRoute:ActivatedRoute,private route:Router) { }
  
      ngOnInit() {
        this.editForm = new FormGroup({
          name : new FormControl('',Validators.required),
          dob : new FormControl('',Validators.required),
          contact : new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
          email : new FormControl('',[Validators.required,Validators.email]),
          password : new FormControl('',Validators.required),
          post: new FormControl('employee'),
          status: new FormControl('')
        })
      
        this.Id=this.config.data.id
        console.log(this.Id)  

        this.act=[
          
         
          "Active",
      
          
          "In-active"
        
      ]
      
      this.api.getEmp()
      .subscribe((res)=>{
        this.arr=res;
        console.log(this.arr);
        
         this.dupIndex = this.arr.findIndex((o: { id: any; }) => o.id == this.Id);
      this.editForm.controls['name'].setValue(this.arr[this.dupIndex].name)
      this.editForm.controls['dob'].setValue(this.arr[this.dupIndex].dob)
      this.editForm.controls['contact'].setValue(this.arr[this.dupIndex].contact)
      this.editForm.controls['email'].setValue(this.arr[this.dupIndex].email)
      this.editForm.controls['password'].setValue(this.arr[this.dupIndex].password)
      this.editForm.controls['status'].setValue(this.arr[this.dupIndex].status)
      })
      }
      get f() { return this.editForm.controls; } 

      


      updateInfo(){
       
        this.api.updateEmp(this.Id,this.editForm.value)
          .subscribe({
            next:()=>{
             
              
              this.edit=true;
               this.ref.close(this.edit);
              
            },
            error:()=>{
              alert("error in update...")
            }
          })
          

     
        }
        
           
        
  }
