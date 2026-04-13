import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempsClientComponent } from './emploi-du-temps-client.component';

describe('EmploiDuTempsClientComponent', () => {
  let component: EmploiDuTempsClientComponent;
  let fixture: ComponentFixture<EmploiDuTempsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiDuTempsClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiDuTempsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
