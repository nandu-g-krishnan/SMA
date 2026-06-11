import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationRegistryService, ConfigurationItem } from './configuration-registry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-registry',
  templateUrl: './configuration-registry.component.html',
  styleUrls: ['./configuration-registry.component.css']
})
export class ConfigurationRegistryComponent implements OnInit, OnDestroy {
  configurations: ConfigurationItem[] = [];
  displayConfigs: ConfigurationItem[] = [];
  isLoading = false;
  searchTerm = '';
  filterType: string | null = null;
  selectedConfig: ConfigurationItem | null = null;
  editMode = false;

  private destroy$ = new Subject<void>();

  constructor(private configService: ConfigurationRegistryService) {}

  ngOnInit(): void {
    this.loadConfigurations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadConfigurations(): void {
    this.isLoading = true;
    this.configService.getConfigurations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (configMap) => {
          this.configurations = Array.from(configMap.values());
          this.applyFilters();
          this.isLoading = false;
        },
        (error) => {
          console.error('Failed to load configurations:', error);
          this.isLoading = false;
        }
      );
  }

  applyFilters(): void {
    let filtered = this.configurations;

    if (this.searchTerm) {
      filtered = filtered.filter(config =>
        config.key.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (config.description && config.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }

    if (this.filterType) {
      filtered = filtered.filter(config => config.type === this.filterType);
    }

    this.displayConfigs = filtered;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onFilterChange(type: string | null): void {
    this.filterType = type;
    this.applyFilters();
  }

  selectConfiguration(config: ConfigurationItem): void {
    this.selectedConfig = config;
    this.editMode = false;
  }

  editConfiguration(config: ConfigurationItem): void {
    this.selectedConfig = config;
    this.editMode = true;
  }

  saveConfiguration(): void {
    if (this.selectedConfig && this.configService.validateConfiguration(this.selectedConfig)) {
      this.configService.setConfiguration(
        this.selectedConfig.key,
        this.selectedConfig.value,
        this.selectedConfig.type
      ).pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.editMode = false;
            this.loadConfigurations();
          },
          (error) => {
            console.error('Failed to save configuration:', error);
          }
        );
    }
  }

  deleteConfiguration(config: ConfigurationItem): void {
    if (confirm(`Delete configuration '${config.key}'?`)) {
      this.configService.deleteConfiguration(config.key)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loadConfigurations();
            this.selectedConfig = null;
          },
          (error) => {
            console.error('Failed to delete configuration:', error);
          }
        );
    }
  }

  exportConfigurations(): void {
    const json = this.configService.exportConfigurations();
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `configuration-registry-${new Date().toISOString()}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  importConfigurations(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.configService.importConfigurations(content)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (success) => {
              if (success) {
                this.loadConfigurations();
              }
            },
            (error) => {
              console.error('Failed to import configurations:', error);
            }
          );
      };
      reader.readAsText(file);
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedConfig = null;
  }
}
