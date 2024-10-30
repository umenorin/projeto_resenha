import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookAnalystComponent } from './createbook-analyst.component';

describe('CreatebookAnalystComponent', () => {
  let component: CreatebookAnalystComponent;
  let fixture: ComponentFixture<CreatebookAnalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatebookAnalystComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatebookAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
