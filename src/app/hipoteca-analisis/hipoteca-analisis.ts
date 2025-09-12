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
  activarEdicionBonificacion1(i: number) {
    this.bonificaciones1[i].editando = true;
    this.bonificaciones1 = [...this.bonificaciones1];
  }
  desactivarEdicionBonificacion1(i: number) {
  this.bonificaciones1[i].editando = false;
  this.bonificaciones1 = [...this.bonificaciones1];
  this.guardarSesion1();
  }

  activarEdicionBonificacion2(i: number) {
    this.bonificaciones2[i].editando = true;
    this.bonificaciones2 = [...this.bonificaciones2];
  }
  desactivarEdicionBonificacion2(i: number) {
  this.bonificaciones2[i].editando = false;
  this.bonificaciones2 = [...this.bonificaciones2];
  this.guardarSesion2();
  }
  // Variables para mostrar en la tabla comparativa
  cuotaMensual1: string = '';
  cuotaMensual2: string = '';
  costeTotal1: string = '';
  costeTotal2: string = '';
  interesesTotales1: string = '';
  interesesTotales2: string = '';
  interesesTotalesAños1: string = '';
  interesesTotalesAños2: string = '';
  costeBonificaciones1: string = '';
  costeBonificaciones2: string = '';
  resultadoComparacion: string | null = null;

  // HIPOTECA 1
  banco1: string = '';
  importe1: number | null = null;
  tin1: number | null = null;
  duracion1: number | null = null;
  nombreBonificacion1: string = 'Seguro de Hogar';
  bonificacion1: number | null = null;
  costeAnualBonificacion1: number | null = null;
  bonificacion1Activa: boolean = true;
  nombreBonificacion2: string = 'Seguro de Vida';
  bonificacion2: number | null = null;
  costeAnualBonificacion2: number | null = null;
  bonificacion2Activa: boolean = true;
  bonificaciones1: any[] = [];
  costeSeguroHogarExterno1: number | null = null;
  costeSeguroVidaExterno1: number | null = null;
  resultado1: string | null = null;
  cuotaMensualSinBonificar1: number = 0;
  cuotaMensualBonificada1: number = 0;
  cuotaMensualConSeguros1: number = 0;
  costeTotalIntereses1: number = 0;

  // HIPOTECA 2
  banco2: string = '';
  importe2: number | null = null;
  tin2: number | null = null;
  duracion2: number | null = null;
  nombreBonificacion1_2: string = 'Seguro de Hogar';
  bonificacion1_2: number | null = null;
  costeAnualBonificacion1_2: number | null = null;
  bonificacion1_2Activa: boolean = true;
  nombreBonificacion2_2: string = 'Seguro de Vida';
  bonificacion2_2: number | null = null;
  costeAnualBonificacion2_2: number | null = null;
  bonificacion2_2Activa: boolean = true;
  bonificaciones2: any[] = [];
  costeSeguroHogarExterno2: number | null = null;
  costeSeguroVidaExterno2: number | null = null;
  resultado2: string | null = null;
  cuotaMensualSinBonificar2: number = 0;
  cuotaMensualBonificada2: number = 0;
  cuotaMensualConSeguros2: number = 0;
  costeTotalIntereses2: number = 0;

  // Estados para edición de nombre de bonificaciones fijas
  editandoHogar1: boolean = false;
  editandoVida1: boolean = false;
  editandoHogar2: boolean = false;
  editandoVida2: boolean = false;

  // Métodos para salir del modo edición y guardar nombre de bonificación fija
  finalizarEdicionHogar1() {
    this.editandoHogar1 = false;
    this.guardarSesion1();
  }
  finalizarEdicionVida1() {
    this.editandoVida1 = false;
    this.guardarSesion1();
  }
  finalizarEdicionHogar2() {
    this.editandoHogar2 = false;
    this.guardarSesion2();
  }
  finalizarEdicionVida2() {
    this.editandoVida2 = false;
    this.guardarSesion2();
  }

  constructor() {
    this.cargarSesion1();
    this.cargarSesion2();
  }

  // Métodos para bonificaciones Hipoteca 1
  agregarBonificacion1() {
    this.bonificaciones1.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true, activa: true });
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
    this.bonificaciones2.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true, activa: true });
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
  // Calcula las cuotas sin bonificar antes de comparar
  this.calcularCuotaSinBonificar1();
  this.calcularCuotaSinBonificar2();


  // Asignar valores para la tabla
  this.cuotaMensual1 = this.cuotaMensualSinBonificar1.toFixed(2) + ' €';
  this.cuotaMensual2 = this.cuotaMensualSinBonificar2.toFixed(2) + ' €';

  // Asignar cuota bonificada usando la función que suma todas las bonificaciones activas
  this.cuotaMensualBonificada1 = this.calcularCuotaBonificada1();
  this.cuotaMensualBonificada2 = this.calcularCuotaBonificada2();

