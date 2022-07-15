import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[MessageService]
})
export class SignupComponent implements OnInit {
  signform:any = FormGroup;
 
  constructor(private api:ApiService,private route:Router,public messageService: MessageService) { }

  ngOnInit(): void {

    
    this.signform = new FormGroup({
    name : new FormControl('',Validators.required),
    dob: new FormControl('', Validators.required),
    contact : new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,15}')]),
    post: new FormControl('employee'),
    status : new FormControl('In-active')
  })
  }

  get f() { return this.signform.controls; } 

  onSubmit(){

    this.api.getEmp()
  .subscribe({
    next:(res)=>{
      const gMail = res.find((a:any)=>{
        return a.email===this.signform.value.email 
      });
      
      if(!gMail){
        
        
    this.api.postEmp(this.signform.value)
    .subscribe({
      next:(_res)=>{
        this.signform.reset();
        this.route.navigate(['/login'])
      },
      error:()=>{
        alert("error in sign-in")
      }
    })
     
    }
    else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'This Gmail is already exist.'});
    }
  }
 
  })




  }
  
  
  }

