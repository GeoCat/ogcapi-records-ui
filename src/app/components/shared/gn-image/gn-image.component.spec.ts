import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnImageComponent } from './gn-image.component';

describe('GnImageComponent', () => {
  let component: GnImageComponent;
  let fixture: ComponentFixture<GnImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GnImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GnImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
