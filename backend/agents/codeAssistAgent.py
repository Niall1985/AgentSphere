from tools.llm_tool import llm_model
from tools.memory_tool import add_message, get_memory

def codeAssist():
    session_id = "default_session"

    while True:
        query = input("Enter Query (type 'exit' to stop): ")

        if query.lower() == "exit":
            break

        history = get_memory(session_id)

        response = llm_model(history, query)

        add_message(session_id, "user", query)
        add_message(session_id, "assistant", response)

        print("\nAssistant:", response)