this.cuotaMensualConSeguros1 = this.calcularCuotaBonificadaConSeguros1();
this.cuotaMensualConSeguros2 = this.calcularCuotaBonificadaConSeguros2();

    const calcularDatosHipoteca = (
      capital: number,
      tin: number,
      duracion: number,
      bonifFijas: { porcentaje: number, costeAnual: number }[],
      bonifDinamicas: any[]
    ) => {
      const meses = duracion * 12;
      // Suma de bonificaciones fijas y dinámicas
      const bonifTotal = bonifFijas.reduce((acc, b) => acc + (b.porcentaje || 0), 0) + bonifDinamicas.reduce((acc, b) => acc + (b.porcentaje || 0), 0);
      const costeBonifTotal = bonifFijas.reduce((acc, b) => acc + (b.costeAnual || 0), 0) + bonifDinamicas.reduce((acc, b) => acc + (b.costeAnual || 0), 0);
      const tinBonificado = tin - bonifTotal;
      const interesMensual = (tinBonificado / 100) / 12;

      const cuotaMensual = capital * (interesMensual * Math.pow(1 + interesMensual, meses)) /
                           (Math.pow(1 + interesMensual, meses) - 1);
      const totalPagado = cuotaMensual * meses;
      const interesesTotales = totalPagado - capital;
      const costeBonificaciones = costeBonifTotal * duracion;
      const costeTotal = interesesTotales + costeBonificaciones + capital;

      return { cuotaMensual, interesesTotales, costeBonificaciones, costeTotal };
    };

    if (!this.importe1 || !this.tin1 || !this.duracion1 || !this.importe2 || !this.tin2 || !this.duracion2) {
      this.resultadoComparacion = 'Faltan datos para comparar ambas hipotecas.';
      return;
    }

    // Filtrar bonificaciones fijas activas
    const bonifFijas1 = [];
    if (this.bonificacion1Activa) {
      bonifFijas1.push({ porcentaje: this.bonificacion1 || 0, costeAnual: this.costeAnualBonificacion1 || 0 });
    }
    if (this.bonificacion2Activa) {
      bonifFijas1.push({ porcentaje: this.bonificacion2 || 0, costeAnual: this.costeAnualBonificacion2 || 0 });
    }
    const bonifFijas2 = [];
    if (this.bonificacion1_2Activa) {
      bonifFijas2.push({ porcentaje: this.bonificacion1_2 || 0, costeAnual: this.costeAnualBonificacion1_2 || 0 });
    }
    if (this.bonificacion2_2Activa) {
      bonifFijas2.push({ porcentaje: this.bonificacion2_2 || 0, costeAnual: this.costeAnualBonificacion2_2 || 0 });
    }
    // Filtrar bonificaciones dinámicas activas
    const bonifDinamicas1 = this.bonificaciones1.filter(b => b.activa);
    const bonifDinamicas2 = this.bonificaciones2.filter(b => b.activa);

    // Añadir coste seguro externo si el seguro de hogar está desactivado
    let costeExtra1 = 0;
    let costeExtra2 = 0;
    if (!this.bonificacion1Activa && this.costeSeguroHogarExterno1) {
      costeExtra1 = this.costeSeguroHogarExterno1 * (this.duracion1 || 0);
    }
    if (!this.bonificacion1_2Activa && this.costeSeguroHogarExterno2) {
      costeExtra2 = this.costeSeguroHogarExterno2 * (this.duracion2 || 0);
    }

    const datosHipoteca1 = calcularDatosHipoteca(
      this.importe1,
      this.tin1,
      this.duracion1,
      bonifFijas1,
      bonifDinamicas1
    );
    const datosHipoteca2 = calcularDatosHipoteca(
      this.importe2,
      this.tin2,
      this.duracion2,
      bonifFijas2,
      bonifDinamicas2
    );

  // Asignar valores para la tabla
  this.cuotaMensual1 = this.cuotaMensualSinBonificar1.toFixed(2) + ' €';
  this.cuotaMensual2 = this.cuotaMensualSinBonificar2.toFixed(2) + ' €';

  // Asignar cuota bonificada usando la función que suma todas las bonificaciones activas
  this.cuotaMensualBonificada1 = this.calcularCuotaBonificada1();
  this.cuotaMensualBonificada2 = this.calcularCuotaBonificada2();

  // Coste total de intereses en x años
  this.interesesTotalesAños1 = `${datosHipoteca1.interesesTotales.toFixed(2)} € en ${this.duracion1} años`;
  this.interesesTotalesAños2 = `${datosHipoteca2.interesesTotales.toFixed(2)} € en ${this.duracion2} años`;

    const mejor = datosHipoteca1.costeTotal < datosHipoteca2.costeTotal ? this.banco1 || 'Hipoteca 1' : this.banco2 || 'Hipoteca 2';
    const ahorroNeto = Math.abs(datosHipoteca1.costeTotal - datosHipoteca2.costeTotal);

    this.resultadoComparacion =
      `💡 Resultado comparativo: La hipoteca más barata es ${mejor}.`;

  // Ejemplo de cálculo (pon esto en compararHipotecas o donde corresponda)
  this.costeTotalIntereses1 = +(datosHipoteca1.interesesTotales || 0).toFixed(2);
  this.costeTotalIntereses2 = +(datosHipoteca2.interesesTotales || 0).toFixed(2);

  // Convierte los nombres de banco a mayúsculas antes de mostrar el resultado
  this.banco1 = (this.banco1 || '').toUpperCase();
  this.banco2 = (this.banco2 || '').toUpperCase();
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

  // Hipoteca 1
  bonificacionVida1Activa = false;
  nombreBonificacionVida1 = '';
  porcentajeVida1 = 0;
  costeVida1 = 0;

  // Hipoteca 2
  bonificacionVida2Activa = false;
  nombreBonificacionVida2 = '';
  porcentajeVida2 = 0;
  costeVida2 = 0;

  // Calcula la cuota mensual sin bonificar para Hipoteca 1
