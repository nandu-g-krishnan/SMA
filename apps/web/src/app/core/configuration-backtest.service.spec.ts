import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigurationBacktestService } from './configuration-backtest.service';

describe('ConfigurationBacktestService', () => {
  let service: ConfigurationBacktestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigurationBacktestService]
    });
    service = TestBed.inject(ConfigurationBacktestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); });

  it('should create', () => { expect(service).toBeTruthy(); });

  it('should run test', () => {
    const test = { testId: '1', configKey: 'key', testValue: 'val', expectedResult: 'exp', passed: true, timestamp: '' };
    service.runTest(test).subscribe(result => expect(result).toEqual(test));
    const req = httpMock.expectOne('/api/foundation/configuration-backtest/run');
    req.flush(test);
  });

  it('should run all tests', () => {
    const tests = [];
    service.runAllTests().subscribe(result => expect(result).toEqual(tests));
    const req = httpMock.expectOne('/api/foundation/configuration-backtest/run-all');
    req.flush(tests);
  });

  it('should get test history', () => {
    const tests = [];
    service.getTestHistory().subscribe(result => expect(result).toEqual(tests));
    const req = httpMock.expectOne('/api/foundation/configuration-backtest/history');
    req.flush(tests);
  });

  it('should generate report', () => {
    service.generateReport().subscribe();
    const req = httpMock.expectOne('/api/foundation/configuration-backtest/report');
    req.flush({});
  });
});
