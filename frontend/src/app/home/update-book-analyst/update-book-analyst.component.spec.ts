import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookAnalystComponent } from './update-book-analyst.component';

describe('UpdateBookAnalystComponent', () => {
  let component: UpdateBookAnalystComponent;
  let fixture: ComponentFixture<UpdateBookAnalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBookAnalystComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
