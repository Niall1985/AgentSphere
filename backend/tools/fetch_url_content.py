import requests
from bs4 import BeautifulSoup

def fetch_page_content(url):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    for script in soup(["script", "style"]):
        script.decompose()
    
    text = soup.get_text(separator=" ", strip = True)
    return text[:3000]

