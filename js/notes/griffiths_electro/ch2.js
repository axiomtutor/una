import { drawLabeledNode } from '../../../js/d3abstractions.js';

(function() {
  var svg = d3
    .select("#triad")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);
    
  drawLabeledNode({svg: svg, label: "lab", loc: {x:50,y:50}, above: "above", below: "below", left: "left", right: "right"});

  svg
    .append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 50)
    .attr("stroke", "black")
    .attr("fill", "#ffff");

  svg
    .append("g")
    .attr("class", "tick")
    .attr("transform", `translate(${90}, ${90})`)
    .append("text")
    .text("${2\\pi}$");
    
    svg.append("line")
  .attr("x1", 100)
  .attr("y1", 100)
  .attr("x2", 200)
  .attr("y2", 100)          
  .attr("stroke-width", 1)
  .attr("stroke", "black");
  
    svg
      .append("g")
      .attr("class", "tick")
      .attr("transform", `translate(${120}, ${150})`)
      .append("text")
      .text("${\\int}$");
  
  setTimeout(() => {
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"]
        ],
        processEscapes: true
      }
    });

    MathJax.Hub.Register.StartupHook("End", function() {
      setTimeout(() => {
        svg.selectAll(".tick").each(function() {
          var self = d3.select(this),
            g = self.select("text>span>svg");
          g.remove();
          self.append(function() {
            return g.node();
          });
        });
      }, 5);
    });

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, svg.node()]);
  }, 5);
})();
