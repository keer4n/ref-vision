import json
import networkx as nx
from networkx.readwrite import json_graph

class Grapher:

    DEPTH = 1
    def __init__(self, paper):
        """
        Parameters
        ----------
        paper : Paper
            a Paper as defined in paper.py
        """
        self._G = nx.DiGraph()
        self._paper = paper
    
    def create(self, depth = DEPTH):
        self._G.add_node(self._paper)
        for ref in self._paper.references:
                self._G.add_edge(self._paper, ref)
        for n in self._G:
            self._G.nodes[n]["name"] = n
        return self._G

    @property
    def graph(self):
        return self._G

    

