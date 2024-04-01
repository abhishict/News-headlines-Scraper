from flask import Flask, render_template, request
from datetime import datetime
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def is_date_less(date_str1, date_str2):
    date1 = datetime.strptime(date_str1, "%d %B %Y")
    date2 = datetime.strptime(date_str2, "%d %B %Y")
    return date1 < date2

def searchPages(searchDate):
    page_no = 1
    website_pages = []
    stopflag = False

    while(True):
        if stopflag:
            break

        website_url = f"https://www.theguardian.com/us-news?page={page_no}"
        html_text = requests.get(website_url).text
        soup = BeautifulSoup(html_text, 'lxml')
        newsdate = soup.find_all('time', class_="fc-date-headline")

        for date in newsdate:
            if date.text == searchDate:
                website_pages.append(page_no)
            elif is_date_less(date.text, searchDate):
                stopflag = True

        page_no += 1

    return website_pages

def scrapenews(searchDate, website_pages):
    news_headlines = ""
    for page_no in website_pages:
        website_url = website_url = f"https://www.theguardian.com/us-news?page={page_no}"
        html_text = requests.get(website_url).text
        soup = BeautifulSoup(html_text, 'lxml')
        jobs_all = soup.find_all('div', class_="fc-container__inner")
        for jobs in jobs_all:
            newsdate = jobs.find('time', class_="fc-date-headline").text
            if newsdate != searchDate:
                continue
            newsheadlinestxt = jobs.find_all('div', class_="fc-item__content")
            
            for headlineshtml in newsheadlinestxt:
                headlines = headlineshtml.find('span', class_="js-headline-text").text
                publishedTime = headlineshtml.find('span', class_="fc-timestamp__text").text
                news_headlines += f'{newsdate} {publishedTime}: {headlines}\n'

    news_headlines
    return news_headlines

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_news')
def get_news():

    clicked_date_str = request.args.get('clickedDate', None)

    if clicked_date_str is None:
        # If no specific date is provided, default to the current date
        clicked_date = datetime.now().strftime("%d %B %Y")
    else:
        clicked_date = datetime.strptime(clicked_date_str, "%d %B %Y").strftime("%d %B %Y")
    # clicked_date_str = request.args.get('clickedDate', '')
    # # Format the clicked_date_str to "20 January 2024" format
    # clicked_date = datetime.strptime(clicked_date_str, "%d %B %Y").strftime("%d %B %Y")
    
    # Use the formatted clicked_date in your existing scraping logic
    website_pages = searchPages(clicked_date)
    news_headlines = scrapenews(clicked_date, website_pages)
   
    return news_headlines

if __name__ == '__main__':
    app.run(debug=True)
