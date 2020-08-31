import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySearchComponent } from '../components/currency-search/currency-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrencySearchComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [CurrencySearchComponent, MaterialModule],
  providers: [],
})
export class SharedModule {}
