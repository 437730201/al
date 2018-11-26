
var Mar_select_item_auto = function(node, is_left) {

    var sku = node.sku_text, // Level 1 text
        station = node.station_text, // Level 2 text
        item = node.text, // Level 3 text
        js_file = node.js_file,
        alias = node.alias;

    Mar_insert_table(sku, station, item, js_file, alias, is_left);

};

var Mar_select_item = function(node, is_left) {
    if(node.level == 1) {
        var product = node.text;

        if(is_left) {
            window.select_left_station = null;
        } else {
            window.select_right_station = null;
        }
        //		alert(product)
    } else if(node.level == 2) {

        if(node.datatype === 'chamber') {
            $("#auto_btn").css("display", "none");
        }

        if(is_left) {
            window.select_left_station = node.nodes;
            window.select_left_station_items = node.items;
        } else {
            window.select_right_station = node.nodes;
            window.select_right_station_items = node.items;
        }

    } else if(node.level == 3) {
        if(is_left) {
            window.select_left_station = null;
        } else {
            window.select_right_station = null;
        }

        var sku = node.sku_text, // Level 1 text
            station = node.station_text, // Level 2 text
            item = node.text, // Level 3 text
            js_file = node.js_file,
            alias = node.alias;

        Mar_insert_table(sku, station, item, js_file, alias, is_left);

        if(document.getElementsByName("ckbx").length == 0) {
            $("#del_btn").css("display", "none");
            $("#data_tab").css("margin-top", "0%");
            $("#confirm_btn").css("display", "none");

        } else {
            $("#del_btn").css("display", "block");
            $("#confirm_btn").css("display", "block");
            $("#confirm_btn").css("float", "right");
        }
    } else {
        alert('out of the level')
    }
};

function selectOne() {
    console.log(123)
    var f = true;
    var box = document.getElementsByName('ckbx');
    var sel = document.getElementById('ckbx_head');
    for(var i = 0; i < box.length; i++) {
        if(box[i].checked != f) {
            sel.checked = false;
            break;
        };
        sel.checked = f;
    }
};

var Show = function() {
    var s3 = document.getElementById("data_tab");
    for(var i = 0; i < s3.rows.length; i++) {
        for(var j = 0; j < s3.rows[i].cells.length; j++) {
            var cell_value = s3.rows[i].cells[j].innerHTML;
            var show_value = cell_value + '<br>'
            document.writeln(show_value);
        }
    }
};

var Get_tab_inf = function() {

    var url_list = [];
    var s3 = document.getElementById("data_tab");

    for(var i = 0; i < s3.rows.length; i++) {
        if(i === 0) {
            continue;

        } else {
            var sku_x = null,
                sku_y = null,
                station_x = null,
                station_y = null,
                item_x = null,
                item_y = null,
                url_x = null,
                url_y = null,
                alias = null;

            for(var j = 0; j < s3.rows[i].cells.length; j++) {
                var cell_value = s3.rows[i].cells[j].innerHTML;

                if(j === 1) {
                    sku_x = cell_value;
                } else if(j === 2) {
                    station_x = cell_value;
                } else if(j === 3) {
                    item_x = cell_value;
                } else if(j === 4) {
                    alias = cell_value;
                } else if(j === 5) {
                    url_x = cell_value;
                } else if(j === 6) {
                    url_y = cell_value;
                } else if(j === 7) {
                    item_y = cell_value;
                } else if(j === 8) {
                    sku_y = cell_value;
                } else if(j === 9) {
                    station_y = cell_value;
                } else {
                    continue;
                }
            }

            if(sku_x !== '' && sku_y !== '') {
                var sku = '<br><span style="color:' + window.color_red + ' ">' +
                    sku_x + '</span>' + '<br><span style="color:' + window.color_blue + ' ">' +
                    sku_y + '</span>';
                var station = '<br><span style="color:' + window.color_red + ' ">' +
                    station_x + '<br><span style="color:' + window.color_blue + ' ">' +
                    station_y;
                var item = '<br><span style="color:' + window.color_red + ' ">' +
                    item_x + '</span>' + '<br><span style="color:' + window.color_blue + ' ">' +
                    item_y;
                var ulr_ = [url_x, url_y];
                var name = item_x;

                if(ulr_ in url_list) {
                    continue;
                } else {
                    url_list.push([sku, station, item, ulr_, alias, name]);
                }
            } else {
                continue;
            }
        }
    }
    return url_list;
};

