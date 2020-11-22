import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendjobComponent } from './recommendjob.component';

describe('RecommendjobComponent', () => {
  let component: RecommendjobComponent;
  let fixture: ComponentFixture<RecommendjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
