# Analytic Project

## Overview
Analytic is a web-based application designed to provide visual representations of data in various chart formats. It offers a user-friendly interface for creating, editing, and managing charts across different categories. With Analytic, users can generate insightful charts to analyze and interpret their data effectively.

## Features
- Visual representation of data in charts
- Support for multiple categories of charts
- User-friendly chart creation process
- Persistent storage of created charts
- User authentication via clerk.com

## Usage

### Creating a Chart
1. **Initialization**: Upon starting, the application displays tabs with predefined grids.
2. **Add Chart**: Click on the plus icon to open a sidebar with a form.
3. **Form Input**: Fill in the following details:
   - Chart title
   - XY axis labels
   - Labels (won't show if the chart is a pie chart or its variant)
   - Select a table from the database
   - Select the column for which you want to create a chart
   - Select Y-axis category and prefix
   - Group by option
   - Select colors for the chart
4. **Submit**: Click on the submit button to generate the chart.
5. **Chart Display**: The chart will be displayed in the grid.
6. **Editing**: The plus icon converts to edit, allowing users to modify the chart.
7. **Filtering**: Users can apply filters based on the chart's data.

### Managing Charts
- **Persistent Storage**: Each chart is assigned a unique ID and stored in the database, ensuring that the charts remain even if the grid layout changes.
- **Multiple Tabs**: Users can maintain data across different tables or categories by using multiple tabs.

## Authentication
Analytic utilizes user authentication provided by clerk.com to ensure secure access to the application.

## Requirements
- Web browser
- Internet connection

## Getting Started
1. Clone the repository from GitHub.
2. Install dependencies.
3. Set up user authentication using clerk.com.
4. Run the application locally or deploy it to a server.

## Acknowledgments
- Special thanks to clerk.com for providing user authentication services.
- Highcharts for providing charting functionalities.

## Support
For any issues or inquiries, please contact [insert contact information].
