//  作者：Marst
//	时间：2018-01-19
//	描述：correction_drawPicture@1.0

"use strict"
//Define export highchart image(PNG, JPEG) size
var exportWidth = 910
var exportHeight = 600

var Mar_coeScatter = function(scatter_data, id) {

    if(id === null) {
        return
    };

    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            backgroundColor: window.Correlation_backgroundColor1,
            zoomType: 'x',
        },
//      boost: {
//          useGPUTranslations: true,
//          usePreAllocated: true
//      },
        url: {
            url1: scatter_data.url1,
            url2: scatter_data.url2,
        },
        title: {
            text: scatter_data.short_item_x + ' Correlation Analysis <br/> ',
            style: {
                fontSize: 20,
                color: window.Correl_Regress_titleColor,
                fontWeight: '700'
            }
        },

        subtitle: {
            text: scatter_data.exp,
            style: {
                color: window.Correl_Regress_X_Y_color
            }
        },

        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
            position: { // 位置设置
                align: 'right',
                verticalAlign: 'bottom',
            },
            style: { // 样式设置
                cursor: 'pointer',
                color: 'blue',
                fontSize: '10px'
            }
        },

        xAxis: {
            title: {
                text: scatter_data.station_x,
                style: {
                    color: window.Correl_Regress_X_Y_color
                }
            },

            labels: {
                style: {
                    "color": window.Correl_Regress_X_Y_color
                }
            },

            plotLines: scatter_data.limits_linex,
        },

        yAxis: {
            title: {
                text: scatter_data.station_y,

            },
            labels: {
                style: {
                    "color": window.Correl_Regress_X_Y_color
                }
            },
            plotLines: scatter_data.limits_liney,
        },

        tooltip: {
            formatter: function() {
                if(this.point.each_sn) {
                    var main = '<br><span style="color:' + window.color_red + ' ">' + scatter_data.station_x + '</span>' + ' : ' + this.point.x +
                        '<br/>station id : ' + this.point.x_Station_ID +
                        '<br><span style="color:' + window.color_blue + ' ">' + scatter_data.station_y + '</span>' + ' : ' + this.point.y +
                        '<br/>station id : ' + this.point.y_Station_ID +
                        '<br/>SN : ' + this.point.each_sn
                    if(this.point.each_config) {
                        var main = main +
                            '<br/>Config : ' + this.point.each_config +
                            '<br/>Unit No : ' + this.point.each_no
                    }
                    main = main + '<br/><span style="display:none">url1:' + scatter_data.url1 + '</span>' +
                        '<br/><span style="display:none">url2:' + scatter_data.url2 + '</span>'

                    return main;
                } else {
                    return '' + this.point.x +
                        '<br/>' + this.point.y
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemStyle: {
                'color': window.Correl_Regress_legendColor
            }
        },
        exporting: {
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            buttons: {
                contextButton: {
                    // 自定义导出菜单项目及顺序
                    menuItems: [
                        dafaultMenuItem[3],
                    ]
                }
            },

            filename: scatter_data.short_item_x + ' Correlation Analysis ',
        },
        series: scatter_data.groupdata,
    });
};
// click dot and get sn 
function reDraw(div_id, btn_id, del_sn_list) {

    var aa = null;
    var bb = null;
    var sn_obj = {};
    sn_obj["divid"] = div_id;
    sn_obj.url = null;
    sn_obj.sn_list = del_sn_list;
    var raw_amout = del_sn_list.length;

    $(div_id).on('click', '.highcharts-point ', function(event) {

        $(btn_id).show();
        var this_sn = $(this).prop('point').each_sn;
        aa = $(this).prop('point').series.chart.userOptions.url.url1;
        bb = $(this).prop('point').series.chart.userOptions.url.url2;

        if(sn_obj.sn_list.indexOf(this_sn) !== -1) {
            this.style.stroke = "red";
            this.style.fill = "red";
            // $(btn_id).hide();
            sn_obj.sn_list.splice(sn_obj.sn_list.indexOf(this_sn), 1);

        } else {
            this.style.stroke = "black";
            this.style.fill = "black";

            sn_obj.url = $(this).prop('point').series.chart.userOptions.url;
            sn_obj.sn_list.push(this_sn);

        }
        if(sn_obj.sn_list.length === raw_amout) {
            $(btn_id).hide();
        }

        // $("#chart_con").empty();	
    });

    window.click_sn.push(sn_obj);

    $(btn_id).click(function() {
        for(var i = 0; i < window.click_sn.length; i++) {
            if(btn_id.split("_btn")[0] == window.click_sn[i].divid) {

                Select_itemdata(window.click_sn[i].url.url1, window.click_sn[i].url.url2, false, window.click_sn[i].sn_list);
                $(btn_id).hide();
            }
        }

    });
};

