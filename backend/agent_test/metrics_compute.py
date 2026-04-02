import statistics

def compute_metrics(passed, total, latencies):

    success_rate = (passed / total) * 100
    avg_latency = statistics.mean(latencies)

    return {
        "success_rate": round(success_rate,2),
        "avg_response": round(avg_latency,2),
        "tests_passed": passed,
        "tests_total": total,
        "error_rate": round((total-passed)/total*100,2)
    }