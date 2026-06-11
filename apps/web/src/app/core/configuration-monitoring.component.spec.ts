import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigurationMonitoringComponent } from './configuration-monitoring.component';
import { ConfigurationRegistryMonitoringService } from './configuration-registry-monitoring.service';
import { of } from 'rxjs';

describe('ConfigurationMonitoringComponent', () => {
  let component: ConfigurationMonitoringComponent;
  let fixture: ComponentFixture<ConfigurationMonitoringComponent>;
  let mockMonitoringService: any;

  beforeEach(async () => {
    mockMonitoringService = {
      getMetrics: jasmine.createSpy('getMetrics').and.returnValue(
        of({
          totalConfigurations: 50,
          recentChanges: [],
          lastModified: new Date().toISOString(),
          changeFrequency: 5
        })
      ),
      getConfigChanges: jasmine.createSpy('getConfigChanges').and.returnValue(of())
    };

    await TestBed.configureTestingModule({
      declarations: [ ConfigurationMonitoringComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: ConfigurationRegistryMonitoringService, useValue: mockMonitoringService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMonitoringComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load metrics on init', () => {
    fixture.detectChanges();
    expect(mockMonitoringService.getMetrics).toHaveBeenCalled();
  });

  it('should apply filter by change type', () => {
    component.changeHistory = [
      {
        eventId: '1', configKey: 'key1', previousValue: 'old', newValue: 'new',
        changeType: 'update', timestamp: new Date().toISOString()
      },
      {
        eventId: '2', configKey: 'key2', previousValue: null, newValue: 'new',
        changeType: 'create', timestamp: new Date().toISOString()
      }
    ];

    component.onFilterChange('create');
    const filtered = component.getFilteredHistory();
    expect(filtered.length).toBe(1);
    expect(filtered[0].changeType).toBe('create');
  });

  it('should apply search filter', () => {
    component.changeHistory = [
      {
        eventId: '1', configKey: 'database_host', previousValue: 'old', newValue: 'new',
        changeType: 'update', timestamp: new Date().toISOString()
      },
      {
        eventId: '2', configKey: 'api_key', previousValue: null, newValue: 'key',
        changeType: 'create', timestamp: new Date().toISOString()
      }
    ];

    component.onSearch('database');
    const filtered = component.getFilteredHistory();
    expect(filtered.length).toBe(1);
    expect(filtered[0].configKey).toBe('database_host');
  });

  it('should refresh metrics', () => {
    component.refreshMetrics();
    expect(mockMonitoringService.getMetrics).toHaveBeenCalled();
  });

  it('should export change history', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:test');
    component.changeHistory = [
      {
        eventId: '1', configKey: 'key1', previousValue: 'old', newValue: 'new',
        changeType: 'update', timestamp: new Date().toISOString()
      }
    ];
    component.exportChangeHistory();
    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });

  it('should return correct badge class for change type', () => {
    expect(component.getChangeTypeBadgeClass('create')).toBe('badge-create');
    expect(component.getChangeTypeBadgeClass('update')).toBe('badge-update');
    expect(component.getChangeTypeBadgeClass('delete')).toBe('badge-delete');
  });
});
