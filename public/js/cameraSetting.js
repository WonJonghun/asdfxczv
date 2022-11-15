var select_equip_id, cam_id, panel_id;

// select camera setting
$.ajax({
    type: "POST",
    url: "staticCamSetting/get_camera",
    async: false,
    dataType: "json",
    success: function (data) {
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                $("#select_cam").append("<option value="+data[i]['id']+" data-pid="+data[i]['panel_id']+" data-path="+data[i]['root_path']+">"+data[i]['name']+"</option>");
            }
        }
    },
    error: function (e) {
        console.info(e);
        console.info("Error");
    },
    done: function (e) {
        console.info("DONE");
    }
})
// select camera setting

// 카메라 선택에 따른 건물, 반 이름 
$('#select_cam').on('change', function() {
    panel_id = $(this).find(':selected').attr('data-pid');
    cam_id = $(this).val();

    if(cam_id == "") {
        $('#data_none').removeClass('display-none');
        $('#cam_info').addClass('display-none');
        $('#sel_equip_container').addClass('display-none');
    } else {
        $('#data_none').addClass('display-none');
        $('#cam_info').removeClass('display-none');
        $('#sel_equip_container').removeClass('display-none');
        $('svg').css("background", "url("+$(this).find(':selected').attr('data-path')+") 0% 0% / cover no-repeat")
    
        table_display();    
    }
    
})
// 카메라 선택에 따른 건물, 반 이름

$('#btn_add').on('click', function() {
    $('.rectangle').removeClass('select');
    $('tr').removeClass('tr_select');
    $('#table_coord>tbody').append('<tr class="new tr_'+$('#select_equip').find(':selected').val()+'" onclick="show_rect('+$('#select_equip').find(':selected').val()+')" data-equip="'+$('#select_equip').find(':selected').val()+'"><td>'+$('#select_equip').find(':selected').text()+'</td><td></td><td></td><td></td><td></td><td><span class="material-symbols-outlined delete-icon">delete</span></td></tr>')
    select_equip_id = $('#select_equip').find(':selected').val();
    new Rectangle();
    $('#select_cam').find(':selected').prop('disabled', true);
})

$('#btn_save').on('click', function() {
    var id = [], value = [], json_data = {};

    var old_item = $('.old'),
        new_item = $('.new');
    console.log(old_item)
    console.log(new_item)
    for(var i=0; i<old_item.length; i++) {
        var coord = [];
        for(var j=1; j<5; j++) {
            coord.push($(old_item[i]).children()[j]['innerHTML'])
        }
        console.log($(old_item[i]).attr('data-equip'))
        console.log(coord)
        $.ajax({
            type: "POST",
            url: "staticCamSetting/update_coord",
            async: false,
            dataType: "json",
            data: {
                cam_id : cam_id,
                equip_id :  $(old_item[i]).attr('data-equip'),
                x1 : coord[0]/2.375,
                y1 : coord[1]/2.08,
                x2 : coord[2]/2.375,
                y2 : coord[3]/2.08
            },
            success: function (data) {
            },
            error: function (e) {
                console.info(e);
                console.info("Error");
            },
            done: function (e) {
                console.info("DONE");
            }
        })
    }

    console.log("=========================")
    for(var i=0; i<new_item.length; i++) {
        var coord = [];
        for(var j=1; j<5; j++) {
            coord.push($(new_item[i]).children()[j]['innerHTML'])
        }
        console.log($(new_item[i]).attr('data-equip'))
        console.log(coord)
        $.ajax({
            type: "POST",
            url: "staticCamSetting/insert_coord",
            async: false,
            dataType: "json",
            data: {
                cam_id : cam_id,
                equip_id :  $(new_item[i]).attr('data-equip'),
                x1 : coord[0]/2.375,
                y1 : coord[1]/2.08,
                x2 : coord[2]/2.375,
                y2 : coord[3]/2.08
            },
            success: function (data) {
            },
            error: function (e) {
                console.info(e);
                console.info("Error");
            },
            done: function (e) {
                console.info("DONE");
            }
        })
    }

    table_display();
})

var delete_equipment_id;
function delete_data(equipment_id) {
    modal('my_modal');
    delete_equipment_id = equipment_id
}

