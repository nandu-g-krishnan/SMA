import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationRegistryMonitoringService, ConfigChangeEvent, ConfigRegistryMetrics } from './configuration-registry-monitoring.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-monitoring',
  standalone: false,
  templateUrl: './configuration-monitoring.component.html',
  styleUrls: ['./configuration-monitoring.component.css']
})
export class ConfigurationMonitoringComponent implements OnInit, OnDestroy {
  metrics: ConfigRegistryMetrics | null = null;
  changeHistory: ConfigChangeEvent[] = [];
  isLoading = false;
  filterChangeType: string | null = null;
  searchTerm = '';

  private destroy$ = new Subject<void>();

  constructor(private monitoringService: ConfigurationRegistryMonitoringService) {}

  ngOnInit(): void {
    this.loadMetrics();
    this.monitorChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMetrics(): void {
    this.isLoading = true;
    this.monitoringService.getMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (metrics) => {
          this.metrics = metrics;
          this.changeHistory = metrics.recentChanges || [];
          this.isLoading = false;
        },
        (error) => {
          console.error('Failed to load metrics:', error);
          this.isLoading = false;
        }
      );
  }

  private monitorChanges(): void {
    this.monitoringService.getConfigChanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
        this.changeHistory.unshift(event);
        if (this.changeHistory.length > 100) {
          this.changeHistory.pop();
        }
      });
  }

  refreshMetrics(): void {
    this.loadMetrics();
  }

  onFilterChange(type: string | null): void {
    this.filterChangeType = type;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
  }

  getFilteredHistory(): ConfigChangeEvent[] {
    let filtered = this.changeHistory;

    if (this.filterChangeType) {
      filtered = filtered.filter(e => e.changeType === this.filterChangeType);
    }

    if (this.searchTerm) {
      filtered = filtered.filter(e =>
        e.configKey.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  getChangeTypeBadgeClass(changeType: string): string {
    switch (changeType) {
      case 'create': return 'badge-create';
      case 'update': return 'badge-update';
      case 'delete': return 'badge-delete';
      default: return '';
    }
  }

  exportChangeHistory(): void {
    const json = JSON.stringify(this.changeHistory, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `config-changes-${new Date().toISOString()}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
