import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSectionsComponent } from './text-sections.component';

describe('TextSectionsComponent', () => {
  let component: TextSectionsComponent;
  let fixture: ComponentFixture<TextSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
