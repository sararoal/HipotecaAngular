import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HipotecaAnalisis } from './hipoteca-analisis';

describe('HipotecaAnalisis', () => {
  let component: HipotecaAnalisis;
  let fixture: ComponentFixture<HipotecaAnalisis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HipotecaAnalisis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HipotecaAnalisis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
