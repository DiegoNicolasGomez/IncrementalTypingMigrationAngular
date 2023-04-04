import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExponentialNumberPipe } from './pipes/exponential-number.pipe';

@NgModule({
  declarations: [ExponentialNumberPipe],
  imports: [
    CommonModule
  ],
  exports: [ExponentialNumberPipe]
})
export class SharedModule { }
