var building_id, panel_id, year_val, month_val, panel_flag, display_flag;

let today = new Date();
year_val = today.getFullYear();
// month_val = today.getMonth() + 1;

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

$('#sel_building').on('change', function () {
    building_id = $(this).val()

    if(building_id) {
        $('#sel_panel').empty();
        $('#sel_panel').append('<option value="">반을 선택하세요.</option>')
        get_panels();
    } else {
        $('#sel_panel').empty();
        $('#sel_panel').append('<option value="">반을 선택하세요.</option>')
    }

    $('#sel_panel').select2('val','');
    $('#sel_month').select2('val','none');

    $('#print_area').empty();
    $('#data-none').removeClass('display-none');
})

$('#sel_panel').on('change', function () {
    building_id = $('#sel_building').val();
    panel_id = $(this).val();
    month_val = $('#sel_month').val();

    if(building_id != '' && panel_id != '') {
        if(month_val != 'month' && month_val) {
            $('#data-none').addClass('display-none');
            $('#print_area').empty();
            if(panel_id != 'all'){
                one_panel_display(0, panel_id);
            } else {
                content_display();
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

$('#sel_month').on('change', function () {
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
                content_display();
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
//     var panel_div = $(this).parent().parent().parent().next().children('.panel');
//     if($(this).val() == 'all') {
//         panel_div.removeClass('display-none');
//     } else {
//         select_panel_div = $(this).parent().parent().parent().next().children('.panel.p_'+$(this).val());
//         panel_div.addClass('display-none');
//         select_panel_div.removeClass('display-none');
//     }
// })

function show_rect(panel, equip) {
    $('#svg_thermal_' + panel + '>.rectangle').removeClass('select');
    $('#svg_rgb_' + panel + '>.rectangle').removeClass('select');
    $('#svg_thermal_' + panel + '>.equipment_' + equip).addClass('select');
    $('#svg_rgb_' + panel + '>.equipment_' + equip).addClass('select');

    $('#table_' + panel + '>tbody>tr').removeClass('tr_select');
    $('#table_' + panel + '>tbody>.tr_' + equip).addClass('tr_select');
}

function content_display() {
    // date = year+'-'+month_val;
    display_flag = 0;
    $.ajax({
        type: "POST",
        url: "/get_panels",
        async: false,
        dataType: "json",
        data: {
            id: building_id
        },
        success: function (data) {
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    one_panel_display(1, data[i]['id']); 
                    // var old_date, new_date;
                    // if(month_val < 10) {
                    //     old_date = '2022-0'+(month_val-1),
                    //     new_date = '2022-0'+month_val
                    // } else if(month_val == 10) {
                    //     old_date = '2022-0'+(month_val-1),
                    //     new_date = '2022-'+month_val
                    // }else {
                    //     old_date = '2022-'+(month_val-1),
                    //     new_date = '2022-'+month_val
                    // }
                    //         $.ajax({
                    //             type: "POST",
                    //             url: "mobileReport/get_mobileData",
                    //             async: false,
                    //             dataType: "json",
                    //             data:{
                    //                 building_id: building_id,
                    //                 panel_id: data[i]['id'],
                    //                 old_date: old_date,
                    //                 new_date: new_date
                    //             },
                    //             success: function (mobileData) {     
                    //                 console.log("//",mobileData) 
                    //                 $('#print_area').append(`
                    //                 <div class="col-12 pt-20 row p_`+data[i]['id']+` panel">
                    //                     <h5 class="text-center">`+$('#sel_building').find(':selected').text()+` > `+data[i]['name']+`</h5>
                    //                     <div class="col-lg-6 col-sm-6 row">
                    //                         <table id="table_`+data[i]['id']+`" class="table table_`+data[i]['id']+`">                                                    
                    //                             <thead>
                    //                                 <tr>
                    //                                     <th>장 비</th>
                    //                                     <th>`+mobileData[0][0]['date']+`</th>
                    //                                     <th>`+mobileData[1][0]['date']+`</th>
                    //                                     <th>온 도 차</th>
                    //                                 </tr>
                    //                             </thead>
                    //                             <tbody>
                    //                             </tbody>
                    //                         </table>
                    //                     </div>
                    //                     <div class="col-lg-6 col-sm-12 row p-0">     
                    //                         <div class="col-6">
                    //                             <svg id="svg_thermal_`+data[i]['id']+`" style="width:370px; height:278px; background: url(`+mobileData[1][0]['thermal_img_path']+`) 0% 0% / cover no-repeat;"></svg>
                    //                         </div>
                    //                         <div class="col-6 p-0">
                    //                         <svg id="svg_rgb_`+data[i]['id']+`" style="width:370px; height:278px; background: url(`+mobileData[1][0]['rgb_img_path']+`") 0% 0% / cover no-repeat;"></svg>
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //                 `)

                    //                 for(var j=0; j<mobileData[1].length; j++) {
                    //                     var width = (mobileData[1][j]['bbox_x2']-mobileData[1][j]['bbox_x1'])*1.16,
                    //                         height = (mobileData[1][j]['bbox_y2']-mobileData[1][j]['bbox_y1'])*1.16;
                    //                     d3.select('#svg_thermal_'+data[i]['id']).append('rect')
                    //                         .attr('class', 'rectangle equipment_'+j)
                    //                         .attr('x',mobileData[1][j]['bbox_x1']*1.16)
                    //                         .attr('y',mobileData[1][j]['bbox_y1']*1.16)
                    //                         .attr('width',width)
                    //                         .attr('height',height)
                    //                         .attr('onclick', 'show_rect('+ data[i]['id']+','+j+')');

                    //                     d3.select('#svg_rgb_'+data[i]['id']).append('rect')
                    //                     .attr('class', 'rectangle equipment_'+j)
                    //                     .attr('x',mobileData[1][j]['bbox_x1']*1.16)
                    //                     .attr('y',mobileData[1][j]['bbox_y1']*1.16)
                    //                     .attr('width',width)
                    //                     .attr('height',height);

                    //                     var differ;
                    //                     if(Number.isInteger(mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp'])) {
                    //                         differ = mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp'];
                    //                     } else {
                    //                         differ = (mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp']).toFixed(2)
                    //                     }

                    //                     $('.table_'+data[i]['id']+'>tbody').append(`
                    //                     <tr class="tr_`+j+`" onclick="show_rect(`+data[i]['id']+`,`+j+`)">
                    //                         <td>`+mobileData[1][j]['name']+`</td>
                    //                         <td>`+mobileData[0][j]['max_temp']+`℃</td>
                    //                         <td>`+mobileData[1][j]['max_temp']+`℃</td>
                    //                         <td>`+differ+`℃</td>
                    //                     </tr>
                    //                     `)
                    //                 }

                    //             },
                    //             error: function (e) {
                    //                 console.info(e);
                    //                 console.info("Error");
                    //             },
                    //             done: function (e) {
                    //                 console.info("DONE");
                    //             }
                    //         });
                        
                }
                if(display_flag == data.length) {
                    $('#data-none').removeClass('display-none');
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

function one_panel_display(flag, panel_id) {
    if (flag == 0) {
        $('#print_area').empty();
    }
    if (month_val < 10 && month_val != 1) {
        old_date = year_val+'-0' + (month_val - 1);
        new_date = year_val+'-0' + month_val;
    } else if (month_val == 10) {
        old_date = year_val+'-0' + (month_val - 1);
        new_date = year_val+'-' + month_val;
    } else if(month_val == 1) {
        old_date = (year_val - 1)+'-12';
        new_date = year_val+'-0' + month_val;
    } else {
        old_date = year_val+'-' + (month_val - 1);
        new_date = year_val+'-' + month_val;
    }

    console.log(old_date, new_date)

    $.ajax({
        type: "POST",
        url: "mobileReport/get_mobileData",
        async: false,
        dataType: "json",
        data: {
            building_id: building_id,
            panel_id: panel_id,
            old_date: old_date,
            new_date: new_date
        },
        success: function (mobileData) {
            console.log("//", mobileData)
            if(mobileData[0].length != 0 && mobileData[1].length != 0) {

                $('#print_area').append(`
                    <div class="col-12 pt-20 row p_`+ panel_id + ` panel panel_div">
                        <h5 class="text-center" style="font-weight: bold;">`+ $('#sel_building').find(':selected').text() + ` > ` + mobileData[0][0]['panel_name'] + `</h5>
                        <div class="col-lg-6 col-sm-6 row">
                            <table id="table_`+ panel_id + `" class="table table_` + panel_id + `">                                                    
                                <thead>
                                    <tr>
                                        <th>장 비</th>
                                        <th>`+ mobileData[0][0]['date'] + `</th>
                                        <th>`+ mobileData[1][0]['date'] + `</th>
                                        <th>온 도 차</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-lg-6 col-sm-12 row p-0">     
                            <div class="col-6">
                                <svg id="svg_thermal_`+ panel_id + `" style="width:370px; height:278px; background: url(` + mobileData[1][0]['thermal_img_path'] + `) 0% 0% / cover no-repeat;"></svg>
                            </div>
                            <div class="col-6 p-0">
                            <svg id="svg_rgb_`+ panel_id + `" style="width:370px; height:278px; background: url(` + mobileData[1][0]['rgb_img_path'] + `") 0% 0% / cover no-repeat;"></svg>
                            </div>
                        </div>
                    </div>
                `)
    
                for (var j = 0; j < mobileData[1].length; j++) {
                    var width = (mobileData[1][j]['bbox_x2'] - mobileData[1][j]['bbox_x1']) * 1.16,
                        height = (mobileData[1][j]['bbox_y2'] - mobileData[1][j]['bbox_y1']) * 1.16;
                    d3.select('#svg_thermal_' + panel_id).append('rect')
                        .attr('class', 'rectangle equipment_' + j)
                        .attr('x', mobileData[1][j]['bbox_x1'] * 1.16)
                        .attr('y', mobileData[1][j]['bbox_y1'] * 1.16)
                        .attr('width', width)
                        .attr('height', height)
                        .attr('onclick', 'show_rect(' + panel_id + ',' + j + ')')
                        .style({'stroke': '#0067ff', 'stroke-width':'3px', 'fill':'#b6eeff', 'fill-opacity':'0.2'});
    
                    d3.select('#svg_rgb_' + panel_id).append('rect')
                        .attr('class', 'rectangle equipment_' + j)
                        .attr('x', mobileData[1][j]['bbox_x1'] * 1.16)
                        .attr('y', mobileData[1][j]['bbox_y1'] * 1.16)
                        .attr('width', width)
                        .attr('height', height)
                        .attr('onclick', 'show_rect(' + panel_id + ',' + j + ')')
                        .style({'stroke': '#0067ff', 'stroke-width':'3px', 'fill':'#b6eeff', 'fill-opacity':'0.2'});
    
                    var differ;
                    if (Number.isInteger(mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp'])) {
                        differ = mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp'];
                    } else {
                        differ = (mobileData[1][j]['max_temp'] - mobileData[0][j]['max_temp']).toFixed(2)
                    }
    
                    $('.table_' + panel_id + '>tbody').append(`
                        <tr class="tr_`+ j + `" onclick="show_rect(` + panel_id + `,` + j + `)">
                            <td>`+ mobileData[1][j]['name'] + `</td>
                            <td>`+ mobileData[0][j]['max_temp'] + `℃</td>
                            <td>`+ mobileData[1][j]['max_temp'] + `℃</td>
                            <td>`+ differ + `℃</td>
                        </tr>
                    `)
                }
            } else {
                display_flag ++;
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