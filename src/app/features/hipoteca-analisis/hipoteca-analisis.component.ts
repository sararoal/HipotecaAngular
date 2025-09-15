import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaHipotecaComponent } from '../nueva-hipoteca/nueva-hipoteca.component';

@Component({
	selector: 'app-hipoteca-analisis',
	standalone: true,
	imports: [CommonModule, NuevaHipotecaComponent],
	templateUrl: './hipoteca-analisis.component.html',
})
export class HipotecaAnalisisComponent {
	// Aquí puedes añadir lógica adicional si lo necesitas
}
