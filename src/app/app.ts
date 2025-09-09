import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HipotecaAnalisisComponent } from './hipoteca-analisis/hipoteca-analisis';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HipotecaAnalisisComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('HipotecaAngular');
}