calcularCuotaSinBonificar1() {
  const importe = this.importe1;
  const tinAnual = this.tin1 ?? 0;
  const meses = (this.duracion1 ?? 0) * 12;
  const i = tinAnual / 12 / 100;
  if (importe && tinAnual && meses) {
    this.cuotaMensualSinBonificar1 = +(importe * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1)).toFixed(2);
  } else {
    this.cuotaMensualSinBonificar1 = 0;
  }
}

// Calcula la cuota mensual sin bonificar para Hipoteca 2
calcularCuotaSinBonificar2() {
  const importe = this.importe2;
  const tinAnual = this.tin2 ?? 0;
  const meses = (this.duracion2 ?? 0) * 12;
  const i = tinAnual / 12 / 100;
  if (importe && tinAnual && meses) {
    this.cuotaMensualSinBonificar2 = +(importe * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1)).toFixed(2);
  } else {
    this.cuotaMensualSinBonificar2 = 0;
  }
}

// Ejemplo de cálculo de cuota mensual sin bonificar
calcularCuotaSinBonificar(importe: number, tin: number, duracion: number): number {
  const meses = duracion * 12;
  const i = tin / 12 / 100;
  if (importe && tin && duracion) {
    return +(importe * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1)).toFixed(2);
  }
  return 0;
}

// Ejemplo de cálculo de intereses totales
calcularCosteTotalIntereses(importe: number, cuotaMensual: number, duracion: number): number {
  const totalPagado = cuotaMensual * duracion * 12;
  return +(totalPagado - importe).toFixed(2);
}

