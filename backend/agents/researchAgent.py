from tools.llm_tool import llm_model
from tools.serp_tool import scholar_search, serp_search
from tools.summarizer_tool import summarizer_func
from tools.wikipedia_tool import extract_wiki_data

SYSTEM_PROMPT = """
You are a structured research assistant.

Your job is to take the provided content and reorganize it into a clear,
well-structured, and logically connected format.

Ensure:
- Proper flow between sentences and paragraphs.
- Clear sectioning with meaningful headings when appropriate.
- Logical progression of ideas.
- Removal of redundancy.
- Improved clarity and coherence.
- Preservation of all important information from the original input.

Do NOT introduce new information.
Do NOT provide explanations about what you changed.
Only return the properly structured and refined content.
"""
def run(history, message):
    serp_content = serp_search(message)
    scholar_content = scholar_search(message)
    wiki_content = extract_wiki_data(message)
    content = serp_content + scholar_content + wiki_content
    summarized_content = summarizer_func(content)
    return llm_model(history, summarized_content, SYSTEM_PROMPT)