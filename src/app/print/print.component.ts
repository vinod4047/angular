import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  index: any;
  billInfo: any=[];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService:MessageService) { }

  ngOnInit(): void {

    this.billInfo=this.config.data.bill
    console.log(this.billInfo)


  }





  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      this.messageService.add({severity:'success', summary: 'Success', detail:' Bill Printed sucessfully'});
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      
      PDF.save('angular-demo.pdf');
    });
    this.ref.close()
  }
}
