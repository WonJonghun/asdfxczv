var width = 500, height = 300;
// var svg = d3.select('#svg_container').append('svg').attr({'width': width, 'height': height});
svg = d3.select('.polygon_svg');
function Polygon(svg) {
	console.log(svg)
    
    var polyPoints = [];
    var gContainer = svg.append('g').classed("outline", true);
    var isDrawing = false;
    var isDragging = false;
    var linePoint1, linePoint2;
    var startPoint;
    var bbox;
    var boundingRect;
    var shape;
    var gPoly;

    // svg.append('image').attr('xlink:href', 'images/goback_logo.png');
    var polyDraw = svg.on("mousedown", setPoints)
      .on("mousemove", drawline)
      .on("mouseup", decidePoly);

    var dragBehavior = d3.behavior.drag().on("dragstart", circleDragStart)
                                        .on("drag", circleDrag);
    var polygonDrag = d3.behavior.drag().on("dragstart", polygonDragStart)
                                        .on("drag", polygonDrag);
    //        var dragPolygon = d3.drag().on("drag", movePolygon(bbox));
   
    //On mousedown - setting points for the polygon
    function setPoints() {
      if (isDragging) return;

      isDrawing = true;

      var plod = d3.mouse(this);
      if(plod[0] >= width) {
        plod[0] = width;
      } else if (plod[0] <= 0) {
        plod[0] = 0;
      }
      if(plod[1] > height) {
        plod[1] = height;
      } else if (plod[1] < 0) {
        plod[1] = 0;
      }
      linePoint1 = {
        x: plod[0],
        y: plod[1]
      };

      polyPoints.push(plod);
      var circlePoint = gContainer.append("circle")
        .attr("cx", linePoint1.x)
        .attr("cy", linePoint1.y)
        .attr("r", 4)
        .attr("start-point", true)
        .classed("handle", true)
        .style("cursor", "pointer");

      // on setting points if mousedown on a handle
      if (d3.event.target.hasAttribute("handle")) {
        completePolygon(svg)
      }

    }

    //on mousemove - appending SVG line elements to the points
    function drawline() {

      if (isDrawing) {
        linePoint2 = d3.mouse(this);
        // console.log(linePoint2)
        if(linePoint2[0]>width) {
          linePoint2[0] = width;
        } else if(linePoint2[0]<0) {
          linePoint2[0] = 0;
        }
        if(linePoint2[1]>height) {
          linePoint2[1] = height;
        } else if(linePoint2[1]<0) {
          linePoint2[1] = 0;
        }

        gContainer.select('line').remove();
        gContainer.append('line')
          .attr("x1", linePoint1.x)
          .attr("y1", linePoint1.y)
          .attr("x2", linePoint2[0] - 2) //arbitary value must be substracted due to circle cursor hover not working
          .attr("y2", linePoint2[1] - 2); // arbitary values must be tested

      }
    }

    //On mouseup - Removing the placeholder SVG lines and adding polyline
    function decidePoly() {

      gContainer.select('line').remove();
      gContainer.select('polyline').remove();

      var polyline = gContainer.append('polyline').attr('points', polyPoints);

      gContainer.selectAll('circle').remove();

      for (var i = 0; i < polyPoints.length; i++) {
        var circlePoint = gContainer.append('circle')
          .attr('cx', polyPoints[i][0])
          .attr('cy', polyPoints[i][1])
          .attr('r', 4)
          .attr("handle", true)
          .classed("handle", true)
          .attr('cursor', 'pointer');

      }

    }

    //Called on mousedown if mousedown point if a polygon handle
    function completePolygon(svg) {
		console.log(svg)
      
        d3.select('g.outline').remove();

        gPoly = svg.append('g').classed("polygon", true);

        polyPoints.splice(polyPoints.length - 1);
        //console.log(polyPoints);

        polyEl = gPoly.append("polygon")
					.attr("points", polyPoints)
					.attr('cursor', 'pointer')
					.classed("click", true)
					.call(polygonDrag)
					.on('contextmenu', function() {
						d3.event.preventDefault();
						$(".custom-menu").finish().toggle(100).
						// In the right position (the mouse)
						css({
							top: d3.event.pageY + "px",
							left: d3.event.pageX + "px"
						});
					})
					.on("mousedown", function() {
						if(d3.event.which == 3) {
							var select_item = $(this);
							$(".custom-menu li").click(function() {
								custom_menu_li(1, select_item);
							});
						}
					});

        for (var i = 0; i < polyPoints.length; i++) {
            gPoly.append('circle')
            .attr("cx", polyPoints[i][0])
            .attr("cy", polyPoints[i][1])
            .attr("r", 4)
            .attr('cursor', 'pointer')
            .call(dragBehavior);
        }

        isDrawing = false;
        isDragging = true;
    }

    function circleDragStart() {
      // $('.overlay').css('opacity', '1').css('zIndex', '1');
    }

    //Altering polygon coordinates based on handle drag
    function circleDrag() {
        if (isDrawing === true) return;

        var alteredPoints = [];
        var selectedP = d3.select(this);
        var parentNode = d3.select(this.parentNode);

        //select only the elements belonging to the parent <g> of the selected circle
        var circles = d3.select(this.parentNode).selectAll('circle');
        var polygon = d3.select(this.parentNode).select('polygon');

        var pointCX = d3.event.x;
        var pointCY = d3.event.y;

        if(pointCX>width) {
          pointCX = width;
        } else if(pointCX<0) {
          pointCX = 0;
        }
        if(pointCY>height) {
          pointCY = height;
        } else if(pointCY<0) {
          pointCY = 0;
        }
        //rendering selected circle on drag
        selectedP.attr("cx", pointCX).attr("cy", pointCY);

        //loop through the group of circle handles attatched to the polygon and push to new array
        for (var i = 0; i < polyPoints.length; i++) {
            var circleCoord = d3.select(circles[0][i]);
            var pointCoord = [circleCoord.attr("cx"), circleCoord.attr("cy")];
            alteredPoints[i] = pointCoord;
        }

        //re-rendering polygon attributes to fit the handles
        polygon.attr("points", alteredPoints);

        for (var i=0; i<alteredPoints.length; i++) {
          $('#x'+(i+1)).val(alteredPoints[i][0]);
          $('#y'+(i+1)).val(alteredPoints[i][1]);
        }
    }

    var originalPoints;
    function polygonDragStart() {
      // $('.overlay').css('opacity', '1').css('zIndex', '1');
      
    //   var hasClass = $('.click');
    //   hasClass.removeClass('click');      
    //   d3.select(this).classed("click", true);       
      
      originalPoints = [];
      var circle = d3.select(this.parentNode).selectAll("circle");
      for(var i=0; i<circle[0].length; i++){
        var cx = circle[0][i].getAttribute('cx')*1;
        var cy = circle[0][i].getAttribute('cy')*1;
        originalPoints[i] = [cx, cy]
      }

    }
    function polygonDrag() {
        var polygon = d3.select(this);
        var circles = d3.select(this.parentNode).selectAll("circle");

        polygon.classed("click", true);

        var x = d3.event.dx;
        var y = d3.event.dy;
        var left = d3.event.x;
        var top = d3.event.y;
        // console.log(d3.event)
        
        var polygonPoints = [];

        for(var i=0; i<circles[0].length; i++) {
            var cx = parseInt(circles[0][i].getAttribute('cx'));
            var cy = parseInt(circles[0][i].getAttribute('cy'));

            var overflow = 0;

            if(cx>width || cx<0 || cy>height || cy<0) {
              polygonPoints = originalPoints;
              overflow = 1;              
              toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }
              toastr.warning('You have exceeded the range you can set')
              break;
            } 
            $(circles[0][i]).attr('cx', cx+x).attr('cy', cy+y);
            var pointCoord = [cx+x, cy+y];
            polygonPoints[i] = pointCoord;
            $('#x'+(i+1)).val(cx+x);
            $('#y'+(i+1)).val(cy+y);            
        }
        if(overflow == 1){
          for(var i=0; i<polygonPoints.length; i++) {
            $(circles[0][i]).attr('cx', polygonPoints[i][0]).attr('cy', polygonPoints[i][1]);
          }
        }
        polygon.attr("points", polygonPoints);        
        
    }    
   
}

