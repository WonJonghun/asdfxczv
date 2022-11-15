var x = 0;
var y = 0;
var flag, device_num;
$.ajax({
	type: "POST",
	url: "/get_center",
	async: false,
	dataType: "json",
	success: function (data) {
        console.log("////",data)
		x = data[0]['latitude'];
		y = data[0]['longitude'];
	},
	error: function (e) {
		console.info(e);
		console.info("Error");
	},
	done: function (e) {
		console.info("DONE");
	}
})

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};
var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var imageSrc = 'images/map_marker.png', // 마커이미지의 주소입니다    
	imageSize = new kakao.maps.Size(55, 55), // 마커이미지의 크기입니다
	imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

var building_id = 0;
var builing_list = new Array();
var marker = new Array(), iwContent = new Array(), infowindow = new Array();
$.ajax({
	type: "POST",
	url: "/get_buildingList",
	async: false,
	dataType: "json",
	success: function (data) {
		if (data.length != 0) {

			var position = new Array() ,iwContent = new Array(), infowindow = new Array(), marker = new Array();
			var iwRemoveable = false;
			for (let i = 0; i < data.length; i++) {
                position[i] = new kakao.maps.LatLng(data[i]['latitude'], data[i]['longitude']);
				
                marker[i] = new kakao.maps.Marker({
					position: position[i],
					image: markerImage,
					clickable: true 
				});
                
                marker[i].setMap(map)
                iwContent[i] = '<spna class="info-title">' + data[i]['name'] + '</span>',
                
                infowindow[i] = new kakao.maps.InfoWindow({
                    content: iwContent[i],
                    removable: iwRemoveable
                });
                
                infowindow[i].open(map, marker[i]);
                
                kakao.maps.event.addListener(marker[i], 'click', function () {
                    building_id = data[i]['id'];

                    $.ajax({
                        type: "POST",
                        url: "/get_panels",
                        async: false,
                        dataType: "json",
                        data: {
                            id: building_id 
                        },
                        success: function (panel_data) {
                            console.log(data)
                            if(panel_data.length == 0) {
                                $('#panel_none').removeClass('display-none');
                                $('#building_none').addClass('display-none');
                                $('#building_select').addClass('display-none');
                                $('#chart_dev').addClass('display-none');
                                $('#chart_div').addClass('display-none');
                                console.log("panel_container_h : ", panel_container_h)
                                $('#map').css('height', $('#panel_none').height()+'px');
                                map.relayout();
                            } else {
                                $('#chart_dev').removeClass('display-none');
                                $('#chart_div').removeClass('display-none');
                                $('#building_select').removeClass('display-none');
                                $('#building_none').addClass('display-none');
                                $('#panel_none').addClass('display-none');
                                $('#panel_name').text(data[i]['name']+' (ID '+data[i]['id']+')');
                                $('#panel_container').empty();
                                device_num = 0;
                                for(var j=0; j<panel_data.length; j++) {
                                    console.log("panel_data", panel_data)
                                    var panel_id = panel_data[j]['id'] 
    
                                    var panel_div = '<div class="col-3 box_pb"><div style="height:300px; color:blue; cursor:pointer; overflow: auto;" id="panel' + panel_data[j]['id'] + '" class="box" onclick="panel_click('+building_id+','+panel_data[j]['id']+')">' + panel_data[j]['name'] +' (ID '+panel_data[j]['id']+')' + '</div>'
                                    $('#panel_container').append(panel_div);
    
                                    var panel_container_h = $('#panel_name').parent().height();
                                    // console.log("panel_container_h : ", panel_container_h)
                                    $('#map').css('height', panel_container_h+'px');
                                    map.relayout();
    
                                    $.ajax({
                                        type: "POST",
                                        url: "/get_equipmentsInPanel",
                                        async: false,
                                        dataType: "json",
                                        data: {
                                            id: panel_id 
                                        },
                                        success: function (equip_data) {
                                            console.log(equip_data)
                                            device_num += equip_data.length;
                                            for(var k=0; k<equip_data.length; k++) {
                                                $('#panel'+ panel_data[j]['id']).append('<p class="default_color m-0">'+equip_data[k]['name']+'</p>')
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
                                 
                                }//for


                                // 0930 차트 데이터
                                //차트 초기화 
                                $('.chart_body').empty()
                                // 차트 데이터 가져옴 
                                var chart_low_data
                                $.ajax({
                                    type: "POST",
                                    url: "/get_chart_data",
                                    async: false,
                                    dataType: "json",
                                    data: {
                                        id: building_id 
                                    },
                                    success: function (chart_data) {
                                        
                                        chart_low_data = chart_data
                                    },
                                    error: function (e) {
                                        console.info(e);
                                        console.info("Error");
                                    },
                                    done: function (e) {
                                        console.info("DONE");
                                    }
                                })
                                // console.log("chart_low_data",chart_low_data)

                                //차트 생성 
                                var chart_data_val, flag = 0;
                                for(chart_len = 0 ; chart_len<chart_low_data.length; chart_len++){
                                    $.ajax({
                                        type: "POST",
                                        url: "/get_chart_data_val",
                                        async: false,
                                        dataType: "json",
                                        data: {
                                            id: chart_low_data[chart_len]['id'] 
                                        },
                                        success: function (chart_data_val) {
                                            
                                            chart_data_val = chart_data_val
                                            // console.log('chart_data_val',chart_data_val)
                                            var device_name
                                            var device_path
                                            var allowed_temp
                                            var data_flag
                                            
                                            if(chart_data_val.length !=0){

                                                for(name_flag =0; name_flag<chart_low_data.length; name_flag++){
                                                    if(chart_low_data.length != 0){
                                                        if(chart_low_data[name_flag]['id']==chart_data_val[0]['panel_equipment_id']){
                                                            device_name = chart_low_data[name_flag]['name']
                                                            device_path = chart_low_data[name_flag]['icon_path']
                                                            allowed_temp = chart_low_data[name_flag]['allowed_temp']
                                                            break;
                                                        }
                                                    }
                                                }//for
                                                console.log('device_name',device_name)
                                                console.log('device_path',device_path)
                                                console.log('allowed_temp',allowed_temp)
                                                  //구현
                                                $('.chart_body').append(`
                                                <tr>
                                                    <td class="col-3 profile_td">
                                                        <div class="image_box" style="background: #BDBDBD;">
                                                            <img class="device_profile" src="`+device_path+`">
                                                        </div>
                                                        <div>`+device_name+`</div>
                                                    </td>

                                                    <td class="col-9"><canvas id="chart`+chart_data_val[0]['panel_equipment_id']+String(chart_len)+`" style="width:100%; height: 100px"></canvas></td>
                                                </tr>
                                                `)

                                                // //데이터 정리 
                                                var label_data = []
                                                var temp_data = []
                                                var div_id = "chart"+chart_data_val[0]['panel_equipment_id']+String(chart_len)

                                                for(char_data_len =0;char_data_len<chart_data_val.length;char_data_len++){
                                                    
                                                    if(String(chart_data_val[char_data_len]['date_time']).substring(8,10) == '01'){
                                                        label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(5,10).replace('-','.')
                                                    }else{
                                                        label_data[char_data_len] = String(chart_data_val[char_data_len]['date_time']).substring(8,10)
                                                    }

                                                    temp_data[char_data_len] = chart_data_val[char_data_len]['max_temp']
                                                }
                                                
                                                // console.log(label_data)
                                                // console.log(temp_data)
                                                // console.log(device_name)
                                                //차트 생성 함수 호출 
                                                creat_chart(div_id, temp_data, label_data,allowed_temp)

                                            } else {
                                                flag ++;

                                                if(device_num == flag) {
                                                    $('#chart_div').addClass('display-none')
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


                            }//else
                        },
                        error: function (e) {
                            console.info(e);
                            console.info("Error");
                        },
                        done: function (e) {
                            console.info("DONE");
                        }
                    })
                });

                // kakao.maps.event.addListener(marker[i], 'click', function () {
                    
                // });
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

var infoTitle = document.querySelectorAll('.info-title');
infoTitle.forEach(function(e) {
    var w = e.offsetWidth + 10;
    var ml = w/2;
    e.parentElement.style.top = "82px";
    e.parentElement.style.left = "50%";
    e.parentElement.style.marginLeft = -ml+"px";
    e.parentElement.style.width = w+"px";
    e.parentElement.previousSibling.style.display = "none";
    e.parentElement.parentElement.style.border = "0px";
    e.parentElement.parentElement.style.background = "unset";
});

function panel_click(building_id, panel_id) {
    location.href = "dashboard?"+building_id+'&'+panel_id;
}