function click_change_limit_btn(id, data, del_sn_list, charts_id) {
//  console.log('data',data)
    $("#" + id).click(function() {

        if(data.limit_x[1] === undefined) {
            var a = 'low limit';
        } else {
            var a = data.limit_x[1];
        };

        if(data.limit_x[0] === undefined) {
            var b = 'up limit';
        } else {
            var b = data.limit_x[0];
        };

        if(data.limit_y[1] === undefined) {
            var c = 'low limit';
        } else {
            var c = data.limit_y[1];
        };

        if(data.limit_y[0] === undefined) {
            var d = 'up limit';
        } else {
            var d = data.limit_y[0];
        };

        $("#myModal_limit").modal().show();
        $("#lipt_X").val(a);
        $("#hipt_X").val(b);
        $("#lipt_Y").val(c);
        $("#hipt_Y").val(d);

        $("#confirm_btn_limit").click(function() {
            var a = $("#lipt_X").val();
            var b = $("#hipt_X").val();
            var c = $("#lipt_Y").val();
            var d = $("#hipt_Y").val();

            $("#myModal_limit").modal("hide");
            var limit_dict = {};
            limit_dict.lowx = a;
            limit_dict.upx = b;
            limit_dict.lowy = c;
            limit_dict.upy = d;

            var ulrList = window.his_btn_url[id];
            if(ulrList != undefined) {
                Select_itemdata(ulrList[0], ulrList[1], false, del_sn_list, limit_dict, charts_id);
            }
        });
    });
};

var Mar_add_limit_btn = function(charts_id, limit_btn_text, his_data, del_sn_list) {
    var his_id = charts_id.his_id;
    $(his_id).append("<button id=" + limit_btn_text + " class='btn btn-success' style='z-index: 2;position: absolute;height:2.2rem;line-height:1.2rem;padding-left:0.9rem;top: 8%;left: 4%;'>Limits</button>")

    click_change_limit_btn(limit_btn_text, his_data, del_sn_list, charts_id);
};

var Mar_mixture = function(charts_id, his_data, limit_btn_text, del_sn_list) {
    
    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    var id = charts_id.his_id;
    
    $(id).highcharts({
        chart: {
            backgroundColor: window.Correlation_backgroundColor1,
            zoomType: 'x',
            inverted: false,
        },
        title: {
            text: his_data.short_item_x + ' Regression line',
            style: {
                fontSize: 20,
                color: window.Correl_Regress_titleColor,
                fontWeight: '700'
            }
        },
        legend: {
            itemStyle: {
                'color': window.Correl_Regress_legendColor
            }
        },

        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
            position: { // 位置设置
                align: 'right',
                verticalAlign: 'bottom',
            },
            style: { // 样式设置
                cursor: 'pointer',
                color: 'blue',
                fontSize: '10px'
            }
        },
        xAxis: [{
            labels: {
                style: {
                    "color": window.Correl_Regress_X_Y_color
                },
            },
            plotLines: his_data.limit_lines,
        }],
        yAxis: [{
                title: {
                    text: 'Units'
                },
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },

            },

        ],

        exporting: {
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            buttons: {
                contextButton: {
                    // 自定义导出菜单项目及顺序
                    menuItems: [
                        dafaultMenuItem[3],
                    ]
                }
            },
            filename: his_data.short_item_x + ' Regression line',
        },
        series: his_data.his_data,
    });
    Mar_add_limit_btn(charts_id, limit_btn_text, his_data, del_sn_list);
};

var Mar_table = function(id, tableInf) {
    var _table = document.createElement('table');
    //	_table.setAttribute('border', '1');
    //	_table.setAttribute('bordercolor', 'black');
    _table.setAttribute("class", "table ");
    _table.setAttribute('width', '100%');
    _table.style.marginTop = "0.5%";

    var creat_tab = function(_table, tableInf) {
        var rows = tableInf.length;

        for(var i = 0; i < rows; i++) {
            var _tr = _table.insertRow(i);

            for(var j = 0; j < tableInf[i].length; j++) {
                var cell_value = tableInf[i][j];
                var _td = _tr.insertCell(j);

                try {
                    var tn_value = cell_value.toString()
                    if(tn_value === undefined) throw 'No found sns from js_data';
                } catch(TypeError) {
                    var tn_value = '';
                }

                var _tn = document.createTextNode(tn_value);
                _td.appendChild(_tn);
                if(i === 1) {
                    _td.style.color = window.color_red;
                } else if(i === 2) {
                    _td.style.color = window.color_blue;
                }
            }
        }
    }
    creat_tab(_table, tableInf);

    $(id).append(_table);
};
