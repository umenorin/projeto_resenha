import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenhaInformacaoComponent } from './resenha-informacao.component';

describe('ResenhaInformacaoComponent', () => {
  let component: ResenhaInformacaoComponent;
  let fixture: ComponentFixture<ResenhaInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenhaInformacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenhaInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
