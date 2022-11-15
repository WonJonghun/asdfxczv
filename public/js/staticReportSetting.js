var building_id, panel_id, month_val, panel_flag, date;

let today = new Date();   
year = today.getFullYear();
month_val = today.getMonth()+1

function get_buildings() {
    $.ajax({
        type: "POST",
        url: "/get_buildingList",
        async: false,
        dataType: "json",
        success: function (data) { 
            if(data.length != 0) {
                for(var i=0; i<data.length; i++) {
                    $('#sel_building').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
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
    });
}

function get_panels() {
    $.ajax({
        type: "POST",
        url: "/get_panels",
        async: false,
        dataType: "json",
        data: {
            id: building_id
        },
        success: function (data) {
            if(data.length != 0) {
                
                $('#sel_panel').append('<option value="all">전체</option>')
                for(var i=0; i<data.length; i++) {
                    $('#sel_panel').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
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
    });
}

$('#sel_building').on('change', function() {
    building_id = $(this).val()

    if(building_id) {
        $('#sel_panel').empty();
        $('#sel_panel').append('<option value="">반을 선택하세요.</option>')
        get_panels();
    } else {
        $('#sel_panel').empty();
        $('#sel_panel').append('<option value="">반을 선택하세요.</option>')
    }

    // $('#sel_panel option:eq(0)').prop('selected', true).change();
    // $('#sel_month option:eq(0)').prop('selected', true).change();
    $('#sel_panel').select2('val','');
    $('#sel_month').select2('val','none');

    $('#print_area').empty();
    $('#data-none').removeClass('display-none');
    // $('#sel_month').val(month_val).prop('selected', true).change();
    // $('#sel_panel').val('all').prop('selected', true).change();
    // content_display();
})

$('#sel_panel').on('change', function() {
    building_id = $('#sel_building').val();
    panel_id = $(this).val();
    month_val = $('#sel_month').val();
    
    if(building_id != '' && panel_id != '') {
        if(month_val != 'month' && month_val) {
            $('#data-none').addClass('display-none');
            $('#print_area').empty();
            if(panel_id != 'all'){
                one_panel_display();
            } else {
                content_display2();
            }
        }
        else {
            $('#print_area').empty();
            $('#data-none').removeClass('display-none');
        }
    } else {
        $('#print_area').empty();
        $('#data-none').removeClass('display-none');
    }
})

$('#sel_month').on('change', function() {
    building_id = $('#sel_building').val();
    panel_id = $('#sel_panel').val();
    month_val = $(this).val();

    if(building_id != '' && panel_id != '') {
        if(month_val != 'month' && month_val) {
            $('#data-none').addClass('display-none');
            $('#print_area').empty();
            if(panel_id != 'all'){
                one_panel_display();
            } else {
                content_display2();
            }
        }
        else {
            $('#print_area').empty();
            $('#data-none').removeClass('display-none');
        }
    } else {
        $('#print_area').empty();
        $('#data-none').removeClass('display-none');
    }
})

// $('#sel_panel').on('change', function() {
//     panel_id = $(this).val()
//     // var panel_div = $(this).parent().parent().parent().next().children('.panel_div');
//     // if($(this).val() == 'all') {
//     //     panel_div.removeClass('display-none');
//     // } else {
//     //     select_panel_div = $(this).parent().parent().parent().next().children('.panel_div.p_'+$(this).val());
//     //     panel_div.addClass('display-none');
//     //     select_panel_div.removeClass('display-none');
//     // }
// })

function content_display2() {
    console.log("content_display2")
    date = year+'-'+month_val;
    $.ajax({
        type: "POST",
        url: "staticReport/get_panels_and_img_by_month",
        async: false,
        dataType: "json",
        data: {
            id : building_id,
            date: date
        },
        success: function (data) { 
            console.log(data)
            if(data.length == 0) {
                $('#data-none').removeClass('display-none');
            } else {
                $('#data-none').addClass('display-none');
                for(var i=0; i<data.length; i++) {
                    $('#print_area').append(`
                        <div class="p_`+data[i]['panel_id']+` row p-0 pt-20 panel_div">
                            <h5 class="text-center" style="font-weight: bold;">`+$('#sel_building').find(':selected').text()+` > `+data[i]['name']+` </h5>
                            <div class="col-lg-7 col-sm-12 row">
                                <div class="col-12 row">
                                    <table id="table_`+data[i]['panel_id']+`" class="table">
                                        <thead>
                                            <tr>
                                                <th>장 비</th>
                                                <th>온도</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-5 p-0 middle">
                                <div>
                                    <svg id="svg_`+data[i]['panel_id']+`" style="width: 500px; height: 375px;"></svg>
                                </div>                   
                            </div>
                            <div class="col-12 p-0 pt-10">
                                <table id="chart_container_`+data[i]['panel_id']+`" class="table">
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    `)
                    svg_background = "url("+data[i]['root_path']+") 0% 0% / cover no-repeat";
                    $('#svg_'+data[i]['panel_id']).css("background", svg_background);
                    $('#svg_'+data[i]['panel_id']).css("width", "100%");
                    console.log("width : ",$('#svg_'+data[i]['panel_id']).width())
                    $('#svg_'+data[i]['panel_id']).css("height", $('#svg_'+data[i]['panel_id']).width()*3/4);
                    ratio = $('#svg_'+data[i]['panel_id']).width()/320;

                    $.ajax({
                        type: "POST",
                        url: "staticReport/get_equipList_and_coord_by_month",
                        async: false,
                        dataType: "json",
                        data: {
                            building_id: building_id,
                            panel_id: data[i]['panel_id'],
                            date: date
                        },
                        success: function (equipData) { 
                            console.log(equipData)
                            if(equipData.length != 0) {
                                for(var j=0; j<equipData.length; j++) {
                                    var width = equipData[j]['x2']-equipData[j]['x1'],
                                        height = equipData[j]['y2']-equipData[j]['y1'];
                                    d3.select('#svg_'+data[i]['panel_id']).append('rect')
                                        .attr('class', 'rectangle equipment_'+equipData[j]['id'])
                                        .attr('x',equipData[j]['x1']*ratio)
                                        .attr('y',equipData[j]['y1']*ratio)
                                        .attr('width',width*ratio)
                                        .attr('height',height*ratio)
                                        .attr('onclick', 'show_rect('+ data[i]['panel_id']+','+equipData[j]['id']+')')
                                        .style({'stroke': '#0067ff', 'stroke-width':'3px', 'fill':'#b6eeff', 'fill-opacity':'0.2'});

                                    var badge, text, text_color;
                                    
                                    if(equipData[j]['max(etbd.max_temp)'] >equipData[j]['allowed_temp']) {
                                        badge = 'badge-danger';
                                        text = '이상';
                                        text_color = 'text_danger';
                                    } else {
                                        badge = 'badge-success';
                                        text = '정상';
                                        text_color = 'text_normal'
                                    }
                                    $('#table_'+data[i]['panel_id']+'>tbody').append(`
                                        <tr class="tr_`+equipData[j]['id']+`" onclick="show_rect(`+data[i]['panel_id']+`,`+equipData[j]['id']+`)">
                                            <td>`+equipData[j]['name']+`</td>
                                            <td class="`+text_color+`">`+equipData[j]['max(etbd.max_temp)']+`℃</td>
                                            <td><span class="badge badge-round `+badge+`">`+text+`</span></td>
                                        </tr>
                                    `)

                                    $('#chart_container_'+data[i]['panel_id']+'>tbody').append(`
                                        <tr>
                                            <td class="col-2">
                                                <div class="image_box" style="background: #BDBDBD;">
                                                    <img class="device_profile" src="`+equipData[j]['icon_path']+`">
                                                </div>
                                                <div>`+equipData[j]['name']+`</div>
                                            </td>
                                            <td class="col-9">
                                                <div style="height: 100px">
                                                    <canvas id="chart`+equipData[j]['id']+`"></canvas>
                                                </div>
                                            </td>
                                            <td class="col-1">
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">MAX</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['max(etbd.max_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">AVG</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['avg(etbd.avg_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">MIN</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['min(etbd.min_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    `);
                                

                                    $.ajax({
                                        type: "POST",
                                        url: "/staticReport/get_chart_data_val_by_month",
                                        async: false,
                                        dataType: "json",
                                        data: {
                                            id: equipData[j]['id'],
                                            date: date
                                        },
                                        success: function (chart_data_val) {
                                            console.log("chart_data_val : ", chart_data_val)
                                            chart_data_val = chart_data_val
                                            allowed_temp = equipData[j]['allowed_temp']
                
                                                // //데이터 정리 
                                            var label_data = []
                                            var temp_data = []
                                            var div_id = "chart"+equipData[j]['id']
            
                                            for(char_data_len =0;char_data_len<chart_data_val.length;char_data_len++){
                                                label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                                // if(String(chart_data_val[char_data_len]['date_time']).substring(8,10) == '01'){
                                                //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                                // }else{
                                                //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(8,10)
                                                // }
            
                                                temp_data[char_data_len] = chart_data_val[char_data_len]['max_temp']
                                            }
                                            
                                            //차트 생성 함수 호출 
                                            creat_chart(div_id, temp_data, label_data,allowed_temp)
                                            
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
                            }     
                        },
                        error: function (e) {
                            console.info(e);
                            console.info("Error");
                        },
                        done: function (e) {
                            console.info("DONE");
                        }
                    });
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
    });
}


function content_display(){

    $.ajax({
        type: "POST",
        url: "staticReport/get_panels_and_img_by_month",
        async: false,
        dataType: "json",
        data: {
            id: building_id,
            date: date
        },
        success: function (data) { 
            console.log(data)
            if(data.length != 0) {   
                $('#sel_panel').removeClass('display-none');
                $('#sel_panel').empty();
                $('#sel_panel').append('<option value="all">전체</option>');
                $('#print_area').empty();
                for(var i=0; i<data.length; i++) {
                    var svg_background, ratio;
                    $('#sel_panel').append('<option value="'+data[i]['panel_id']+'">'+data[i]['name']+'</option>');
                    $('#print_area').append(`
                        <div class="p_`+data[i]['id']+` row p-0 pt-20 panel_div">
                            <h5 class="text-center">`+$('#sel_building').find(':selected').text()+` > `+data[i]['name']+` </h5>
                            <div class="col-lg-7 col-sm-12 row">
                                <div class="col-12 row">
                                    <table id="table_`+data[i]['panel_id']+`" class="table">
                                        <thead>
                                            <tr>
                                                <th>장 비</th>
                                                <th>온도</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-5 p-0 middle">
                                <div>
                                    <svg id="svg_`+data[i]['panel_id']+`" style="width: 500px; height: 375px;"></svg>
                                </div>                   
                            </div>
                            <div class="col-12 p-0 pt-10">
                                <table id="chart_container_`+data[i]['panel_id']+`" class="table">
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    `)
                    svg_background = "url("+data[i]['root_path']+") 0% 0% / cover no-repeat";
                    $('#svg_'+data[i]['panel_id']).css("background", svg_background);
                    $('#svg_'+data[i]['panel_id']).css("width", "100%");
                    console.log("width : ",$('#svg_'+data[i]['panel_id']).width())
                    $('#svg_'+data[i]['panel_id']).css("height", $('#svg_'+data[i]['panel_id']).width()*3/4);
                    ratio = $('#svg_'+data[i]['panel_id']).width()/320

                    $.ajax({
                        type: "POST",
                        url: "staticReport/get_equipList_and_coord_by_month",
                        async: false,
                        dataType: "json",
                        data: {
                            building_id: building_id,
                            panel_id: data[i]['panel_id'],
                            date: date
                        },
                        success: function (equipData) { 
                            console.log(equipData)
                            if(equipData.length != 0) {
                                for(var j=0; j<equipData.length; j++) {
                                    var width = equipData[j]['x2']-equipData[j]['x1'],
                                        height = equipData[j]['y2']-equipData[j]['y1'];
                                    d3.select('#svg_'+data[i]['panel_id']).append('rect')
                                        .attr('class', 'rectangle equipment_'+equipData[j]['id'])
                                        .attr('x',equipData[j]['x1']*ratio)
                                        .attr('y',equipData[j]['y1']*ratio)
                                        .attr('width',width*ratio)
                                        .attr('height',height*ratio)
                                        .attr('onclick', 'show_rect('+ data[i]['panel_id']+','+equipData[j]['id']+')')
                                        .style({'stroke': '#0067ff', 'stroke-width':'3px', 'fill':'#b6eeff', 'fill-opacity':'0.2'});

                                    var badge, text, text_color;
                                    
                                    if(equipData[j]['max(etbd.max_temp)'] >equipData[j]['allowed_temp']) {
                                        badge = 'badge-danger';
                                        text = '이상';
                                        text_color = 'text_danger';
                                    } else {
                                        badge = 'badge-success';
                                        text = '정상';
                                        text_color = 'text_normal'
                                    }
                                    $('#table_'+data[i]['panel_id']+'>tbody').append(`
                                        <tr class="tr_`+equipData[j]['id']+`" onclick="show_rect(`+data[i]['panel_id']+`,`+equipData[j]['id']+`)">
                                            <td>`+equipData[j]['name']+`</td>
                                            <td class="`+text_color+`">`+equipData[j]['max(etbd.max_temp)']+`℃</td>
                                            <td><span class="badge badge-round `+badge+`">`+text+`</span></td>
                                        </tr>
                                    `)

                                    $('#chart_container_'+data[i]['panel_id']+'>tbody').append(`
                                        <tr>
                                            <td class="col-2">
                                                <div class="image_box" style="background: #BDBDBD;">
                                                    <img class="device_profile" src="`+equipData[j]['icon_path']+`">
                                                </div>
                                                <div>`+equipData[j]['name']+`</div>
                                            </td>
                                            <td class="col-9">
                                                <div style="height: 100px">
                                                    <canvas id="chart`+equipData[j]['id']+`"></canvas>
                                                </div>
                                            </td>
                                            <td class="col-1">
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">MAX</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['max(etbd.max_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">AVG</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['avg(etbd.avg_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                                <div class="counter counter-sm row">
                                                    <div class="counter-label text-uppercase col-6">MIN</div>
                                                    <div class="counter-number-group text-truncate col-6 p-0">
                                                        <span class="counter-number">`+equipData[j]['min(etbd.min_temp)']+`℃</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    `);
                               

                                    $.ajax({
                                        type: "POST",
                                        url: "/staticReport/get_chart_data_val_by_month",
                                        async: false,
                                        dataType: "json",
                                        data: {
                                            id: equipData[j]['id'],
                                            date: date
                                        },
                                        success: function (chart_data_val) {
                                            console.log("chart_data_val : ", chart_data_val)
                                            chart_data_val = chart_data_val
                                            allowed_temp = equipData[j]['allowed_temp']
                
                                                // //데이터 정리 
                                            var label_data = []
                                            var temp_data = []
                                            var div_id = "chart"+equipData[j]['id']
            
                                            for(char_data_len =0;char_data_len<chart_data_val.length;char_data_len++){
                                                label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                                // if(String(chart_data_val[char_data_len]['date_time']).substring(8,10) == '01'){
                                                //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                                // }else{
                                                //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(8,10)
                                                // }
            
                                                temp_data[char_data_len] = chart_data_val[char_data_len]['max_temp']
                                            }
                                            
                                            //차트 생성 함수 호출 
                                            creat_chart(div_id, temp_data, label_data,allowed_temp)
                                            
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
                            }     
                        },
                        error: function (e) {
                            console.info(e);
                            console.info("Error");
                        },
                        done: function (e) {
                            console.info("DONE");
                        }
                    });

                }
            } else {
                $('#data-none').removeClass('display-none');
            }
            // $('#sel_building option:eq(1)').prop('selected', true);   
        },
        error: function (e) {
            console.info(e);
            console.info("Error");
        },
        done: function (e) {
            console.info("DONE");
        }
    });
}



function show_rect(panel, equip) {
    $('#svg_'+panel+'>.rectangle').removeClass('select');
    $('.equipment_'+equip).addClass('select');
    $('#table_'+panel+'>tbody>tr').removeClass('tr_select');
    $('.tr_'+equip).addClass('tr_select');
}

function one_panel_display() {
    date = year+'-'+month_val;
    $('#print_area').empty();
        $('#print_area').append(`
            <div class="p_`+ panel_id + ` row p-0 pt-20 panel_div">
                <h5 class="text-center">`+ $('#sel_building').find(':selected').text() + ` > ` + $('#sel_panel').find(':selected').text() + ` </h5>
                <div class="col-lg-7 col-sm-12 row">
                    <div class="col-12 row">
                        <table id="table_`+ panel_id + `" class="table">
                            <thead>
                                <tr>
                                    <th>장 비</th>
                                    <th>온도</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-5 p-0 middle">
                    <div>
                        <svg id="svg_`+ panel_id + `" style="width: 500px; height: 375px;"></svg>
                    </div>                   
                </div>
                <div class="col-12 p-0 pt-10">
                    <table id="chart_container_`+ panel_id + `" class="table">
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `)

		var svg_background, ratio;
		$.ajax({
			type: "POST",
			url: "dashboard/get_cameraImage",
			async: false,
			dataType: "json",
			data: {
				panel_id: panel_id
			},
			success: function (imgData) {
				if (imgData.length != 0) {
					svg_background = "url(" + imgData[0]['root_path'] + ") 0% 0% / cover no-repeat"
				}
				$('#svg_' + panel_id).css("background", svg_background);
				$('#svg_' + panel_id).css("width", "100%");
				console.log("width : ", $('#svg_' + panel_id).width())
				$('#svg_' + panel_id).css("height", $('#svg_' + panel_id).width() * 3 / 4);
				ratio = $('#svg_' + panel_id).width() / 320

			},
			error: function (e) {
				console.info(e);
				console.info("Error");
			},
			done: function (e) {
				console.info("DONE");
			}
		});

		$.ajax({
            type: "POST",
            url: "staticReport/get_equipList_and_coord_by_month",
            async: false,
            dataType: "json",
            data: {
                building_id: building_id,
                panel_id: panel_id,
                date: date
            },
            success: function (equipData) { 
                console.log(equipData)
                if(equipData.length != 0) {
                    for(var j=0; j<equipData.length; j++) {
                        var width = equipData[j]['x2']-equipData[j]['x1'],
                            height = equipData[j]['y2']-equipData[j]['y1'];
                        d3.select('#svg_'+panel_id).append('rect')
                            .attr('class', 'rectangle equipment_'+equipData[j]['id'])
                            .attr('x',equipData[j]['x1']*ratio)
                            .attr('y',equipData[j]['y1']*ratio)
                            .attr('width',width*ratio)
                            .attr('height',height*ratio)
                            .attr('onclick', 'show_rect('+ panel_id+','+equipData[j]['id']+')')
                            .style({'stroke': '#0067ff', 'stroke-width':'3px', 'fill':'#b6eeff', 'fill-opacity':'0.2'});

                        var badge, text, text_color;
                        
                        if(equipData[j]['max(etbd.max_temp)'] >equipData[j]['allowed_temp']) {
                            badge = 'badge-danger';
                            text = '이상';
                            text_color = 'text_danger';
                        } else {
                            badge = 'badge-success';
                            text = '정상';
                            text_color = 'text_normal'
                        }
                        $('#table_'+panel_id+'>tbody').append(`
                            <tr class="tr_`+equipData[j]['id']+`" onclick="show_rect(`+panel_id+`,`+equipData[j]['id']+`)">
                                <td>`+equipData[j]['name']+`</td>
                                <td class="`+text_color+`">`+equipData[j]['max(etbd.max_temp)']+`℃</td>
                                <td><span class="badge badge-round `+badge+`">`+text+`</span></td>
                            </tr>
                        `)

                        $('#chart_container_'+panel_id+'>tbody').append(`
                            <tr>
                                <td class="col-2">
                                    <div class="image_box" style="background: #BDBDBD;">
                                        <img class="device_profile" src="`+equipData[j]['icon_path']+`">
                                    </div>
                                    <div>`+equipData[j]['name']+`</div>
                                </td>
                                <td class="col-9">
                                    <div style="height: 100px">
                                        <canvas id="chart`+equipData[j]['id']+`"></canvas>
                                    </div>
                                </td>
                                <td class="col-1">
                                    <div class="counter counter-sm row">
                                        <div class="counter-label text-uppercase col-6">MAX</div>
                                        <div class="counter-number-group text-truncate col-6 p-0">
                                            <span class="counter-number">`+equipData[j]['max(etbd.max_temp)']+`℃</span>
                                        </div>
                                    </div>
                                    <div class="counter counter-sm row">
                                        <div class="counter-label text-uppercase col-6">AVG</div>
                                        <div class="counter-number-group text-truncate col-6 p-0">
                                            <span class="counter-number">`+equipData[j]['avg(etbd.avg_temp)']+`℃</span>
                                        </div>
                                    </div>
                                    <div class="counter counter-sm row">
                                        <div class="counter-label text-uppercase col-6">MIN</div>
                                        <div class="counter-number-group text-truncate col-6 p-0">
                                            <span class="counter-number">`+equipData[j]['min(etbd.min_temp)']+`℃</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `);
                    

                        $.ajax({
                            type: "POST",
                            url: "/staticReport/get_chart_data_val_by_month",
                            async: false,
                            dataType: "json",
                            data: {
                                id: equipData[j]['id'],
                                date: date
                            },
                            success: function (chart_data_val) {
                                console.log("chart_data_val : ", chart_data_val)
                                chart_data_val = chart_data_val
                                allowed_temp = equipData[j]['allowed_temp']
    
                                    // //데이터 정리 
                                var label_data = []
                                var temp_data = []
                                var div_id = "chart"+equipData[j]['id']

                                for(char_data_len =0;char_data_len<chart_data_val.length;char_data_len++){
                                    label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                    // if(String(chart_data_val[char_data_len]['date_time']).substring(8,10) == '01'){
                                    //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                    // }else{
                                    //     label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(8,10)
                                    // }

                                    temp_data[char_data_len] = chart_data_val[char_data_len]['max_temp']
                                }
                                
                                //차트 생성 함수 호출 
                                creat_chart(div_id, temp_data, label_data,allowed_temp)
                                
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
                } else {
                    $('#print_area').empty();
                    $('#data-none').removeClass('display-none');
                }    
            },
            error: function (e) {
                console.info(e);
                console.info("Error");
            },
            done: function (e) {
                console.info("DONE");
            }
        });
}
