import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { InvoiceModel } from 'src/app/models/Invoice-model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoginService } from 'src/app/services/login.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { logo_pdf } from './image';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice-store',
  templateUrl: './invoice-store.component.html',
  styleUrls: ['./invoice-store.component.css']
})
export class InvoiceStoreComponent implements OnInit {

  // Attributes
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InvoiceModel>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['invoice','clientName','clientLastName', 'seller', 'created_at', 'setPDF'];
  loading: boolean = true;
  redirect: RedirectionHelper;

  constructor(
    private invoiceService:InvoiceService,
    private loginService: LoginService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getInvoices().then( res =>{
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch( e =>{
      if (e.status === 401) {
        this.redirect = new RedirectionHelper(this.loginService, this.route, e);
      }

    })
  }

  getInvoices() {
    return new Promise((resolve,reject) =>{
      this.invoiceService.getInvoicesService().subscribe(
        res => {
          resolve(res);
        }, err =>{
          reject(err);
        });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  invoicesFormatDate(dateInvoice:string){
    return dateInvoice.substring(0,10);
  }

  onClickPDF(invoice_object) {

    const { clientName, clientLastName, created_at, clientRuc, phone, email, invoice} = invoice_object;
    console.info(invoice_object);
    const date_formatted = created_at.split(' ');
    
   /*  {
      "id": 13,
      "invoice": "0001",
      "clientName": "Pedro",
      "clientLastName": "Tabarez",
      "clientRuc": "3984217",
      "phone": "6746-6265",
      "email": "pedrotab05@gmail.com",
      "seller": "Jesús",
      "created_at": "2021-10-23 21:31:49",
      "details": [
          {
              "description": "Trípode Celular",
              "amount": 1,
              "priceUnit": 13.67,
              "priceTotal": 13.67
          }
      ]
  } */

    const pdfDefinitions : any = {
        content: [
          {
            columns: [
              {
                image: logo_pdf,
                style: ['logoStyle']
              },
              {
                // auto-sized columns have their widths based on their content
                stack: ['\tFactura de Venta'],
                style: ['title'],
              },
            ],
          },
          {
            columns: [
              {
                stack: ['\n\t\t\t Dirección: Calle Rafael Eyseric', 'Ciudad: Penonomé', 'Teléfono: 9086765'],
                style: ['header']
              }, 
              {
                stack: [ `\n\t\t\t Factura No. ${invoice}`, `Fecha: ${date_formatted[0]}`],
                style: ['header_right'],
              }
            ]
          },
          { text: '\n\n' },
          { 
            columns: [
              {
                stack: [`FACTURAR A:`,`${clientName} ${clientLastName}`, `RUC: ${clientRuc}`,`Teléfono: ${phone}`, `Email: ${email}`],
                style: ['header']
              },
              {
                stack: ['POR: ', 'Venta de mercancía tipo Outlet'],
                style: ['header_right']
              }
            ]}
        ],
        styles: {
          header: {
            fontSize: 11,
            bold: false
          },
          header_right: {
            fontSize: 11,
            bold: false,
            margin: [65, 0, 0, 0],
          },
          title: {
            fontSize: 24,
            aligment: 'right',
            margin: [65, 0, 0, 0],
          },
          logoStyle: {
            alignment: 'left'
          }
        }
    };

    const pdf = pdfMake.createPdf(pdfDefinitions);

    pdf.open();

  }
}
