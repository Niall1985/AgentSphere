import time


def run_tests(agent_data):

    agent = agent_data["agent"]
    tests = agent_data["tests"]

    logs = []
    latencies = []

    passed = 0
    total = len(tests)

    for test in tests:

        start = time.time()

        try:
            test()  # run test function
            passed += 1

            logs.append({
                "level": "success",
                "message": f"{test.__name__} passed"
            })

        except Exception as e:

            logs.append({
                "level": "error",
                "message": f"{test.__name__} failed: {str(e)}"
            })

        latency = time.time() - start
        latencies.append(latency)

    return passed, total, latencies, logs