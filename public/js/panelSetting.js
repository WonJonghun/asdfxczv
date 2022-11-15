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

// const { json } = require("express");

let savei = 0;
let divX = new Array();
var i = 0;

$('#btn_add').on('click', function () {
    var building_id = $('#building_select').val(),
        temp_name = '이름을 설정해주세요.';
        console.log(building_id)
    var panel_id;
    $.ajax({
        type: "POST",
        url: "panelSetting/insert_panel",
        async: false,
        dataType: "json",
        data: {
            banname: temp_name,
            building_id: building_id
        },
        success: function (data) {
            $.ajax({
                type: "POST",
                url: "panelSetting/get_panel_id",
                async: false,
                dataType: "json",
                data: {
                    banname: temp_name,
                    building_id: building_id
                },
                success: function (data) {
                    // location.href = "bansetting";
                    console.log("panel id : ", data);
                    panel_id = data[addCount]['id'];
                },
                error: function (e) {
                    console.info(e);
                    console.info("Error");
                },
                done: function (e) {
                    console.info("DONE");
                }
            })
        },
        error: function (e) {
            console.info(e);
            console.info("Error");
        },
        done: function (e) {
            console.info("DONE");
        }
    })
    divX[i] = savei + i;
    $('#panel_container').append(
        `<div style="width:250px; height:430px; margin:0.6em; float:left;" id="min_` + panel_id + `">
            <div class="row col-12" style="margin-bottom: 0.5rem;">
                <input type="checkbox" data-id="` + panel_id + `">
                <input type="text" class="txt" id="txt_` + panel_id + `" placeholder="반 이름을 입력해주세요"/>
            </div>
            <div class="bandiv_` + panel_id + ` box column dropHere new_drop_div" id="dropHere_` + panel_id + `" style="width: 250px; height:400px" data-id="` + panel_id + `"></div>                
        </div>`,
        // '<script>const columns = document.querySelectorAll(".column");columns.forEach((column) => {new Sortable(column, {group: "shared",animation: 150,ghostClass: "blue-background-class"});});$(\'.btnRemove_'+divX[i]+'\').on(\'click\',function(){$(\'#min_'+divX[i]+'\').remove();});</script>'
        `<script>
            $(function() {
                var counts = [0];
                var resizeOpts = {handles: "all",autoHide: true};
                $(".equipment_box").draggable({
                    helper: "clone",
                    start: function() {counts[0]++;}
                });
                $("#dropHere_` + panel_id + `").droppable({
                    drop: function(e, ui) {
                        if (ui.draggable.hasClass("equipment_box")) {
                            $(this).append($(ui.helper).clone());
                            $("#dropHere_` + panel_id + ` .equipment_box").addClass("Aitem-` + panel_id + ` equip_item");
                            $("#dropHere_` + panel_id + ` .equip_img").addClass("imgSize-` + panel_id + `");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").removeClass("equipment_box ui-draggable ui-draggable-dragging");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("background","#fff");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("padding","20px");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("border-radius","5px");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("margin","10px");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("cursor","pointer");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("float","left");
                            $("#dropHere_` + panel_id + ` .Aitem-` + panel_id + `").css("text-align","center");
                            $(".Aitem-` + panel_id + `").dblclick(function() {$(this).remove();});
                            make_draggable($(".Aitem-` + panel_id + `"));
                            $(".imgSize-` + panel_id + `").resizable(resizeOpts);
                        }
                    }
                });
                var zIndex = 0;
                function make_draggable(elements) {
                    elements.draggable({
                        containment: "parent",
                        start: function(e, ui) {
                            ui.helper.css("z-index", ++zIndex);
                        },
                        stop: function(e, ui) {}
                    });
                }
            });
            $('.btnRemove_ `+ panel_id +`' ).on('click',function(){$('#min_ `+ panel_id+`').remove();});
        </script>`
    );
    i++;
    addCount ++;        
});

var original_arr;
var original_json_data;
$("#building_select").on('change', function () {
    // original_arr = new Array();
    original_json_data = {};
    var json_data = {};
    var id = [], value = [];
    if($(this).val() != '') {
        $('#btn_add').removeClass('display-none');
    } else {
        $('#btn_add').addClass('display-none');
    }

    equip_display()
});


var str1 = 'undefined';

