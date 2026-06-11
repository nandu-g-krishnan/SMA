import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  children?: NavItem[];
  requiredPermission?: string;
}

@Component({
  selector: 'app-product-navigation',
  templateUrl: './product-navigation.component.html',
  styleUrls: ['./product-navigation.component.css']
})
export class ProductNavigationComponent implements OnInit {
  navigationItems: NavItem[] = [];
  isExpanded = false;
  activeRoute: string = '';

  constructor(private router: Router) {
    this.initializeNavigation();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.updateActiveRoute();
    });
  }

  private initializeNavigation(): void {
    this.navigationItems = [
      {
        label: 'Dashboard',
        route: '/dashboard',
        icon: 'dashboard',
        requiredPermission: 'view_dashboard'
      },
      {
        label: 'Instruments',
        route: '/instruments',
        icon: 'inventory',
        requiredPermission: 'view_instruments'
      },
      {
        label: 'Trading',
        route: '/trading',
        icon: 'trending_up',
        requiredPermission: 'view_trading',
        children: [
          { label: 'Trade Setup', route: '/trading/setup', icon: 'settings' },
          { label: 'Entry/Exit', route: '/trading/entry-exit', icon: 'login' },
          { label: 'Signal Review', route: '/trading/signals', icon: 'notifications' }
        ]
      },
      {
        label: 'Journal',
        route: '/journal',
        icon: 'description',
        requiredPermission: 'view_journal',
        children: [
          { label: 'Trades', route: '/journal/trades', icon: 'receipt' },
          { label: 'Analysis', route: '/journal/analysis', icon: 'analytics' },
          { label: 'Performance', route: '/journal/performance', icon: 'bar_chart' }
        ]
      },
      {
        label: 'Research',
        route: '/research',
        icon: 'search',
        requiredPermission: 'view_research'
      },
      {
        label: 'Administration',
        route: '/admin',
        icon: 'admin_panel_settings',
        requiredPermission: 'view_admin'
      }
    ];
  }

  toggleNavigation(): void {
    this.isExpanded = !this.isExpanded;
  }

  navigate(route: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate([route]);
  }

  private updateActiveRoute(): void {
    this.activeRoute = this.router.url;
  }

  isActive(route: string): boolean {
    return this.activeRoute === route || this.activeRoute.startsWith(route + '/');
  }

  hasChildren(item: NavItem): boolean {
    return item.children && item.children.length > 0;
  }

  canAccess(item: NavItem): boolean {
    if (!item.requiredPermission) return true;
    // In real implementation, check user permissions
    return true;
  }
}
