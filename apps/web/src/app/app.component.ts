import { Component } from '@angular/core';

@Component({
  selector: 'sma-root',
  standalone: true,
  template: `
    <main class="shell">
      <section class="status">
        <p class="eyebrow">SMA Foundation Platform</p>
        <h1>Kite to PostgreSQL market-data foundation</h1>
        <p class="summary">
          Implementation is authorized. The first milestone is Kite login, instrument sync,
          live tick stream, PostgreSQL tick storage, and 1 minute candle generation.
        </p>
      </section>

      <section class="grid" aria-label="Foundation gates">
        <article>
          <h2>Architecture</h2>
          <p>Baseline v1 locked. Future architecture changes require ACR approval.</p>
        </article>
        <article>
          <h2>Data</h2>
          <p>Reference data, database, market data, and data-quality validation come first.</p>
        </article>
        <article>
          <h2>Safety</h2>
          <p>No execution or live trading before paper trading and capital protection gates pass.</p>
        </article>
      </section>
    </main>
  `,
  styles: [`
    .shell {
      max-width: 1120px;
      margin: 0 auto;
      padding: 48px 24px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #172026;
    }

    .status {
      border-bottom: 1px solid #d8dee4;
      padding-bottom: 32px;
    }

    .eyebrow {
      color: #006a67;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }

    h1 {
      max-width: 760px;
      margin: 0;
      font-size: 40px;
      line-height: 1.1;
    }

    .summary {
      max-width: 760px;
      color: #4b5863;
      font-size: 18px;
      line-height: 1.55;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 28px;
    }

    article {
      border: 1px solid #d8dee4;
      border-radius: 8px;
      padding: 20px;
      background: #ffffff;
    }

    h2 {
      margin: 0 0 8px;
      font-size: 18px;
    }

    article p {
      margin: 0;
      color: #4b5863;
      line-height: 1.5;
    }

    @media (max-width: 760px) {
      h1 {
        font-size: 30px;
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AppComponent {}
