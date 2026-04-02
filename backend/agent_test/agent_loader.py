import importlib.util
import os
import sys


def load_agent(repo_path):

    sys.path.insert(0, repo_path)

    main_file = os.path.join(repo_path, "main.py")
    test_file = os.path.join(repo_path, "tests", "test_agent.py")

    if not os.path.exists(main_file):
        raise Exception("main.py not found in repository")

    if not os.path.exists(test_file):
        raise Exception("tests/test_agent.py not found in repository")

    # ---- load main module ----
    main_spec = importlib.util.spec_from_file_location("agent_main", main_file)
    main_module = importlib.util.module_from_spec(main_spec)
    main_spec.loader.exec_module(main_module)

    if not hasattr(main_module, "test_agent"):
        raise Exception("main.py must contain a function named 'test_agent(prompt)'")

    # ---- load test module ----
    test_spec = importlib.util.spec_from_file_location("agent_tests", test_file)
    test_module = importlib.util.module_from_spec(test_spec)
    test_spec.loader.exec_module(test_module)

    # collect test functions
    test_functions = []

    for attr in dir(test_module):
        if attr.startswith("test_"):
            test_functions.append(getattr(test_module, attr))

    if len(test_functions) == 0:
        raise Exception("No test functions found in tests/test_agent.py")

    return {
        "agent": main_module.test_agent,
        "tests": test_functions
    }