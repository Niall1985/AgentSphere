import wikipedia

def extract_wiki_data(topic : str) -> str:
    try:
        wikipedia.set_lang("en")
        page = wikipedia.page(topic, auto_suggest=False)
        return page.content
    
    except wikipedia.exceptions.DisambiguationError as e:
        return f"DisambiguationError: Multiple possible pages found for '{topic}'. Options: {e.options}"
    
    except wikipedia.exceptions.PageError:
        return f"PageError: No Wikipedia page found for '{topic}'."
    
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"