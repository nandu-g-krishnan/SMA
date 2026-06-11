import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppShellComponent } from './app-shell.component';
import { ProductNavigationService } from './product-navigation.service';
import { of } from 'rxjs';

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;
  let mockNavService: any;

  beforeEach(async () => {
    mockNavService = {
      loadNavigationState: jasmine.createSpy('loadNavigationState').and.returnValue(
        of({ isInitialized: true, itemsCount: 6, lastUpdated: new Date().toISOString() })
      ),
      getNavigationState: jasmine.createSpy('getNavigationState').and.returnValue(null)
    };

    await TestBed.configureTestingModule({
      declarations: [ AppShellComponent ],
      imports: [ CommonModule ],
      providers: [{ provide: ProductNavigationService, useValue: mockNavService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize navigation on init', () => {
    expect(mockNavService.loadNavigationState).toHaveBeenCalled();
  });

  it('should set navigationReady flag when initialization succeeds', (done) => {
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.navigationReady).toBe(true);
      done();
    }, 100);
  });

  it('should set contentReady flag on init', () => {
    expect(component.contentReady).toBe(true);
  });

  it('should render header when navigationReady is true', () => {
    component.navigationReady = true;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('.shell-header');
    expect(header).toBeTruthy();
  });

  it('should render main content when contentReady is true', () => {
    component.contentReady = true;
    fixture.detectChanges();
    const main = fixture.nativeElement.querySelector('.shell-main');
    expect(main).toBeTruthy();
  });

  it('should include router-outlet for dynamic content', () => {
    component.contentReady = true;
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});
