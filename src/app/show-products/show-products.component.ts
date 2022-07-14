import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductsComponent } from '../products/products.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
  providers: [DialogService, MessageService]
})
export class ShowProductsComponent implements OnInit {
  user: any=[];
  popup:boolean = false;
  oId:any;
  Form: any;
  bool!: boolean;
  AdmId: any=[];

  constructor(private api:ApiService,public dialogService: DialogService, public messageService: MessageService) { }

  ref!: DynamicDialogRef;


  ngOnInit(): void {
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
    this.loadData();
    
  }


  mydetail(){
    this.bool = !this.bool
  }

  loadData(){
    
    this.api.getPro()
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
  


deleteInfo(id:number){

    this.api.deletePro(id)
    .subscribe({
      next:(_res)=>{

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
  const ref = this.dialogService.open(EditProductComponent, {
    data: {
      id:arr.id,

  },
      header: 'Product Update',
      width: '40%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  ref.onClose.subscribe({
  next:(flag:boolean) =>{

    this.loadData()
    if(flag){
       this.messageService.add({severity:'success', summary: 'Success', detail: arr.proName+' Information updated sucessfully'});
    }
   
    
     
    
    },
    error:()=>{
      alert('error');
    }
  
  });


}

showAdd() {
  const ref = this.dialogService.open(ProductsComponent, {
      header: 'Add Product',
      width: '40%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  ref.onClose.subscribe({
  next:(flag:boolean) =>{
     
    this.loadData()
    if(flag==true){
       this.messageService.add({severity:'success', summary: 'Success', detail:' Product added sucessfully'});
    }
   
    },
    error:()=>{
      alert('error');
    }
  
  });

}

}
