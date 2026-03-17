import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../directives/reveal.directive';
import { CounterDirective } from '../directives/counter.directive';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RevealDirective,
    CounterDirective],
  exports: [
    RevealDirective,
    CounterDirective // Muy importante exportarlas para que otros módulos las vean
  ]
})
export class SharedModule { }