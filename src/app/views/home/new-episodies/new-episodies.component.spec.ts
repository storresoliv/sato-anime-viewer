import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEpisodiesComponent } from './new-episodies.component';

describe('NewEpisodiesComponent', () => {
  let component: NewEpisodiesComponent;
  let fixture: ComponentFixture<NewEpisodiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEpisodiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEpisodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
