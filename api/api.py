import requests
import json
from flask import Flask, jsonify

from core.finder import Finder

app =  Flask(__name__, static_folder="force")

finder = Finder()

@app.route("/s/<queryString>")
def search(queryString):    #TODO: probably should sanitize ?
    """ generic query string search
    search for a query returning result list which can be further used
    to select specific papers with doi to create graph
    
    Parameters
    ----------
    queryString : str
        search query provided by the user
    
    Returns
    -------
    json
        response json
    """
    pass

@app.route("/q/doi/<doi>")
def query_doi(doi):
    """ specific request using doi
    the doi is queried directly
    
    Parameters
    ----------
    doi : str
        specially formatted doi string

    Returns
    -------
    json
        response json containing the work referenced by doi
    """
    finder.fetch_by_doi(doi)



@app.route("/")
def static_proxy():
    return app.send_static_file("force.html")
