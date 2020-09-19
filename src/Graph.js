import './force.css';
import * as d3module from 'd3';
import React from 'react';
import d3tip from 'd3-tip';
import {Content} from "arwes";
const d3 = {
    ...d3module,
    tip: d3tip
}

class Graph extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        graphJson : null,
        respOk : true
      }
      
    }

    graph(jsonData) {
        var graph = jsonData;
        var svg = d3.select("svg");
        
        var
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(width / 2, height / 2));


      
        var link = svg.append("g")
                        .style("stroke", "#aaa")
                        .selectAll("line")
                        .data(graph.links)
                        .enter().append("line");
        
        var tooltip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(d => {if (!d.name) return "N/A"; return d.name});

        var node = svg.append("g")
                    .attr("class", "nodes")
        .selectAll("circle")
                    .data(graph.nodes)
        .enter().append("circle")
                .attr("r", 20)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                    .on("mouseover", tooltip.show)
                    .on("mouseout",tooltip.hide);
        svg.call(tooltip);
        
        var label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(graph.nodes)
            .enter().append("text")
                .attr("class", "label")
                .text(function(d) { if(!d.label) return "N/A"; return d.label; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("r", 20)
                .style("fill", "#d9d9d9")
                .style("stroke", "#969696")
                .style("stroke-width", "1px")
                .attr("cx", function (d) { return d.x+6; })
                .attr("cy", function(d) { return d.y-6; });
            
            label
                    .attr("x", function(d) { return d.x-8; })
                    .attr("y", function (d) { return d.y; })
                    .style("font-size", "12px").style("fill", "#4393c3");
        }
        

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }
  
    componentDidMount(prevProps){
      
        
        fetch("https://ref-vision-api.herokuapp.com/api/g?doi="+(this.props.doi))
                        .then(resp => {if (resp.status !== 200) {
                                            this.setState({
                                                respOk: false
                                            });
                                            } return resp.json()})
                        .then(data => {this.setState({
                                        graphJson: data,
                                        });
                                        this.forceUpdate(); 
                                        this.graph(this.state.graphJson)   
                                    });

    }
  
  
    render(){
      return (
        <Content style={{textAlign: "center"}}>
            {this.state.respOk ? <svg width="960" height="600"></svg> : <h4 >No reference available.</h4>}
        
        {/* <pre>{this.state.graphJson}</pre> */}
        </Content>
      )
    }
  }

export default Graph;
