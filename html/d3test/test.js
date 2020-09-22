(function() {
  var svg = d3
    .select("#triad")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);

  svg
    .append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 50)
    .attr("stroke", "black")
    .attr("fill", "#ffff");

  svg
    .append("svg:text")
    .attr("x", 100)
    .attr("y", 100)
    .attr("dy", ".35rem")
    .attr("text-anchor", "middle")
    .text("Test Text");
})();
