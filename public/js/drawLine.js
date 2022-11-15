

var line, isDown = false,
    lDown = false,
    isDragging = false,
    isResize = false,
    m1, m2, width = 500,
    height = 300,
    data = [],
    click_flag = 0,
    activeClassName = 'active-d3-item',
    circleClass = 'top_circle';

var drag = d3.behavior.drag().on('dragstart', dragstarted)
                        .on('drag', dragged)
                        .on('dragend', dragended);    

var circle_drag = d3.behavior.drag().on('dragstart', dragstarted_circle)
                            .on('drag', dragged_circle)
                            .on('dragend', dragended_circle);

    vis = d3.select('svg').on("mousedown", mousedown).on("mousemove", mousemove);
    function set_line (points) {
        vis = d3.select('svg.show_coord');
        console.log(points)
        var temp = new Array()

        for(var i=0; i<points.length; i+=2) {
            temp.push([points[i],points[i+1]]) 
        }
        console.log("temp:", temp)
        // path_array = [[409,102.609375],[360, 245.609375],[50, 129.609375],[197, 42.609375]]
        path_array = temp
        for(var i=0; i<path_array.length/2+1; i+=2) {
            circle = vis.append('circle').attr('r', 5)
                    .attr('cx', path_array[i][0])
                    .attr('cy', path_array[i][1])
                    .attr('cursor', 'pointer')
                    .attr('class', 'top_circle');
                    // .call(circle_drag);
            line = vis.append("line")
                .attr("x1", path_array[i][0])
                .attr("y1", path_array[i][1])
                .attr("x2", path_array[i+1][0])
                .attr("y2", path_array[i+1][1]);
                // .call(drag)
                // .style("cursor", "pointer")
                // .on('contextmenu', function() {
                //     d3.event.preventDefault();
                //     $(".custom-menu").finish().toggle(100).
                //     // In the right position (the mouse)
                //     css({
                //         top: d3.event.pageY + "px",
                //         left: d3.event.pageX + "px"
                //     });
                // })
                // .on("mousedown", function() {
                //     if(d3.event.which == 3) {
                //         var select_item = $(this); 
                //         $(".custom-menu li").click(function() {
                //             custom_menu_li(0, select_item);
                //         });
                //     }
                // });;
            circle2 = vis.append('circle').attr('r', 5)
                    .attr('cx', path_array[i+1][0])
                    .attr('cy', path_array[i+1][1])
                    .attr('cursor', 'pointer')
                    .attr('class', 'bottom_circle');
                    // .call(circle_drag);
        }
    }
    var add_line = function() {
        click_flag = 1;
        // if($('.line_svg').length == 0 ){
        //     vis = d3.select("#line_svg_container").append("svg").on("mousedown", mousedown)
        //         .on("mousemove", mousemove)
        //         .attr({width: width, height: height})
        //         .attr("class", "line_svg");
        // } else {
        //     vis = d3.select('.line_svg');
        // }
        // vis = d3.select('.line_svg').on("mousedown", mousedown).on("mousemove", mousemove);
        // path_array = [[409,102.609375],[360, 245.609375],[50, 129.609375],[197, 42.609375]]
        // for(var i=0; i<path_array.length/2+1; i+=2) {
        //     circle = vis.append('circle').attr('r', 5)
        //             .attr('cx', path_array[i][0])
        //             .attr('cy', path_array[i][1])
        //             .attr('cursor', 'pointer')
        //             .attr('class', 'top_circle')
        //             .call(circle_drag);
        //     line = vis.append("line")
        //         .attr("x1", path_array[i][0])
        //         .attr("y1", path_array[i][1])
        //         .attr("x2", path_array[i+1][0])
        //         .attr("y2", path_array[i+1][1])
        //         .call(drag)
        //         .style("cursor", "pointer")
        //         .on('contextmenu', function() {
        //             d3.event.preventDefault();
        //             $(".custom-menu").finish().toggle(100).
        //             // In the right position (the mouse)
        //             css({
        //                 top: d3.event.pageY + "px",
        //                 left: d3.event.pageX + "px"
        //             });
        //         })
        //         .on("mousedown", function() {
        //             if(d3.event.which == 3) {
        //                 var select_item = $(this); 
        //                 $(".custom-menu li").click(function() {
        //                     custom_menu_li(0, select_item);
        //                 });
        //             }
        //         });;
        //     circle2 = vis.append('circle').attr('r', 5)
        //             .attr('cx', path_array[i+1][0])
        //             .attr('cy', path_array[i+1][1])
        //             .attr('cursor', 'pointer')
        //             .attr('class', 'bottom_circle')
        //             .call(circle_drag);
        // }
    }
    // $('#add_line').on('click', function() {
    //     click_flag = 1;
    //     if($('.line_svg').length == 0 ){
    //         vis = d3.select("#line_svg_container").append("svg").on("mousedown", mousedown)
    //             .on("mousemove", mousemove)
    //             .attr({width: width, height: height})
    //             .attr("class", "line_svg");
    //     } else {
    //         vis = d3.select('.line_svg');
    //     }
    //     // vis = d3.select("#line_svg_container").append("svg").on("mousedown", mousedown)
    //     //         .on("mousemove", mousemove)
    //     //         .attr({width: width, height: height})
    //     //         .attr("class", "line_svg");
    //     //         console.log(vis)
    // })
// vis.append('image').attr('xlink:href', '/images/car1.jpg')
// .attr({width: width, height: height});



