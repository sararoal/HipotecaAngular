import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hipoteca-analisis',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hipoteca-analisis.html',
  styleUrls: ['./hipoteca-analisis.css']
})
export class HipotecaAnalisisComponent {
  resultadoComparacion: string | null = null;

  // HIPOTECA 1
  banco1: string = '';
  importe1: number | null = null;
  tin1: number | null = null;
  duracion1: number | null = null;
  nombreBonificacion1: string = 'Seguro de Hogar';
  bonificacion1: number | null = null;
  costeAnualBonificacion1: number | null = null;
  nombreBonificacion2: string = 'Seguro de Vida';
  bonificacion2: number | null = null;
  costeAnualBonificacion2: number | null = null;
  bonificaciones1: any[] = [];
  resultado1: string | null = null;

  // HIPOTECA 2
  banco2: string = '';
  importe2: number | null = null;
  tin2: number | null = null;
  duracion2: number | null = null;
  nombreBonificacion1_2: string = 'Seguro de Hogar';
  bonificacion1_2: number | null = null;
  costeAnualBonificacion1_2: number | null = null;
  nombreBonificacion2_2: string = 'Seguro de Vida';
  bonificacion2_2: number | null = null;
  costeAnualBonificacion2_2: number | null = null;
  bonificaciones2: any[] = [];
  resultado2: string | null = null;

  // Estados para edición de nombre de bonificaciones fijas
  editandoHogar1: boolean = false;
  editandoVida1: boolean = false;
  editandoHogar2: boolean = false;
  editandoVida2: boolean = false;

  constructor() {
    this.cargarSesion1();
    this.cargarSesion2();
  }

