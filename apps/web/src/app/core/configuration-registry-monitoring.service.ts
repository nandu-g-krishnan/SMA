import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ConfigChangeEvent {
  eventId: string;
  configKey: string;
  previousValue: any;
  newValue: any;
  changeType: 'create' | 'update' | 'delete';
  timestamp: string;
  userId?: string;
}

export interface ConfigRegistryMetrics {
  totalConfigurations: number;
  recentChanges: ConfigChangeEvent[];
  lastModified: string;
  changeFrequency: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRegistryMonitoringService {
  private configChanges$ = new Subject<ConfigChangeEvent>();
  private apiUrl = '/api/foundation/configuration-monitoring';

  constructor(private http: HttpClient) {}

  recordConfigChange(event: Omit<ConfigChangeEvent, 'eventId' | 'timestamp'>): void {
    const changeEvent: ConfigChangeEvent = {
      ...event,
      eventId: this.generateEventId(),
      timestamp: new Date().toISOString()
    };

    this.configChanges$.next(changeEvent);
    this.persistChange(changeEvent).subscribe(
      () => {},
      (error) => console.error('Failed to persist config change:', error)
    );
  }

  recordCreation(configKey: string, newValue: any): void {
    this.recordConfigChange({
      configKey,
      previousValue: null,
      newValue,
      changeType: 'create'
    });
  }

  recordUpdate(configKey: string, previousValue: any, newValue: any): void {
    this.recordConfigChange({
      configKey,
      previousValue,
      newValue,
      changeType: 'update'
    });
  }

  recordDeletion(configKey: string, previousValue: any): void {
    this.recordConfigChange({
      configKey,
      previousValue,
      newValue: null,
      changeType: 'delete'
    });
  }

  getConfigChanges(): Observable<ConfigChangeEvent> {
    return this.configChanges$.asObservable();
  }

  getMetrics(): Observable<ConfigRegistryMetrics> {
    return this.http.get<ConfigRegistryMetrics>(`${this.apiUrl}/metrics`);
  }

  getChangeHistory(configKey: string, limit = 50): Observable<ConfigChangeEvent[]> {
    return this.http.get<ConfigChangeEvent[]>(
      `${this.apiUrl}/history/${configKey}?limit=${limit}`
    );
  }

  getRecentChanges(minutes = 60): Observable<ConfigChangeEvent[]> {
    return this.http.get<ConfigChangeEvent[]>(
      `${this.apiUrl}/recent?minutes=${minutes}`
    );
  }

  private persistChange(event: ConfigChangeEvent): Observable<any> {
    return this.http.post(`${this.apiUrl}/changes`, event);
  }

  private generateEventId(): string {
    return `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
