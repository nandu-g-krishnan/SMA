import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductNavigationMonitoringService } from './product-navigation-monitoring.service';

describe('ProductNavigationMonitoringService', () => {
  let service: ProductNavigationMonitoringService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductNavigationMonitoringService ]
    }).compileComponents();

    service = TestBed.inject(ProductNavigationMonitoringService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should record navigation event', (done) => {
    service.getNavigationEvents().subscribe(event => {
      expect(event.eventType).toBe('navigate');
      expect(event.route).toBe('/dashboard');
      done();
    });

    service.recordNavigate('/dashboard', 100);
    
    const req = httpMock.expectOne('/api/foundation/navigation-events');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should record expand event', (done) => {
    service.getNavigationEvents().subscribe(event => {
      expect(event.eventType).toBe('expand');
      done();
    });

    service.recordExpand('/trading');

    const req = httpMock.expectOne('/api/foundation/navigation-events');
    req.flush({});
  });

  it('should record collapse event', (done) => {
    service.getNavigationEvents().subscribe(event => {
      expect(event.eventType).toBe('collapse');
      done();
    });

    service.recordCollapse('/trading');

    const req = httpMock.expectOne('/api/foundation/navigation-events');
    req.flush({});
  });

  it('should calculate metrics snapshot', () => {
    service.recordNavigate('/dashboard', 100);
    service.recordNavigate('/trading', 150);

    const reqs = httpMock.match('/api/foundation/navigation-events');
    reqs.forEach(req => req.flush({}));

    const snapshot = service.getMetricsSnapshot();
    expect(snapshot.totalNavEvents).toBe(2);
    expect(snapshot.averageResponseTime).toBe(125);
  });

  it('should generate unique event IDs', (done) => {
    const eventIds: string[] = [];
    
    service.getNavigationEvents().subscribe(event => {
      eventIds.push(event.eventId);
      
      if (eventIds.length === 2) {
        expect(eventIds[0]).not.toBe(eventIds[1]);
        done();
      }
    });

    service.recordNavigate('/dashboard');
    service.recordNavigate('/trading');

    const reqs = httpMock.match('/api/foundation/navigation-events');
    reqs.forEach(req => req.flush({}));
  });

  it('should fetch metrics from API', () => {
    const mockMetrics = {
      totalNavEvents: 100,
      uniqueRoutes: 10,
      averageResponseTime: 125,
      lastUpdated: new Date().toISOString()
    };

    service.getMetrics().subscribe(metrics => {
      expect(metrics.totalNavEvents).toBe(100);
    });

    const req = httpMock.expectOne('/api/foundation/navigation-metrics');
    expect(req.request.method).toBe('GET');
    req.flush(mockMetrics);
  });
});
