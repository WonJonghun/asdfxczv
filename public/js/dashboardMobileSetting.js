var year, month, old_date, new_date;
var building_id, panel_id;

let today = new Date();   
year = today.getFullYear();
month = today.getMonth()+1;
old_month = today.getMonth();

if(month == 1) {
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
                $('.building_select').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
            }
            building_id = $('.building_select option:eq(0)').val();
            get_panels();
            
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
// $('.building_select option:eq(2)').prop('seleted', true);

$('.building_select').on('change', function() {
    building_id = $(this).val();
    get_panels();
    get_content();
 }) 

 $('.panel_select').on('change', function() {
     panel_id = $(this).val();
     get_content();
 }) 

function get_panels () {
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
                $('.panel_select').empty();
                for(var i=0; i<data.length; i++) {
                    $('.panel_select').append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>')
                }
                panel_id = $('.panel_select option:eq(0)').val();
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



function get_content() {
    $('#slider_div').empty();
    $('#temp_table>tbody').empty();
    $('#svg_img').empty();
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
            console.log(mobileData)
            if(mobileData[1].length !=0){
                $('#data-none').addClass('display-none');
                $('#datazone').removeClass('display-none');
                for(var i=0; i<mobileData[1].length; i++){
                    $('#svg_img').css("background", "url("+mobileData[1][0]['thermal_img_path']+") 0% 0% / cover no-repeat");
                    var width = mobileData[1][i]['bbox_x2']-mobileData[1][i]['bbox_x1'],
                        height = mobileData[1][i]['bbox_y2']-mobileData[1][i]['bbox_y1'];
                        
                    d3.select('#svg_img').append('rect')
                        .attr('class', 'rectangle equipment_'+mobileData[1][i]['id'])
                        .attr('x',mobileData[1][i]['bbox_x1'] * 1.89)
                        .attr('y',mobileData[1][i]['bbox_y1'] * 1.46)
                        .attr('width',width * 1.89)
                        .attr('height',height * 1.46)
                        .attr('onclick', 'show_rect('+mobileData[1][i]['id']+')');
    
                    $('#slider_div').append(`
                        <div class="col-lg-3 col-sm-6 slider_chart">
                            <div class="card card-shadow card-responsive card_`+mobileData[1][i]['id']+` circle_chart" onclick="show_rect(`+mobileData[1][i]['id']+`)" style="max-height:271px;">
                                <div class="card-block p-20 text-center">
                                    <div id="chartDiv_`+i+`" class="slider_chart" style="max-width: 150px; height: 150px;margin: 0px auto"></div>
                                    <span class="circle_name">`+mobileData[1][i]['name']+`</span>                                        
                                </div>
                            </div>
                    </div>`)
                    create_circle('chartDiv_'+i, mobileData[1][i]['max_temp'], mobileData[1][i]['allowed_temp'], mobileData[1][i]['name']);
    
                    // var badge, text;
                    // if(mobileData[1][i]['max_temp'] >0) {
                    //     badge = 'badge-danger';
                    //     text = '이상';
                    // } else {
                    //     badge = 'badge-success';
                    //     text = '정상';
                    // }
                    var per = mobileData[1][i]['max_temp']/mobileData[1][i]['allowed_temp']*100;
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
                                <img class="device_profile" src="`+mobileData[1][i]['icon_path']+`">
                            </div>
                            <div>`+mobileData[1][i]['name']+`</div>
                        </td>
                        <td>`+mobileData[1][i]['allowed_temp']+`°C</td>
                        <td>`+mobileData[1][i]['max_temp']+`°C</td>
                        <td>`+per+`%</td>
                        <td>`+mobileData[1][i]['date_time']+`</td>
                        <td><span class="badge badge-round `+badge+`">`+text+`</span></td>
                    </tr>`)
                }
            } else {
                $('#data-none').removeClass('display-none');
                $('#datazone').addClass('display-none');
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

function show_rect(id) {
    $('.rectangle').removeClass('select');
    $('.equipment_'+id).addClass('select');
    $('.card').removeClass('select');
    $('.card_'+id).addClass('select');
}