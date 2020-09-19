## Ref-vision

This project is written with `reactjs` frontend and `flask` backend.

This project aims to provide high level overview of how references are connected
with each other in any given paper. The backend consumes the [crossref api](https://github.com/CrossRef/rest-api-doc) and 
builds the reference graph to provide services of ref-vision api that is rendered
by the frontend using reactjs.

To run and test the program locally:

1. Clone this repository.
2. First install the python requirements from the `requirements.txt`.
3. Go inside the `api` directory and run the flask api using `flask run`. This should
   be running on localhost port 5000.
4. Then, in the parent directory, run the reactjs frontend using `yarn start`. This
   should run on localhost port 3000.
5. You can run the app by visiting `localhost:3000` in your browser.


### Known Issues

1. As the flask api gets its data from crossref's api, only papers that have their
   references registered with crossref can be visualized as graph.
2. Currently, the graph is drawn to only single depth.

