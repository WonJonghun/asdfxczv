// draw rectangle 
d3.select('#btn_add').on('click', function(){ new Rectangle(); });
var svg = d3.select('svg');

function Rectangle() {
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;
    
    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.rectangleElement = d3.select('svg').append('rect')
                                    .attr('class', 'rectangle equipment_'+select_equip_id)
                                    .attr('onclick', 'show_rect('+select_equip_id+'), add_class($(this))')
                                    .call(dragR);
            self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC circle_point').call(dragC1);
            self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC circle_point').call(dragC2);            
            self.pointElement3 = svg.append('circle').attr('class', 'pointC circle_point').call(dragC3);
            self.pointElement4 = svg.append('circle').attr('class', 'pointC circle_point').call(dragC4);
            updateRect();
            isDrag = false;
        } else { 
            isDrag = true;
        }
        isDown = !isDown;
    })
    
    .on('mousemove', function() {
        m2 = d3.mouse(this);
        if(isDown && !isDrag) { 
            self.rectData[1] = { x: m2[0], y: m2[1] };
            updateRect();
        } 
    });  
    
    function updateRect() {  
        rect = d3.select(self.rectangleElement[0][0]);
        var width = Math.abs(self.rectData[1].x - self.rectData[0].x),
            height = Math.abs(self.rectData[1].y - self.rectData[0].y);
        
        var x_coord, y_coord;
        
        if(self.rectData[1].x - self.rectData[0].x > 0 && self.rectData[1].y - self.rectData[0].y > 0){ // 왼쪽 위에서 오른쪽 아래
            if(self.rectData[0].x<0) {
                self.rectData[0].x = 0;
                self.rectData[1].x = self.rectData[0].x+width;
            }
    
            if(self.rectData[1].x>760) {
                self.rectData[1].x = 760;
                self.rectData[0].x = self.rectData[1].x-width;
            }
    
            if(self.rectData[0].y<0) {
                self.rectData[0].y = 0;
                self.rectData[1].y = self.rectData[0].y+height;
            }
    
            if(self.rectData[1].y>500) {
                self.rectData[1].y = 500;
                self.rectData[0].y = self.rectData[1].y-height;
            }
            x_coord = self.rectData[0].x;
            y_coord = self.rectData[0].y;
        } else if(self.rectData[1].x - self.rectData[0].x > 0 && self.rectData[1].y - self.rectData[0].y < 0){ // 왼쪽 아래에서 오른쪽 위
            if(self.rectData[0].x<0) {
                self.rectData[0].x = 0;
                self.rectData[1].x = self.rectData[0].x+width;
            }
    
            if(self.rectData[1].x>760) {
                self.rectData[1].x = 760;
                self.rectData[0].x = self.rectData[1].x-width;
            }
    
            if(self.rectData[1].y<0) {
                self.rectData[1].y = 0;
                self.rectData[0].y = self.rectData[1].y+height;
            }
    
            if(self.rectData[0].y>500) {
                self.rectData[0].y = 500;
                self.rectData[1].y = self.rectData[0].y-height;
            }
            x_coord = self.rectData[0].x;
            y_coord = self.rectData[1].y;
        } else if(self.rectData[1].x - self.rectData[0].x < 0 && self.rectData[1].y - self.rectData[0].y < 0){ // 오른쪽 아래에서 왼쪽 위
            if(self.rectData[1].x<0) {
                self.rectData[1].x = 0;
                self.rectData[0].x = self.rectData[1].x+width;
            }
    
            if(self.rectData[0].x>760) {
                self.rectData[0].x = 760;
                self.rectData[1].x = self.rectData[0].x-width;
            }
    
            if(self.rectData[1].y<0) {
                self.rectData[1].y = 0;
                self.rectData[0].y = self.rectData[1].y+height;
            }
    
            if(self.rectData[0].y>500) {
                self.rectData[0].y = 500;
                self.rectData[1].y = self.rectData[0].y-height;
            }
            x_coord = self.rectData[1].x;
            y_coord = self.rectData[1].y;
        } else { // 오른쪽 위에서 왼쪽 아래
            if(self.rectData[1].x<0) {
                self.rectData[1].x = 0;
                self.rectData[0].x = self.rectData[1].x+width;
            }
    
            if(self.rectData[0].x>760) {
                self.rectData[0].x = 760;
                self.rectData[1].x = self.rectData[0].x-width;
            }
    
            if(self.rectData[0].y<0) {
                self.rectData[0].y = 0;
                self.rectData[1].y = self.rectData[0].y+height;
            }
    
            if(self.rectData[1].y>500) {
                self.rectData[1].y = 500;
                self.rectData[0].y = self.rectData[1].y-height;
            }
            x_coord = self.rectData[1].x;
            y_coord = self.rectData[0].y;
        }

        // console.log($('.tr_'+select_equip_id).children()[0]['innerHTML'])
        $('.tr_'+select_equip_id).children()[1]['innerHTML'] = self.rectData[0].x;
        $('.tr_'+select_equip_id).children()[2]['innerHTML'] = self.rectData[0].y;
        $('.tr_'+select_equip_id).children()[3]['innerHTML'] = self.rectData[1].x;
        $('.tr_'+select_equip_id).children()[4]['innerHTML'] = self.rectData[1].y;

        rect.attr({
            x: x_coord,
            y: y_coord,
            width: width,
            height: height
        });   
                
        var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
        point1.attr('r', 5)
              .attr('cx', self.rectData[0].x)
              .attr('cy', self.rectData[0].y);        
        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        point2.attr('r', 5)
              .attr('cx', self.rectData[1].x)
              .attr('cy', self.rectData[1].y);
        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        point3.attr('r', 5)
              .attr('cx', self.rectData[1].x)
              .attr('cy', self.rectData[0].y);        
        var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point3.attr('r', 5)
              .attr('cx', self.rectData[0].x)
              .attr('cy', self.rectData[1].y);
    }
    
    var dragR = d3.behavior.drag().on('drag', dragRect);
    
    function dragRect() {
        var e = d3.event;
        for(var i = 0; i < self.rectData.length; i++){
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');
        updateRect();
    }
    
    var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    var dragC4 = d3.behavior.drag().on('drag', dragPoint4);
    
    function dragPoint1() {
        var e = d3.event;
        var cx = self.rectData[0].x + e.dx, 
            cy = self.rectData[0].y + e.dy;
        if(cx < 0){
            cx = 0;
            self.rectData[0].x = 0;
        } else if(cx > 760) {
            cx = 760;
            self.rectData[0].x = 760
        } else {
            cx = cx;
            self.rectData[0].x = cx;
        }

        if(cy < 0) {
            cy = 0;
            self.rectData[0].y = 0;
        } else if(cy > 500) {
            cy = 500;
            self.rectData[0].y = 500;
        } else {
            cy = cy;
            self.rectData[0].y = cy;
        }

        d3.select(self.pointElement1[0][0])
            .attr('cx', cx)
            .attr('cy', cy);        
        updateRect();   
    }   
    
    function dragPoint2() {
        var e = d3.event;
        var cx = self.rectData[1].x + e.dx, 
            cy = self.rectData[1].y + e.dy;
        if(cx < 0){
            cx = 0;
            self.rectData[1].x = 0;
        } else if(cx > 760) {
            cx = 760;
            self.rectData[1].x = 760
        } else {
            cx = cx;
            self.rectData[1].x = cx;
        }

        if(cy < 0) {
            cy = 0;
            self.rectData[1].y = 0;
        } else if(cy > 500) {
            cy = 500;
            self.rectData[1].y = 500;
        } else {
            cy = cy;
            self.rectData[1].y = cy;
        }
        d3.select(self.pointElement2[0][0])
            .attr('cx', cx )
            .attr('cy', cy );
        updateRect();   
    }   
    
    function dragPoint3() {
        var e = d3.event;
        var cx = self.rectData[1].x + e.dx, 
            cy = self.rectData[0].y + e.dy;
        if(cx < 0){
            cx = 0;
            self.rectData[1].x = 0;
        } else if(cx > 760) {
            cx = 760;
            self.rectData[1].x = 760
        } else {
            cx = cx;
            self.rectData[1].x = cx;
        }

        if(cy < 0) {
            cy = 0;
            self.rectData[0].y = 0;
        } else if(cy > 500) {
            cy = 500;
            self.rectData[0].y = 500;
        } else {
            cy = cy;
            self.rectData[0].y = cy;
        }
        d3.select(self.pointElement3[0][0])
            .attr('cx', cx )
            .attr('cy', cy );     
        updateRect();   
    }   
    
    function dragPoint4() {
        var e = d3.event;
        var cx = self.rectData[0].x + e.dx, 
            cy = self.rectData[1].y + e.dy;
        if(cx < 0){
            cx = 0;
            self.rectData[0].x = 0;
        } else if(cx > 760) {
            cx = 760;
            self.rectData[0].x = 760
        } else {
            cx = cx;
            self.rectData[0].x = cx;
        }

        if(cy < 0) {
            cy = 0;
            self.rectData[1].y = 0;
        } else if(cy > 500) {
            cy = 500;
            self.rectData[1].y = 500;
        } else {
            cy = cy;
            self.rectData[1].y = cy;
        }
        d3.select(self.pointElement4[0][0])
            .attr('cx', cx )
            .attr('cy', cy );
        updateRect();   
    }   
    
}//end Rectangle

// function old_Rectangle() {
    
    
// }//end Rectangle