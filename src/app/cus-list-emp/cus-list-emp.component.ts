import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AboutComponent } from '../about/about.component';
import { ProfileComponent } from '../profile/profile.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cus-list-emp',
  templateUrl: './cus-list-emp.component.html',
  styleUrls: ['./cus-list-emp.component.css'],
  providers: [DialogService,MessageService]
})
export class CusListEmpComponent implements OnInit {

  user: any=[]
  public val= this.user.id;
  popup!: boolean;
  EmpId: any=[];

  constructor(private api:ApiService,public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {

    this.loadData();
    this.api.getEmp()
    .subscribe({
      next:(res)=>{
        const eId = localStorage.getItem('EmpId');
        
        this.EmpId = res.find((a:any)=>{
          if(a.id == eId){    
             return a
          }
         
        });

      }})
  }
  mydetail(){
    this.popup = !this.popup
  }

  showAbout() {
    const ref = this.dialogService.open(AboutComponent, {
        header: 'About',
        width: '60%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
    });
  
    ref.onClose.subscribe({

    
    });
  }

  showProfile() {
    const ref = this.dialogService.open(ProfileComponent, {
      data:this.EmpId,
        header: 'Profile',
        width: '60%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
    });
  
    ref.onClose.subscribe({

    
    });
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
    
  }
  

 

}
