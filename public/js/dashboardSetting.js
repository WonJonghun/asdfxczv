var year, month, old_date, new_date;
var building_id, panel_id;

let today = new Date();   
year = today.getFullYear();
month = today.getMonth()+1;
old_month = today.getMonth();


if(month == '01') {
    new_date = year+'-'+("00"+month.toString()).slice(-2);
    old_date = (year-1)+'-12'    
} else {
    new_date = year+'-'+month;
    old_date = year+'-'+("00"+old_month.toString()).slice(-2);
}




$.ajax({
	type: "POST",
	url: "/get_buildingList",
	async: false,
	dataType: "json",
	success: function (data) { 
        if(data.length != 0) {
            for(var i=0; i<data.length; i++) {
                $('#building_select').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
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

if(window.location.href.indexOf('?') != -1) {
    var url = window.location.href.split('?');
    var url_data = url[1].split('&');
    building_id = url_data[0];
    panel_id = url_data[1];
} else {
    console.log("!!!!!")
    building_id = $('#building_select option:eq(1)').val();
    panel_id = $('#panel_select option:eq(1)').val();
}

get_image(panel_id);

if(panel_id) {
    $.ajax({
        type: "POST",
        url: "/get_panels",
        async: false,
        dataType: "json",
        data: {
            id: building_id
        },
        success: function (data) {
            console.log(data)
            if(data.length != 0) {
                $('#panel_select').empty();
                for(var i=0; i<data.length; i++) {
                    $('#panel_select').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
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

    $('#panel_select').val(panel_id).prop('seleted', true);
}

if(building_id) {
    $('#building_select').val(building_id).prop('seleted', true);
}

$('#building_select').on('change', function() {
    building_id = $(this).val();   
    
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
                if($('#panel_select').length == 1) { // select box 설정       
                    $('#panel_select').empty();
                    for(var i=0; i<data.length; i++) {
                        $('#panel_select').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
                    }                
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

    panel_id = $('#panel_select option:eq(0)').val();
    console.log("panel_id :", panel_id)
    get_image(panel_id);
    $('#svg_img').empty();
    get_equipment_list();
})

$('#panel_select').on('change', function() {
    panel_id = $(this).find(':selected').val(); 
    get_image(panel_id);
    $('#svg_img').empty();
    get_equipment_list();

})

function get_image(panel_id) {
    $.ajax({
        type: "POST",
        url: "dashboard/get_cameraImage",
        async: false,
        dataType: "json",
        data: {
            panel_id : panel_id
        },
        success: function (data) { 
            console.log(data)
            if(data.length != 0) {
                $('#svg_img').css("background", "url("+data[0]['root_path']+") 0% 0% / cover no-repeat")
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

get_equipment_list()

function get_equipment_list () {
    $.ajax({
        type: "POST",
        url: "dashboard/get_equipList",
        async: false,
        dataType: "json",
        data: {
            building_id: building_id,
            panel_id: panel_id
        },
        success: function (data) { 
            console.log(data)
            if(data.length != 0) {
                $('#slider_div').empty();
                $('#temp_table>tbody').empty();
                for(var i=0; i<data.length; i++) {
                    $.ajax({
                        type: "POST",
                        url: "dashboard/get_tempAndCoord_dashboard",
                        async: false,
                        dataType: "json",
                        data: {
                            equip_id: data[i]['id'],
                            old_date: old_date,
                            new_date: new_date
                        },
                        success: function (tempData) { 
                            console.log(".......",tempData)
                            if(tempData.length != 0) {
                                var width = tempData[1][0]['x2']-tempData[1][0]['x1'],
                                    height = tempData[1][0]['y2']-tempData[1][0]['y1'];
                                d3.select('#svg_img').append('rect')
                                .attr('class', 'rectangle equipment_'+data[i]['id'])
                                .attr('x',tempData[1][0]['x1'] * 1.89)
                                .attr('y',tempData[1][0]['y1'] * 1.46)
                                .attr('width',width * 1.89)
                                .attr('height',height * 1.46)
                                .attr('onclick', 'show_rect('+data[i]['id']+')');

                                // $('#slider_div').append(`<div id="chartDiv_`+i+`" class="slider_chart" style="max-width: 200px; height: 200px;margin: 0px auto" onclick="chart_change($(this))" data-equip="`+data[i]['id']+`" data-max="`+tempData[0][0]['max(etbd.max_temp)']+`" data-min="`+tempData[0][0]['min(etbd.min_temp)']+`" data-avg="`+tempData[0][0]['avg(etbd.avg_temp)']+`" data-allow="`+data[i]['allowed_temp']+`"></div>`);
                                
                                var differ = (tempData[0][0]['max(etbd.max_temp)'] - tempData[2][0]['max(etbd.max_temp)'])
                                if(!Number.isInteger(differ)){
                                    differ = differ.toFixed(2)
                                }  

                                $('#slider_div').append(`
								<div class="col-lg-3 col-sm-6 slider_chart" onclick="chart_change($(this))" data-equip="`+data[i]['id']+`" data-max="`+tempData[0][0]['max(etbd.max_temp)']+`" data-min="`+tempData[0][0]['min(etbd.min_temp)']+`" data-avg="`+tempData[0][0]['avg(etbd.avg_temp)']+`" data-allow="`+data[i]['allowed_temp']+`" data-differ="`+differ+`">
                                    <div class="card card-shadow card-responsive card_`+data[i]['id']+` circle_chart" onclick="show_rect(`+data[i]['id']+`)" style="max-height:271px;">
                                        <div class="card-block p-20 text-center">
                                            <div id="chartDiv_`+i+`" class="slider_chart" style="max-width: 150px; height: 150px; margin: 0px auto" onclick="chart_change($(this))" data-equip="`+data[i]['id']+`" data-max="`+tempData[0][0]['max(etbd.max_temp)']+`" data-min="`+tempData[0][0]['min(etbd.min_temp)']+`" data-avg="`+tempData[0][0]['avg(etbd.avg_temp)']+`" data-allow="`+data[i]['allowed_temp']+`"></div>
                                            <span class="circle_name">`+data[i]['name']+`</span>                                        
                                        </div>
                                    </div>
                                </div>`)
                                var per = tempData[0][0]['max(etbd.max_temp)']/data[i]['allowed_temp']*100;
                                if(!Number.isInteger(per)){
                                    per = per.toFixed(2)
                                }     
                                
                                var badge, text;
                                if(per >100) {
                                    badge = 'badge-danger';
                                    text = '이상';
                                } else {
                                    badge = 'badge-success';
                                    text = '정상';
                                }
                                
                                $('#temp_table>tbody').append(`<tr>
                                    <td>
                                        <div class="image_box" style="background: #BDBDBD;">
                                            <img class="device_profile" src="`+data[i]['icon_path']+`">
                                        </div>
                                        <div>`+data[i]['name']+`</div>
                                    </td>
                                    <td>`+data[i]['allowed_temp']+`°C</td>
                                    <td>`+tempData[0][0]['max(etbd.max_temp)']+`°C</td>
                                    <td>`+per+`%</td>
                                    <td><span class="badge badge-round `+badge+`">`+text+`</span></td>
                                </tr>`)
                                create_circle('chartDiv_'+i, tempData[0][0]['max(etbd.max_temp)'], data[i]['allowed_temp'], data[i]['name'])
                                
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

                    // $.ajax({
                    //     type: "POST",
                    //     url: "dashboard/get_tempCount",
                    //     async: false,
                    //     dataType: "json",
                    //     data: {
                    //         equip_id: data[i]['id'],
                    //         allowed_temp: data[i]['allowed_temp']
                    //     },
                    //     success: function (countData) { 
                            


                    //     },
                    //     error: function (e) {
                    //         console.info(e);
                    //         console.info("Error");
                    //     },
                    //     done: function (e) {
                    //         console.info("DONE");
                    //     }
                    // });
                }

                var slider_chart = $('.slider_chart')
                chart_change($(slider_chart[0]))

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

function chart_change(obj) {
    $('#max_temp').text(obj.attr("data-max")+"℃");
    $('#min_temp').text(obj.attr("data-min")+"℃");
    $('#avg_temp').text(obj.attr("data-avg")+"℃");
    $('#allow_temp').text(obj.attr("data-allow")+"℃");
    $('#differ_temp').text(obj.attr("data-differ")+"℃");

    $.ajax({
        type: "POST",
        url: "dashboard/get_tempData_dashboard",
        async: false,
        dataType: "json",
        data: {
            equip_id : obj.attr("data-equip"),
            old_date: old_date,
            new_date: new_date
        },
        success: function (data) { 
            console.log("------------", data)
            var label_data = []
            var temp_data1 = [], temp_data2 = [], month = [];
            $('#chart_container').empty();
            $('#chart_container').append('<canvas class="px-30 pb-30" id="myChart"></canvas>')
            var div_id = "myChart"
            var month_data;

            if(data[0].length > data[1].length) { month_data = data[0] }
            else { month_data = data[1] }

            for(i=0; i<data.length; i++) {
                month.push(String(data[i][0]['date_time']).substring(0,7))
            } 
            console.log(month)

            for(i=0; i<month_data.length; i++) {
                label_data[i] = String(month_data[i]['date_time']).substring(8,10)
            }
            // if(String(data[0][i]['date_time']).substring(8,10) == '01'){
            //     label_data[i] = String(data[0][i]['date_time']).substring(5,10).replace('-','.')
            // }else{
            // }

            for(i =0; i<data[0].length; i++){
                temp_data1[i] = data[0][i]['max_temp'];
            }

            for(i=0; i<data[1].length; i++) {
                temp_data2[i] = data[1][i]['max_temp'];
            }
            // console.log(temp_data, label_data)
            creat_chart2(div_id, temp_data1, temp_data2, label_data, obj.attr("data-allow"), month)

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

function show_rect(id) {
    $('.rectangle').removeClass('select');
    $('.equipment_'+id).addClass('select');
    $('.card').removeClass('select');
    $('.card_'+id).addClass('select');
}