from serpapi import GoogleSearch
import os
from dotenv import load_dotenv
from fetch_url_content import fetch_page_content
from summarizer_tool import summarizer_func
load_dotenv()

def serp_search(query: str) -> list:
    params = {
        "engine": "google",
        "q": query,
        "api_key": os.getenv("serp_api"),
        "num": 5
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    organic_results = results.get("organic_results", [])
    serp_content = ""
    for result in organic_results:
        url = result.get("link")
        if url:
            serp_content += fetch_page_content(url)

    return serp_content

def scholar_search(query: str) -> list:
    params = {
        "engine": "google_scholar",
        "q": query,
        "api_key": os.getenv("serp_api"),
        "num": 5
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    scholar_content = ""
    organic_results = results.get("organic_results", [])
    for result in organic_results:
        url = result.get("link")
        if url:
            scholar_content += fetch_page_content(url)

    return scholar_content

query = "I want to conduct research on retrieval Augmented Generation"

searches = serp_search(query)
print("Searches: ", searches)
print("\n")
scholar_res = scholar_search(query)
print("Scholar Search: ", scholar_res)
print("\n")
merged_content = searches + scholar_res
summarized_content = summarizer_func(merged_content)
print("Summarized:", summarized_content)
