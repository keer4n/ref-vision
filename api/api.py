import requests
import json
from flask import Flask, jsonify

from core.finder import Finder

app =  Flask(__name__, static_folder="force")

finder = Finder()

@app.route("/q/<queryString>")
def query_freeform(queryString):
    pass

@app.route("/q/<doi>")
def query_doi(doi):
    finder.search_works_by_doi(doi)



@app.route("/")
def static_proxy():
    return app.send_static_file("force.html")