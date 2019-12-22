import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEjercicioComponent } from './post-ejercicio.component';

describe('PostEjercicioComponent', () => {
  let component: PostEjercicioComponent;
  let fixture: ComponentFixture<PostEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
