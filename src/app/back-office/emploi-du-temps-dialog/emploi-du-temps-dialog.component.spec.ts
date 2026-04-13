import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempsDialogComponent } from './emploi-du-temps-dialog.component';

describe('EmploiDuTempsDialogComponent', () => {
  let component: EmploiDuTempsDialogComponent;
  let fixture: ComponentFixture<EmploiDuTempsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiDuTempsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiDuTempsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
