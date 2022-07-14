import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import {MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCusComponent } from '../add-cus/add-cus.component';
import { BillCusComponent } from '../bill-cus/bill-cus.component';
import { PrintComponent } from '../print/print.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [DialogService, MessageService]
})
export class BillingComponent implements OnInit {

  items!: MenuItem[];

  add:number = 0;
  billProduct:any =[];
  order:any = [];
  prod: any=[];
  public val= this.prod.id;
  Qty:any = FormGroup;
  index = 0;
  EmpId :any;
  discount:any= FormGroup;
  dPrice: any = 0;
  disc: any = 0;
  customers: any;
  selectedValue: any;
  CusId: any;
  popup!: boolean;
  pnt: any=[];
 
  constructor(private api:ApiService,private route:Router,public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {


  //   this.items = [
  //     {
  //         label:'Home',
  //         icon:'pi pi-fw pi-home',
  //         'routerLink':['/home'],
  //         routerLinkActiveOptions: {
  //           exact: true
  //         },
  //         styleClass:'menu',
  //     },
  //     {
  //         label:'Add Customer',
  //         icon:'pi pi-fw pi-user-plus',
  //        'routerLink':['/cusAdd']
  //     },
  //     {
  //         label:'Customer List',
  //         icon:'pi pi-fw pi-list',
  //         'routerLink':['/cusEmp']
  //     }
  // ];
  

    this.Qty = new FormGroup({
      tQty : new FormControl('1')})       
    this.loadData();
  
    this.discount =new FormGroup({
      count : new FormControl('0')
    })

 

  }

  loadData(){
    
    this.api.getPro()
    .subscribe((res)=>{
        console.log(res);
        this.prod=res;
      }
    )

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

  addbill(arr:any){ 
   
    var obj1 = {
     proName:arr.proName,
     qty:arr.qty,
     price:arr.price,
     tQty:this.Qty.value.tQty,
     amount:this.Qty.value.tQty*arr.price
    };

    let search = (obj: { proName: boolean; }) => obj.proName === obj1.proName
    let check =this.billProduct.findIndex(search);
    console.log(check);
     

    if (check == -1) {
      this.billProduct.push(obj1) 
      console.log("pir");
    }
    else{
      this.billProduct[check]=(obj1)
      console.log("repl")
    }

    let iPrice = this.billProduct.map((o: { amount: any; }) => o.amount)?.reduce((a: any, c: any) => {return a+c;},0);  
     console.log(iPrice)
      this.add = iPrice
      
      

    this.Qty = new FormGroup({
    tQty : new FormControl('1')})
  
    this.cal()
   
  }
  
  deleteInfo(proName:string){
    var elementPos = this.billProduct.map(function(obj1: {proName:string; }) {return obj1.proName; }).indexOf(proName);
    this.billProduct.splice(elementPos,1);
    elementPos=null
    
    }

  total(){

    this.order.product = this.billProduct;
    var obj2 = {
      id:this.ID(),
      customer : this.CusId.name,
      cusContact : this.CusId.contact,
      CusMail : this.CusId.email,
      product : this.order.product,
      empId : this.EmpId.id,
      empName :this.EmpId.name,
      subTotal : this.add,
      disc : this.disc,
      total : this.dPrice
    };
    this.pnt = obj2
    console.log(this.order)
    this.api.postOrd(obj2)
    .subscribe((res)=>{console.log(res)
      this.messageService.add({severity:'success', summary: 'Success', detail:' Order Confirmed.'});
      }
  )

}
mydetail(){
  this.popup = !this.popup
}

discountCal(){
 
  this.disc = this.discount.value.count
   console.log(this.disc);
   this.cal()
}
cal(){
  this.dPrice = this.add - (this.add * this.disc / 100)
  
}


showAdd() {
  const ref = this.dialogService.open(AddCusComponent, {
      header: 'Add Product',
      width: '40%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
    
  ref.onClose.subscribe({
  next:(cusId:any) =>{
    
    if(cusId){ console.log(cusId);
      
    this.link(cusId)
       this.messageService.add({severity:'success', summary: 'Success', detail:' Customer added sucessfully'});
}
    },
    error:()=>{
      alert('error');
    }
  
  });

}

show() {
  const ref = this.dialogService.open(BillCusComponent, {
      header: 'Add Product',
      width: '60%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
    
  ref.onClose.subscribe({
  next:(cId) =>{
    if(cId){
      this.link(cId)
       this.messageService.add({severity:'success', summary: 'Success', detail:' Customer linked sucessfully'});
    }
   
    },
    error:()=>{
      alert('error');
    }
  
  });

}

link(id:any){
  this.api.getCus()
  .subscribe({
    next:(res)=>{
      
      this.CusId = res.find((a:any)=>{
        if(a.id == id){    
           return a
        }
       
      });
console.log(this.CusId);

    }})
  }

  print(){
    const ref = this.dialogService.open(PrintComponent, {
      data:{
        bill:this.pnt
      },
      header: 'Add Product',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
    
  ref.onClose.subscribe({
  next:() =>{
   
    },
    error:()=>{
      alert('error');
    }
  
  });
  }

  ID() {
 
    return '_' + Math.random().toString(36).substr(2, 9);
  };
}



