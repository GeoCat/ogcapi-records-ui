import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordToImageComponent } from './keyword-to-image.component';

describe('KeywordToImageComponent', () => {
  let component: KeywordToImageComponent;
  let fixture: ComponentFixture<KeywordToImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordToImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordToImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
