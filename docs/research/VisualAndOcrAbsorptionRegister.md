# Visual And OCR Absorption Register

The supplied PDFs are the primary data source for the trading platform knowledge base. Text extraction alone is not sufficient because the corpus contains scanned pages, chart screenshots, indicator diagrams, payoff diagrams, visual tables, and annotated examples.

## Absorption Standard

- Embedded PDF text is only one ingestion channel.
- Embedded images, rendered pages, tables, and OCR addenda are part of the knowledge source.
- Pages marked visual/OCR review required must be treated as source material before implementing related strategies, indicators, pattern recognition, options analytics, risk controls, or market-intelligence features.
- OCR is supplemental. When OCR is blank or noisy, the page remains a visual source and must be reviewed semantically.

## Corpus Visual Coverage

| PDF | Pages | Embedded Images | Tables | OCR Pages Completed | Absorption Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| 4823_Technical Analysis.pdf | 25 | 25 | 0 | 25 | Fully image-heavy. OCR addendum now captures text from all pages; key absorbed concepts include technical analysis assumptions, market discounts everything, market moves in trends, history repeats, entry/exit timing, trend identification, technical vs fundamental analysis, Dow theory, and market psychology. |
| Everything_you_need_to_know_about_investing-Advanced_series_eBook.pdf | 88 | 211 | 10 | 32 | Visual/table material supports investing concepts, portfolio diversification, instrument education, chart examples, and risk framing. |
| Idenitfying-Chart-Patterns.pdf | 49 | 33 | 77 | 6 | Visual pattern examples are core source material for support/resistance, head and shoulders, double tops/bottoms, triangles, flags, pennants, wedges, gaps, breakouts, and pullbacks. |
| idirect_marketstrategy_2026.pdf | 45 | 238 | 0 | 4 | Visual charts and macro/sector dashboards are source material for market intelligence, FII/DII context, sector rotation, valuations, earnings, and global macro tracking. |
| IJNRD2205074.pdf | 15 | 16 | 0 | 0 | Text extraction is strong, with visuals retained as supporting research figures for quantitative/technical model framing. |
| indicators.pdf | 60 | 43 | 5 | 10 | Visual indicator examples supplement moving averages, oscillators, volatility tools, volume indicators, trend tools, and signal interpretation. |
| Module-5_Options-Theory-for-Professional-Trading.pdf | 239 | extraction timed out | 0 | 3 | Options payoff diagrams, Greeks illustrations, volatility examples, and expiry behavior must be treated as visual source material even where embedded image extraction timed out. |
| mtm_251058.pdf | 185 | 106 | 0 | 12 | Visual pages supplement market timing, trend behavior, trading psychology, and money-management rules. |
| My Learnings - Profitable Trading Strategies.pdf | 42 | 28 | 0 | 5 | Visual setup examples support profitable strategy patterns, entry/exit rules, stop-loss placement, and execution discipline. |
| Presentation_on_Basics_of_Stock_Selection.pdf | 41 | extraction timed out | 9 | 10 | Tables and slides support fundamental stock selection, screening factors, sector context, earnings quality, and portfolio-fit rules. |
| rf-v2017-n4-1-pdf.pdf | 138 | 2 | 9 | 9 | Tables/figures support quantitative model evaluation, portfolio research, and empirical validation concepts. |
| ssrn-3138630.pdf | 42 | 0 | 0 | 0 | Text extraction is strong; concepts feed quantitative research and validation stories. |
| ssrn-3247865.pdf | 361 | 0 | 0 | 0 | Text extraction is strong; concepts feed portfolio, quantitative modeling, and ML-validation stories. |
| TA_wrkbk.pdf | 172 | 121 | 2 | 7 | Visual chart examples are source material for indicators, patterns, trendlines, trade planning, and workbook-style recognition rules. |
| Technical-analysis-Indicators.pdf | 52 | 125 | 0 | 26 | Highly visual indicator document. OCR addendum captures low-text pages; charts remain source material for formulas, interpretation, bullish/bearish signals, and limitations. |
| The-Complete-Guide-to-Trading.pdf | 116 | extraction timed out | 0 | 4 | Broad trading guide; visual extraction timeout means screenshots/figures must be reviewed before implementing execution, psychology, and risk rules derived from it. |
| Understanding-Indicators-TA.pdf | 43 | 17 | 16 | 10 | Tables and indicator visuals support trend, momentum, volatility, volume, and pullback interpretation. |

## Research Artifacts

- `research/PdfIngestionCoverageAudit.md` records corpus-level image, table, text-density, and visual-review coverage.
- `research/ingestion-audit/*.md` records page-level coverage for each PDF.
- `research/OcrAbsorptionSummary.md` records low-text page OCR coverage.
- `research/ocr/*.md` stores OCR addenda for rendered low-text pages.

## Implementation Rule

Stories and implementation tasks that depend on chart interpretation, visual patterns, indicator diagrams, options payoff shapes, stock-selection tables, or market-strategy charts must cite both the original PDF and the relevant audit/OCR artifact. A feature is not ready for implementation sign-off if its source pages are flagged visual/OCR review required and have not been reconciled into the appropriate catalog.