var Mar_manage_data_layer = function(urlnf) {

    var sku_data_dict = {}

    var sku_start = 10000,
        station_start = 1000,
        tc_start = 100;

    window.item_dict = {};
    for(var i = 0; i < urlnf.length; i++) {
        var each_map_data = urlnf[i],
            sku_map = each_map_data[0],
            station_map = each_map_data[1],
            item_map = each_map_data[2],
            js_file_map = each_map_data[3],
            alias = each_map_data[4],
            name = each_map_data[5],
            item_format = new Object({
                "id": sku_start + station_start + i,
                "text": null,
                "href": null,
                "js_file_list": null,
                'alias': null,
                "level": null,
                'name': null,
                "nodes": null
            });

        item_format["text"] = item_map;
        item_format["href"] = "#" + item_map;
        item_format["js_file_list"] = js_file_map;
        item_format["level"] = 3;
        item_format["name"] = name;
        item_format['alias'] = alias;
        window.item_dict[sku_start + station_start + i] = js_file_map;
        if(sku_data_dict[sku_map] == undefined) {
            var station_data_dict = {},
                tc_data_dict = {};

            tc_data_dict[alias] = [item_format];
            station_data_dict[station_map] = tc_data_dict;
            sku_data_dict[sku_map] = station_data_dict;
        } else {
            var station_data_dict = sku_data_dict[sku_map]
            if(station_data_dict[station_map] == undefined) {
                var tc_data_dict = {};

                if(tc_data_dict[alias] == undefined) {
                    tc_data_dict[alias] = [item_format]
                } else {
                    tc_data_dict[alias].push(item_format)
                }
                station_data_dict[station_map] = tc_data_dict
                sku_data_dict[sku_map] = station_data_dict

            } else {
                var tc_data_dict = station_data_dict[station_map];

                if(tc_data_dict[alias] == undefined) {
                    tc_data_dict[alias] = [item_format]
                } else {
                    tc_data_dict[alias].push(item_format)
                }
            }
        }
    }
    return sku_data_dict;
};

var creat_map_new = function(sku_data_dict) {

    var j = 0
    var sku_data = []
    var sku_start = 10000,
        station_start = 1000,
        tc_start = 100;

    for(var sku_map in sku_data_dict) {
        var station_data_dict = sku_data_dict[sku_map],
            station_data = [],
            i = 0;
        for(var station_map in station_data_dict) {
            var tc_list = station_data_dict[station_map],
                tc_data = [];
            for(var tc_map in tc_list) {

                var item_list = tc_list[tc_map],
                    k = 0,
                    tc_format = new Object({
                        "id": sku_start + station_start + i + k,
                        "text": tc_map,
                        "href": "#" + tc_map,
                        'alias': tc_map,
                        "level": null,
                        "nodes": item_list,
                    });
                tc_format['level'] = 4
                tc_data.push(tc_format)
                k++
            }

            var station_format = new Object({
                "id": sku_start + station_start + i,
                "text": station_map,
                "href": "#" + station_map,
                "js_file": null,
                "level": 2,
                "nodes": tc_data,
            })

            station_data.push(station_format);
            i++;
            station_start = station_start * (i + 1);
        }
        var sku_format = new Object({
            "id": sku_start + j,
            "text": sku_map,
            "href": "#" + sku_map,
            "js_file": null,
            "level": 1,
            "nodes": station_data
        });

        j++;
        sku_start = sku_start * (j + 1);
        sku_data.push(sku_format);
    }
    return sku_data;

};

function create_map_tree(urlnf) {
    var sku_data_dict = Mar_manage_data_layer(urlnf);

    var sku_data = creat_map_new(sku_data_dict);
    return sku_data;
};

var Get_Select_sn = function() {
    // 获取 select sn radio value.
    var radio = document.getElementById("optionsRadios3");

    if(radio.checked) {
        var select_sn = radio.value;

        if(select_sn === 'option1') {
            var sel = true;
        } else {
            var sel = false;
        }
    }
    return sel;

};

