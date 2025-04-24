import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreConnectionClient, SupplierType} from '../../../../api/MobildReporting';
import {timeout} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebugMobileReportService {
  private readonly debug = "https://jr8qjxj4-44373.asse.devtunnels.ms";
  private readonly release = "https://connect.syncmcr.com";
  private selectedAddress = this.debug;
  private readonly http = inject(HttpClient);
  private storeConnectionAPI = new StoreConnectionClient(this.http, this.selectedAddress);

  constructor() {
  }


  resetServiceUrl(environment:string){
    this.selectedAddress = environment === "DEBUG" ? this.debug : this.release;
    this.storeConnectionAPI = new StoreConnectionClient(this.http, this.selectedAddress);
    console.log(environment + 'address: ' + this.selectedAddress);
  }

  upload(invoiceFile: File | null,
         productsFile: File[] | null,
         invoiceAndProductFile: File | null,
         selectType: string,
         storeId: string
  ) {
    console.log(selectType);

    const formData = new FormData();

    formData.append('storeId', storeId ?? '0');

    // 添加枚举值（供货商类型）
    formData.append('supplierType', selectType as SupplierType ?? SupplierType.Q);

    // 添加发票文件
    if (invoiceFile) {
      formData.append('InvoiceDocuments', invoiceFile);
    }

    //添加商品文件
    if (productsFile && productsFile.length > 0) {
      for (const file of productsFile) {
        formData.append('ProductDocuments', file);
      }

    }

    // 添加发票和商品文件（单个）
    if (invoiceAndProductFile) {
      formData.append('InvoiceAndProductData', invoiceAndProductFile);
    }

    this.http.post(`${this.selectedAddress}/api/Invoices/Upload`, formData).subscribe({
      next: (res) => console.debug(`Response:${res}`),
      error: (err) => console.error(err),
      complete: () => console.info('Upload completed.')
    })

  }

  connection() {
    return this.storeConnectionAPI.get().pipe(timeout(2000));
  }
}
