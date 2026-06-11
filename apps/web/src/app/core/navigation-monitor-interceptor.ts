import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductNavigationMonitoringService } from './product-navigation-monitoring.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationMonitorInterceptor {
  private navigationStartTime: number | null = null;

  constructor(
    private router: Router,
    private monitoringService: ProductNavigationMonitoringService
  ) {
    this.setupMonitoring();
  }

  private setupMonitoring(): void {
    // Monitor router navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (this.navigationStartTime) {
        const duration = Date.now() - this.navigationStartTime;
        this.monitoringService.recordNavigate(event.url, duration);
        this.navigationStartTime = null;
      } else {
        this.monitoringService.recordNavigate(event.url);
      }
    });
  }

  startNavigation(): void {
    this.navigationStartTime = Date.now();
  }
}
