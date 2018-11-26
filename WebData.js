//  作者：hsiao : Marst
//	时间：2018-01-03
//	描述：correction@1.0
"use strict"
//设置界面
$("#setting_img").click(function() {
    var chart = $("#chart_con");
    chart.empty();

    $("#myModal").modal('show');
    var show_tbnum = $("#data_tab_tb tr").length;
    var ckbx_num = document.getElementsByName("ckbx").length;

    //隐藏confirm按钮
    if(show_tbnum == 0) {
        $("#confirm_btn").css("display", "none");

    } else {
        $("#confirm_btn").css("display", "block");
        $("#confirm_btn").css("float", "right");
    }
    //隐藏删除按钮
    if(ckbx_num == 0) {
        $("#del_btn").css("display", "none");
        $("#data_tab").css("margin-top", "0.4%");
    } else {
        $("#del_btn").css("display", "block");
    }
    $("#ckbx_head").attr('checked', false)
})
var hide_paste_btn = setInterval(function() {
    var left_text = $("#left_textarea").val();
    var right_text = $("#right_textarea").val();

    if(left_text != '' || right_text != '') {
        console.log("不为空")
        $("#paste_btn").css("display", "block");
    } else {
        $("#paste_btn").css("display", "none");
    }
}, 100);

//auto button
$("#auto_btn").click(function() {

    Auto_station_items();
    console.log('auto finish')

})

function insertTable(sku, station, items_list, jf_list, left_flag) {
    var data_tab_tb = document.getElementById('data_tab_tb');

    if(left_flag) {
        if(data_tab_tb.rows.length == 0) {
            for(var i = 0; i < items_list.length; i++) {
                $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td>" + sku + "</td><td>" + station + "</td><td>" + items_list[i] + "</td>" + "<td style='display:none'>" + jf_list[i] + "</td><td style='display:none'></td><td></td><td></td><td></td></tr>");
            }
        } else {
            for(var k = 0; k < data_tab_tb.rows.length; k++) {
                if(data_tab_tb.rows[k].cells[1].innerText == '') {
                    var surplus_1 = data_tab_tb.rows.length - k;
                    if(surplus_1 < items_list.length) {
                        for(var x = 0; x < (items_list.length - surplus_1); x++) {
                            $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'></td><td></td><td></td><td></td></tr>")
                        }
                    }
                    for(var l = 0; l < items_list.length; l++) {
                        data_tab_tb.rows[k].cells[1].innerText = sku;
                        data_tab_tb.rows[k].cells[2].innerText = station;
                        data_tab_tb.rows[k].cells[3].innerText = items_list[l]
                        data_tab_tb.rows[k].cells[4].innerText = jf_list[l]
                        k += 1;
                    }
                    break;
                } else {
                    if(data_tab_tb.rows[k].cells[6].innerText != '' && k == data_tab_tb.rows.length - 1 || data_tab_tb.rows[k].cells[6].innerText == '') {
                        for(var m = 0; m < items_list.length; m++) {
                            $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td>" +
                                sku + "</td><td>" + station + "</td><td>" + items_list[m] +
                                "</td>" + "<td style='display:none'>" + jf_list[m] + "</td><td style='display:none'></td><td></td><td></td><td></td></tr>");
                        }
                        break;
                    }
                }
            }
        }
    } else {
        if(data_tab_tb.rows.length == 0) {
            for(var n = 0; n < items_list.length; n++) {
                $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'>" + jf_list[n] + "</td>" + "<td>" + items_list[n] + "</td><td>" + sku + "</td><td>" + station + "</td></tr>");
            }
        } else {
            for(var p = 0; p < data_tab_tb.rows.length; p++) {
                //判断有几行空行
                if(data_tab_tb.rows[p].cells[6].innerText == '') {
                    var surplus = data_tab_tb.rows.length - p //剩余的空行

                    if(surplus < items_list.length) {
                        for(var t = 0; t < (items_list.length - surplus); t++) {
                            $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'></td><td></td><td></td><td></td></tr>")
                        }
                    }

                    for(var q = 0; q < items_list.length; q++) {
                        data_tab_tb.rows[p].cells[5].innerText = jf_list[q]
                        data_tab_tb.rows[p].cells[6].innerText = items_list[q];
                        data_tab_tb.rows[p].cells[7].innerText = sku;
                        data_tab_tb.rows[p].cells[8].innerText = station;
                        p += 1;
                    }
                    break;
                } else {
                    if(data_tab_tb.rows[p].cells[1].innerText != '' && p == data_tab_tb.rows.length - 1 || data_tab_tb.rows[p].cells[1].innerText == '') {
                        for(var r = 0; r < items_list.length; r++) {
                            $("#data_tab_tb").append("<tr><td><input type='checkbox' name='ckbx'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'>" + jf_list[r] + "</td>" + "<td>" + items_list[r] + "</td><td>" + sku + "</td><td>" + station + "</td></tr>");
                        }
                        break;
                    }
                }
            }
        }
    }
};

