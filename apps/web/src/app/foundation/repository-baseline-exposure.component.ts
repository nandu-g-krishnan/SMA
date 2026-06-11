import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RepositoryBaselineData {
  id: string;
  version: string;
  timestamp: string;
  status: string;
  sourceTrace: string;
  metadata: Record<string, any>;
}

@Component({
  selector: 'app-repository-baseline-exposure',
  standalone: false,
  templateUrl: './repository-baseline-exposure.component.html',
  styleUrls: ['./repository-baseline-exposure.component.css']
})
export class RepositoryBaselineExposureComponent implements OnInit {
  baselineData: RepositoryBaselineData | null = null;
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBaselineData();
  }

  loadBaselineData(): void {
    this.loading = true;
    this.error = null;

    this.http.get<RepositoryBaselineData>('/api/foundation/repository-baseline')
      .subscribe({
        next: (data) => {
          this.baselineData = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to load repository baseline';
          this.loading = false;
        }
      });
  }

  refreshBaseline(): void {
    this.loadBaselineData();
  }

  downloadBaseline(): void {
    if (!this.baselineData) return;

    const dataStr = JSON.stringify(this.baselineData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `repository-baseline-${this.baselineData.version}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}