// If the document is clicked somewhere
$(document).bind("mousedown", function(e) {

  // If the clicked element is not the menu
  if (!$(e.target).parents(".custom-menu").length > 0) {
    // Hide it
    $(".custom-menu").hide(100);
  }
});

var custom_menu_li = function(flag, item) {
	if(flag == 1) {
		var select_polygon = item,
			select_circle = item.nextAll('circle');

		select_polygon.remove();
		select_circle.remove();
	} else {
		var select_line = item,
        	select_top_circle = item.prev('circle'),
			select_bottom_circle = item.next('circle');
			
		select_line.remove();
		select_top_circle.remove();
		select_bottom_circle.remove();	
	}
	$(".custom-menu").hide(100);
}

function set_polygon(...points) {
    svg = d3.select('svg.show_coord');
    // console.log("///", points)
    // console.log(points[0].split('['))
    var point_array = points[0].split('[')
    console.log(point_array)
 // api값으로 polygon그리기
    // api_path_array = points
    // api_path_array = [[[186.34375,93.609375],[123.34375,176.609375],[267.34375,205.609375],[338.34375,133.609375]],
    //                 [[86.34375,193.609375],[223.34375,276.609375],[367.34375,300],[138.34375,33.609375],[50,25]] ];
    for(var i=1; i<point_array.length; i++) {
        poly = svg.append('g').classed("polygon", true);
        var point_group = point_array[i].slice(0,-1),
            point = point_group.split(',')
        console.log(point)
        var change_point = new Array()
        for(var j=0; j<point.length; j+=2) {
            poly.append('circle').attr('r', 5)
                .attr('cx', point[j]/3.84)
                .attr('cy', point[j+1]/3.6);
            change_point.push(point[j]/3.84, point[j+1]/3.6)
        }
        poly.append('polygon').attr('points', change_point);
    }

    // for(var i=0; i<api_path_array.length; i++) {
    //     gPoly1 = svg.append('g').classed("polygon", true);
    //     var point ='';
    //     for(var j=0; j<api_path_array[i].length; j++) {
    //         if(j ==api_path_array[i].length-1) {
    //             point += api_path_array[i][j];
    //         } else {
    //             point += api_path_array[i][j]+','; 
    //         }
    //         gPoly1.append('circle').attr('r', 5)
    //         .attr('cx', api_path_array[i][j][0])
    //         .attr('cy', api_path_array[i][j][1])
    //         .attr('cursor', 'pointer');
    //         // .call(dragBehavior);
    //     }
    //     gPoly1.append('polygon').attr('points', point);
    //     // .call(polygonDrag)
    //     //     .on('contextmenu', function() {
    //     //         d3.event.preventDefault();
    //     //         $(".custom-menu").finish().toggle(100).
    //     //         // In the right position (the mouse)
    //     //         css({
    //     //             top: d3.event.pageY + "px",
    //     //             left: d3.event.pageX + "px"
    //     //         });
    //     //     })
    //     //     .on("mousedown", function() {
    //     //         if(d3.event.which == 3) {
    //     //             var select_item = $(this);
    //     //             $(".custom-menu li").click(function() {
    //     //                 custom_menu_li(1, select_item);
    //     //             });
    //     //         }
    //     //     });
    //     // for(var i=0; i<path_array1.length; i++) {
            
    //     // }
    // }
    // api값으로 polygon그리기
}


// If the menu element is clicked
// $(".custom-menu li").click(function() {
// 	var select_polygon = $('.click'),
// 		select_circle = $('.click').nextAll('circle');
		
// 	alert("삭제")
// 	if(select_polygon.length != 0) {
// 		select_polygon.remove();
// 		select_circle.remove();
// 	}
// 	// var hasClass = $('.click');
// 	// hasClass.removeClass('click'); 
	
	

// 	//   for(var i=1; i<5; i++) {
// 	//     console.log($('.svg'+i).children())
// 	//     if($('.svg'+i).children().length == 1){
// 	//       $('.svg'+i).remove()
// 	//     }
// 	//   }

// 	$(".custom-menu").hide(100);
//   // This is the triggered action name
//   // switch ($(this).attr("data-action")) {

//   //   // A case for each action. Your actions here
//   //   case "first":
//   //     alert("first");
//   //     break;
//   // }	

//   // $('.overlay').css('opacity', '0').css('zIndex', '-1');     

//   // Hide it AFTER the action was triggered
// });