var Mar_insert_table = function(sku, station, item, js_file, alias, is_left) {

    var data_tab_tb = document.getElementById('data_tab_tb');
    var start_col = 6;

    if(is_left) {
        if(data_tab_tb.rows.length == 0) {

            var insertTD = "<tr><td><input type='checkbox' name='ckbx' class='ckbx-td'></td><td>" +
                sku + "</td><td>" + station + "</td><td>" + item + "</td>" +
                "<td style='display:none'>" + alias + "</td>" +
                "<td style='display:none'>" + js_file + "</td>" +
                "<td style='display:none'>" +
                "</td><td></td><td></td><td></td></tr>";

            $("#data_tab_tb").append(insertTD);
            $(".ckbx-td").click(function() {
                console.log(123)
                selectOne()
            });
        } else {
            for(var i = 0; i < data_tab_tb.rows.length; i++) {
                if(data_tab_tb.rows[i].cells[1].innerText == '') {

                    data_tab_tb.rows[i].cells[1].innerText = sku;
                    data_tab_tb.rows[i].cells[2].innerText = station;
                    data_tab_tb.rows[i].cells[3].innerText = item;
                    data_tab_tb.rows[i].cells[4].innerText = alias;
                    data_tab_tb.rows[i].cells[5].innerText = js_file;

                    break;
                } else {
                    if(data_tab_tb.rows[i].cells[start_col + 1].innerText != '' && i == data_tab_tb.rows.length - 1 || data_tab_tb.rows[i].cells[start_col + 1].innerText == '') {

                        var insertTD = "<tr><td><input type='checkbox' name='ckbx' class='ckbx-td'></td><td>" +
                            sku + "</td><td>" + station + "</td><td>" + item + "</td>" +
                            "<td style='display:none'>" + alias + "</td>" +
                            "<td style='display:none'>" + js_file + "</td>" +
                            "<td style='display:none'>" +
                            "</td><td></td><td></td><td></td></tr>";

                        $("#data_tab_tb").append(insertTD);
                        $(".ckbx-td").click(function() {

                            selectOne()
                        });
                        break;
                    }
                }
            }
        }

    } else {
        if(data_tab_tb.rows.length == 0) {

            var insertTD = "<tr><td><input type='checkbox' name='ckbx' class='ckbx-td'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'></td><td style='display:none'>" +
                js_file + "</td>" + "<td>" + item + "</td><td>" + sku + "</td><td>" + station + "</td></tr>";
            $("#data_tab_tb").append(insertTD);
            $(".ckbx-td").click(function() {

                selectOne()
            });
        } else {

            for(var i = 0; i < data_tab_tb.rows.length; i++) {
                if(data_tab_tb.rows[i].cells[start_col + 1].innerText == '') {

                    data_tab_tb.rows[i].cells[start_col].innerText = js_file;
                    data_tab_tb.rows[i].cells[start_col + 1].innerText = item;
                    data_tab_tb.rows[i].cells[start_col + 2].innerText = sku;
                    data_tab_tb.rows[i].cells[start_col + 3].innerText = station;
                    break;
                } else {

                    var insertTD = "<tr><td><input type='checkbox' name='ckbx' class='ckbx-td'></td><td></td><td></td><td></td><td style='display:none'></td><td style='display:none'></td><td style='display:none'>" +
                        js_file + "</td>" + "<td>" + item + "</td><td>" + sku + "</td><td>" + station + "</td></tr>";

                    if(data_tab_tb.rows[i].cells[1].innerText != '' && i == data_tab_tb.rows.length - 1 || data_tab_tb.rows[i].cells[1].innerText == '') {

                        $("#data_tab_tb").append(insertTD);
                        $(".ckbx-td").click(function() {

                            selectOne()
                        });
                        break;
                    }
                }
            }
        }
    }

};

