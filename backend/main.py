from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define data structure received from frontend


class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)

    # --- DAG check algorithm (cycle detection) ---
    # 1. Build adjacency list (graph) and calculate in-degrees
    adj_list = {node['id']: [] for node in data.nodes}
    in_degree = {node['id']: 0 for node in data.nodes}

    for edge in data.edges:
        source = edge.get('source')
        target = edge.get('target')
        # Check if both source and target nodes exist in our graph
        if source in adj_list and target in in_degree:
            adj_list[source].append(target)
            in_degree[target] += 1

    # 2. Find all nodes with no incoming edges (in-degree == 0)
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0

    # 3. Traverse the graph (Kahn's Algorithm)
    while queue:
        current = queue.pop(0)
        visited_count += 1

        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If the number of visited nodes equals the total number of nodes, it's a DAG (no cycles)
    is_dag = (visited_count == num_nodes)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
