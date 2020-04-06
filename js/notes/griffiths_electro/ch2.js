import * as d3a from '../../../js/d3abstractions.js';

(function() {
  var svg = d3
    .select("#triad")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
  
  var nodes = ["$\\rho$", "$\\vec{E}$", "$V$"];
  var edges = [ {start: "$\\rho$", end: "$\\vec{E}$", 
                 label: "$\\int k \\frac{\\mathcal{\\hat{R}}}\
                         {\\mathcal{R}^2} \\rho \\ d\\tau$"},
                {start: "$\\vec{E}$", end: "$V$", 
                 label: "$-\\int \\vec{E}\\cdot d\\ell$"},
                {start: "$V$", end: "$\\rho$", 
                 label: "$\\nabla^2 V = -\\rho/\\epsilon _0$"},
                {start: "$\\rho$", end: "$V$", label: "$V=k\\int \\frac{\\rho}{\\mathcal{R}} \\ d\\tau$"},
                {start: "$V$", end: "$\\vec{E}$", label: "$\\vec{E}=-\\nabla V$"},
                {start: "$\\vec{E}$", end: "$\\rho$", label: "$\\nabla  \\vec{E} = \\rho/\\epsilon_0$"}
  ];
  
  d3a.drawGraph({svg: svg, nodes: nodes, edges: edges});
  /*
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
  
  */
  
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
        svg.selectAll(".latex").each(function() {
          var self = d3.select(this),
              g = self.select("svg");
          g.remove();
          self.append(function() {
            return g.node();
          });
        });
      }, 20);
    });

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, svg.node()]);
  }, 20);
})();
