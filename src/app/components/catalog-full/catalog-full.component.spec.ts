import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFullComponent } from './catalog-full.component';

describe('CatalogFullComponent', () => {
  let component: CatalogFullComponent;
  let fixture: ComponentFixture<CatalogFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
