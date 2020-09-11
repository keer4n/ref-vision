import requests
from crossrefparser import CrossRefRestParser

class ApiError(Exception):
    def __init__(self, message, status):
        self.message = message
        self.status = status

    def __repr__(self):
        return "API_ERROR[{}]:".format(self.status)+ self.message

class Finder:

    base_url = "https://api.crossref.org/works"
    def __init__(self):
        pass

    # TODO: probably url encode doi as recommended in:
    # https://github.com/CrossRef/rest-api-doc#api-overview
    def search_works_by_doi(self,doi):
        resp = requests.get(self.base_url+"/"+doi)
        if resp.status_code != 200:
            raise ApiError("DOI request error", resp.status_code)
        else:
            return resp.json()

    def search_works_by_query(self, q):
        resp = requests.get(self.base_url+"?query="+q+"&rows=5")
        if resp.status_code != 200:
            raise ApiError("Query request error", resp.status_code)
        else:
            return resp.json()


ret = Finder().search_works_by_query("10.1145/3133956.3134093")
pout = CrossRefRestParser().parse_search_works_by_query_resp(ret)
print(pout)