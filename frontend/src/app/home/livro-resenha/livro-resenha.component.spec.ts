import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroResenhaComponent } from './livro-resenha.component';

describe('LivroResenhaComponent', () => {
  let component: LivroResenhaComponent;
  let fixture: ComponentFixture<LivroResenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroResenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivroResenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
