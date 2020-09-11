from paper import Paper, Reference

class ParseError(Exception):
    def __init__(self, message):
        self.message = message
    
    def __repr__(self):
        return "PARSE_ERROR: "+ self.message

# To view if a field is requried (i.e. will be always present) or not consult:
# https://github.com/Crossref/rest-api-doc/blob/master/api_format.md#contributor
class CrossRefRestParser:
    def __init__(self):
        pass
    
    def parse_response(self, api_return):
        mapping_dict = {
            'work': self.parse_work
            'work-list': self.parse_work_list
        }

        mapping_dict[api_return['message-type']](api_return['message'])
        # if api_return["message-type"] == "work":
        #     self.parse_work(api_return["message"])
        # if api_return["message-type"] == "work-list":
        #     self.parse_work_list(api_return["message"])

    def parse_work(self, work):
        title = work['title']
        url = work['URL']
        doi = work['DOI']
        citation_count = work['is-referenced-by-count']
        references_count = work['references-count']
        parsed_paper = Paper(title,url,doi,citation_count,references_count)
        try:
            author = work['author'] # TODO: handle missing case
            parsed_paper.author = author
        except KeyError:
            print("WARNING: author field is not present")
            pass
        try:
            subtitle = work['subtitle'] # may miss
            parsed_paper.subtitle = subtitle
        except KeyError:
            print("WARNING: subtitle field is not present")
            pass
        try:
            reference = work['reference'] # may miss
            parsed_paper.references = self.parse_reference(reference)
        except KeyError:
            print("WARNING: reference field is not present")
            pass
        return parsed_paper
    
    def parse_work_list(self, work_list):
        parsed_papers = []
        for item in work_list:
            parsed_papers.add(self.parse_work(item))
        return parsed_papers


    # TODO: right now assumes either "unstructured" or "article-title" is present
    # fix that
    def parse_reference(self, references):
        parsed_references = []
        for ref in references:
            key = ref["key"]
            parsed_reference = Reference(key)
            try: 
                article_title = ref["article-title"]
                parsed_reference.title = article_title
            except KeyError:
                print("WARNING: not all fields present")
                pass
            parsed_references.append(parsed_reference)
            try:
                unstructured = ref["unstructured"]
                parsed_reference.title = unstructured
            except KeyError:
                print("WARNING: not all fields present")
                pass
        return parsed_references