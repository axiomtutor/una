/*
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 
    *** Draw text at a location.  The text either has to be pure LaTeX or none at all.
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
   
    ** Parameters
svg: The D3 SVG element to draw on.
text: The text to draw.
loc: An object of x,y-coordinates to determine the upper-left corner of the text box.
    * Optional parameters
offset: Sometimes we don't want long test to write into the space of another part of the drawing, so we use an offset to shift it left as a function of the number of characters in the string.  Because LaTeX compresses it needs a smaller offset.
    ** Behavior
mutation: Append the text to the svg.
return value: The mutated svg.
*/
export function drawText(svg, text, loc, offset=false) {
  if ((typeof text == 'undefined') || text.length == 0) return svg;
  var isLaTeX = text.substring(0,1);
  isLaTeX = isLaTeX === "$";
  if (isLaTeX) {
    svg.append("g")
       .attr("transform", `translate(${loc.x-(offset*text.length*3.2)}, ${loc.y-10})`)
       .attr("class", "latex")
       .append("text")
       .text(text);
  } else {
    svg.append("g")
       .attr("transform", `translate(${loc.x-(offset*text.length*7)}, ${loc.y})`)
       .attr("class", "latex")
       .append("text")
       .text(text);
  }
       
  return svg;
}

/* 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 
    *** Draw a node with label on, above, below, left, and right. 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 

    ** Parameters
svg: the D3 SVG element to draw on
    * Optional parameters
loc: An object with x- and y-coordinates of numbers representing the SVG-coordinate center of the node.
label: A string which will be a label placed on the node.
above, below, left, right: strings which will be labels placed relative to the node.

    ** Behavior
mutation: Append node and labels to svg.
return value: the svg mutated.
*/
export function drawLabeledNode({svg, loc, label, above, below, left, right}) {
  // Draw node circle
  svg
    .append("circle")
    .attr("cx", loc.x)
    .attr("cy", loc.y)
    .attr("r", 20)
    .attr("stroke", "black")
    .attr("fill", "#ffff");
  
  // Draw all labels
  drawText(svg, label, {x:loc.x-15, y:loc.y-5});
  drawText(svg, above, {x:loc.x-120, y:loc.y-20});
  drawText(svg, below, {x:loc.x-20, y:loc.y+35});
  drawText(svg, left, {x:loc.x-50, y:loc.y+5});
  drawText(svg, right, {x:loc.x+20, y:loc.y+5});
  
  return svg;
}

/* 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 
    *** Draw an isosceles triangle pointing up.
    *** More precisely, it draws an isosceles triangle pointing up, which is inscribed in an invisible bounding rectangle.  The upper-left and lower-right coordinates determine vertices of the rectangle.  The rectangle is not drawn and is only to aid geometric reasoning about how the triangle is drawn.
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 

    ** Parameters
svg: The D3 SVG element to draw on.
    * Optional parameters
upperLeft: An object with x,y-cooridnates specifying the upper-left vertex of the bounding rectangle.
lowerRight: An object with x,y-coordinates specifying the lower-right vertex of the bounding rectangle.

    ** Behavior
mutation: Append the triangle to svg.
return value: The mutated svg.
*/
export function drawIsocTriangle({svg = null, upperLeft = {x:0,y:0}, lowerRight = {x:10, y:10}, rotation = 0} = {}) {
  // Calculate the coordinates of the center.
  var centerx = (lowerRight.x + upperLeft.x) / 2,
      centery = (lowerRight.y + upperLeft.y) / 2;
  // Generate array of vertex coordinates.
  var data = [[upperLeft.x,lowerRight.y], [centerx,upperLeft.y], 
              [lowerRight.x,lowerRight.y], [upperLeft.x,lowerRight.y]];
  
  // Append path.
  var group = svg
    .append("g")
    .attr("transform", `rotate(${rotation}, ${centerx}, ${centery})`);
  group
    .append("path")
    .attr("d", d3.line()(data))
    .attr("stroke", "black")
    .attr("fill", "none");
  
  return svg;
}

/* 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 
    *** An function only for internal use, to find the angle of inclination between a start and end.  It will return values in degrees from 0 to 360.  0 corresponds to due-east and the angle sweeps counter-clockwise.
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 

    ** Parameters
start: An object containing x,y-coordinates, representing the starting point.
end: An object containing x,y-coordinates, representing the ending point.

    ** Behavior
mutation: none
return value: the angle of inclination in degrees.
*/
function angle_of_inclination(start, end) {
  var angle = 0;
  if (start.x == end.x) {
    // If the x-coordinates match then we can't compute slope so we determine 
    // the angle directly.
    if (start.y > end.y) {
      angle = 90;
    } else {
      angle = -90;
    }
  } else {
    // The arctan function is discontinuous.  For directed segments that point 
    // rightward it will give the right value but if pointed left then we must 
    // adjust it.
    angle = Math.atan((start.y - end.y) / (end.x - start.x));
    // Convert to degrees.
    angle *= 180./Math.PI;
    // Discontinuity correction.
    if (start.x > end.x) {
      angle += 180;
    }
  }
  if (angle < 0) angle += 360;
  return angle;
}

