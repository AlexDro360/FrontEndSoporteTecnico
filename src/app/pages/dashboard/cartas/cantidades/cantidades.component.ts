import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cantidades',
  templateUrl: './cantidades.component.html',
  styleUrls: ['./cantidades.component.scss']
})
export class CantidadesComponent {
  @Input() cssClass: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';
  @Input() icono: string = '';
  @Input() colorIcono: string = '';
  @Input() valor: number = 0;
  constructor() { }

  ngOnInit(): void { }
}
