import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepositoryBaselineExposureComponent } from './repository-baseline-exposure.component';

describe('RepositoryBaselineExposureComponent', () => {
  let component: RepositoryBaselineExposureComponent;
  let fixture: ComponentFixture<RepositoryBaselineExposureComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryBaselineExposureComponent ],
      imports: [ CommonModule, HttpClientTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryBaselineExposureComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load baseline data on init', () => {
    const mockData = {
      id: 'baseline-1',
      version: 'v1.0.0',
      timestamp: '2026-06-11T09:00:00Z',
      status: 'valid',
      sourceTrace: 'SMA-TR-001',
      metadata: { instruments: 100 }
    };

    fixture.detectChanges();

    const req = httpMock.expectOne('/api/foundation/repository-baseline');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.baselineData).toEqual(mockData);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading baseline', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/foundation/repository-baseline');
    req.error(new ProgressEvent('Network error'), { status: 500 });

    expect(component.error).toBeTruthy();
    expect(component.loading).toBe(false);
  });

  it('should refresh baseline data', () => {
    const mockData = {
      id: 'baseline-1',
      version: 'v1.0.1',
      timestamp: '2026-06-11T10:00:00Z',
      status: 'valid',
      sourceTrace: 'SMA-TR-002',
      metadata: { instruments: 101 }
    };

    component.refreshBaseline();

    const req = httpMock.expectOne('/api/foundation/repository-baseline');
    req.flush(mockData);

    expect(component.baselineData?.version).toBe('v1.0.1');
  });

  it('should download baseline as JSON', () => {
    const mockData = {
      id: 'baseline-1',
      version: 'v1.0.0',
      timestamp: '2026-06-11T09:00:00Z',
      status: 'valid',
      sourceTrace: 'SMA-TR-001',
      metadata: { instruments: 100 }
    };

    component.baselineData = mockData;

    spyOn(document, 'createElement').and.returnValue({
      setAttribute: jasmine.createSpy('setAttribute'),
      click: jasmine.createSpy('click')
    } as any);

    component.downloadBaseline();

    expect(component.baselineData).toBeTruthy();
  });
});
