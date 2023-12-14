import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderServiceMock: { isLoading$: BehaviorSubject<boolean> };

  beforeEach(async () => {
    loaderServiceMock = {
      isLoading$: new BehaviorSubject<boolean>(false)
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        LoaderComponent
      ],
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display loader initially', () => {
    const loaderElement = fixture.debugElement.query(By.css('.overlay'));
    expect(loaderElement).toBeNull();
  });

  it('should display loader when isLoading$ emits true', () => {
    loaderServiceMock.isLoading$.next(true);
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(By.css('.overlay'));
    expect(loaderElement).not.toBeNull();
  });
});
