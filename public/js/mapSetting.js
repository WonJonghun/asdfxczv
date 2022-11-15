var x = 0;
var y = 0;
$.ajax({
	type: "POST",
	url: "/get_center",
	async: false,
	dataType: "json",
	success: function (data) {
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
	imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
	imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

var set_marker = new kakao.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter()
}); 

set_marker.setMap(map);

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    set_marker.setPosition(latlng);
    
    $('#btn_update').addClass('display-none');
    $('#btn_del').addClass('display-none');
    $('#btn_save').removeClass('display-none');
    $('#input_org').val('');
    $('#input_build').val('');
    $('#input_lat').val(latlng.getLat());
    $('#input_long').val(latlng.getLng());
        
});

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
					clickable: true,
                    draggable: true 
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
                    $('#btn_update').removeClass('display-none');
                    $('#btn_save').addClass('display-none');
                    $('#btn_del').removeClass('display-none');
                    $('#input_org').val(data[i]['organization']);
                    $('#input_build').val(data[i]['name']);
                    $('#input_lat').val(data[i]['latitude']);
                    $('#input_long').val(data[i]['longitude']);
                    $('#input_id').val(data[i]['id']);
                });

                kakao.maps.event.addListener(marker[i], 'dragstart', function () {
                   infowindow[i].close()
                });

                kakao.maps.event.addListener(marker[i], 'dragend', function () {
                   infowindow[i].open(map, marker[i])
                    var lat = Object.values(marker[i].getPosition())[1],
                        lng = Object.values(marker[i].getPosition())[0];
                    $('#btn_update').removeClass('display-none');
                    $('#btn_save').addClass('display-none');
                    $('#btn_del').removeClass('display-none');
                    $('#input_org').val(data[i]['organization']);
                    $('#input_build').val(data[i]['name']);
                    $('#input_lat').val(lat);
                    $('#input_long').val(lng);
                    $('#input_id').val(data[i]['id']);
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
