# basic class to represent papers
class Paper:
    
    # papers will at least have title
    def __init__(self,title,url,doi,citation_count,references_count):
        self.title = title
        self.url = url
        self.doi = doi
        self.citation_count = citation_count
        self.references_count = references_count
        self.author = None
        self.references = None
        self.subtitle = None

    def has_reference(self):
        return self.references != None

    def has_subtitle(self):
        return self.subtitle != None  

    def get_references(self):
        pass

class Reference:

    def __init__(self, key):
        self._key = key
        self.title = None

    @property
    def key(self):
        return self._key

    @key.setter
    def key(self, new_key):
        self._key = new_key
   


