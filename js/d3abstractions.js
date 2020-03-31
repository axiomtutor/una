/* 
*** Draw a node with label on, above, below, left, and right. 
  
svg: the D3 SVG element to draw on
loc: An object with x- and y-coordinates of numbers representing the SVG-coordinate center of the node.
label: A string which will be a label placed on the node.
above, below, left, right: strings which will be labels placed relative to the node.
mutation: the svg with elements appended.
return value: the D3 SVG element.
*/

export function drawLabeledNode({svg = null, loc = {x:20, y:20}, label = "", above = "", below = "", left = "", right = ""} = {}) {
  // Draw node circle
  svg
    .append("circle")
    .attr("cx", loc.x)
    .attr("cy", loc.y)
    .attr("r", 20)
    .attr("stroke", "black")
    .attr("fill", "#ffff");
  
  // Draw label on node
  svg
    .append("g")
    .attr("class", "latex")
    .attr("transform", `translate(${loc.x-15}, ${loc.y+5})`)
    .append("text")
    .text(label);
  
  // Draw label above.
  svg
    .append("g")
    .attr("class", "latex")
    .attr("transform", `translate(${loc.x-20}, ${loc.y-20})`)
    .append("text")
    .text(above);
  
  // Draw label below
  svg
    .append("g")
    .attr("class", "latex")
    .attr("transform", `translate(${loc.x-20}, ${loc.y+35})`)
    .append("text")
    .text(below);
  
  // Draw label left
  svg
    .append("g")
    .attr("class", "latex")
    .attr("transform", `translate(${loc.x-50}, ${loc.y+5})`)
    .append("text")
    .text(left);
  
  // Draw label right
  svg
    .append("g")
    .attr("class", "latex")
    .attr("transform", `translate(${loc.x+20}, ${loc.y+5})`)
    .append("text")
    .text(right);
  
  return svg;
}

/* 
*** Draw n nodes in a ring, indexed 1 through n, with labels on, above, below, left, and right.  And directed edges with labels above, below, left, and right. 
*/
