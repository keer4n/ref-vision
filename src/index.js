import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, Arwes, createTheme, Content, Button} from 'arwes';
import Heading from 'arwes/lib/Heading';

const ResultItem = ({title, author, doi}) => {

  return (<li>         
            {title}<br/>
            {author}  
        </li>
        )
}




class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gotGraph: false
    }
    this.drawGraph = this.drawGraph.bind(this);
  }

  
   drawGraph = async(x) => {
     alert(x);
    let res =  await fetch("/api/g?query="+x)
                .then(resp => resp.json());
    console.log(res);
    this.setState({
      gotGraph: true
    })
    }
    
  
  render() {    
      return (
        <Content style={{padding: 100, textAlign: "left"}}>
        {this.state.gotGraph ? <Graph json={this.props.graphJson}/> :
          <ol>
               {this.props.results.map(
              r => <ResultItem onClick={(e) => {e.preventDefault(); this.drawGraph(r.doi)}}  key={r.doi} title={r.title} author={r.author} doi={r.doi}/>
              )}
            
          </ol>
               }
          </Content>
    )
    
  }
}

class Graph extends React.Component {
  render(){
    return (
      <h1>Graph</h1>
    )
  }
}

function SearchBar() {
  const [query, setQuery] = useState("");
  
    return (
    <div>
    <input 
      type="text" 
      onChange={(e) => {setQuery(e.target.value)}}
     />
     <br/><br/>
     <Search query={query}/>
     </div>
    )
  
}

class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      result: "",
      gotResults: false
    }
    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults = async() => {
    let res =  await fetch("/api/s/"+encodeURIComponent(this.props.query))
                .then(resp => resp.json());
    console.log(res);
    this.setState({
      result: res,
      gotResults: true
    })
  }

  render(){
    return (
        <div>
            <Button type="submit" onClick={
              () => {
                this.fetchResults()
              }
            }> Search</Button>
          
          {this.state.gotResults ? <Result results={this.state.result}/> : null}
          </div>
          
    )
  }
}

ReactDOM.render(
  <ThemeProvider theme={createTheme()}>
        <Arwes>
          <div style={{textAlign: "center"}}>
          <Heading node='h1'>REF-VISION</Heading>
          <Content>
            <SearchBar /> 
          </Content>
          </div>
        </Arwes>
      </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
