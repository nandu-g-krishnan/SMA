import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductNavigationComponent } from './product-navigation.component';

describe('ProductNavigationComponent', () => {
  let component: ProductNavigationComponent;
  let fixture: ComponentFixture<ProductNavigationComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      events: jasmine.createSpyObj('events', ['subscribe'], { subscribe: () => {} }),
      url: '/dashboard'
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductNavigationComponent ],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize navigation items', () => {
    expect(component.navigationItems.length).toBeGreaterThan(0);
    expect(component.navigationItems[0].label).toBe('Dashboard');
  });

  it('should toggle navigation expansion', () => {
    expect(component.isExpanded).toBe(false);
    component.toggleNavigation();
    expect(component.isExpanded).toBe(true);
    component.toggleNavigation();
    expect(component.isExpanded).toBe(false);
  });

  it('should navigate to route', () => {
    component.navigate('/trading');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/trading']);
  });

  it('should check if route is active', () => {
    component.activeRoute = '/dashboard';
    expect(component.isActive('/dashboard')).toBe(true);
    expect(component.isActive('/trading')).toBe(false);
  });

  it('should identify items with children', () => {
    const tradingItem = component.navigationItems.find(item => item.label === 'Trading');
    expect(component.hasChildren(tradingItem)).toBe(true);
    
    const dashboardItem = component.navigationItems.find(item => item.label === 'Dashboard');
    expect(component.hasChildren(dashboardItem)).toBe(false);
  });

  it('should check permission access', () => {
    const dashboardItem = component.navigationItems[0];
    expect(component.canAccess(dashboardItem)).toBe(true);
  });

  it('should handle nested navigation', () => {
    const tradingItem = component.navigationItems.find(item => item.label === 'Trading');
    expect(tradingItem.children.length).toBe(3);
    expect(tradingItem.children[0].label).toBe('Trade Setup');
  });

  it('should filter navigation by permission', () => {
    const visibleItems = component.navigationItems.filter(item => component.canAccess(item));
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('should update active route on navigation', () => {
    component.activeRoute = '/trading/signals';
    expect(component.isActive('/trading/signals')).toBe(true);
    expect(component.isActive('/trading')).toBe(true);
  });

  it('should handle navigation with event', () => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');
    component.navigate('/research', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/research']);
  });
});
