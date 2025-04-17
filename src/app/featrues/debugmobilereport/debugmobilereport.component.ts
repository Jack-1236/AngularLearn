import {Component, inject, signal} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreConnectionClient, SupplierType} from '../../../api/MobildReporting';
import {NgClass, NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {timeout, TimeoutError} from 'rxjs';


@Component({
  selector: 'app-debugmobilereport',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgForOf, MatButtonModule, NgClass, FormsModule],
  templateUrl: './debugmobilereport.component.html',
  styleUrl: './debugmobilereport.component.scss'
})
export class DebugmobilereportComponent {


  storeStatus = signal(false);
  selectAddress = ["DEBUG", "RELEASE"];

  private readonly debug = "https://jr8qjxj4-44373.asse.devtunnels.ms";
  private readonly release = "https://connect.syncmcr.com";
  private selectedAddress = this.debug;


  private readonly http = inject(HttpClient);
  private storeConnectionAPI = new StoreConnectionClient(this.http, this.selectedAddress);
  readonly selectTypes = Object.values(SupplierType);
  readonly applyFromGroup = new FormGroup({
    storeId: new FormControl(''),
    selectType: new FormControl(''),
  })


  private invoiceFile: File | null = null;
  private productsFile: File[] | null = null;
  private invoiceAndProductFile: File | null = null;

  private intervalId: any = null;

  private isIntervalDisabled = false;


  onSubmit() {
    console.log(this.applyFromGroup.value.selectType);

    const formData = new FormData();

    formData.append('storeId', this.applyFromGroup.value.storeId ?? '0');

    // 添加枚举值（供货商类型）
    formData.append('supplierType', this.applyFromGroup.value.selectType as SupplierType ?? SupplierType.Q);

    // 添加发票文件
    if (this.invoiceFile) {
      formData.append('InvoiceDocuments', this.invoiceFile);
    }

    //添加商品文件
    if (this.productsFile && this.productsFile.length > 0) {
      for (const file of this.productsFile) {
        formData.append('ProductDocuments', file);
      }

    }

    // 添加发票和商品文件（单个）
    if (this.invoiceAndProductFile) {
      formData.append('InvoiceAndProductData', this.invoiceAndProductFile);
    }

    this.http.post(`${this.selectedAddress}/api/Invoices/Upload`, formData).subscribe({
      next: (res) => console.debug(`Response:${res}`),
      error: (err) => console.error(err),
      complete: () => console.info('Upload completed.')
    })

  }

  onInvoiceFileChange($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.invoiceFile = input.files[0];
    }
  }


  onProductFileChange($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.productsFile = Array.from(input.files);
    }
  }


  onInvoiceAndProductFileChange($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.invoiceAndProductFile = input.files[0];
    }
  }


  enabledConnection() {
    this.isIntervalDisabled = true;
    this.intervalId = setInterval(() => {
      if (this.isIntervalDisabled) {
        this.storeConnectionAPI.get().pipe(timeout(2000)).subscribe({
          next: (res) => {
            if (res && res.length > 0) {
              this.storeStatus.set(true);
              clearInterval(this.intervalId);
            } else {
              this.storeStatus.set(false);
            }
          }, error: (e) => {
            if (this.isIntervalDisabled) {
              this.storeStatus.set(false)
            }
            console.error(e)
          }, complete: () => {
            console.info('StoreConnection complete')
          }
        })
      }
    }, 500);
  }

  onAddressSelectionChange($event: any) {
    this.isIntervalDisabled = false;
    clearInterval(this.intervalId);
    this.selectedAddress = $event.value === "DEBUG" ? this.debug : this.release;
    this.storeConnectionAPI = new StoreConnectionClient(this.http, this.selectedAddress);
    console.log($event.value + 'address: ' + this.selectedAddress);
    setTimeout(() => this.enabledConnection(), 3000)
  }


}