/*
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 
    *** Draw an arrow (line with a triangular arrowhead on the end).
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 

    ** Parameters
svg: The D3 SVG element to draw on.
start: An object with x,y-coordinates specifying the start location.
end: An object with x,y-coordinates specifying the end location.
    * Optional parameters
label_above: A string which will be placed above the midpoint of the line.
label_below: A string which will be placed below the midpoint of the line.
label_left: A string which will be placed left of the midpoint of the line.
label_right: A string which will be placed right of the midpoint of the line.

    ** Behavior
mutation: Append the arrow to svg.
return value: The mutated svg.
*/
export function drawArrow({svg = null, start=null, end=null, 
                           label=""} = {}) {
  // Draw that line.
  svg
    .append("line")
    .attr("stroke", "black")
    .attr("x1", start.x)
    .attr("y1", start.y)
    .attr("x2", end.x)
    .attr("y2", end.y);
  
  // Draw that damned oriented arrowhead.  Start by getting the angle of 
  // inclination of the line.
  var angle = angle_of_inclination(start, end);
  
  // Now there's both an initial offset to the angle because the standard 
  // isosceles triangle points up (corresponding to a 90-degree angle of 
  // inclination).  Also the angle of inclination is opposite in orientation to
  // the orientation of rotation (counter-clock).  To correct for these:
  var rot = 90-angle;
  
  // And figure the location of the triangle bounding box.
  var ul = {x: end.x-5, y: end.y-5},
    ur = {x: end.x+5, y: end.y+5};
  
  // Draw triangle.
  drawIsocTriangle({svg: svg, upperLeft: ul, lowerRight: ur, rotation: rot});
  
  // Place text near the midpoint of the line.
  var midx = (start.x+end.x) / 2,
      midy = (start.y+end.y) / 2;
  // Also I think the location where the draws text is by default a little low 
  // so I bump it up slightly.
  midy -= 10;
  
  // In particular, if the line points right, up, left, or in-between those, 
  // then the text is placed 90-degrees clock-wise from the direction of the 
  // arrow (so that in a counter-clock cyclic graph the labels would be 
  // outside).  That means we merely need to position the text--it can be as 
  // long as the user likes. 
  if (angle < 0) angle += 360;
  var xDelta = 10*Math.cos( (angle-90)*Math.PI/180 );
  var yDelta = -10*Math.sin( (angle-90)*Math.PI/180 );
  if (0 <= angle && angle <= 180) {
    drawText(svg, label, {x:midx+xDelta, y:midy+yDelta});
  } else {
    // But if the angle points at all downward then the text will be positioned
    // so that longer text writes over the line.  So we send it left according
    // to the length of the string.  This is rough as different fonts, 
    // especially regular text versus LaTeX rendering, will space differently.
    var xoffset = label.length;
    drawText(svg, label, {x:midx+xDelta, y:midy+yDelta}, true);
  }
  
  return svg;
}

/* 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
    *** Draw n nodes in a ring, indexed 1 through n, with labels on, above, below, left, and right.  And directed edges with labels above, below, left, and right. 
    *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** 

    ** Parameters
svg: The D3 SVG element to draw on.
nodes: An array of strings which will label the nodes.
edges: An array of objects.  Each object represents an edge between nodes.  It must have a start_label and end_label, which are labels in nodes.  Each optionally has a label to place on the edge.  

    ** Behavior
mutation: The graph appended to svg.
return value: The mutated svg.
*/
export function drawGraph({svg = null, nodes=[], edges=[]} = {}) {
  // Determine the locations of the vertices.  We always start due east and 
  // then add nodes counter-clockwise around the ring with equal spacing.  
  const n = nodes.length;
  var angle = 0,
      w = svg.style("width"),
      h = svg.style("height");
  w = +w.slice(0,w.length-2);
  h = +h.slice(0,h.length-2);
  const radius = 0.8*Math.min(w,h)/2;
  
  // Along the way it'll be important to collect the locations of the nodes. 
  // These are kept in a map.
  var node_map_to_loc = new Map();
  for (var i = 0; i < n; i++) {
    var x0 = radius*Math.cos(angle) + w/2;
    var y0 = h/2 - radius*Math.sin(angle);
    drawLabeledNode({svg: svg, loc: {x: x0, y: y0}, label: nodes[i]});
    node_map_to_loc.set(nodes[i], {x: x0, y: y0});
    angle += 2*Math.PI/n;
  }
  
  // Draw all edges
  for (var i = 0; i < edges.length; i++) {
    
    var src = node_map_to_loc.get(edges[i].start);
    var tgt = node_map_to_loc.get(edges[i].end);
    // If the arrow is pointing between NE and NW I'll draw the label to the 
    // right, if it's pointing between NW and SW I'll draw above, etcetera.
    angle = angle_of_inclination(src, tgt);
    if (angle < 0) {
      throw "Negative angle error";
    } else if (angle <= 45 || angle > 315) {
      drawArrow({svg: svg, start: {x: src.x, y: src.y}, 
                 end: {x: tgt.x, y: tgt.y}, label: edges[i].label});
    } else if (angle <= 135) {
      drawArrow({svg: svg, start: {x: src.x, y:src.y}, 
                 end: {x: tgt.x, y: tgt.y}, label: edges[i].label});
    } else if (angle <= 225) {
      drawArrow({svg: svg, start: {x: src.x, y:src.y}, 
                 end: {x: tgt.x, y: tgt.y}, label: edges[i].label});
    } else if (angle <= 315) {
      drawArrow({svg: svg, start: {x: src.x, y:src.y}, 
                 end: {x: tgt.x, y: tgt.y}, label: edges[i].label});
    } else { continue; }
  }
  
  return svg;
}