  // Métodos para bonificaciones Hipoteca 1
  agregarBonificacion1() {
    this.bonificaciones1.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true });
    this.guardarSesion1();
  }
  eliminarBonificacion1(i: number) {
    this.bonificaciones1.splice(i, 1);
    this.guardarSesion1();
  }
  borrarSesion1() {
    localStorage.removeItem('hipotecaSesion1');
    this.banco1 = '';
    this.importe1 = null;
    this.tin1 = null;
    this.duracion1 = null;
    this.nombreBonificacion1 = 'Seguro de Hogar';
    this.bonificacion1 = null;
    this.costeAnualBonificacion1 = null;
    this.nombreBonificacion2 = 'Seguro de Vida';
    this.bonificacion2 = null;
    this.costeAnualBonificacion2 = null;
    this.bonificaciones1 = [];
    this.resultado1 = null;
  }

  // Métodos para bonificaciones Hipoteca 2
  agregarBonificacion2() {
    this.bonificaciones2.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true });
    this.guardarSesion2();
  }
  eliminarBonificacion2(i: number) {
    this.bonificaciones2.splice(i, 1);
    this.guardarSesion2();
  }
  borrarSesion2() {
    localStorage.removeItem('hipotecaSesion2');
    this.banco2 = '';
    this.importe2 = null;
    this.tin2 = null;
    this.duracion2 = null;
    this.nombreBonificacion1_2 = 'Seguro de Hogar';
    this.bonificacion1_2 = null;
    this.costeAnualBonificacion1_2 = null;
    this.nombreBonificacion2_2 = 'Seguro de Vida';
    this.bonificacion2_2 = null;
    this.costeAnualBonificacion2_2 = null;
    this.bonificaciones2 = [];
    this.resultado2 = null;
  }

  // -------------------- Función general de comparación --------------------
  compararHipotecas() {
    const calcularDatosHipoteca = (
      capital: number,
      tin: number,
      duracion: number,
      bonif1: number,
      bonif2: number,
      costeBonif1: number,
      costeBonif2: number
    ) => {
      const meses = duracion * 12;
      const tinBonificado = (tin / 100) - ((bonif1 + bonif2) / 100);
      const interesMensual = tinBonificado / 12;

      const cuotaMensual = capital * (interesMensual * Math.pow(1 + interesMensual, meses)) /
                           (Math.pow(1 + interesMensual, meses) - 1);
      const totalPagado = cuotaMensual * meses;
      const interesesTotales = totalPagado - capital;
      const costeBonificaciones = (costeBonif1 || 0 + costeBonif2 || 0) * duracion;
      const costeTotal = interesesTotales + costeBonificaciones;

      return { cuotaMensual, interesesTotales, costeBonificaciones, costeTotal };
    };

    if (!this.importe1 || !this.tin1 || !this.duracion1 || !this.importe2 || !this.tin2 || !this.duracion2) {
      this.resultadoComparacion = 'Faltan datos para comparar ambas hipotecas.';
      return;
    }

    const datosHipoteca1 = calcularDatosHipoteca(
      this.importe1,
      this.tin1,
      this.duracion1,
      this.bonificacion1 || 0,
      this.bonificacion2 || 0,
      this.costeAnualBonificacion1 || 0,
      this.costeAnualBonificacion2 || 0
    );

    const datosHipoteca2 = calcularDatosHipoteca(
      this.importe2,
      this.tin2,
      this.duracion2,
      this.bonificacion1_2 || 0,
      this.bonificacion2_2 || 0,
      this.costeAnualBonificacion1_2 || 0,
      this.costeAnualBonificacion2_2 || 0
    );

    const mejor = datosHipoteca1.costeTotal < datosHipoteca2.costeTotal ? this.banco1 || 'Hipoteca 1' : this.banco2 || 'Hipoteca 2';
    const ahorroNeto = Math.abs(datosHipoteca1.costeTotal - datosHipoteca2.costeTotal);

    this.resultadoComparacion =
      `🏦 ${this.banco1 || 'Hipoteca 1'}:
      • Cuota mensual: ${datosHipoteca1.cuotaMensual.toFixed(2)} €
      • Intereses totales: ${datosHipoteca1.interesesTotales.toFixed(2)} €
      • Coste bonificaciones: ${datosHipoteca1.costeBonificaciones.toFixed(2)} €
      • Coste total (intereses + bonificaciones): ${datosHipoteca1.costeTotal.toFixed(2)} €

      🏦 ${this.banco2 || 'Hipoteca 2'}:
      • Cuota mensual: ${datosHipoteca2.cuotaMensual.toFixed(2)} €
      • Intereses totales: ${datosHipoteca2.interesesTotales.toFixed(2)} €
      • Coste bonificaciones: ${datosHipoteca2.costeBonificaciones.toFixed(2)} €
      • Coste total (intereses + bonificaciones): ${datosHipoteca2.costeTotal.toFixed(2)} €

      💡 Ahorro neto considerando bonificaciones: ${ahorroNeto.toFixed(2)} € a favor de ${mejor}`;
  }

  // -------------------- Guardar / Cargar Sesión Hipoteca 1 --------------------
  guardarSesion1() {
    localStorage.setItem('hipotecaSesion1', JSON.stringify({
      banco1: this.banco1, importe1: this.importe1, tin1: this.tin1, duracion1: this.duracion1,
      nombreBonificacion1: this.nombreBonificacion1, bonificacion1: this.bonificacion1,
      costeAnualBonificacion1: this.costeAnualBonificacion1,
      nombreBonificacion2: this.nombreBonificacion2, bonificacion2: this.bonificacion2,
      costeAnualBonificacion2: this.costeAnualBonificacion2,
      bonificaciones1: this.bonificaciones1, resultado1: this.resultado1
    }));
  }

  cargarSesion1() {
    const datos = localStorage.getItem('hipotecaSesion1');
    if (datos) {
      const obj = JSON.parse(datos);
      Object.assign(this, obj);
    }
  }

  // -------------------- Guardar / Cargar Sesión Hipoteca 2 --------------------
  guardarSesion2() {
    localStorage.setItem('hipotecaSesion2', JSON.stringify({
      banco2: this.banco2, importe2: this.importe2, tin2: this.tin2, duracion2: this.duracion2,
      nombreBonificacion1_2: this.nombreBonificacion1_2, bonificacion1_2: this.bonificacion1_2,
      costeAnualBonificacion1_2: this.costeAnualBonificacion1_2,
      nombreBonificacion2_2: this.nombreBonificacion2_2, bonificacion2_2: this.bonificacion2_2,
      costeAnualBonificacion2_2: this.costeAnualBonificacion2_2,
      bonificaciones2: this.bonificaciones2, resultado2: this.resultado2
    }));
  }

  cargarSesion2() {
    const datos = localStorage.getItem('hipotecaSesion2');
    if (datos) {
      const obj = JSON.parse(datos);
      Object.assign(this, obj);
    }
  }
}
