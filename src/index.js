import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, Arwes, createTheme, Content, Frame} from 'arwes';
import Heading from 'arwes/lib/Heading';
import Graph from './Graph'

class ResultItem extends React.Component {

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(e){
    e.preventDefault()
    this.props.onClicked(this.props.doi)
  }

  render(){
    return (<li onClick={this.handleClick}>
            {this.props.title}<br/>
            {this.props.author}
            </li>)
  }
}



class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      resultJson : null
    }
  }
    
    

    componentDidUpdate(prevProps){
      if(this.props.query !== prevProps.query){
      fetch("https://ref-vision-api.herokuapp.com/api/s?query="+this.props.query)
                  .then(resp => resp.json())
                  .then(data => this.setState({
                    resultJson: data,
                  }));
    
      }
    }

  
  render() {    
      
      if (this.props.searchMode && !this.props.graphMode){
        if(this.state.resultJson == null){
          return null
        } else {
         return (<Content style={{padding: 100, textAlign: "left"}}>
           <ol>
                {this.state.resultJson.map(
               r => <ResultItem onClicked={this.props.onResultItemClick}  key={r.doi} title={r.title} author={r.author} doi={r.doi}/>
                )}
             
           </ol>
                
           </Content>)
        }
      }
      else if(this.props.graphMode){
        return (<Content style={{padding: 10, textAlign: "left"}}>
                  <Graph doi={this.props.doi}></Graph>
                </Content>
              )
      }    
    
    
  }
}



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query : ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit(e) {
    this.props.onQueryInput(this.state.query);
    e.preventDefault();
  }
  

  render(){
    return (
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              value={this.state.query}
              onChange={(e) => {this.setState({
                query : e.target.value
              })} }/>
          </form>
          )
      }
}

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query:"",
      gotQuery:false,
      searchMode: true,
      graphMode: false,
      gotResults: false,
      gotGraphJson: false,
      resultJson: null,
      graphJson: null
    };
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
    this.handleResultItemClick = this.handleResultItemClick.bind(this);
    // this.fetchResults = this.fetchResults.bind(this);
  }

  

  handleSearchBarSubmit(searchQuery) {
    this.setState({
      query : searchQuery,
      graphMode: false
    });
  }

  handleResultItemClick(key) {
    this.setState({
      doi : key,
      graphMode: true
    })
  }

  render() {
    return (
      <div>
          <SearchBar 
            onQueryInput={this.handleSearchBarSubmit}/>
            <Frame style={{margin:"20px"}}>
              <Result 
                query={this.state.query}
                doi={this.state.doi}
                searchMode={this.state.searchMode} 
                graphMode={this.state.graphMode}
                onResultItemClick={this.handleResultItemClick}/>
            </Frame></div>)
  }
}

ReactDOM.render(
  <ThemeProvider theme={createTheme()}>
        <Arwes>
          <div style={{textAlign: "center"}}>
          <Heading node='h1'>REF-VISION</Heading>
          <Main />
          </div>
        </Arwes>
      </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