var Mar_insert_paste_table = function(Inf, is_left) {

    var item_list = Inf.item_list;
    var sku = Inf.sku;
    var station = Inf.station;
    var jf_list = Inf.jf_list;
    var alias_list = Inf.alias_list;

    for(var i = 0; i < item_list.length; i++) {

        var each_item = item_list[i];
        var each_jf = jf_list[i];
        var each_alias = alias_list[i];
        Mar_insert_table(sku, station, each_item, each_jf, each_alias, is_left);
    }

}

//粘贴模块的确认按钮
$("#paste_btn").click(function() {

    var Mar_check_pasteInf = function(tree_data, pasteInf) {

        var arr1 = pasteInf.split("\n"),
            sku1 = arr1[0], //去除空格
            station1 = arr1[1],
            left_items_list = arr1.splice(2, arr1.length),
            item_list = [],
            jf_list = [],
            alias_list = [];

        var Inf = {};
        Inf.item_list = item_list;
        Inf.jf_list = jf_list;
        Inf.alias_list = alias_list;
        Inf.sku = sku1;
        Inf.station = station1;

        for(var i = 0; i < tree_data.length; i++) {
            if(sku1 == tree_data[i].text) {
                for(var j = 0; j < tree_data[i].nodes.length; j++) {
                    if(station1 == tree_data[i].nodes[j].text) {
                        for(var k = 0; k < tree_data[i].nodes[j].nodes.length; k++) {
                            for(var l = 0; l < left_items_list.length; l++) {
                                var target_item = left_items_list[l];
                                if(target_item) {
                                    if(tree_data[i].nodes[j].nodes[k].long_item === target_item) {

                                        item_list.push(tree_data[i].nodes[j].nodes[k].text)
                                        jf_list.push(tree_data[i].nodes[j].nodes[k].js_file)
                                        alias_list.push(tree_data[i].nodes[j].nodes[k].alias)
                                    }
                                    break;
                                }

                            }
                        }
                    }
                    break;
                }
            }
            break;
        }
        return Inf;
    };

    var left_sku_station_item = '';
    left_sku_station_item = $("#left_textarea").val();
    var right_sku_station_item = '';
    right_sku_station_item = $("#right_textarea").val();
    // 左边的textarea数据
    // SF ROW,ShadowFax-ListMode-OTA-POR-LAT-Octopus
    var lefturl = 'js/left tree/' + 'tree.js';
    var righturl = 'js/right tree/' + 'tree.js'
    $.getJSON(lefturl, function(left_tree_data) {
        // console.log('left tree data:',left_tree_data)
        try {
            var LeftInf = Mar_check_pasteInf(left_tree_data, left_sku_station_item);
            Mar_insert_paste_table(LeftInf, true);
            alert("Left side items paired items amount：" + LeftInf.item_list.length);
            //          insertTable(LeftInf.sku, LeftInf.station, LeftInf.item_list, LeftInf.jf_list, LeftInf.alias_list, true);
            $("#left_textarea").val('');
            btnControl();
        } catch(err) {
            console.log(err)
        }
    });

    // 右边的textarea数据
    $.getJSON(righturl, function(right_tree_data) {
        try {
            var RightInf = Mar_check_pasteInf(right_tree_data, right_sku_station_item);
            Mar_insert_paste_table(RightInf, false);
            alert("Right side paired items amount：" + RightInf.item_list.length);
            //          insertTable(sku2, station2, right_list, right_jf_list, false)
            $("#right_textarea").val('');
            btnControl();
        } catch(error) {
            console.log(error)
        }
    })

});
//筛选完数据后的确认
var btnControl = function() {

    if(document.getElementsByName("ckbx").length == 0) {
        $("#del_btn").css("display", "none");
        $("#data_tab").css("margin-top", "0%");
        $("#confirm_btn").css("display", "none");

    } else {
        $("#del_btn").css("display", "block");
        $("#confirm_btn").css("display", "block");
        $("#confirm_btn").css("float", "right");
    }
};
//  new tree   comfirm
$("#left_confirm").click(function() {

    for(var i = 0; i < left_check_nodes.length; i++) {
        var ues_nodes = left_check_nodes[i];
        Mar_click_new_tree(ues_nodes);
    }
});