$('#btn_save').on('click', function() {
    var new_panel_equip_arr = new Array();
    var new_json_data = {}, json_data = {};
    var id = [], value = [];

    var panel = $('.drop_div')
        new_panel = $('.new_drop_div');

    for(var i=0; i<panel.length; i++) {
        var equip_arr = new Array()
        for(var j=0; j<$(panel[i]).children('.old_equip').length; j++) {    
            equip_arr.push($(panel[i]).children('.old_equip')[j]['attributes'][1]['nodeValue']) // data-equipid 값 
        }
        
        id.push($(panel[i]).attr('data-id'));
        value.push(equip_arr);

        if($(panel[i]).children('.equip_item').length > 0) {
            for(var j=0; j<$(panel[i]).children('.equip_item').length; j++) {
                console.log($(panel[i]).attr('data-id'),$(panel[i]).children('.equip_item')[j]['attributes'][2]['nodeValue'])
                $.ajax({
                    type: "POST",
                    url: "panelSetting/insert_new_equip",
                    async: false,
                    dataType: "json",
                    data: {
                        panel_id: $(panel[i]).attr('data-id'),
                        equipment_id : $(panel[i]).children('.equip_item')[j]['attributes'][2]['nodeValue']
                    },
                    success: function (equipData) {
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
    }

    for(idx in id) {
        json_data[id[idx]] = value[idx];
    }

    new_json_data['data'] = json_data;
    console.log("new : ",new_json_data)
    console.log("old : ",original_json_data)

    for(var i=0; i<Object.keys(new_json_data['data']).length; i++) {        
        var delete_data, insert_data, duplicate_data;
        if(new_json_data['data'][id[i]].length != 0) {
            delete_data = array_diff(original_json_data['data'][id[i]], new_json_data['data'][id[i]]); // 삭제된 항목
            
            console.log("delete : ", delete_data)
            if(delete_data.length > 0) {
                for(var j=0; j<delete_data.length; j++) {
                    $.ajax({
                        type: "POST",
                        url: "panelSetting/delete_equipment",
                        async: false,
                        dataType: "json",
                        data:{
                            equipmnet_id: delete_data[j]
                        },
                        success: function (data) {
                            location.href = "/panelSetting";
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
        }
    }    

    for(var i=0; i<new_panel.length; i++) {        
        // start - 임시로 생성된 panel name 사용자 설정값으로 변경
        $.ajax({
            type: "POST",
            url: "panelSetting/update_panel_name",
            async: false,
            dataType: "json",
            data:{
                id: new_panel[i]['dataset']['id']*1,
                panel_name: $('#txt_'+new_panel[i]['dataset']['id']*1).val()
            },
            success: function (data) {
                // location.href = "bansetting";
            },
            error: function (e) {
                console.info(e);
                console.info("Error");
            },
            done: function (e) {
                console.info("DONE");
            }
        })
        // end - 임시로 생성된 panel name 사용자 설정값으로 변경

        equipment = $('.Aitem-'+new_panel[i]['dataset']['id']);
        for(var j=0; j<equipment.length; j++) {
            // new_panel_equip_arr.push(equipment[i]['dataset']['id']);
            // console.log(new_panel_equip_arr)
            // start - 새로 생성된 panel의 장비 저장
            $.ajax({
                type: "POST",
                url: "panelSetting/insert_new_equip",
                async: false,
                dataType: "json",
                data:{
                    panel_id: new_panel[i]['dataset']['id']*1,
                    equipment_id: equipment[j]['dataset']['id']
                },
                success: function (data) {
                    // location.href = "bansetting";
                },
                error: function (e) {
                    console.info(e);
                    console.info("Error");
                },
                done: function (e) {
                    console.info("DONE");
                }
            })
            // end - 새로 생성된 panel의 장비 저장
        }
    }
    equip_display();
})

$('#btn_del').on('click', function() {
    var check_value = [];
    $('input:checkbox').each(function(index) {
        if($(this).is(':checked')==true) {
            check_value.push($(this).attr('data-id'));
            $(this).parent().parent().remove();
        }
    })
    console.log(check_value)
})

function equip_display () {
    var id = [], value = [], json_data = {};
    addCount = 0;
    var panelX_id = new Array();
    var selectid = ($("#building_select").val());
    $('#panel_container').empty();
    $.ajax({
        type: "POST",
        url: "/get_panels",
        async: false,
        dataType: "json",
        data: {
            id: selectid
        },
        success: function (data) {            
            for (var y = 0; y < data.length; y++) {                
                var panels_equipX_id = new Array();
                $('#panel_container').append(
                    `<div style="width:250px; height:430px; margin:0.6em; float:left;" id="min_` + y + `">
                        <div class="row col-12" style="margin-bottom: 0.5rem;">
                            <input type="checkbox" data-id="` + data[y]['id'] + `">
                            <input type="text" class="txt" id="txt_` + y + `" value="` + data[y]['name'] + `"/>
                        </div>
                        <div class="bandiv_` + y + ` box1 column drop_div box" id="dropHere_` + y + `" style="width: 250px; height:400px" data-id="` + data[y]['id'] + `"></div>                        
                    </div>`,
                    // '<script>const columns = document.querySelectorAll(".column");columns.forEach((column) => {new Sortable(column, {group: "shared",animation: 150,ghostClass: "blue-background-class"});});$(\'.btnRemove_'+data[y]['id']+'\').on(\'click\',function(){$(\'#min_'+y+'\').remove();});</script>',
                    `<script>
                        $(function() {
                            var counts = [0];
                            var resizeOpts = {handles: "all",autoHide: true};
                            $(".equipment_box").draggable({
                                helper: "clone",
                                appendTo: "#dropHere_`+y+`",
                                start: function() {counts[0]++;}
                            });
                            $("#dropHere_`+y+`").droppable({
                                drop: function(e, ui) {
                                    if (ui.draggable.hasClass("equipment_box")) {
                                        $(this).append($(ui.helper).clone());
                                        $("#dropHere_`+y+` .equipment_box").addClass("Aitem-`+y+` equip_item");
                                        $("#dropHere_`+y+` .equip_img").addClass("imgSize-`+y+`");
                                        $("#dropHere_`+y+` .Aitem-`+y+`").removeClass("ui-draggable ui-draggable-dragging");
                                        $(".Aitem-`+y+`").dblclick(function() {$(this).remove();});
                                        make_draggable($(".Aitem-`+y+`"));
                                        $(".imgSize-`+y+`").resizable(resizeOpts);
                                    }
                                }
                            });
                            $("#dropHere_`+y+` .Aitem-`+y+`").css("position","unset");
                            $("#dropHere_`+y+` .Aitem-`+y+`").css("left","");
                            $("#dropHere_`+y+` .Aitem-`+y+`").css("right","");
                            var zIndex = 0;
                            function make_draggable(elements) {
                                elements.draggable({
                                    containment: "parent",
                                    start: function(e, ui) {
                                        ui.helper.css("z-index", ++zIndex);
                                    },
                                    stop: function(e, ui) {}
                                });
                            }
                        });
                        $('.btnRemove_ `+ data[y]['id']+`').on('click',function(){$('#min_ `+ y +`' ).remove();});
                    </script>`
                );
                panelX_id[y] = data[y]['id'];
                // start - panel id별 장비 현황 
                $.ajax({
                    type: "POST",
                    url: "panelSetting/panels_equip_db_call",
                    async: false,
                    dataType: "json",
                    data: {
                        panel_id: panelX_id[y]
                    },
                    success: function (equipData) {
                        for (var x = 0; x < equipData.length; x++) {
                            panels_equipX_id[x] = String(equipData[x]['pe_id']);
                            $('.bandiv_' + y + '').append('<div class="old_equip" data-id="'+equipData[x]['pe_id']+'" data-equipid="'+equipData[x]['equipment_id']+'" ondblclick="$(this).remove()">' + equipData[x]['name'] + '</div>');
                        }

                        id.push(panelX_id[y]);
                        value.push(panels_equipX_id);
                    },
                    error: function (e) {
                        console.info(e);
                        console.info("Error");
                    },
                    done: function (e) {
                        console.info("DONE");
                    }
                })
                // end - panel id별 장비 현황 
                savei = data[y].id;
                for(idx in id) {
                    json_data[id[idx]] = value[idx];
                }
                original_json_data['data'] = json_data;
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

// start - 배열 교집합
function intersect(a, b) {
    var tmp={}, res=[];
    for(var i=0;i<a.length;i++) tmp[a[i]]=1;
    for(var i=0;i<b.length;i++) if(tmp[b[i]]) res.push(b[i]);
    res = [...new Set(res)];
    return count_equip(a,b,res);
}
// end - 배열 교집합

// start - 배열 차집합
function array_diff(a, b) {
    var tmp={}, res=[];
    for(var i=0;i<a.length;i++) {
        tmp[a[i]]=1;
    }
    for(var i=0;i<b.length;i++) { if(tmp[b[i]]) delete tmp[b[i]]; }
    for(var k in tmp) res.push(k);
    return res;
}
// end - 배열 차집합

// start - 중복된 장비 개수 파악
function count_equip(a, b, res) {
    var new_count = 0, old_count = 0;
    var result_arr = [];
    for(var i=0; i<res.length; i++) {                
        new_count = a.filter(element => res[i] === element).length;
        old_count = b.filter(element => res[i] === element).length;
        result_arr.push([res[i], new_count-old_count])        
    }
    return result_arr;    
}
// end - 중복된 장비 개수 파악