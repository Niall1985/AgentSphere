import os
import subprocess
import uuid

BASE_DIR = "test_runs"

def clone_repo(repo_url):

    run_id = str(uuid.uuid4())
    repo_path = os.path.join(BASE_DIR, run_id)

    os.makedirs(BASE_DIR, exist_ok=True)

    subprocess.run(
        ["git", "clone", repo_url, repo_path],
        check=True
    )

    return repo_path