$(function() {
    //删除事件
    $("#del_btn").click(function() {
        $("input[name='ckbx']:checked").each(function() {
            var n = $(this).parents("tr").index() + 1;
            $("table#data_tab").find("tr:eq(" + n + ")").remove();

        });

        //隐藏删除按钮;隐藏confirm按钮
        if(document.getElementsByName("ckbx").length == 0) {
            $("#del_btn").css("display", "none");
            $("#data_tab").css("margin-top", "0.4%");
            $("#confirm_btn").css("display", "none");

        } else {

            $("#del_btn").css("display", "block");
            $("#confirm_btn").css("display", "block");
            $("#confirm_btn").css("float", "right");
        }

    })
    //全选和反选事件
    $("#ckbx_head").click(function() {
        swapCheck();
    });
    var isCheckAll = false;

    function swapCheck() {
        if(isCheckAll) {
            $("input[type='checkbox']").each(function() {
                this.checked = false;
            });
            isCheckAll = false;
        } else {
            $("input[type='checkbox']").each(function() {
                this.checked = true;
            });
            isCheckAll = true;
        }
    };

    if($(":checkbox").attr('checked', true)) {
        $("#confirm_btn").click(function() {
            $("input[type='checkbox']").each(function() {
                this.checked = false;
            });
            cancel_tree_select_confirm_btn();
        })

        $('#btn_close').click(function() {
            // cancel_tree_select();
            $("input[type='checkbox']").each(function() {
                this.checked = false;
            });
            cancel_tree_select_confirm_btn();
        })
    }

});
$("#confirm_btn").click(function() {
    var new_tree_div = $('#tree_con');
    new_tree_div.empty();
    Mar_click_confirm();

    $("#myModal").modal('hide');
    $("header").css("background", "linear-gradient(to right,#1b5d7f,#41889a)");
    $(".container").css("display", "block");
    hide_thing("btn_con2");
});

//left tree
$(function() {
    var leftTree = window.left_tree_url;
    var is_left = true;
    $.getJSON(leftTree, function(setting_leftTree) {
        $('#left_con').treeview({
            data: setting_leftTree,
            color: window.tree_color,
            onhoverColor: window.tree_onhoverColor,
            selectedBackColor: window.tree_selectedBackColor,
            onNodeSelected: function(event, node) {
                Mar_select_item(node, is_left);
            },
        });
    });
    console.log('get left tree')
});

