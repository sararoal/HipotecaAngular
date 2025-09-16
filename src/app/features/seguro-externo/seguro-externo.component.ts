import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-seguro-externo',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './seguro-externo.component.html',
	styleUrls: ['./seguro-externo.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class SeguroExternoComponent {
	bonificacionBancoHogar: any;
	importeSeguroExternoVida: any;
	importeSeguroExternoHogar: any;
	importeSeguroBancoVida: any;
	bonificacionBancoVida: any;
	importeSeguroBancoHogar: any;
	importeHipoteca: any;
	tinBonificado: any;
	aniosHipoteca: any;
	mostrarBloqueHogar: any;
	mostrarBloqueVida: any;
	resultadoConveniencia: string = '';
	activarSimulacion: boolean = false;
	mensajeCamposVacios: string = '';
	erroresCampos: {[key: string]: string} = {};

	constructor() {
		this.cargarDatosGuardados();
	}

	ngOnInit() {
		this.cargarDatosGuardados();
		const importeGuardado = localStorage.getItem('importe1');
		if (importeGuardado !== null && importeGuardado !== '') {
			// Si se usa importe1, descomentar la siguiente línea:
			// this.importe1 = +importeGuardado;
		}
	}

	guardarDatos() {
		const datos = {
			importeHipoteca: this.importeHipoteca,
			tinBonificado: this.tinBonificado,
			aniosHipoteca: this.aniosHipoteca,
			importeSeguroBancoHogar: this.importeSeguroBancoHogar,
			bonificacionBancoHogar: this.bonificacionBancoHogar,
			importeSeguroExternoHogar: this.importeSeguroExternoHogar,
			importeSeguroBancoVida: this.importeSeguroBancoVida,
			bonificacionBancoVida: this.bonificacionBancoVida,
			importeSeguroExternoVida: this.importeSeguroExternoVida,
			mostrarBloqueHogar: this.mostrarBloqueHogar,
			mostrarBloqueVida: this.mostrarBloqueVida
		};
		localStorage.setItem('datosHipoteca', JSON.stringify(datos));
	}

	cargarDatosGuardados() {
		const datos = localStorage.getItem('datosHipoteca');
		if (datos) {
			const obj = JSON.parse(datos);
			Object.assign(this, obj);
		}
	}

	volverAlInicio() {
		window.location.href = '/';
	}

	borrarSeguro() {
		this.importeHipoteca = '';
		this.tinBonificado = '';
		this.aniosHipoteca = '';
		this.importeSeguroExternoHogar = '';
		this.importeSeguroBancoHogar = '';
		this.bonificacionBancoHogar = '';
		this.importeSeguroBancoVida = '';
		this.bonificacionBancoVida = '';
		this.importeSeguroExternoVida = '';
		this.resultadoConveniencia = '';
		this.mostrarBloqueHogar = false;
		this.mostrarBloqueVida = false;
		localStorage.removeItem('datosHipoteca');
	}

	calcularConveniencia() {
		this.guardarDatos();
		// Solo tabla comparativa
		const P = 129000;
		const n = 360;
		const i_b = 0.022;
		const i_s_hogar = 0.0255;
		const i_s_vida = 0.0235;
		const i_s_ambos = 0.027;

		const seguro_hogar_banco = 486.1;
		const seguro_vida_banco = 259.6;
		const seguro_hogar_ext = 200;
		const seguro_vida_ext = 200;

		function cuota_mensual(P: number, r: number, n: number): number {
			return P * r / (1 - Math.pow(1 + r, -n));
		}

		const r_b = i_b / 12;
		const r_s_hogar = i_s_hogar / 12;
		const r_s_vida = i_s_vida / 12;
		const r_s_ambos = i_s_ambos / 12;

		const cuota_banco = cuota_mensual(P, r_b, n);
		const cuota_hogar_ext = cuota_mensual(P, r_s_hogar, n);
		const cuota_vida_ext = cuota_mensual(P, r_s_vida, n);
		const cuota_ambos_ext = cuota_mensual(P, r_s_ambos, n);

		function seguro_mensual(hogar: number, vida: number): number {
			return hogar / 12 + vida / 12;
		}

		const seguro_banco = seguro_mensual(seguro_hogar_banco, seguro_vida_banco);
		const seguro_hogar_ext_total = seguro_mensual(seguro_hogar_ext, seguro_vida_banco);
		const seguro_vida_ext_total = seguro_mensual(seguro_hogar_banco, seguro_vida_ext);
		const seguro_ambos_ext_total = seguro_mensual(seguro_hogar_ext, seguro_vida_ext);

		const total_banco = cuota_banco + seguro_banco;
		const total_hogar_ext = cuota_hogar_ext + seguro_hogar_ext_total;
		const total_vida_ext = cuota_vida_ext + seguro_vida_ext_total;
		const total_ambos_ext = cuota_ambos_ext + seguro_ambos_ext_total;

		const total_banco_anual = total_banco * 12;
		const total_hogar_ext_anual = total_hogar_ext * 12;
		const total_vida_ext_anual = total_vida_ext * 12;
		const total_ambos_ext_anual = total_ambos_ext * 12;

		const base_total = total_banco;
		const base_total_anual = total_banco_anual;

		const escenarios = [];
		if (this.mostrarBloqueHogar && this.mostrarBloqueVida) {
			escenarios.push({
				nombre: 'Ambos seguros en el banco',
				cuota: cuota_banco,
				seguro: seguro_banco,
				total: total_banco,
				totalAnual: total_banco_anual,
				ahorro: 0,
				ahorroAnual: 0
			});
			escenarios.push({
				nombre: 'Hogar externo, vida en el banco',
				cuota: cuota_hogar_ext,
				seguro: seguro_hogar_ext_total,
				total: total_hogar_ext,
				totalAnual: total_hogar_ext_anual,
				ahorro: base_total - total_hogar_ext,
				ahorroAnual: base_total_anual - total_hogar_ext_anual
			});
			escenarios.push({
				nombre: 'Vida externo, hogar en el banco',
				cuota: cuota_vida_ext,
				seguro: seguro_vida_ext_total,
				total: total_vida_ext,
				totalAnual: total_vida_ext_anual,
				ahorro: base_total - total_vida_ext,
				ahorroAnual: base_total_anual - total_vida_ext_anual
			});
			escenarios.push({
				nombre: 'Ambos seguros externos',
				cuota: cuota_ambos_ext,
				seguro: seguro_ambos_ext_total,
				total: total_ambos_ext,
				totalAnual: total_ambos_ext_anual,
				ahorro: base_total - total_ambos_ext,
				ahorroAnual: base_total_anual - total_ambos_ext_anual
			});
		} else if (this.mostrarBloqueHogar && !this.mostrarBloqueVida) {
			escenarios.push({
				nombre: 'Seguro de hogar en el banco',
				cuota: cuota_banco,
				seguro: seguro_banco,
				total: total_banco,
				totalAnual: total_banco_anual,
				ahorro: 0,
				ahorroAnual: 0
			});
			escenarios.push({
				nombre: 'Seguro de hogar externo',
				cuota: cuota_hogar_ext,
				seguro: seguro_hogar_ext_total,
				total: total_hogar_ext,
				totalAnual: total_hogar_ext_anual,
				ahorro: total_banco - total_hogar_ext,
				ahorroAnual: total_banco_anual - total_hogar_ext_anual
			});
		} else if (!this.mostrarBloqueHogar && this.mostrarBloqueVida) {
			escenarios.push({
				nombre: 'Seguro de vida en el banco',
				cuota: cuota_banco,
				seguro: seguro_banco,
				total: total_banco,
				totalAnual: total_banco_anual,
				ahorro: 0,
				ahorroAnual: 0
			});
			escenarios.push({
				nombre: 'Seguro de vida externo',
				cuota: cuota_vida_ext,
				seguro: seguro_vida_ext_total,
				total: total_vida_ext,
				totalAnual: total_vida_ext_anual,
				ahorro: total_banco - total_vida_ext,
				ahorroAnual: total_banco_anual - total_vida_ext_anual
			});
		}

		let tabla = `<table style='width:100%;border-collapse:collapse;'>`;
		tabla += `<tr><th>Escenario</th><th>Cuota (€)</th><th>Seguro (€)</th><th>Total mensual (€)</th></tr>`;
		for (const e of escenarios) {
			tabla += `<tr>`;
			tabla += `<td>${e.nombre}</td>`;
			tabla += `<td>${e.cuota.toFixed(2)}</td>`;
			tabla += `<td>${e.seguro.toFixed(2)}</td>`;
			tabla += `<td>${e.total.toFixed(2)}</td>`;
			tabla += `</tr>`;
		}
		tabla += `</table>`;

		this.resultadoConveniencia = tabla;
	}

       onSubmit(form: any) {
	       this.erroresCampos = {};
	       let camposObligatorios = [
		       { nombre: 'importeHipoteca', label: 'Importe de la hipoteca' },
		       { nombre: 'tinBonificado', label: 'TIN bonificado' },
		       { nombre: 'aniosHipoteca', label: 'Años de hipoteca' }
	       ];
	       if (this.mostrarBloqueHogar) {
		       camposObligatorios.push(
			       { nombre: 'importeSeguroBancoHogar', label: 'Coste anual (banco hogar)' },
			       { nombre: 'bonificacionBancoHogar', label: 'Bonificación (banco hogar)' },
			       { nombre: 'importeSeguroExternoHogar', label: 'Coste anual (externo hogar)' }
		       );
	       }
	       if (this.mostrarBloqueVida) {
		       camposObligatorios.push(
			       { nombre: 'importeSeguroBancoVida', label: 'Coste anual (banco vida)' },
			       { nombre: 'bonificacionBancoVida', label: 'Bonificación (banco vida)' },
			       { nombre: 'importeSeguroExternoVida', label: 'Coste anual (externo vida)' }
		       );
	       }
	       let algunoVacio = false;
	       for (const campo of camposObligatorios) {
		       if ((this as any)[campo.nombre] === undefined || (this as any)[campo.nombre] === null || (this as any)[campo.nombre] === '') {
			       this.erroresCampos[campo.nombre] = `Este campo es obligatorio.`;
			       algunoVacio = true;
		       }
	       }
	       if (!algunoVacio) {
		       this.mensajeCamposVacios = '';
		       this.calcularConveniencia();
	       } else {
		       this.mensajeCamposVacios = '';
	       }
       }
}