var Select_itemdata = function get_item(url1, url2, creat_summary, del_sn_list, limits_update, charts_id) {

    if(creat_summary === undefined) {
        creat_summary = false;
    }

    if(del_sn_list === undefined) {
        del_sn_list = [];
    }

    var is_same_sn = Get_Select_sn();
    // js_data_one 左侧数据  js_data_two 右侧数据
    $(function() {
        $.getJSON(url1, function(js_data_one) {

            $.getJSON(url2, function(js_data_two) {

                Mar_changelimit(js_data_one, js_data_two, [url1, url2], limits_update);
                
                Mar_select_Same_SN(url1, url2, js_data_one, js_data_two, del_sn_list, creat_summary, charts_id,is_same_sn);

            });
        });
    });

};

var date_conters = function(date2, date1) {
    var date3 = date2.getTime() - date1.getTime(), //时间差的毫秒数
        // days
        days = Math.floor(date3 / (24 * 3600 * 1000)),
        // hours
        leave1 = date3 % (24 * 3600 * 1000), //计算天数后剩余的毫秒数
        hours = Math.floor(leave1 / (3600 * 1000)),
        // minutes
        leave2 = leave1 % (3600 * 1000), //计算小时数后剩余的毫秒数
        minutes = Math.floor(leave2 / (60 * 1000)),
        //seconds
        leave3 = leave2 % (60 * 1000), //计算分钟数后剩余的毫秒数
        seconds = Math.round(leave3 / 1000);
    console.log('花费时间________:', '毫秒数 : ', date3);
    console.log('花费时间________:', 'day : ', days, 'hours : ', hours, 'minutes : ', minutes, 'seconds : ', seconds);
};

var Mar_click_station_id = function(station_nodes) {

    window.Mar_click_station_id_dict = {};

    for(var i = 0; i < station_nodes.length; i++) {

        var each_node = station_nodes[i];

        if(window.Mar_click_station_id_dict[each_node.name] == undefined) {
            window.Mar_click_station_id_dict[each_node.name] = each_node.id;
        }
    }
};

var Mar_click_station = function(station_nodes) {

    // creat station summary 
    var creat_summary = true;
    Mar_set_station_defaults();

    window.perforNumber = 0;
    window.click_station_node = station_nodes;

    Mar_click_station_id(station_nodes);
    for(var i = 0; i < station_nodes.length; i++) {
        var each_item = station_nodes[i];
        window.targetNumber = station_nodes.length;

        if(each_item !== undefined) {
            if(each_item.js_file_list[0].indexOf('ChamberJS') === -1) {
                var url1 = 'js/LJsData/' + each_item.js_file_list[0];
            } else {
                var url1 = each_item.js_file_list[0];
            }

            if(each_item.js_file_list[1].indexOf('ChamberJS') === -1) {
                var utl2 = 'js/RJsData/' + each_item.js_file_list[1];
            } else {
                var utl2 = each_item.js_file_list[1];
            }
            window.alias_type = each_item['alias']
            Select_itemdata(url1, utl2, creat_summary);
            window.perforNumber += 1;
        } else {
            window.targetNumber -= 1;
        }
    }

};

var Mar_click_new_tree = function(node) {

    if(node.level === 1) {
        console.log('level', 1)
        console.log('Nothing happened.')
    } else if(node.level === 2) {
        console.log('level', 2)

    } else if(node.level === 4) {
        console.log('tc layer', 4)
        var station_nodes = node.nodes;
        Mar_click_station(station_nodes);
    } else if(node.level === 3) {
        console.log('item layer', 3)
        Mar_set_station_defaults();
        return_back(node);
        if(node.js_file_list[0].indexOf('ChamberJS') === -1) {
            var url1 = 'js/LJsData/' + node.js_file_list[0];
        } else {
            var url1 = node.js_file_list[0];
        }

        if(node.js_file_list[1].indexOf('ChamberJS') === -1) {
            var url2 = 'js/RJsData/' + node.js_file_list[1];
        } else {
            var url2 = node.js_file_list[1];
        }

        Select_itemdata(url1, url2);
    } else {
        console.log('Nothing happened.')
    }

};

function return_back(node) {
    $("#chart_con").append('<div id="return_back" style="text-align: center;"><button style="margin-top: 0.4%;border: none;background: none;opacity: 0.7;"><img src="img/return_back.png"></button></div>')

    $("#return_back").click(function() {
        if(node.level === 3) {
            var parentNode = $("#tree_con").treeview("getNode", node.parentId);
            $("#tree_con").treeview('selectNode', [parentNode, {
                silent: false
            }])
        } else {
            Mar_click_station(node);
        }
    })
};