$('#btn_del_confirm').on('click', function() {
    $.ajax({
        type: "POST",
        url: "staticCamSetting/delete_coord",
        async: false,
        dataType: "json",
        data: {
            equipment_id : equipment_id
        },
        success: function (data) {
            table_display();
        },
        error: function (e) {
            console.info(e);
            console.info("Error");
        },
        done: function (e) {
            console.info("DONE");
        }
    })
    
})

function func_remove(rect, id) {
    rect.remove();
    select_equip_id = id;
}

function show_rect(id) {
    $('.rectangle').removeClass('select');
    $('.equipment_'+id).addClass('select');
    $('tr').removeClass('tr_select');
    $('.tr_'+id).addClass('tr_select');
}

function add_class(rect) {
    $('rect.rect_select').removeClass('rect_select')
    rect.addClass('rect_select');
    // var flag = 0
    // var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;
    // svg.on('mousedown', function() {
    //     console.log("flag: ", flag)
    //     m1 = d3.mouse(this);
    //     if(flag == 0) {
    //         self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
    //         console.log(self.rectData)
    //         console.log("sdfsdf")
    //         self.rectangleElement = d3.select('rect.rect_select').call(dragR);
    //         self.pointElement1 = d3.select('circle.circle1').call(dragC1);
    //         self.pointElement2 = d3.select('circle.circle2').call(dragC2);            
    //         self.pointElement3 = svg.select('circle.circle3').call(dragC3);
    //         self.pointElement4 = svg.select('circle.circle4').call(dragC4); 
    //     }
    //     isDown = !isDown;
    // }) 
    
    // function updateRect() {  
    //     rect = d3.select(self.rectangleElement[0][0]);
    //     rect.attr({
    //         x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
    //         y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
    //         width: Math.abs(self.rectData[1].x - self.rectData[0].x),
    //         height: Math.abs(self.rectData[1].y - self.rectData[0].y)
    //     });   
        
    //     var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
    //     point1.attr('r', 5)
    //           .attr('cx', self.rectData[0].x)
    //           .attr('cy', self.rectData[0].y);        
    //     var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
    //     point2.attr('r', 5)
    //           .attr('cx', self.rectData[1].x)
    //           .attr('cy', self.rectData[1].y);
    //     var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
    //     point3.attr('r', 5)
    //           .attr('cx', self.rectData[1].x)
    //           .attr('cy', self.rectData[0].y);        
    //     var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
    //     point3.attr('r', 5)
    //           .attr('cx', self.rectData[0].x)
    //           .attr('cy', self.rectData[1].y);
              
    // }
    
    // var dragR = d3.behavior.drag().on('drag', dragRect);
    
    // function dragRect() {
    //     flag = 1
    //     var e = d3.event;
    //     console.log(self.rectData)
    //     for(var i = 0; i < self.rectData.length; i++){   
    //         console.log(i)
    //         d3.select(self.rectangleElement[0][0])
    //             .attr('x', self.rectData[i].x += e.dx )
    //             .attr('y', self.rectData[i].y += e.dy );
    //             console.log(self.rectData)
    //     }
    //     // rect.style('cursor', 'move');
    //     updateRect();
    //     flag = 0;
    // }
    
    // var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    // var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    // var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    // var dragC4 = d3.behavior.drag().on('drag', dragPoint4);
    
    // function dragPoint1() {
    //     var e = d3.event;
    //     d3.select(self.pointElement1[0][0])
    //         .attr('cx', function(d) { return d.x += e.dx })
    //         .attr('cy', function(d) { return d.y += e.dy });        
    //     updateRect();   
    // }   
    
    // function dragPoint2() {
    //     var e = d3.event;
    //     d3.select(self.pointElement2[0][0])
    //         .attr('cx', self.rectData[1].x += e.dx )
    //         .attr('cy', self.rectData[1].y += e.dy );
    //     updateRect();   
    // }   
    
    // function dragPoint3() {
    //     var e = d3.event;
    //     d3.select(self.pointElement3[0][0])
    //         .attr('cx', self.rectData[1].x += e.dx )
    //         .attr('cy', self.rectData[0].y += e.dy );     
    //     updateRect();   
    // }   
    
    // function dragPoint4() {
    //     var e = d3.event;
    //     d3.select(self.pointElement4[0][0])
    //         .attr('cx', self.rectData[0].x += e.dx )
    //         .attr('cy', self.rectData[1].y += e.dy );
    //     updateRect();   
    // }   
}

