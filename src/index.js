import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, Arwes, createTheme, Content, Button} from 'arwes';
import Heading from 'arwes/lib/Heading';

const ResultItem = ({title, author}) => {
  return (<li>
            {title}<br/>
            {author}
        </li>
        )
}

async function fetchResults() {
    const result = await (await fetch("/q/"+this.state.query)).json();
    console.log(result)
    return result;
}


class Result extends React.Component {
  constructor(props){
    super(props);
  }



  render() {    
      return (
        <Content style={{padding: 100, textAlign: "left"}}>
          <Heading node = "h2">Results</Heading>
          <ul>
            {this.props.results.map(
              r => <ResultItem title={r.title} author={r.author}/>
              )}
              </ul>
          
        </Content>
    )
    
  }
}

class Search extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.getResults = props.getResults.bind(this);
    this.state = {
      query : "",
      result: "",
      gotResults: false
    }

    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(e){
    this.setState({
      query: e.target.value
    });
    e.preventDefault();
  }


  


  render(){
    return (
      <ThemeProvider theme={createTheme()}>
        <Arwes>
          <div style={{textAlign: "center"}}>
          <Heading node='h1'>REF-VISION</Heading>
          <Content>
         
            <input type="text" onChangeCapture={this.updateQuery}>
            </input>
            <br></br>
            <Button type="submit" onClick={
              () => {
                this.getResults().then(res => {
                  this.setState({
                    result: res,
                    gotResults: true
                  });
                });
              }
            }> Search</Button>
          
          {this.state.gotResults ? <Result results={this.state.result}/> : null}
          </Content>
          
          </div>
        </Arwes>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <div>
  <Search getResults={fetchResults}/> 
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
