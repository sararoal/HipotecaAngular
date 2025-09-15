import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HipotecaAnalisisComponent } from './features/hipoteca-analisis/hipoteca-analisis.component';
import { NuevaHipotecaComponent } from './features/nueva-hipoteca/nueva-hipoteca.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HipotecaAnalisisComponent, NuevaHipotecaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('HipotecaAngular');
}