var Mar_make_new_tree = function(urlnf) {

    var tree_data = create_map_tree(urlnf)

    left_check_nodes = [];
    window.his_btn_url = {};
    window.his_btn_limit = {};

    $('#tree_con').empty();
    $('#tree_con').treeview({
        data: tree_data,

        color: window.new_tree_Color,

        onhoverColor: window.new_tree_onhoverColor,

        selectedBackColor: window.new_tree_selectedBackColor,

        showCheckbox: true,

        onNodeSelected: function(event, data) {
            Mar_click_new_tree(data);
        },
        onNodeChecked: function(event, node) {

            left_check_nodes.push(node);
            show_thing("btn_con2");
        },
        onNodeUnchecked: function(event, node) {
            var del_node_id = node.id
            var pos = -1
            for(var i = 0; i < left_check_nodes.length; i++) {
                var each_id = left_check_nodes[i].id
                if(del_node_id == each_id) {
                    pos = i
                    break
                }
            }
            if(pos != -1) {
                left_check_nodes.splice(pos, 1)
            }

            if(left_check_nodes.length == 0) {
                hide_thing("btn_con2");
            }
        }

    });
};

var Mar_click_confirm = function() {
    var urlist = Get_tab_inf();
    Mar_make_new_tree(urlist);
};

function hide_thing(id) {
    var thing = document.getElementById(id)
    if(thing != null) {
        if(thing.style.display != "none") {
            thing.style.display = "none"
        }
    }
};

function show_thing(id) {

    var thing = document.getElementById(id)
    if(thing != null) {
        if(thing.style.display != "block") {
            thing.style.display = "block"
        }
    }
};
// 点击左边树的确认按钮
function click_left_confirm() {
    $("#left_confirm").on("click", function() {
        now_node = undefined;
        left_check_nodes_list = [];
        for(var i = 0; i < left_check_nodes.length; i++) {
            var each_node = {
                "nodeId": left_check_nodes[i].nodeId,
                "text": left_check_nodes[i].text
            }

            left_check_nodes_list.push(each_node);

        }
        if(left_check_nodes_list.length == 0) {
            alert("Please select items.")
        }
        var getSelected = $("#tree_con").treeview("getSelected");
        if(getSelected.length != 0) {
            $('#tree_con').treeview('toggleNodeSelected', [getSelected[0].nodeId, {
                silent: true
            }]);
        }
    })
};
// 点击左边树的清除按钮
function click_left_clear() {
    $("#left_clear").on("click", function() {

        for(var i = 0; i < left_check_nodes.length; i++) {
            //切换节点的Check状态
            $('#tree_con').treeview('toggleNodeChecked', [left_check_nodes[i].nodeId, {
                silent: true
            }]);
        }
        left_check_nodes = [];
        if(left_check_nodes.length == 0) {
            hide_thing("btn_con2");
        }
    });
};

$(function() {
    left_check_nodes = [];
    click_left_confirm();
    click_left_clear();
})

var Auto_return_item = function(target, right, right_list) {

    var target_item = null,
        j = right_list.indexOf(target);

    if(j !== -1) {
        return right[j];
    }
    return target_item;
};

var Auto_improve = function(tree_data, com_items) {

    var item_node_dict = {},
        left_keys = Object.keys(tree_data);
    for(var i = 0; i < tree_data.length; i++) {
        var target_text = tree_data[i].text;
        if(com_items.indexOf(target_text) !== -1) {
            item_node_dict[target_text] = tree_data[i];
        }

    }
    return item_node_dict;
};

var Auto_common_items = function() {

    var left_list = window.select_left_station_items,
        right_list = window.select_right_station_items,
        com_items = [];

    if(left_list.length < right_list.length) {
        var select_list = left_list;
        var another_list = right_list;
    } else {
        var select_list = right_list;
        var another_list = left_list;
    }

    for(var j = 0; j < select_list.length; j++) {
        var each_item = select_list[j];
        if(another_list.indexOf(each_item) !== -1) {
            com_items.push(each_item);
        }

    }
    return com_items;
};

