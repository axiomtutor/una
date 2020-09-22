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
  
  /////////////////////////////////////////////////////////////////////////////
  
  var svg2 = d3
              .select("#fig2_41")
              .append("svg")
              .attr("width", 400)
              .attr("height", 400);
    
  nodes = ["1", "2", "3", "4"];
  edges = [ {start: "1", end: "2"}, 
            {start: "2", end: "3"}, 
            {start: "3", end: "4"}, 
            {start: "4", end: "1"}, 
            {start: "1", end: "4"}, 
            {start: "2", end: "1"}, 
            {start: "3", end: "2"}, 
            {start: "4", end: "3"}
  ];
  
  d3a.drawGraph({svg: svg2, nodes: nodes, edges: edges});
  
  d3a.drawText(svg2, "-q", {x:350, y:170});
  d3a.drawText(svg2, "-q", {x:20, y:170});
  d3a.drawText(svg2, "+q", {x:160, y:20});
  
  d3a.drawText(svg2, "a", {x:100,y:100});
  d3a.drawText(svg2, "a", {x:300,y:100});
  d3a.drawText(svg2, "a", {x:100,y:300});
  d3a.drawText(svg2, "a", {x:300,y:300});
  
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
