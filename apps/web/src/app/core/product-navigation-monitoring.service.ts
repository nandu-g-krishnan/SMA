import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface NavigationEvent {
  eventId: string;
  eventType: 'navigate' | 'expand' | 'collapse' | 'click' | 'load';
  route: string;
  timestamp: string;
  duration?: number;
  userId?: string;
  source?: string;
}

export interface NavigationMetrics {
  totalNavEvents: number;
  uniqueRoutes: number;
  averageResponseTime: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductNavigationMonitoringService {
  private navigationEvents$ = new Subject<NavigationEvent>();
  private metrics: Map<string, number> = new Map();

  constructor(private http: HttpClient) {
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    this.metrics.set('totalNavEvents', 0);
    this.metrics.set('uniqueRoutes', 0);
    this.metrics.set('totalResponseTime', 0);
    this.metrics.set('eventCount', 0);
  }

  recordNavigationEvent(event: Omit<NavigationEvent, 'eventId' | 'timestamp'>): void {
    const navEvent: NavigationEvent = {
      ...event,
      eventId: this.generateEventId(),
      timestamp: new Date().toISOString()
    };

    // Update metrics
    const count = (this.metrics.get('totalNavEvents') || 0) + 1;
    this.metrics.set('totalNavEvents', count);

    if (event.duration) {
      const totalTime = (this.metrics.get('totalResponseTime') || 0) + event.duration;
      this.metrics.set('totalResponseTime', totalTime);
    }

    // Emit event
    this.navigationEvents$.next(navEvent);

    // Persist event
    this.persistNavigationEvent(navEvent).subscribe(
      () => {},
      (error) => console.error('Failed to persist navigation event:', error)
    );
  }

  recordNavigate(route: string, duration?: number): void {
    this.recordNavigationEvent({
      eventType: 'navigate',
      route,
      duration,
      source: 'router'
    });
  }

  recordExpand(route: string): void {
    this.recordNavigationEvent({
      eventType: 'expand',
      route,
      source: 'ui'
    });
  }

  recordCollapse(route: string): void {
    this.recordNavigationEvent({
      eventType: 'collapse',
      route,
      source: 'ui'
    });
  }

  getNavigationEvents(): Observable<NavigationEvent> {
    return this.navigationEvents$.asObservable();
  }

  getMetrics(): Observable<NavigationMetrics> {
    return this.http.get<NavigationMetrics>('/api/foundation/navigation-metrics');
  }

  private persistNavigationEvent(event: NavigationEvent): Observable<any> {
    return this.http.post('/api/foundation/navigation-events', event);
  }

  private generateEventId(): string {
    return `nav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getMetricsSnapshot(): NavigationMetrics {
    const totalEvents = this.metrics.get('totalNavEvents') || 0;
    const totalTime = this.metrics.get('totalResponseTime') || 0;
    const avgTime = totalEvents > 0 ? totalTime / totalEvents : 0;

    return {
      totalNavEvents: totalEvents,
      uniqueRoutes: this.metrics.get('uniqueRoutes') || 0,
      averageResponseTime: avgTime,
      lastUpdated: new Date().toISOString()
    };
  }
}
