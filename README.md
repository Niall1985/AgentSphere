# AgentSphere

## Project Overview
AgentSphere is a unified **Agent-as-a-Service and AgentOps platform** designed to support both end users who interact with AI agents and developers who build, test, and evaluate those agents. The platform enables multi-agent query handling while also providing structured evaluation, monitoring, and execution control for agent developers.

Unlike existing fragmented solutions, AgentSphere integrates **agent usage and agent operations** into a single, transparent, and scalable system.

---

## Problem Statement
As AI agents and multi-agent systems become more common, users need simple ways to obtain answers from agents, while developers need reliable tools to test, evaluate, and monitor agent behavior before deployment.

Current platforms either:
- Focus only on user interaction, or
- Focus only on development workflows

This lack of a unified system makes it difficult to ensure **agent reliability, safety, performance, and interoperability**.

---

## Vision Statement
To create a centralized, transparent, and scalable platform that seamlessly integrates **AI agent usage and agent evaluation**, enabling reliable deployment, testing, and interaction with autonomous agents.

---

## Target Users (Personas)

### 1. General User
- Submits queries and receives AI-generated responses
- Does not need to understand agent internals
- Expects accurate and fast responses

### 2. Agent Developer
- Builds AI agents
- Links agent repositories
- Executes and evaluates agents
- Reviews performance reports and logs

### 3. System Administrator
- Monitors system health and agent execution
- Manages users and configurations
- Ensures platform stability and security

---

## Key Features / Goals
- Multi-agent query routing and aggregation
- User interface for submitting and viewing query responses
- Agent repository linking (Git-based)
- Sandboxed and controlled agent execution
- Automated evaluation and performance reporting
- Execution logs and monitoring dashboards
- Separation of user interaction and AgentOps workflows
- Scalable and modular system architecture

---

## Technology Stack
    - Frontend	                React / Next.js
    - Backend	                Node.js / Python (FastAPI)
    - Agent Execution	        Docker
    - Evaluation Engine	        Python
    - Database	                PostgreSQL / MongoDB
    - Logging & Monitoring	    Prometheus / Grafana
    - Version Control	        GitHub
    - CI/CD	                    GitHub Actions
    - Containerization	        Docker
    - Project Management	    GitHub Projects
    
---

## Success Metrics
- User queries are processed successfully using multiple agents
- Agent repositories can be linked and executed without failure
- Accurate evaluation reports are generated consistently
- Users can interact with the platform easily
- Administrators can access logs and monitoring data
- Project is completed within academic timeline and scope

---

## Workflow

### User Workflow
1. User submits query
2. System routes query to agents
3. Agents execute in sandbox
4. Responses are aggregated
5. Final response returned to user

### Developer Workflow
1. Developer links repository
2. Repository is validated
3. Agent executes in sandbox
4. Metrics and logs are generated
5. Evaluation report is stored

---

## MoSCoW Prioritization

### Must Have
- Query submission and response
- Multi-agent routing
- Agent execution sandbox
- Agent evaluation
- Logging system
- Dockerized deployment

### Should Have
- Aggregated responses
- Performance metrics
- Admin dashboard
- Execution history
- GitHub repository linking

### Could Have
- Advanced analytics dashboards
- Auto-scaling agents
- Agent ranking
- Alerting system

### Won’t Have (for this phase)
- Paid integrations
- Enterprise authentication
- Real-time streaming responses

---

## Branching Strategy (GitHub Flow)

- `main` → Stable production-ready branch  
- `feature/*` → New feature development  
- `fix/*` → Bug fixes and patches  

### Example Workflow
```bash
git checkout -b feature/agent-evaluation
git commit -m "Add agent evaluation module"
git push origin feature/agent-evaluation
```
---

## Assumptions
- Users have access to a modern web browser
- Agent repositories follow predefined interface standards
- Developers provide valid executable agent code
- Internet connectivity is available
- Evaluation metrics are predefined

---

## Constraints
- Academic project timeline
- Use of open-source or free technologies only
- Safe execution of external agent code is required
- System complexity must remain manageable
- Internet dependency for repository access

---

## Docker Setup

AgentSphere is containerized using Docker to ensure consistent execution environments for agents and platform services.

### Prerequisites
- Docker (v20+)
- Docker Compose (optional)
- Git

### Build the Docker Image
```bash
docker build -t agentsphere .
