import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcripcionListComponent } from './subcripcion-list.component';

describe('SubcripcionListComponent', () => {
  let component: SubcripcionListComponent;
  let fixture: ComponentFixture<SubcripcionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcripcionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcripcionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