//right tree
$(function() {
    var rightTree = window.right_tree_url;
    var is_left = false;
    $.getJSON(rightTree, function(setting_rightTree) {
        $('#right_con').treeview({
            data: setting_rightTree,
            color: window.tree_color,
            onhoverColor: window.tree_onhoverColor,
            selectedBackColor: window.tree_selectedBackColor,
            onNodeSelected: function(event, node) {
                Mar_select_item(node, is_left);
            }
        });
    });
    console.log('get right tree')
});
//tree_con  
Array.prototype.max = function() {
    var max = this[0];
    this.forEach(function(ele, index, arr) {

        if(isNaN(ele)) {

        } else {
            if(ele > max) {
                max = ele;
            } else {}
        }
    })
    return max;
};

Array.prototype.min = function() {
    var min = this[0];
    this.forEach(function(ele, index, arr) {

        if(isNaN(ele)) {
            //					console.log('is NA',ele)
        } else {
            if(ele < min) {
                min = ele;
            } else {}
        }
    })
    return min;
};

Array.prototype.sum = function() {
    var sss = 0;
    var na_num = 0;
    this.forEach(function(ele, index, arr) {

        if(isNaN(ele)) {
            na_num += 1;
        } else {
            sss += ele;
        }
    })
    return sss;
};

//判断checkbox的状态，然后动态生成div
function Add_div_pictures(chartsDivnumber) {

    var chart_id = {};
    chart_id.scatter_id = null;
    chart_id.his_id = null;
    chart_id.tab_id = null;

    chartsDivnumber = (typeof chartsDivnumber !== 'undefined') ? chartsDivnumber : 2;

    if(chartsDivnumber === 2) {
        var charts_id = Select_all(chart_id);
    } else if(chartsDivnumber === 1) {
        var charts_id = OnlyBigOne(chart_id);
    }
    return charts_id;
};

var creat_div_small = function(id_text) {

    var chart1 = document.createElement("div");
    chart1.id = id_text;
    chart1.className = "col-lg-6 col-md-6";
    chart1.style.height = "33rem";
    chart1.style.padding = "0";
    chart1.style.paddingTop = "0.5%";
    chart1.style.marginTop = "0.5%";
    chart1.style.border = "1px solid";
    chart1.style.borderColor = window.Correl_Regress_tab_borderColor;
    chart1.style.borderRadius = "3px";
    return chart1;
};

var creat_div_big = function(id_text) {

    var chart1 = document.createElement("div");
    chart1.id = id_text;
    chart1.className = "col-lg-12 col-md-12";
    chart1.style.height = "33rem";
    chart1.style.padding = "0px";
    chart1.style.border = "1px solid";
    chart1.style.borderColor = window.Correl_Regress_tab_borderColor;
    chart1.style.borderRadius = "3px";

    return chart1;
};

var creat_div_tab = function(id_text) {

    var tab = document.createElement("div");
    tab.id = id_text;
    tab.className = "col-lg-12 col-md-12";
    tab.style.marginTop = '1%';
    tab.style.height = "auto";
    tab.style.padding = "5px";
    tab.style.border = "1px solid";
    tab.style.borderColor = window.Correl_Regress_tab_borderColor;
    tab.style.borderRadius = "3px";
    tab.style.color = window.div_tab_color;

    return tab;
};

//  scatter +his + tab
function Select_all(chart_id) {

    var chart = $("#chart_con");

    var scatter_id_text = 'scatter_' + window.scatter_id;
    var his_id_text = 'his_' + window.his_id;
    var tab_id_text = 'tab_' + window.tab_id;
    var btn_id_text = 'btn_' + window.his_id;

    var chart1 = creat_div_small(scatter_id_text);
    var chart2 = creat_div_small(his_id_text);
    var tab = creat_div_tab(tab_id_text);

    chart.append(chart1);
    chart.append(chart2);
    chart.append(tab);

    chart_id.limit_btn_text = his_id_text + '_btn_limit';
    chart_id.btn_id_right_text = scatter_id_text + "_btn_right";

    chart_id.scatter_id = '#' + scatter_id_text;
    chart_id.his_id = '#' + his_id_text;
    chart_id.tab_id = '#' + tab_id_text;

    window.scatter_id += 1;
    window.his_id += 1;
    window.tab_id += 1;

    return chart_id;
};

