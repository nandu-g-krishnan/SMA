import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ConfigurationRegistryComponent } from './configuration-registry.component';
import { ConfigurationItem, ConfigurationRegistryService } from './configuration-registry.service';
import { of, throwError } from 'rxjs';

describe('ConfigurationRegistryComponent', () => {
  let component: ConfigurationRegistryComponent;
  let fixture: ComponentFixture<ConfigurationRegistryComponent>;
  let mockConfigService: any;

  beforeEach(async () => {
    mockConfigService = {
      getConfigurations: jasmine.createSpy('getConfigurations').and.returnValue(
        of(new Map([
          ['key1', { key: 'key1', value: 'value1', type: 'string' }],
          ['key2', { key: 'key2', value: 123, type: 'number' }]
        ]))
      ),
      setConfiguration: jasmine.createSpy('setConfiguration').and.returnValue(
        of({ key: 'key1', value: 'updated', type: 'string' })
      ),
      deleteConfiguration: jasmine.createSpy('deleteConfiguration').and.returnValue(of(null)),
      validateConfiguration: jasmine.createSpy('validateConfiguration').and.returnValue(true),
      exportConfigurations: jasmine.createSpy('exportConfigurations').and.returnValue('{}'),
      importConfigurations: jasmine.createSpy('importConfigurations').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [ ConfigurationRegistryComponent ],
      imports: [ CommonModule, HttpClientTestingModule, FormsModule ],
      providers: [{ provide: ConfigurationRegistryService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load configurations on init', () => {
    expect(mockConfigService.getConfigurations).toHaveBeenCalled();
    expect(component.configurations.length).toBe(2);
  });

  it('should apply search filter', () => {
    component.configurations = [
      { key: 'search_term', value: 'test', type: 'string' },
      { key: 'other_key', value: 'test', type: 'string' }
    ];
    component.onSearch('search');
    expect(component.displayConfigs.length).toBe(1);
  });

  it('should apply type filter', () => {
    component.configurations = [
      { key: 'key1', value: 'value1', type: 'string' },
      { key: 'key2', value: 123, type: 'number' }
    ];
    component.onFilterChange('string');
    expect(component.displayConfigs.length).toBe(1);
  });

  it('should select configuration', () => {
    const config: ConfigurationItem = { key: 'test', value: 'value', type: 'string' };
    component.selectConfiguration(config);
    expect(component.selectedConfig).toBe(config);
  });

  it('should validate configuration on save', () => {
    const config: ConfigurationItem = { key: 'test', value: 'value', type: 'string' };
    component.selectedConfig = config;
    component.saveConfiguration();
    expect(mockConfigService.setConfiguration).toHaveBeenCalled();
  });

  it('should delete configuration with confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const config: ConfigurationItem = { key: 'test', value: 'value', type: 'string' };
    component.deleteConfiguration(config);
    expect(mockConfigService.deleteConfiguration).toHaveBeenCalledWith('test');
  });

  it('should export configurations', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:test');
    component.exportConfigurations();
    expect(mockConfigService.exportConfigurations).toHaveBeenCalled();
  });
});
