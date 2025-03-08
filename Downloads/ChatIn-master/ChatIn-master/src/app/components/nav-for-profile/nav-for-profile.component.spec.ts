import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavForProfileComponent } from './nav-for-profile.component';

describe('NavForProfileComponent', () => {
  let component: NavForProfileComponent;
  let fixture: ComponentFixture<NavForProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavForProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavForProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
