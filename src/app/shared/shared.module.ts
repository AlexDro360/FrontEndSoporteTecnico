import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RellenaZeroPipe } from '../pipe/rellena-zero.pipe';

@NgModule({
  declarations: [RellenaZeroPipe],
  exports: [RellenaZeroPipe],
  imports: [CommonModule]
})
export class SharedModule {}
