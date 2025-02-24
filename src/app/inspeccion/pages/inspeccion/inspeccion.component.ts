import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.css']
})
export class InspeccionComponent {
  constructor() {
  }
  @Input() playerName: string = "Lionel Messi";
  @Input() rating: number = 93;
  @Input() position: string = "RW";
  @Input() playerImage: string = "https://www.fifplay.com/img/public/fifa-23-messi.png";
  @Input() nationFlag: string = "https://www.worldometers.info/img/flags/ar-flag.gif";
  @Input() clubLogo: string = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Inter_Miami_CF_logo.svg/1200px-Inter_Miami_CF_logo.svg.png";
  @Input() pace: number = 85;
  @Input() shooting: number = 91;
  @Input() passing: number = 90;
  @Input() dribbling: number = 95;
  @Input() defending: number = 40;
  @Input() physical: number = 75;
  
}
