// const { json } = require("express");
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

let savei = 0;
let divX = new Array();
var i = 0;

// 장비 리스트 
$.ajax({
    type: "POST",
    url: "panelSetting/get_equipments",
    async: false,
    dataType: "json",
    success: function (data) {        
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                $("#equip_box").append("<div class='col-lg-3 col-sm-6' style='padding: 10px 10px 0px 0px;'><div class='list-group-item equip_" + i + "' draggable='true' data-id='" + data[i].id + "' ><img class='equip_img' src='" + data[i].icon_path + "'><p class='m-0'>" + data[i].name + "</p></div></div>");
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
// 장비 리스트 

$(document).ready(function () {    
    $('#btnAdd').click(function () {
        var building_id = $('#selbul').val(),
            ban = '반 이름을 입력해주세요.';
        var panel_id;
        $.ajax({
            type: "POST",
            url: "panelSetting/insert_panel",
            async: false,
            dataType: "json",
            data: {
                banname: ban,
                building_id: building_id
            },
            success: function (data) {
                // location.href = "bansetting";
                $.ajax({
                    type: "POST",
                    url: "panelSetting/get_panel_id",
                    async: false,
                    dataType: "json",
                    data: {
                        banname: ban,
                        building_id: building_id
                    },
                    success: function (data) {
                        // location.href = "bansetting";
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
        $('.input_equip').append(
            `<div style="width:23%; height:430px; margin:0.6em; float:left;" id="min_` + panel_id + `">
                <div class="row col-12 p-0 pb-10" style="margin-bottom: 0.5rem;">
                    <div class="col-1"><input type="checkbox" data-id="` + panel_id + `"></div>
                    <div class="col-11 p-0"><input type="text" class="txt" id="txt_` + panel_id + `" placeholder="반 이름을 입력해주세요"/></div>
                </div>
                <div class="bandiv_` + panel_id + ` box1 column dropHere new_drop_div" id="dropHere_` + panel_id + `" style="width: 250px; height:400px" data-id="` + panel_id + `"></div>                
            </div>`,
            // '<script>const columns = document.querySelectorAll(".column");columns.forEach((column) => {new Sortable(column, {group: "shared",animation: 150,ghostClass: "blue-background-class"});});$(\'.btnRemove_'+divX[i]+'\').on(\'click\',function(){$(\'#min_'+divX[i]+'\').remove();});</script>'
            `<script>
                $(function() {
                    var counts = [0];
                    var resizeOpts = {handles: "all",autoHide: true};
                    $(".list-group-item").draggable({
                        helper: "clone",
                        appendTo: "#dropHere_`+panel_id+`",
                        start: function() {counts[0]++;}
                    });
                    $("#dropHere_` + panel_id + `").sortable({
                        receive: function(e, ui) {
                            if (ui.item.hasClass("list-group-item")) {
                                $("#dropHere_`+panel_id+` .equip_img").attr("title", ui.item.children()[1]['innerText']);
                                $("#dropHere_`+panel_id+` .list-group-item>p").remove();
                                $("#dropHere_`+panel_id+` .list-group-item").addClass("Aitem-`+panel_id+` equip_item add_list");
                                $("#dropHere_`+panel_id+` .equip_img").addClass("imgSize-`+panel_id+`");
                                $("#dropHere_`+panel_id+` .Aitem-`+panel_id+`").removeClass("list-group-item ui-draggable ui-draggable-dragging");
                                $(".Aitem-`+panel_id+`").dblclick(function() {$(this).remove();});
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

    
});

//  building select box
$.ajax({
    type: "POST",
    url: "/get_buildingList",
    async: false,
    dataType: "json",
    success: function (data) {
        console.log(data);
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                $("#selbul").append("<option id=" + "selectTitle(" + i + ")" + " value=" + data[i].id + ">" + data[i].name + "</option>");
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
//  building select box

var original_arr;
var original_json_data = {};
$("#selbul").on('change',function () {
    var json_data = {};
    var id = [], value = [];
    // original_arr = new Array();
    original_json_data = {};
    equip_display()
});


var str1 = 'undefined';

$('#saveTest').on('click', function() {
    // var panel_arr = new Array(),
    //     new_panel_arr = new Array();
    var new_panel_equip_arr = new Array();
    var new_json_data = {}, json_data = {};
    var id = [], value = [];

    var panel = $('.drop_div')
        new_panel = $('.new_drop_div');

        
    for(var i=0; i<panel.length; i++) { // 기존 패널
        
        $.ajax({
            type: "POST",
            url: "panelSetting/update_panel_name",
            async: false,
            dataType: "json",
            data:{
                id: $(panel[i]).attr('data-id'),
                panel_name: $('#txt_'+$(panel[i]).attr('data-id')).val()
            },
            success: function (data) {
                console.log("old panel name update")
            },
            error: function (e) {
                console.info(e);
                console.info("Error");
            },
            done: function (e) {
                console.info("DONE");
            }
        })

        var equip_arr = new Array()
        for(var j=0; j<$(panel[i]).children('.old_equip').length; j++) {    
            equip_arr.push($(panel[i]).children('.old_equip')[j]['attributes'][2]['nodeValue'])
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
            // insert_data = array_diff(new_json_data['data'][id[i]], original_json_data['data'][id[i]]); // 추가된 항목
            delete_data = array_diff(original_json_data['data'][id[i]], new_json_data['data'][id[i]]); // 삭제된 항목
            // duplicate_data = intersect(new_json_data['data'][id[i]], original_json_data['data'][id[i]]); // 같은 장비 추가&삭제 판별

            // console.log("---------------------",Object.keys(new_json_data['data'])[i],"---------------")
            // console.log("insert : ", insert_data)
            console.log("delete : ", delete_data)
            // console.log("duplicate : ", duplicate_data)
            if(delete_data.length > 0) {
                for(var j=0; j<delete_data.length; j++) {
                    console.log(delete_data[j])
                    var cam_equip_id;
                    $.ajax({
                        type: "POST",
                        url: "panelSetting/delete_equipment",
                        async: false,
                        dataType: "json",
                        data:{
                            equipment_id: delete_data[j]
                        },
                        success: function (data) {
                            // location.href = "/panelSetting";
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

    for(var i=0; i<new_panel.length; i++) { //추가된 패널      
        console.log("추가된 패널 이름 : ",$('#txt_'+new_panel[i]['dataset']['id']*1).val()) ;
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
                console.log("new panel name update")
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
            new_panel_equip_arr.push(equipment[j]['dataset']['id']);
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

var del_panel_arr;
$('#delTest').on('click', function() {
    del_panel_arr = new Array();
    modal('my_modal');
})

$('#btn_del_confirm').on('click', function() {
    // var check_value = [];
    // var check_value
    $('input:checkbox').each(function(index) {
        if($(this).is(':checked')==true) {
            del_panel_arr.push($(this).attr('data-id'));
            $(this).parent().parent().remove();
        }
    })
    // del_panel_arr.push(check_value);
    for(var i=0; i<del_panel_arr.length; i++) {
        $.ajax({
            type: "POST",
            url: "panelSetting/delete_panel",
            async: false,
            dataType: "json",
            data:{
                panel_id: del_panel_arr[i],                
            },
            success: function (data) {
                bg.remove();
                modal_window.hide();
                // equip_display()
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
})

function equip_display () {
    $('#del_info').removeClass('display-none');
    var id = [], value = [], json_data = {};
    addCount = 0;
    var panelX_id = new Array();
    var selectid = ($("#selbul").val());
    $('.input_equip').empty();
    $('.input_equip').append('<p class="text-left">* 장비를 삭제하려면 이미지 또는 텍스트를 더블클릭하세요.</p>')
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
                $('.input_equip').append(
                    `<div style="width:23%; height:430px; margin:0.6em; float:left;" id="min_` + y  + `">
                        <div class="row col-12 p-0 pb-10" style="margin-bottom: 0.5rem;">
                            <div class="col-1"><input type="checkbox" data-id="` + data[y]['id'] + `"></div>
                            <div class="col-11 p-0"><input type="text" class="txt" id="txt_`+ data[y]['id'] +`" value="` + data[y]['name'] + `"/></div>
                        </div>
                        <div class="bandiv_` + y + ` box1 column drop_div" id="dropHere_` + y + `" style="height:400px" data-id="` + data[y]['id'] + `"></div>                        
                    </div>`,
                    // '<script>const columns = document.querySelectorAll(".column");columns.forEach((column) => {new Sortable(column, {group: "shared",animation: 150,ghostClass: "blue-background-class"});});$(\'.btnRemove_'+data[y]['id']+'\').on(\'click\',function(){$(\'#min_'+y+'\').remove();});</script>',
                    `<script>
                        $(function() {
                            var counts = [0];
                            var resizeOpts = {handles: "all",autoHide: true};
                            $(".list-group-item").draggable({
                                helper: "clone",
                                appendTo: "#dropHere_`+y+`",
                                connectToSortable: ".column"
                            });
                                
                            $("#dropHere_`+y+`").sortable({
                                receive: function(e, ui) {
                                    if (ui.item.hasClass("list-group-item")) {
                                        $("#dropHere_`+y+` .equip_img").attr("title", ui.item.children()[1]['innerText']);
                                        $("#dropHere_`+y+` .list-group-item>p").remove();
                                        $("#dropHere_`+y+` .list-group-item").addClass("Aitem-`+y+` equip_item add_list");
                                        $("#dropHere_`+y+` .equip_img").addClass("imgSize-`+y+`");
                                        $("#dropHere_`+y+` .Aitem-`+y+`").removeClass("list-group-item ui-draggable ui-draggable-dragging");
                                        $(".Aitem-`+y+`").dblclick(function() {$(this).remove();});
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
                            $('.bandiv_' + y + '').append('<div class="old_equip" data-id="'+equipData[x]['id']+'" data-equipId="'+equipData[x]['pe_id']+'" ondblclick="$(this).remove()">' + equipData[x]['name'] + '</div>');                            
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
    return res;array_diff
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


