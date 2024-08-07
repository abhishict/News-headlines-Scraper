# News Headline Scraper

This web application is designed to scrape news headlines from The Guardian for a specified date using BeautifulSoup. It serves as a tutorial for web scraping and showcases how to extract and display news headlines from a website.

## Features

- **Date Selection**: Allows users to select a date to view news headlines from The Guardian.
- **News Scraping**: Uses BeautifulSoup to scrape news headlines from The Guardian.
- **Dynamic Content**: Updates content based on the selected date and displays relevant headlines.

## Technologies Used

- **Flask**: Web framework for building the web application.
- **BeautifulSoup**: Library for web scraping and parsing HTML.
- **Requests**: For making HTTP requests to fetch web pages.
- **LXML**: XML and HTML parsing library.

## Setup Instructions

### Prerequisites

- Python 3.x
- Flask
- BeautifulSoup4
- Requests
- LXML

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**

   Create a virtual environment (optional but recommended) and install the required packages:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

   The `requirements.txt` file should include:

   ```plaintext
   Flask
   beautifulsoup4
   requests
   lxml
   ```

3. **Run the Application**

   ```bash
   python app.py
   ```

   The application will be available at `http://127.0.0.1:5000/`.

## Usage

1. **Navigate to the Web App**

   Open a web browser and go to `http://127.0.0.1:5000/`.

2. **Select a Date**

   Use the calendar interface to select the desired date for which you want to fetch news headlines.

3. **View News Headlines**

   The news headlines for the selected date will be displayed on the right side of the page.

## Code Explanation

- **`app.py`**: The main application file containing Flask routes and scraping logic.
  - `is_date_less(date_str1, date_str2)`: Compares two dates to determine if the first is earlier than the second.
  - `searchPages(searchDate)`: Searches for pages containing news articles from The Guardian for the specified date.
  - `scrapenews(searchDate, website_pages)`: Scrapes news headlines from the specified pages for the given date.
  - `index()`: Renders the main page of the application.
  - `get_news()`: Handles requests to fetch and display news headlines for the selected date.
