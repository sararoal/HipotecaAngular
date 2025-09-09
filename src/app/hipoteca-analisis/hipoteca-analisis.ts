
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
  // Hipoteca 1
  banco1: string = '';
  importe1: number | null = null;
  tin1: number | null = null;
  duracion1: number | null = null;

  nombreBonificacion1: string = 'Seguro de Hogar';
  bonificacion1: number | null = null;
  costeAnualBonificacion1: number | null = null;
  editNombreBonificacion1: boolean = false;

  nombreBonificacion2: string = 'Seguro de Vida';
  bonificacion2: number | null = null;
  costeAnualBonificacion2: number | null = null;
  editNombreBonificacion2: boolean = false;

  bonificaciones1: any[] = [];
  resultado1: string | null = null;

  // Hipoteca 2
  banco2: string = '';
  importe2: number | null = null;
  tin2: number | null = null;
  duracion2: number | null = null;

  nombreBonificacion1_2: string = 'Seguro de Hogar';
  bonificacion1_2: number | null = null;
  costeAnualBonificacion1_2: number | null = null;
  editNombreBonificacion1_2: boolean = false;

  nombreBonificacion2_2: string = 'Seguro de Vida';
  bonificacion2_2: number | null = null;
  costeAnualBonificacion2_2: number | null = null;
  editNombreBonificacion2_2: boolean = false;

  bonificaciones2: any[] = [];
  resultado2: string | null = null;

  constructor() {
    this.cargarSesion1();
    this.cargarSesion2();
  }

  // Hipoteca 1
  guardarSesion1() {
    const datos = {
      banco1: this.banco1,
      importe1: this.importe1,
      tin1: this.tin1,
      duracion1: this.duracion1,
      nombreBonificacion1: this.nombreBonificacion1,
      bonificacion1: this.bonificacion1,
      costeAnualBonificacion1: this.costeAnualBonificacion1,
      editNombreBonificacion1: this.editNombreBonificacion1,
      nombreBonificacion2: this.nombreBonificacion2,
      bonificacion2: this.bonificacion2,
      costeAnualBonificacion2: this.costeAnualBonificacion2,
      editNombreBonificacion2: this.editNombreBonificacion2,
      bonificaciones1: this.bonificaciones1,
      resultado1: this.resultado1
    };
    localStorage.setItem('hipotecaSesion1', JSON.stringify(datos));
  }

  cargarSesion1() {
    const datos = localStorage.getItem('hipotecaSesion1');
    if (datos) {
      const obj = JSON.parse(datos);
      this.banco1 = obj.banco1;
      this.importe1 = obj.importe1;
      this.tin1 = obj.tin1;
      this.duracion1 = obj.duracion1;
      this.nombreBonificacion1 = obj.nombreBonificacion1;
      this.bonificacion1 = obj.bonificacion1;
      this.costeAnualBonificacion1 = obj.costeAnualBonificacion1;
      this.editNombreBonificacion1 = obj.editNombreBonificacion1;
      this.nombreBonificacion2 = obj.nombreBonificacion2;
      this.bonificacion2 = obj.bonificacion2;
      this.costeAnualBonificacion2 = obj.costeAnualBonificacion2;
      this.editNombreBonificacion2 = obj.editNombreBonificacion2;
      this.bonificaciones1 = obj.bonificaciones1 ? obj.bonificaciones1.map((b: any) => ({ ...b })) : [];
      this.resultado1 = obj.resultado1;
    }
  }

  agregarBonificacion1() {
    this.bonificaciones1.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true });
    this.guardarSesion1();
  }

  eliminarBonificacion1(index: number) {
    this.bonificaciones1.splice(index, 1);
    this.guardarSesion1();
  }

  confirmarBonificacion1(bonif: any) {
    bonif.editando = false;
    this.guardarSesion1();
  }

  confirmarBonificacionFija1(num: number) {
    if (num === 1) this.editNombreBonificacion1 = false;
    if (num === 2) this.editNombreBonificacion2 = false;
    this.guardarSesion1();
  }

  analizarHipoteca1() {
    this.guardarSesion1();
    if (!this.importe1 || !this.tin1 || !this.duracion1) {
      this.resultado1 = 'Por favor, rellena todos los datos principales.';
      return;
    }
    const capital = this.importe1;
    const tin = this.tin1 / 100;
    const meses = this.duracion1 * 12;
    const interesMensual = tin / 12;
    const cuotaSinBonif = capital * (interesMensual * Math.pow(1 + interesMensual, meses)) / (Math.pow(1 + interesMensual, meses) - 1);
    const bonifHogar = this.bonificacion1 || 0;
    const tinBonificadoHogar = tin - (bonifHogar / 100);
    const interesMensualBonifHogar = tinBonificadoHogar / 12;
    const cuotaConBonifHogar = capital * (interesMensualBonifHogar * Math.pow(1 + interesMensualBonifHogar, meses)) / (Math.pow(1 + interesMensualBonifHogar, meses) - 1);
    const bonifVida = this.bonificacion2 || 0;
    const tinBonificadoVida = tin - (bonifVida / 100);
    const interesMensualBonifVida = tinBonificadoVida / 12;
    const cuotaConBonifVida = capital * (interesMensualBonifVida * Math.pow(1 + interesMensualBonifVida, meses)) / (Math.pow(1 + interesMensualBonifVida, meses) - 1);
    const tinBonificado = tin - ((bonifVida + bonifHogar) / 100);
    const interesMensualBonif = tinBonificado / 12;
    const cuotaConBonif = capital * (interesMensualBonif * Math.pow(1 + interesMensualBonif, meses)) / (Math.pow(1 + interesMensualBonif, meses) - 1);
    const ahorroMensual = cuotaSinBonif - cuotaConBonif;
    const ahorroAnual = ahorroMensual * 12;
    const costeBancoHogar = this.costeAnualBonificacion1 || 0;
    const costeBancoVida = this.costeAnualBonificacion2 || 0;
    const maxCosteExternoHogar = cuotaSinBonif - cuotaConBonifHogar;
    const maxCosteExternoVida = cuotaSinBonif - cuotaConBonifVida;
    this.resultado1 = `Cuota mensual sin bonificaciones: ${cuotaSinBonif.toFixed(2)} €\nCuota mensual con bonificaciones: ${cuotaConBonif.toFixed(2)} €\nAhorro anual por bonificaciones: ${ahorroAnual.toFixed(2)} €\nCoste anual del seguro de hogar ofrecido por el banco: ${costeBancoHogar.toFixed(2)} €\nCoste anual del seguro de vida ofrecido por el banco: ${costeBancoVida.toFixed(2)} €\nPara que merezca la pena contratar el seguro de hogar de forma externa, debe costar menos de: ${maxCosteExternoHogar.toFixed(2)} € al mes.\nPara que merezca la pena contratar el seguro de vida de forma externa, debe costar menos de: ${maxCosteExternoVida.toFixed(2)} € al mes.`;
  }

  borrarSesion1() {
    localStorage.removeItem('hipotecaSesion1');
    window.location.reload();
  }

  // Hipoteca 2
  guardarSesion2() {
    const datos = {
      banco2: this.banco2,
      importe2: this.importe2,
      tin2: this.tin2,
      duracion2: this.duracion2,
      nombreBonificacion1_2: this.nombreBonificacion1_2,
      bonificacion1_2: this.bonificacion1_2,
      costeAnualBonificacion1_2: this.costeAnualBonificacion1_2,
      editNombreBonificacion1_2: this.editNombreBonificacion1_2,
      nombreBonificacion2_2: this.nombreBonificacion2_2,
      bonificacion2_2: this.bonificacion2_2,
      costeAnualBonificacion2_2: this.costeAnualBonificacion2_2,
      editNombreBonificacion2_2: this.editNombreBonificacion2_2,
      bonificaciones2: this.bonificaciones2,
      resultado2: this.resultado2
    };
    localStorage.setItem('hipotecaSesion2', JSON.stringify(datos));
  }

  cargarSesion2() {
    const datos = localStorage.getItem('hipotecaSesion2');
    if (datos) {
      const obj = JSON.parse(datos);
      this.banco2 = obj.banco2;
      this.importe2 = obj.importe2;
      this.tin2 = obj.tin2;
      this.duracion2 = obj.duracion2;
      this.nombreBonificacion1_2 = obj.nombreBonificacion1_2;
      this.bonificacion1_2 = obj.bonificacion1_2;
      this.costeAnualBonificacion1_2 = obj.costeAnualBonificacion1_2;
      this.editNombreBonificacion1_2 = obj.editNombreBonificacion1_2;
      this.nombreBonificacion2_2 = obj.nombreBonificacion2_2;
      this.bonificacion2_2 = obj.bonificacion2_2;
      this.costeAnualBonificacion2_2 = obj.costeAnualBonificacion2_2;
      this.editNombreBonificacion2_2 = obj.editNombreBonificacion2_2;
      this.bonificaciones2 = obj.bonificaciones2 ? obj.bonificaciones2.map((b: any) => ({ ...b })) : [];
      this.resultado2 = obj.resultado2;
    }
  }

  agregarBonificacion2() {
    this.bonificaciones2.push({ nombre: '', porcentaje: null, costeAnual: null, editando: true });
    this.guardarSesion2();
  }

  eliminarBonificacion2(index: number) {
    this.bonificaciones2.splice(index, 1);
    this.guardarSesion2();
  }

  confirmarBonificacion2(bonif: any) {
    bonif.editando = false;
    this.guardarSesion2();
  }

  confirmarBonificacionFija2(num: number) {
    if (num === 1) this.editNombreBonificacion1_2 = false;
    if (num === 2) this.editNombreBonificacion2_2 = false;
    this.guardarSesion2();
  }

  analizarHipoteca2() {
    this.guardarSesion2();
    if (!this.importe2 || !this.tin2 || !this.duracion2) {
      this.resultado2 = 'Por favor, rellena todos los datos principales.';
      return;
    }
    const capital = this.importe2;
    const tin = this.tin2 / 100;
    const meses = this.duracion2 * 12;
    const interesMensual = tin / 12;
    const cuotaSinBonif = capital * (interesMensual * Math.pow(1 + interesMensual, meses)) / (Math.pow(1 + interesMensual, meses) - 1);
    const bonifHogar = this.bonificacion1_2 || 0;
    const tinBonificadoHogar = tin - (bonifHogar / 100);
    const interesMensualBonifHogar = tinBonificadoHogar / 12;
    const cuotaConBonifHogar = capital * (interesMensualBonifHogar * Math.pow(1 + interesMensualBonifHogar, meses)) / (Math.pow(1 + interesMensualBonifHogar, meses) - 1);
    const bonifVida = this.bonificacion2_2 || 0;
    const tinBonificadoVida = tin - (bonifVida / 100);
    const interesMensualBonifVida = tinBonificadoVida / 12;
    const cuotaConBonifVida = capital * (interesMensualBonifVida * Math.pow(1 + interesMensualBonifVida, meses)) / (Math.pow(1 + interesMensualBonifVida, meses) - 1);
    const tinBonificado = tin - ((bonifVida + bonifHogar) / 100);
    const interesMensualBonif = tinBonificado / 12;
    const cuotaConBonif = capital * (interesMensualBonif * Math.pow(1 + interesMensualBonif, meses)) / (Math.pow(1 + interesMensualBonif, meses) - 1);
    const ahorroMensual = cuotaSinBonif - cuotaConBonif;
    const ahorroAnual = ahorroMensual * 12;
    const costeBancoHogar = this.costeAnualBonificacion1_2 || 0;
    const costeBancoVida = this.costeAnualBonificacion2_2 || 0;
    const maxCosteExternoHogar = cuotaSinBonif - cuotaConBonifHogar;
    const maxCosteExternoVida = cuotaSinBonif - cuotaConBonifVida;
    this.resultado2 = `Cuota mensual sin bonificaciones: ${cuotaSinBonif.toFixed(2)} €\nCuota mensual con bonificaciones: ${cuotaConBonif.toFixed(2)} €\nAhorro anual por bonificaciones: ${ahorroAnual.toFixed(2)} €\nCoste anual del seguro de hogar ofrecido por el banco: ${costeBancoHogar.toFixed(2)} €\nCoste anual del seguro de vida ofrecido por el banco: ${costeBancoVida.toFixed(2)} €\nPara que merezca la pena contratar el seguro de hogar de forma externa, debe costar menos de: ${maxCosteExternoHogar.toFixed(2)} € al mes.\nPara que merezca la pena contratar el seguro de vida de forma externa, debe costar menos de: ${maxCosteExternoVida.toFixed(2)} € al mes.`;
  }

  borrarSesion2() {
    localStorage.removeItem('hipotecaSesion2');
    window.location.reload();
  }
}
