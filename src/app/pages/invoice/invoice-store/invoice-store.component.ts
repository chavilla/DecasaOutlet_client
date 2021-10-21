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

  onClickPDF(row) {

    const { data } = row;
    const { invoice } = data[0];

     /* {
      "invoice": "0001",
      "clientName": "Andrea",
      "clientLastName": "Valdez",
      "seller": "Jesús",
      "created_at": "2021-06-26 22:56:43"
  } */

    const pdfDefinitions : any = {
        content: [
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                stack: [`Factura de Venta ${invoice}`, 'Decasa Outlet USA', 'Calle Rafael Eyseric' ],
              },
              {
                image: logo_pdf,
                style: ['logoStyle']
              },
            ],
          },
        ],
        styles: {
          header: {
            fontSize: 10,
            bold: true
          },
          logoStyle: {
            alignment: 'right'
          }
        }
    };

    const pdf = pdfMake.createPdf(pdfDefinitions);

    pdf.open();

  }
}
