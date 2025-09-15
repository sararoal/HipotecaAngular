import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nueva-hipoteca',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './nueva-hipoteca.component.html',
	styleUrls: ['./nueva-hipoteca.component.scss']
})
export class NuevaHipotecaComponent {
	// Hipoteca 2
	tin2: number | null = null;
	duracion2: number | null = null;
	bonificacion1_2Activa = false;
	bonificacion2_2Activa = false;
	bonificacion1_2: number | null = null;
	bonificacion2_2: number | null = null;
	costeAnualBonificacion1_2: number | null = null;
	costeAnualBonificacion2_2: number | null = null;
	costeSeguroHogarExterno2: number | null = null;
	costeSeguroVidaExterno2: number | null = null;

	// Métodos para bonificaciones dinámicas hipoteca 2
	agregarBonificacion2() {
		this.bonificaciones2.push({ activa: true, nombre: '', porcentaje: 0, coste: 0, editando: false });
	}
	activarEdicionBonificacion2(i: number) {
		if (this.bonificaciones2[i]) this.bonificaciones2[i].editando = true;
	}
	desactivarEdicionBonificacion2(i: number) {
		if (this.bonificaciones2[i]) this.bonificaciones2[i].editando = false;
	}
	eliminarBonificacion2(i: number) {
		this.bonificaciones2.splice(i, 1);
	}
	borrarSesion2() {
		this.banco2 = '';
		this.importe2 = null;
		this.tin2 = null;
		this.duracion2 = null;
		this.bonificacion1_2Activa = false;
		this.bonificacion2_2Activa = false;
		this.bonificacion1_2 = null;
		this.bonificacion2_2 = null;
		this.costeAnualBonificacion1_2 = null;
		this.costeAnualBonificacion2_2 = null;
		this.costeSeguroHogarExterno2 = null;
		this.costeSeguroVidaExterno2 = null;
		this.bonificaciones2 = [];
	}

	// Comparación y resultado
	resultadoComparacion: string | null = null;
	cuotaMensualSinBonificar1: number = 0;
	cuotaMensualSinBonificar2: number = 0;
	cuotaMensualBonificada1: number = 0;
	cuotaMensualBonificada2: number = 0;
	cuotaMensualConSeguros1: number = 0;
	cuotaMensualConSeguros2: number = 0;
	costeTotalIntereses1: number = 0;
	costeTotalIntereses2: number = 0;

	compararHipotecas() {
		// Lógica de comparación (simulada)
		this.cuotaMensualSinBonificar1 = 500;
		this.cuotaMensualSinBonificar2 = 520;
		this.cuotaMensualBonificada1 = 480;
		this.cuotaMensualBonificada2 = 500;
		this.cuotaMensualConSeguros1 = 490;
		this.cuotaMensualConSeguros2 = 510;
		this.costeTotalIntereses1 = 30000;
		this.costeTotalIntereses2 = 32000;
		this.resultadoComparacion = 'Hipoteca 1 tiene mejores condiciones.';
	}
	mostrarFormulario = false;
	banco1 = '';
	banco2 = '';
	importe1: number | null = null;
	importe2: number | null = null;
	tin1: number | null = null;
	duracion1: number | null = null;
	bonificacion1Activa = false;
	bonificacion2Activa = false;
	bonificacion1: number | null = null;
	bonificacion2: number | null = null;
	costeAnualBonificacion1: number | null = null;
	costeAnualBonificacion2: number | null = null;
	costeSeguroHogarExterno1: number | null = null;
	costeSeguroVidaExterno1: number | null = null;
	bonificaciones1: any[] = [];
	bonificaciones2: any[] = [];

	constructor(private router: Router) {}

	abrirSeguroExterno() {
		this.router.navigate(['/seguro-externo']);
	}

	guardarSesion1() {
		// Lógica para guardar los datos de la hipoteca 1
	}
	guardarSesion2() {
		// Lógica para guardar los datos de la hipoteca 2
	}
	borrarSesion1() {
		// Lógica para borrar los datos de la hipoteca 1
		this.banco1 = '';
		this.importe1 = null;
		this.tin1 = null;
		this.duracion1 = null;
		this.bonificacion1Activa = false;
		this.bonificacion1 = null;
		this.costeAnualBonificacion1 = null;
		this.costeSeguroHogarExterno1 = null;
		this.costeSeguroVidaExterno1 = null;
		this.bonificaciones1 = [];
	}
	agregarBonificacion1() {
		this.bonificaciones1.push({ activa: true, nombre: '', porcentaje: 0, coste: 0, editando: false });
	}
	activarEdicionBonificacion1(i: number) {
		if (this.bonificaciones1[i]) this.bonificaciones1[i].editando = true;
	}
	desactivarEdicionBonificacion1(i: number) {
		if (this.bonificaciones1[i]) this.bonificaciones1[i].editando = false;
	}
	eliminarBonificacion1(i: number) {
		this.bonificaciones1.splice(i, 1);
	}
	// Repetir para bonificaciones2 si es necesario

	volverAlInicio() {
		this.mostrarFormulario = false;
	}
}
