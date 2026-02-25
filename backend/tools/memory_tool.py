from collections import defaultdict
from typing import List, Dict

_session_memory: Dict[str, List[Dict]] = defaultdict(list)


def add_message(session_id: str, role: str, content: str):
    _session_memory[session_id].append({
        "role": role,
        "content": content
    })


def get_memory(session_id: str, limit: int = 3) -> List[Dict]:
    history = _session_memory.get(session_id, [])
    return history[-limit:]


def clear_memory(session_id: str):
    if session_id in _session_memory:
        del _session_memory[session_id]