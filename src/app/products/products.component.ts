import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  addPro:any = FormGroup;
  tempImg = null;
  flag!: boolean;
  constructor(private api:ApiService, private route:Router,public ref: DynamicDialogRef, public config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    this.addPro = new FormGroup({
    proName : new FormControl('',Validators.required),
    qty : new FormControl('',Validators.required),
    price : new FormControl('',Validators.required),
  })
  }
  onSubmit(){
      this.api.postPro(this.addPro.value)
      .subscribe({
        next:(_res)=>{
          this.flag=true;
          this.addPro.reset();
              this.ref.close(this.flag);
        
        },
        error:()=>{
          alert("error in adding product")
        }
      })
    }
}
