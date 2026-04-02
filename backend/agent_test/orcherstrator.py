import re
import subprocess
import time
import psutil
import statistics
from .repo_clone import clone_repo
from .agent_loader import load_agent


def log(msg, level="INFO"):
    timestamp = time.strftime("%H:%M:%S")
    prefix = {
        "INFO":    "\033[94m[INFO]\033[0m",
        "SUCCESS": "\033[92m[SUCCESS]\033[0m",
        "ERROR":   "\033[91m[ERROR]\033[0m",
        "WARN":    "\033[93m[WARN]\033[0m",
        "DATA":    "\033[96m[DATA]\033[0m",
    }.get(level, "[LOG]")
    print(f"{timestamp} {prefix} {msg}", flush=True)


def run_agent_tests(repo_url):

    log(f"Starting test run for: {repo_url}")
    log("Cloning repository...")

    repo_path = clone_repo(repo_url)
    log(f"Repo cloned to: {repo_path}", "SUCCESS")

    log("Loading agent from cloned repo...")
    try:
        load_agent(repo_path)
        log("Agent loaded successfully", "SUCCESS")
    except Exception as e:
        log(f"Agent loading failed: {e}", "ERROR")
        return {"error": f"Agent loading failed: {str(e)}"}

    logs = []
    performance = []
    latencies = []
    test_results = []

    start = time.time()
    logs.append({"time": round(start, 2), "level": "info", "message": "Agent initialized"})
    log("Agent initialized — launching pytest subprocess...")

    process = subprocess.Popen(
        ["python", "-m", "pytest", "--maxfail=5", "--disable-warnings", "-q"],
        cwd=repo_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    log(f"Pytest process started (PID {process.pid})")

    interval_start = time.time()
    sample_count = 0

    while process.poll() is None:
        cpu = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory().percent
        timestamp = round(time.time() - start, 2)
        sample_count += 1

        performance.append({"time": timestamp, "cpu": cpu, "memory": memory})
        logs.append({"time": timestamp, "level": "info", "message": f"CPU {cpu}% | Memory {memory}%"})

        log(f"[sample {sample_count}] t={timestamp}s | CPU={cpu}% | MEM={memory}%")

    wall_time = round(time.time() - interval_start, 2)
    latencies.append(wall_time)
    log(f"Pytest process finished in {wall_time}s — collected {sample_count} perf samples", "SUCCESS")

    stdout, stderr = process.communicate()

    log("--- PYTEST STDOUT ---")
    for line in stdout.strip().splitlines():
        print(f"         {line}", flush=True)

    if stderr.strip():
        log("--- PYTEST STDERR ---", "WARN")
        for line in stderr.strip().splitlines():
            print(f"         {line}", flush=True)
    else:
        log("No stderr output")

    # handles both "1 failed, 4 passed" and "4 passed, 1 failed"
    passed_match = re.search(r'(\d+) passed', stdout)
    failed_match = re.search(r'(\d+) failed', stdout)

    passed = int(passed_match.group(1)) if passed_match else 0
    failed = int(failed_match.group(1)) if failed_match else 0

    log(f"Parsed pytest summary → passed={passed}, failed={failed}", "DATA")

    logs.append({
        "time": round(time.time() - start, 2),
        "level": "success",
        "message": "Test execution finished"
    })

    if failed > 0:
        log(f"{failed} test(s) failed", "ERROR")
        logs.append({
            "time": round(time.time() - start, 2),
            "level": "error",
            "message": f"{failed} tests failed"
        })

    test_results.append({"name": "Agent Tests", "passed": passed, "failed": failed})

    total_tests = passed + failed
    metrics = {
        "success_rate": round((passed / total_tests) * 100, 2) if total_tests > 0 else 0,
        "avg_response": round(statistics.mean(latencies), 2) if latencies else 0,
        "tests_passed": passed,
        "tests_total": total_tests,
        "error_rate": round((failed / total_tests) * 100, 2) if total_tests > 0 else 0,
    }

    log("--- FINAL METRICS ---", "DATA")
    for key, val in metrics.items():
        log(f"  {key}: {val}", "DATA")

    log(f"Performance samples collected: {len(performance)}", "DATA")
    log(f"Logs collected: {len(logs)}", "DATA")
    log("Returning payload", "SUCCESS")

    return {"metrics": metrics, "performance": performance, "tests": test_results, "logs": logs}