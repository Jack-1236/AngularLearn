import {Component, Inject, inject, signal} from '@angular/core';
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
import {DebugMobileReportService} from './service/debug-mobile-report.service';


@Component({
  selector: 'app-debugmobilereport',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgForOf, MatButtonModule, NgClass, FormsModule],
  templateUrl: './debugmobilereport.component.html',
  styleUrl: './debugmobilereport.component.scss'
})
export class DebugmobilereportComponent {
  storeStatus = signal(false);
  selectAddress = ["DEBUG", "RELEASE"];
  readonly selectTypes = Object.values(SupplierType);
  readonly applyFromGroup = new FormGroup({
    storeId: new FormControl(''),
    selectType: new FormControl(''),
  })

  private readonly mobileService = inject(DebugMobileReportService);
  private invoiceFile: File | null = null;
  private productsFile: File[] | null = null;
  private invoiceAndProductFile: File | null = null;

  private intervalId: any = null;

  private isIntervalDisabled = false;


  onSubmit() {
    this.mobileService.upload(
      this.invoiceFile,
      this.productsFile,
      this.invoiceAndProductFile,
      this.applyFromGroup.value.selectType ?? 'A',
      this.applyFromGroup.value.storeId ?? '2');
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
        this.mobileService.connection().subscribe({
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
    this.mobileService.resetServiceUrl($event.value);
    setTimeout(() => this.enabledConnection(), 3000)
  }


}
