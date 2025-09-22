# Power BI Visual Dictionary - Retail Fashion Boutique Analytics

This visual dictionary documents the specific Power BI visuals, their configurations, and purposes for the Retail Fashion Boutique Sales & Collection Analytics dashboard.

## Visual Specifications

### 1. Monthly Revenue (Line Chart) — "Monthly Revenue"
- **Chart Type:** Line Chart
- **Fields:** 
  - X-axis: `month_start` 
  - Y-axis: `total_revenue`
- **Tooltips:** `aov`, `return_rate_pct`
- **Purpose:** Track sales trends over time with quick hover insights
- **Configuration:**
  - Continuous X-axis for proper time series display
  - Professional formatting with K units
  - Tooltip provides additional context without cluttering

### 2. Revenue by Brand & Season (Treemap)
- **Chart Type:** Treemap
- **Fields:** 
  - Category: `brand`
  - Details: `season` 
  - Values: `total_revenue`
- **Purpose:** Visual hierarchy showing which brands drive revenue and seasonal splits
- **Configuration:**
  - Hierarchical display with brand as primary grouping
  - Season as secondary detail level
  - Size represents revenue contribution

### 3. Top Products (Table)
- **Chart Type:** Table
- **Fields:** `product_id`, `brand`, `category`, `season`, `revenue`, `contribution_pct`
- **Filters:** Top N (Top 20 by revenue)
- **Purpose:** Fast ranking and contribution analysis to total revenue
- **Configuration:**
  - Top N filtering for focused analysis
  - Conditional formatting with data bars on revenue
  - Sorted by revenue descending

### 4. Category Share by Month (100% Stacked Column)
- **Chart Type:** 100% Stacked Column Chart
- **Fields:** 
  - X-axis: `month_start`
  - Values: `total_revenue`
  - Legend: `category`
- **Purpose:** Mix shift analysis across months — percent-of-total view
- **Configuration:**
  - Shows category composition over time
  - Percentage-based for mix analysis
  - Cross-filtering enabled with other visuals

### 5. Report-Page Tooltip (tt-Month)
- **Chart Type:** Report Page Tooltip
- **Visuals:** Multi-row cards with `total_revenue`, `orders`, `aov`, `return_rate_pct`, `avg_rating`
- **Applied to:** Line chart, 100% stacked column, and treemap
- **Purpose:** Rich contextual information on hover without cluttering main canvas
- **Configuration:**
  - Dedicated tooltip page
  - Multiple KPI cards for comprehensive context
  - Applied to time-based visuals

### 6. Drillthrough: Brand Details Page
- **Chart Type:** Drillthrough Page
- **Drillthrough field:** `brand`
- **Page visuals:** 
  - KPI cards (Revenue, Orders, AOV, Return %)
  - Line chart by `month_start`
  - Treemap by `season`
  - Top products table
- **Purpose:** Deep-dive analysis for individual brand performance
- **Configuration:**
  - "Keep all filters" enabled
  - Back button for navigation
  - Focused brand-specific analysis

### 7. Decomposition Tree (Returns or Revenue)
- **Chart Type:** Decomposition Tree (AI Visual)
- **Analyze:** `returns` or `total_revenue`
- **Explain by:** `brand` → `season`
- **Purpose:** AI-assisted explanation of performance drivers in one visual
- **Configuration:**
  - AI-powered insights
  - Hierarchical breakdown
  - Interactive exploration of drivers

## Cross-Page Elements & Interactivity

### Slicers & Filters
- **Brand slicer** - Filter the entire page by brand selection
- **Category slicer** - Optional secondary filtering capability
- **Configuration:**
  - Single select or multi-select based on use case
  - Applied to all relevant visuals

### Model Relationships
- **Many-to-many links:** 
  - `monthly_sales[brand]` ↔ `brand_season[brand]`
  - `monthly_sales[brand]` ↔ `top_products[brand]`
- **Cross filter direction:** Both ways to keep slicers/filters synchronized across imported Gold views
- **Purpose:** Unified filtering experience across different data sources

## Technical Implementation Notes

### Data Model
- **Import mode** with Databricks connector
- **Star schema** with proper relationships
- **SQL views** handle business logic upstream

### Performance Optimization
- **Top N filtering** reduces data volume
- **Aggregated measures** for faster rendering
- **Proper indexing** on date and categorical fields

### User Experience
- **Consistent formatting** across all visuals
- **Intuitive navigation** with drillthrough and back buttons
- **Rich tooltips** provide context without clutter
- **Cross-filtering** maintains context across visuals

## Usage Guidelines

### Best Practices
1. **Start with overview** - Use main dashboard for high-level insights
2. **Drill down gradually** - Use drillthrough for detailed analysis
3. **Leverage tooltips** - Hover for additional context
4. **Use filters strategically** - Apply brand/category filters for focused analysis
5. **Explore AI insights** - Use decomposition tree for root cause analysis

### Interactive Features
- **Click to filter** - Click on any visual element to filter others
- **Right-click menu** - Access drillthrough and other options
- **Tooltip exploration** - Hover over data points for rich context
- **Slicer combinations** - Use multiple slicers for compound filtering

---

*This visual dictionary serves as a reference for understanding the Power BI dashboard structure, configurations, and intended usage patterns for the Retail Fashion Boutique Analytics dashboard.*
