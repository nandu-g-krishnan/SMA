import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface NavigationState {
  isInitialized: boolean;
  itemsCount: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductNavigationService {
  private navigationState: NavigationState | null = null;

  constructor(private http: HttpClient) {}

  loadNavigationState(): Observable<NavigationState> {
    if (this.navigationState) {
      return of(this.navigationState);
    }

    return this.http.get<NavigationState>('/api/foundation/navigation-state')
      .pipe(
        tap(state => {
          this.navigationState = state;
        }),
        catchError(() => {
          // Fallback state if API unavailable
          const fallbackState: NavigationState = {
            isInitialized: true,
            itemsCount: 6,
            lastUpdated: new Date().toISOString()
          };
          this.navigationState = fallbackState;
          return of(fallbackState);
        })
      );
  }

  refreshNavigationState(): Observable<NavigationState> {
    this.navigationState = null;
    return this.loadNavigationState();
  }

  getNavigationState(): NavigationState | null {
    return this.navigationState;
  }
}
