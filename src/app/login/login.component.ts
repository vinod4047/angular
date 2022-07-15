import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  temp:any = [];
  eId:any;
  logform:any = FormGroup;
  aId: any;
 
  constructor(private api:ApiService , private router:Router, private messageService:MessageService) { }

  ngOnInit(): void {
    this.logform = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',Validators.required)
  })
  console.log(this.logform);
  
  }


  get f() { return this.logform.controls; } 

  onSubmit(){
    this.api.getEmp()
    .subscribe({
      next:(res)=>{
        
        const adm = res.find((a:any)=>{
          this.aId=a.id
          return a.email===this.logform.value.email && a.password===this.logform.value.password && a.post =='admin'
        });
        const emp = res.find((a:any)=>{  
          this.eId=a.id
          return a.email===this.logform.value.email && a.password===this.logform.value.password && a.status =='Active'
          
        });
        const wait = res.find((a:any)=>{ 
          return a.email===this.logform.value.email && a.password===this.logform.value.password
         
        });

        
      if(adm){
          localStorage.setItem('AdmId', JSON.stringify(this.aId));
        this.logform.reset();
        this.router.navigate(['/AEL'])
        
      }
     else{
      if(emp){
        console.log(this.eId);
        localStorage.setItem('EmpId', JSON.stringify(this.eId));
          this.logform.reset();
           this.router.navigate(['/bill'])
      }
      else{
        if(wait){
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Your account is not Activated'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Employee not Founded'});
        }
         
        }
     }
      },
      error:()=>{
        alert("error in login")
      }
    })
  }

}