// path_array = [{x: 409, y: 102.609375},{x: 360, y: 545.609375},{x: 637, y: 129.609375},{x: 697, y: 442.609375} ]
// for(var i=0; i<path_array.length/2+1; i+=2) {
//     circle = vis.append('circle').attr('r', 5)
//             .attr('cx', path_array[i]['x'])
//             .attr('cy', path_array[i]['y'])
//             .attr('cursor', 'pointer')
//             .attr('class', 'top_circle')
//             .call(circle_drag);
//     line = vis.append("line")
//         .attr("x1", path_array[i]['x'])
//         .attr("y1", path_array[i]['y'])
//         .attr("x2", path_array[i+1]['x'])
//         .attr("y2", path_array[i+1]['y'])
//         .call(drag);
//     circle2 = vis.append('circle').attr('r', 5)
//             .attr('cx', path_array[i+1]['x'])
//             .attr('cy', path_array[i+1]['y'])
//             .attr('cursor', 'pointer')
//             .attr('class', 'bottom_circle')
//             .call(circle_drag);
// }

function mousedown() {
    if(click_flag == 1){
        m1 = d3.mouse(this);
        point = vis.append("circle")
            .attr("cx", m1[0])
            .attr("cy", m1[1])
            .attr("r", 5)
            .attr('class', circleClass)
            .style("cursor", "pointer")
            .call(circle_drag);
        if(circleClass == 'top_circle'){
            circleClass = 'bottom_circle';
        } else {
            circleClass = 'top_circle';
        }
        if (!isDown && !isDragging) {
            // console.log(isDown, isDragging)  
            var m = d3.mouse(this);
            line = vis.append("line")
                .attr("x1", m[0])
                .attr("y1", m[1])
                .attr("x2", m[0])
                .attr("y2", m[1])
                .style("cursor", "pointer")
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
                            custom_menu_li(0, select_item);
                        });
                    }
                });
        } else {
            // console.log(isDown, isDragging)
            click_flag = 0;
            isResize = false;
            // lDown = !lDown;
        }
        isDown = !isDown;
    }
}

function mousemove() {
    if (isDown && !isDragging) {
        var m = d3.mouse(this);
        line.attr("x2", m[0])
            .attr("y2", m[1])
            .call(drag);
    }
}

function dragstarted() {  
    d3.select(this).classed(activeClassName, true);
    $('.overlay').css('opacity', '1').css('zIndex', '1');
    var x1 = $(this)[0]['attributes'][0]['value'],
        y1 = $(this)[0]['attributes'][1]['value'],
        x2 = $(this)[0]['attributes'][2]['value'],
        y2 = $(this)[0]['attributes'][3]['value'];

    $('#x1').val(x1),
    $('#y1').val(y1),
    $('#x2').val(x2),
    $('#y2').val(y2);
}

function dragged() {
    var x = d3.event.dx;
    var y = d3.event.dy;
    // console.log(x, y)

    var line = d3.select(this),
        circle_1 = d3.select(this.previousElementSibling),
        circle_2 = d3.select(this.nextElementSibling);
    
    // Update the line properties
    var attributes;    

    if(parseInt(line.attr('x1')) + x>width || parseInt(line.attr('x1')) + x<0 
    || parseInt(line.attr('x2')) + x>width || parseInt(line.attr('x2')) + x<0 
    || parseInt(line.attr('y1')) + y>height || parseInt(line.attr('y1')) + y<0 
    || parseInt(line.attr('y2')) + y>height || parseInt(line.attr('y2')) + y<0) {
        attributes = {
            x1: line.attr('x1'),
            y1: line.attr('y1'),
            x2: line.attr('x2'),
            y2: line.attr('y2')
        };
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
    } else {
        attributes = {
            x1: parseInt(line.attr('x1')) + x,
            y1: parseInt(line.attr('y1')) + y,
            x2: parseInt(line.attr('x2')) + x,
            y2: parseInt(line.attr('y2')) + y
        };
    }

    line.attr(attributes);
    circle_1.attr('cx', attributes.x1)
            .attr('cy', attributes.y1)
            .call(circle_drag),
    circle_2.attr('cx', attributes.x2)
            .attr('cy', attributes.y2)
            .call(circle_drag);
}

function dragended() {
    d3.select(this).classed(activeClassName, false);
}

function dragstarted_circle() {
    d3.select(this).classed(activeClassName, true);
}

function dragged_circle() {
    var x = d3.event.dx;
    var y = d3.event.dy;

    var circle = d3.select(this), line;   

    var attributes = {
        cx: parseInt(circle.attr('cx')) + x,
        cy: parseInt(circle.attr('cy')) + y
    };

    if(attributes.cx >= width) {
        attributes.cx = width;
    } else if (attributes.cx <= 0) {
        attributes.cx = 0;
    }

    if(attributes.cy >= height) {
        attributes.cy = height;
    } else if (attributes.cy <= 0) {
        attributes.cy = 0;
    }

    if($(this).hasClass('top_circle')){
        line = d3.select(this.nextElementSibling);
        line.attr('x1', attributes.cx)
            .attr('y1', attributes.cy);
    } else {
        line = d3.select(this.previousElementSibling);
        line.attr('x2', attributes.cx)
            .attr('y2', attributes.cy);
    } 
    
    circle.attr(attributes);
}

function dragended_circle() {
    d3.select(this).classed(activeClassName, false);
}

