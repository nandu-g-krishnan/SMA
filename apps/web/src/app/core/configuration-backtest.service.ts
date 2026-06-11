import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConfigurationBacktest {
  testId: string;
  configKey: string;
  testValue: any;
  expectedResult: any;
  actualResult?: any;
  passed: boolean;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationBacktestService {
  private apiUrl = '/api/foundation/configuration-backtest';

  constructor(private http: HttpClient) {}

  runTest(config: ConfigurationBacktest): Observable<ConfigurationBacktest> {
    return this.http.post<ConfigurationBacktest>(`${this.apiUrl}/run`, config);
  }

  runAllTests(): Observable<ConfigurationBacktest[]> {
    return this.http.post<ConfigurationBacktest[]>(`${this.apiUrl}/run-all`, {});
  }

  getTestHistory(): Observable<ConfigurationBacktest[]> {
    return this.http.get<ConfigurationBacktest[]>(`${this.apiUrl}/history`);
  }

  generateReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/report`);
  }
}