var Change_into_table_format = function(node,nodeB){
    
    var sku = node.sku_text, // Level 1 text
    station = node.station_text, // Level 2 text
    item = node.text, // Level 3 text
    js_file = node.js_file,
    alias = node.alias;
    
    var skuB = nodeB.sku_text, // Level 1 text
    stationB = nodeB.station_text, // Level 2 text
    itemB = nodeB.text, // Level 3 text
    js_fileB = nodeB.js_file,
    aliasB = nodeB.alias;
    
    var insertTD = "<tr><td><input type='checkbox' name='ckbx' class='ckbx-td'></td><td>" +
        sku + "</td><td>" + 
        station + "</td><td>" + 
        item + "</td>" +
        "<td style='display:none'>" + alias + "</td>" +
        "<td style='display:none'>" + js_file + "</td>" +
        "<td style='display:none'>" +js_fileB + "</td>" + 
        "<td>" + itemB + "</td><td>" + skuB + "</td><td>" + stationB + "</td></tr>";
    
    return insertTD;  
}

var Auto_select_item_match = function(left, right) {
 
    var match_amount = 0,
        left_amount = Object.keys(left).length,
        right_amount = Object.keys(right).length;
    var date1 = new Date(),
        com_items = Auto_common_items(),
        item_node_dictL = Auto_improve(left, com_items),
        item_node_dictR = Auto_improve(right, com_items);

    var date2 = new Date();
    date_conters(date2, date1);
    var data = new Array();
    
    for(var j = 0; j < com_items.length; j++) {
        var item = com_items[j];
        if(item === undefined){
            continue
        }
        try {
            var targetA = item_node_dictL[item],
                targetB = item_node_dictR[item];
                
            var insert_inf = Change_into_table_format(targetA,targetB);
            data.push(insert_inf);
            match_amount += 1;
        } catch(TypeError) {

        }
    }
    $("#data_tab_tb").append(data);
    var date3 = new Date();
    date_conters(date3, date2);

    var msg = 'Successfully!!! \n Left  side title amount : ' + left_amount +
        '\n Right side title amount : ' + right_amount +
        '\n Valid paired title amount ： ' + match_amount;

    alert(msg);

    if(document.getElementsByName("ckbx").length == 0) {
        $("#del_btn").css("display", "none");
        $("#data_tab").css("margin-top", "0%");
        $("#confirm_btn").css("display", "none");

    } else {
        $("#del_btn").css("display", "block");
        $("#confirm_btn").css("display", "block");
        $("#confirm_btn").css("float", "right");
    }

    window.select_left_station = null;
    window.select_right_station = null;
    window.select_left_station_items = null;
    window.select_right_station_items = null;
};

var cancel_tree_select = function() {

    var getSelectedL = $("#left_con").treeview("getSelected");
    if(getSelectedL) {
        $('#left_con').treeview('toggleNodeSelected', [getSelectedL[0].nodeId, {
            silent: true
        }]);
    }

    var getSelectedR = $("#right_con").treeview("getSelected");
    if(getSelectedR) {
        $('#right_con').treeview('toggleNodeSelected', [getSelectedR[0].nodeId, {
            silent: true
        }]);
    }
};

var cancel_tree_select_confirm_btn = function() {

    var getSelectedL = $("#left_con").treeview("getSelected");
    if(getSelectedL) {
        $('#left_con').treeview('toggleNodeSelected', [getSelectedL[0], {
            silent: true
        }]);
    }

    var getSelectedR = $("#right_con").treeview("getSelected");
    if(getSelectedR) {
        $('#right_con').treeview('toggleNodeSelected', [getSelectedR[0], {
            silent: true
        }]);
    }
};

var Auto_station_items = function() {

    var left = window.select_left_station,
        right = window.select_right_station;

    if(left === null && right === null) {
        alert('Please select station both sides again,Wait for a while,Paired items would be match,Do not click so quickly at short time.')

    } else if(isNaN(left) === false && isNaN(right) === false) {
        alert('Please select station both sides.')
    } else if(isNaN(left) === false) {
        alert('Please select left side station,And then click auto button.')
    } else if(isNaN(right) === false) {
        alert('Please select right side station,And then click auto button.')
    } else {
        Auto_select_item_match(left, right);
        cancel_tree_select();
    }
};

var generateTree = function(arr) {

    if(arr.length > 0) {
        var objMap = {};
        var root = {};
        root["expanded"] = true;
        root["items"] = [];
        arr.forEach(function(item) {
            var node = {
                text: item.name
            };
            objMap[item.id] = node;
            if(item.pid === 0) {
                root["items"].push(node);
            } else {
                var parent = objMap[item.pid];
                parent["expanded"] = true;
                if(parent["items"]) {
                    parent["items"].push(node);
                } else {
                    parent["items"] = [];
                    parent["items"].push(node);
                }
            }
        });
    }
    return [root];
};
