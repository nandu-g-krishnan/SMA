# PDF Ingestion Coverage Audit

This audit exists because the PDFs are the knowledge core of the trading platform. Text extraction alone is not considered complete for chart books, scanned pages, pattern diagrams, payoff charts, tables, or annotated screenshots.

## Corpus Summary

| PDF | Pages | Text Chars | Avg Chars/Page | Image Objects | Tables | Image Extraction Timeout | Table Extraction Timeout | Visual/OCR Review Required | Text Concept Hits |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 4823_Technical Analysis.pdf | 25 | 389 | 16 | 25 | 0 | No | No | Yes |  |
| Everything_you_need_to_know_about_investing-Advanced_series_eBook.pdf | 88 | 49225 | 559 | 211 | 10 | No | No | Yes | SMA, EMA, RSI, ADX, OBV, support, resistance, trend, breakout, pullback, gap, triangle, head and shoulders, double top, double bottom, flag, wedge, options |
| Idenitfying-Chart-Patterns.pdf | 49 | 26313 | 537 | 33 | 77 | No | No | Yes | SMA, EMA, RSI, ATR, support, resistance, trend, breakout, pullback, gap, triangle, head and shoulders, double top, double bottom, flag, pennant, wedge, volatility |
| idirect_marketstrategy_2026.pdf | 45 | 79328 | 1763 | 238 | 0 | No | No | No | SMA, EMA, RSI, MFI, support, trend, gap, volatility, risk, portfolio, fundamental, earnings, valuation, sector, macro, FII, sentiment, forecast |
| IJNRD2205074.pdf | 15 | 33331 | 2222 | 16 | 0 | No | No | No | SMA, EMA, RSI, OBV, PVT, gap, options, futures, volatility, risk, sentiment |
| indicators.pdf | 60 | 67658 | 1128 | 43 | 5 | No | No | Yes | SMA, EMA, WMA, RSI, MACD, ATR, OBV, support, resistance, trend, breakout, head and shoulders, double top, options, futures, volatility, risk, fundamental |
| Module-5_Options-Theory-for-Professional-Trading.pdf | 239 | 338856 | 1418 | 0 | 0 | Yes | No | Yes | SMA, EMA, RSI, OBV, support, resistance, trend, flag, options, futures, delta, gamma, theta, vega, volatility, open interest, risk, stop loss |
| mtm_251058.pdf | 185 | 299596 | 1619 | 106 | 0 | No | No | Yes | SMA, EMA, RSI, MACD, ADX, OBV, Bollinger, support, resistance, trend, breakout, gap, triangle, double top, double bottom, flag, options, futures |
| My Learnings - Profitable Trading Strategies.pdf | 42 | 32361 | 771 | 28 | 0 | No | No | Yes | SMA, EMA, RSI, Bollinger, support, resistance, trend, breakout, pullback, options, volatility, risk, stop loss, fundamental |
| Presentation_on_Basics_of_Stock_Selection.pdf | 41 | 15845 | 386 | 0 | 9 | Yes | No | Yes | SMA, EMA, RSI, support, resistance, trend, breakout, gap, volatility, risk, stop loss, portfolio, fundamental, earnings, sector, regression |
| rf-v2017-n4-1-pdf.pdf | 138 | 324122 | 2349 | 2 | 9 | No | No | Yes | SMA, EMA, RSI, OBV, PVT, support, trend, gap, flag, options, volatility, risk, portfolio, correlation, fundamental, earnings, valuation, sector |
| ssrn-3138630.pdf | 42 | 62958 | 1499 | 0 | 0 | No | No | No | SMA, EMA, RSI, PVT, support, trend, gap, options, volatility, risk, portfolio, correlation, fundamental, valuation, sector, sentiment |
| ssrn-3247865.pdf | 361 | 845370 | 2342 | 0 | 0 | No | No | No | SMA, EMA, WMA, VWAP, RSI, MACD, ATR, Bollinger, Donchian, support, resistance, trend, gap, options, futures, delta, gamma, theta |
| TA_wrkbk.pdf | 172 | 267427 | 1555 | 121 | 2 | No | No | Yes | SMA, EMA, RSI, MACD, ADX, OBV, MFI, PVT, Bollinger, support, resistance, trend, breakout, pullback, gap, triangle, head and shoulders, double top |
| Technical-analysis-Indicators.pdf | 52 | 12148 | 234 | 125 | 0 | No | No | Yes | SMA, EMA, RSI, MACD, ADX, ATR, OBV, PVT, Bollinger, Parabolic, support, resistance, trend, breakout, volatility, risk, regression, forecast |
| The-Complete-Guide-to-Trading.pdf | 116 | 213221 | 1838 | 0 | 0 | Yes | No | No | SMA, EMA, RSI, MACD, ADX, OBV, support, resistance, trend, breakout, gap, triangle, options, futures, volatility, risk, portfolio, correlation |
| Understanding-Indicators-TA.pdf | 43 | 19849 | 462 | 17 | 16 | No | No | Yes | SMA, EMA, RSI, MACD, ADX, ATR, OBV, MFI, Bollinger, support, resistance, trend, pullback, gap, volatility, risk |

## Absorption Rule

No source concept is considered fully absorbed until both embedded text and visual material have been checked. Pages marked `image-heavy-or-low-text` or `mixed-visual-text` require visual review before coding related indicators, chart patterns, options payoff behavior, risk models, or strategy rules.

## Deliverable Impact

- Update `docs/research/DocumentKnowledgeIndex.md` whenever this audit finds visual-only concepts.
- Update catalogs when a chart, diagram, payoff shape, table, or annotated example adds recognition rules or implementation constraints.
- Keep backlog stories source-cross-referenced to the PDFs and add visual-page references where a story depends on an image-heavy page.