calcularCuotaBonificada1(): number {
  const importe = this.importe1 ?? 0;
  const tinBase = this.tin1 ?? 0;
  const meses = (this.duracion1 ?? 0) * 12;

  let bonificacionTotal = 0;
  if (this.bonificacion1Activa) bonificacionTotal += this.bonificacion1 || 0;
  if (this.bonificacion2Activa) bonificacionTotal += this.bonificacion2 || 0;
  bonificacionTotal += this.bonificaciones1?.filter(b => b.activa).reduce((acc, b) => acc + (b.porcentaje || 0), 0) || 0;

  const tinBonificado = tinBase - bonificacionTotal;
  const i = tinBonificado / 12 / 100;

  if (importe && tinBonificado > 0 && meses) {
    return +(importe * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1)).toFixed(2);
  }
  return 0;
}

calcularCuotaBonificada2(): number {
  const importe = this.importe2 ?? 0;
  const tinBase = this.tin2 ?? 0;
  const meses = (this.duracion2 ?? 0) * 12;

  let bonificacionTotal = 0;
  if (this.bonificacion1_2Activa) bonificacionTotal += this.bonificacion1_2 || 0;
  if (this.bonificacion2_2Activa) bonificacionTotal += this.bonificacion2_2 || 0;
  bonificacionTotal += this.bonificaciones2?.filter(b => b.activa).reduce((acc, b) => acc + (b.porcentaje || 0), 0) || 0;

  const tinBonificado = tinBase - bonificacionTotal;
  const i = tinBonificado / 12 / 100;

  if (importe && tinBonificado > 0 && meses) {
    return +(importe * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1)).toFixed(2);
  }
  return 0;
}

calcularCuotaBonificadaConSeguros1(): number {
  const cuotaBonificada = this.calcularCuotaBonificada1();
  let costeSegurosMensual = 0;

  // Seguro de Hogar
  if (this.bonificacion1Activa && this.costeAnualBonificacion1) {
    costeSegurosMensual += this.costeAnualBonificacion1 / 12;
  }
  if (!this.bonificacion1Activa && this.costeSeguroHogarExterno1) {
    costeSegurosMensual += this.costeSeguroHogarExterno1 / 12; // <-- DIVIDIR ENTRE 12
  }

  // Seguro de Vida
  if (this.bonificacion2Activa && this.costeAnualBonificacion2) {
    costeSegurosMensual += this.costeAnualBonificacion2 / 12;
  }
  if (!this.bonificacion2Activa && this.costeSeguroVidaExterno1) {
    costeSegurosMensual += this.costeSeguroVidaExterno1 / 12;
  }

  // Bonificaciones dinámicas con coste anual
  if (this.bonificaciones1) {
    costeSegurosMensual += this.bonificaciones1
      .filter(b => b.activa && b.costeAnual)
      .reduce((acc, b) => acc + (b.costeAnual || 0) / 12, 0);
  }

  return +(cuotaBonificada + costeSegurosMensual).toFixed(2);
}

calcularCuotaBonificadaConSeguros2(): number {
  const cuotaBonificada = this.calcularCuotaBonificada2();
  let costeSegurosMensual = 0;

  // Seguro de Hogar
  if (this.bonificacion1_2Activa && this.costeAnualBonificacion1_2) {
    costeSegurosMensual += this.costeAnualBonificacion1_2 / 12;
  }
  if (!this.bonificacion1_2Activa && this.costeSeguroHogarExterno2) {
    costeSegurosMensual += this.costeSeguroHogarExterno2 / 12;
  }

  // Seguro de Vida
  if (this.bonificacion2_2Activa && this.costeAnualBonificacion2_2) {
    costeSegurosMensual += this.costeAnualBonificacion2_2 / 12;
  }
  if (!this.bonificacion2_2Activa && this.costeSeguroVidaExterno2) {
    costeSegurosMensual += this.costeSeguroVidaExterno2 / 12;
  }

  // Bonificaciones dinámicas con coste anual
  if (this.bonificaciones2) {
    costeSegurosMensual += this.bonificaciones2
      .filter(b => b.activa && b.costeAnual)
      .reduce((acc, b) => acc + (b.costeAnual || 0) / 12, 0);
  }

  return +(cuotaBonificada + costeSegurosMensual).toFixed(2);
}
}
