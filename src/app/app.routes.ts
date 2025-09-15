

import { Routes } from '@angular/router';

import { NuevaHipotecaComponent } from './features/nueva-hipoteca/nueva-hipoteca.component';
import { HipotecaAnalisisComponent } from './features/hipoteca-analisis/hipoteca-analisis.component';
import { SeguroExternoComponent } from './features/seguro-externo/seguro-externo.component';

export const routes: Routes = [
  {
    path: '',
    component: HipotecaAnalisisComponent
  },
  {
    path: 'nueva-hipoteca',
    component: NuevaHipotecaComponent
  },
  {
    path: 'seguro-externo',
    component: SeguroExternoComponent
  }
];
