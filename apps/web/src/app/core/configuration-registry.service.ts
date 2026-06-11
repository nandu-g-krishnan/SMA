import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface ConfigurationItem {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object';
  description?: string;
  readOnly?: boolean;
  lastModified?: string;
  modifiedBy?: string;
}

export interface ConfigurationRegistry {
  configurations: Map<string, ConfigurationItem>;
  version: string;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRegistryService {
  private configRegistry = new BehaviorSubject<Map<string, ConfigurationItem>>(new Map());
  private apiUrl = '/api/foundation/configuration-registry';

  constructor(private http: HttpClient) {
    this.loadConfigurations();
  }

  private loadConfigurations(): void {
    this.http.get<ConfigurationItem[]>(`${this.apiUrl}/all`)
      .pipe(
        tap(items => {
          const configMap = new Map(items.map(item => [item.key, item]));
          this.configRegistry.next(configMap);
        }),
        catchError(() => {
          console.warn('Failed to load configurations, using defaults');
          return of([]);
        })
      )
      .subscribe();
  }

  getConfigurations(): Observable<Map<string, ConfigurationItem>> {
    return this.configRegistry.asObservable();
  }

  getConfiguration(key: string): ConfigurationItem | undefined {
    return this.configRegistry.value.get(key);
  }

  getConfigurationValue(key: string, defaultValue?: any): any {
    const config = this.configRegistry.value.get(key);
    return config ? config.value : defaultValue;
  }

  setConfiguration(key: string, value: any, type: string = 'string'): Observable<ConfigurationItem> {
    const config: ConfigurationItem = {
      key,
      value,
      type: type as any,
      lastModified: new Date().toISOString()
    };

    return this.http.post<ConfigurationItem>(`${this.apiUrl}`, config)
      .pipe(
        tap(savedConfig => {
          const currentRegistry = this.configRegistry.value;
          currentRegistry.set(key, savedConfig);
          this.configRegistry.next(currentRegistry);
        })
      );
  }

  deleteConfiguration(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}`)
      .pipe(
        tap(() => {
          const currentRegistry = this.configRegistry.value;
          currentRegistry.delete(key);
          this.configRegistry.next(currentRegistry);
        })
      );
  }

  validateConfiguration(config: ConfigurationItem): boolean {
    if (!config.key || config.key.trim().length === 0) return false;
    if (config.value === null || config.value === undefined) return false;
    return true;
  }

  exportConfigurations(): string {
    const configArray = Array.from(this.configRegistry.value.values());
    return JSON.stringify(configArray, null, 2);
  }

  importConfigurations(jsonString: string): Observable<boolean> {
    try {
      const configurations: ConfigurationItem[] = JSON.parse(jsonString);
      const validConfigs = configurations.filter(c => this.validateConfiguration(c));

      return this.http.post<boolean>(`${this.apiUrl}/import`, validConfigs)
        .pipe(
          tap(() => this.loadConfigurations())
        );
    } catch (error) {
      console.error('Failed to parse configuration JSON:', error);
      return of(false);
    }
  }

  getRegistryStatus(): Observable<{ totalConfigurations: number; lastSync: string }> {
    return this.http.get<{ totalConfigurations: number; lastSync: string }>(
      `${this.apiUrl}/status`
    );
  }
}