var Creat_summarydiv = function(chartsDivnumber, is_dif_sn) {

    chartsDivnumber = (typeof chartsDivnumber !== 'undefined') ? chartsDivnumber : 4;

    var chart_id = {};
    chart_id.main_id = null;
    chart_id.stationids_id = null;
    chart_id.byconfig_id = null;
    chart_id.sub_id = null;
    chart_id.th_id = null;
    Select_station(chart_id, chartsDivnumber, is_dif_sn);

    return chart_id;
};
//  more effective
var Mar_creat_summary_tab = function(id) {

    var title = window.table_header_title;
    var data = '<table id="summaryTab" border=1><tbody><thead style="color:black"> <tr>';
    for(var i = 0; i < title.length; i++) {
        data += '<th>' + title[i] + '</th>';
    }
    data += "</thead></tr>";
    data += '</tbody></table>';
    document.getElementById(id).innerHTML = data;
};

var Creat_summarytabdiv = function() {

    var chart = $("#chart_con"),
        sumTab_text = 'tab_summary' + window.scatter_id,
        chartSum = creat_div_summary_big(sumTab_text),
        sumtab_id = '#' + sumTab_text;

    chart.append(chartSum);
    Mar_creat_summary_tab(sumTab_text);
    return sumTab_text
};

//  scatter | his  + tab
function Checkop2() {
    var chart_id = {};
    chart_id.scatter_id = null;
    chart_id.his_id = null;
    chart_id.tab_id = null;

    var chart = $("#chart_con"),
        scatter_id_text = 'scatter_' + window.scatter_id,
        tab_id_text = 'tab_' + window.tab_id,
        chart1 = creat_div_big(scatter_id_text),
        tab = creat_div_tab(tab_id_text);

    chart.append(chart1);
    chart.append(tab);

    chart_id.scatter_id = '#' + scatter_id_text;
    chart_id.tab_id = '#' + tab_id_text;

    window.scatter_id += 1;
    window.tab_id += 1;

    return chart_id;
};

function Select_one(chart_id) {
    var chart = $("#chart_con");
    var scatter_id_text = 'scatter_' + window.scatter_id;
    var his_id_text = 'his_' + window.his_id;
    var tab_id_text = 'tab_' + window.tab_id;

    var chart1 = creat_div_small(scatter_id_text);
    var chart2 = creat_div_small(his_id_text);
    var tab = creat_div_tab(tab_id_text);

    chart.append(chart1);
    chart.append(chart2);
    chart.append(tab);

    chart_id.scatter_id = '#' + scatter_id_text;
    chart_id.his_id = '#' + his_id_text;
    chart_id.tab_id = '#' + tab_id_text;

    window.scatter_id += 1;
    window.his_id += 1;
    window.tab_id += 1;

    return chart_id;
};

var OnlyBigOne = function(chart_id) {


    var scatter_id_text = 'scatter_' + window.scatter_id,
        his_id_text = 'his_' + window.his_id,
        tab_id_text = 'tab_' + window.tab_id;

    var chart = $("#chart_con"),
        chart2 = creat_div_big(his_id_text),
        tab = creat_div_tab(tab_id_text);

    chart_id.limit_btn_text = his_id_text + '_btn_limit';
    chart_id.btn_id_right_text = scatter_id_text + "_btn_right";

    chart.append(chart2);
    chart.append(tab);

    chart_id.scatter_id = '#' + scatter_id_text;
    chart_id.his_id = '#' + his_id_text;
    chart_id.tab_id = '#' + tab_id_text;

    window.scatter_id += 1;
    window.his_id += 1;
    window.tab_id += 1;

    return chart_id;
};
