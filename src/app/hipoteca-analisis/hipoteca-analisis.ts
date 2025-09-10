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
  cuotaMensualConSeguros1: string = '';
  cuotaMensualConSeguros2: string = '';
  interesesTotalesAnios1: string = '';
  interesesTotalesAnios2: string = '';
  // Variables para mostrar en la tabla comparativa
  cuotaMensual1: string = '';
  cuotaMensual2: string = '';
  costeTotal1: string = '';
  costeTotal2: string = '';
  interesesTotales1: string = '';
  interesesTotales2: string = '';
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
      bonifFijas: { porcentaje: number, costeAnual: number }[],
      bonifDinamicas: any[]
    ) => {
      const meses = duracion * 12;
      // Suma de bonificaciones fijas y dinámicas
      const bonifTotal = bonifFijas.reduce((acc, b) => acc + (b.porcentaje || 0), 0) + bonifDinamicas.reduce((acc, b) => acc + (b.porcentaje || 0), 0);
      const costeBonifTotal = bonifFijas.reduce((acc, b) => acc + (b.costeAnual || 0), 0) + bonifDinamicas.reduce((acc, b) => acc + (b.costeAnual || 0), 0);
      const tinBonificado = (tin / 100) - (bonifTotal / 100);
      const interesMensual = tinBonificado / 12;

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

    const bonifFijas1 = [
      { porcentaje: this.bonificacion1 || 0, costeAnual: this.costeAnualBonificacion1 || 0 },
      { porcentaje: this.bonificacion2 || 0, costeAnual: this.costeAnualBonificacion2 || 0 }
    ];
    const bonifFijas2 = [
      { porcentaje: this.bonificacion1_2 || 0, costeAnual: this.costeAnualBonificacion1_2 || 0 },
      { porcentaje: this.bonificacion2_2 || 0, costeAnual: this.costeAnualBonificacion2_2 || 0 }
    ];

    const datosHipoteca1 = calcularDatosHipoteca(
      this.importe1,
      this.tin1,
      this.duracion1,
      bonifFijas1,
      this.bonificaciones1
    );
    const datosHipoteca2 = calcularDatosHipoteca(
      this.importe2,
      this.tin2,
      this.duracion2,
      bonifFijas2,
      this.bonificaciones2
    );

  // Asignar valores para la tabla
  this.cuotaMensual1 = datosHipoteca1.cuotaMensual.toFixed(2) + ' €';
  this.cuotaMensual2 = datosHipoteca2.cuotaMensual.toFixed(2) + ' €';
  this.costeTotal1 = datosHipoteca1.costeTotal.toFixed(2) + ' €';
  this.costeTotal2 = datosHipoteca2.costeTotal.toFixed(2) + ' €';
  this.interesesTotales1 = datosHipoteca1.interesesTotales.toFixed(2) + ' €';
  this.interesesTotales2 = datosHipoteca2.interesesTotales.toFixed(2) + ' €';
  this.costeBonificaciones1 = datosHipoteca1.costeBonificaciones.toFixed(2) + ' €';
  this.costeBonificaciones2 = datosHipoteca2.costeBonificaciones.toFixed(2) + ' €';

  // Cuota mensual con seguros/bonificaciones
  const segurosMes1 = (datosHipoteca1.costeBonificaciones / (this.duracion1 || 1) / 12);
  const segurosMes2 = (datosHipoteca2.costeBonificaciones / (this.duracion2 || 1) / 12);
  this.cuotaMensualConSeguros1 = (datosHipoteca1.cuotaMensual + segurosMes1).toFixed(2) + ' €';
  this.cuotaMensualConSeguros2 = (datosHipoteca2.cuotaMensual + segurosMes2).toFixed(2) + ' €';

  // Coste total de intereses en x años
  this.interesesTotalesAnios1 = datosHipoteca1.interesesTotales.toFixed(2) + ' € en ' + this.duracion1 + ' años';
  this.interesesTotalesAnios2 = datosHipoteca2.interesesTotales.toFixed(2) + ' € en ' + this.duracion2 + ' años';

    const mejor = datosHipoteca1.costeTotal < datosHipoteca2.costeTotal ? this.banco1 || 'Hipoteca 1' : this.banco2 || 'Hipoteca 2';
    const ahorroNeto = Math.abs(datosHipoteca1.costeTotal - datosHipoteca2.costeTotal);

    this.resultadoComparacion =
      `💡 Resultado comparativo: La hipoteca más barata es ${mejor}. El ahorro total sería de ${ahorroNeto.toFixed(2)} €.`;
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
