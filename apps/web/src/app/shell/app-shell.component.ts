import { Component, OnInit } from '@angular/core';
import { ProductNavigationService } from './product-navigation.service';

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {
  navigationReady = false;
  contentReady = false;

  constructor(private navService: ProductNavigationService) {}

  ngOnInit(): void {
    this.initializeShell();
  }

  private initializeShell(): void {
    this.navService.loadNavigationState().subscribe(
      () => {
        this.navigationReady = true;
      },
      (error) => {
        console.error('Navigation initialization failed:', error);
        this.navigationReady = false;
      }
    );
    this.contentReady = true;
  }
}