function table_display() {
    $('svg').empty();
    $.ajax({
        type: "POST",
        url: "staticCamSetting/get_buildingAndPanelAndEquip",
        async: false,
        data: {
            panel_id: panel_id,
            cam_id: cam_id
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            name_data = data[0],
            panel_data = data[1],
            equip_data = data[2];
            
            $('#input_building').val(name_data[0]['building_name']);
            $('#input_panel').val(name_data[0]['panel_name']);

            if(equip_data.length != 0) {
                $('#select_equip').empty();
                $('#select_equip').append('<option value="">장비를 선택해주세요.</option>')
                for(var i=0; i<equip_data.length; i++) {
                    $('#select_equip').append('<option value='+equip_data[i]['equipment_id']+'>'+equip_data[i]['name']+'</option>');
                }
            }
            
            if(panel_data.length != 0) {
                $('#table_coord>tbody').empty()
                for(var i=0; i<panel_data.length; i++) {
                    $('#table_coord>tbody').append('<tr class="old tr_'+panel_data[i]['equipment_id']+'" onclick="show_rect('+panel_data[i]['equipment_id']+')" data-equip="'+panel_data[i]['equipment_id']+'"><td>'+panel_data[i]['equipment_name']+'</td><td>'+panel_data[i]['x1']* 2.375+'</td><td>'+panel_data[i]['y1'] * 2.08+'</td><td>'+panel_data[i]['x2']* 2.375+'</td><td>'+panel_data[i]['y2'] * 2.08+'</td><td><span class="material-symbols-outlined delete-icon" onclick="delete_data('+panel_data[i]['equipment_id']+')">delete</span></td></tr>')

                    var width = panel_data[i]['x2']-panel_data[i]['x1'],
                        height = panel_data[i]['y2']-panel_data[i]['y1'];

                    d3.select('svg').append('rect')
                            .attr('class', 'rectangle equipment_'+panel_data[i]['equipment_id'])
                            .attr('x',panel_data[i]['x1'] * 2.375)
                            .attr('y',panel_data[i]['y1'] * 2.08)
                            .attr('width',width * 2.375)
                            .attr('height',height * 2.08)
                            .attr('onclick', 'show_rect('+panel_data[i]['equipment_id']+'), add_class($(this))')
                            .attr('ondblclick', 'func_remove($(this), '+panel_data[i]['equipment_id']+'), new Rectangle()');
                    // d3.select('svg').append('circle').attr('class', 'pointC circle1').attr('r', 5).attr('cx', panel_data[i]['x1'] * 2.375).attr('cy', panel_data[i]['y1'] * 2.08);
                    // d3.select('svg').append('circle').attr('class', 'pointC circle2').attr('r', 5).attr('cx', panel_data[i]['x2'] * 2.375).attr('cy', panel_data[i]['y2'] * 2.08);
                    // d3.select('svg').append('circle').attr('class', 'pointC circle3').attr('r', 5).attr('cx', panel_data[i]['x2'] * 2.375).attr('cy', panel_data[i]['y1'] * 2.08);
                    // d3.select('svg').append('circle').attr('class', 'pointC circle4').attr('r', 5).attr('cx', panel_data[i]['x1'] * 2.375).attr('cy', panel_data[i]['y2'] * 2.08);
                    
                    $('select option[value="'+panel_data[i]['equipment_id']+'"]').prop('disabled', true)
                }
            }
        },
        error: function (e) {
            console.info(e);
            console.info("Error");
        },
        done: function (e) {
            console.info("DONE");
        }
    })
}



var bg, modal_window;
function modal(id) {
    var zIndex = 9999;
    modal_window = $('#' + id);

    bg = $('<div>')
        .css({
            position: 'fixed',
            zIndex: zIndex,
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            // 레이어 색갈은 여기서 바꾸면 됨
            backgroundColor: 'rgba(0,0,0,0.4)'
        })
        .appendTo('body');

        modal_window
        .css({
            position: 'fixed',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            zIndex: zIndex + 1,
            // div center 정렬
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)',
            webkitTransform: 'translate(-50%, -50%)'
        })
        .show()
        .find('.modal_close_btn')
        .on('click', function() {
            bg.remove();
            modal_window.hide();
        });
}