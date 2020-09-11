import json
import networkx as nx
from networkx.readwrite import json_graph


G = nx.barbell_graph(6, 3)
# this d3 example uses the name attribute for the mouse-hover value,
# so add a name to each node
for n in G:
    G.nodes[n]["name"] = n
# write json formatted data
d = json_graph.node_link_data(G)  # node-link format to serialize
# write json
json.dump(d, open("force/force.json", "w"))

class Grapher:

    def __init__(self):
        pass

    

