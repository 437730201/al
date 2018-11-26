var creat_div_summary_big = function(id_text) {

    var chart1 = document.createElement("div");
    chart1.id = id_text;
    chart1.className = "col-lg-12 col-md-12";
    chart1.style.height = "50rem";
    chart1.style.padding = "0px";
    chart1.style.border = "1px solid #7b7b7b"
    chart1.style.borderRadius = "3px";

    return chart1;
};

var Select_station = function(chart_id, chartsDivnumber, is_dif_sn) {

    var chart = $("#chart_con");

    var main_id_text = 'mean_' + window.scatter_id;
    var by_station_id_text = 'bystations_' + window.scatter_id;
    var byconfig_id_text = 'byconfigs_' + window.scatter_id;

    var sub_id_text = 'person_' + +window.his_id;
    var th_id_text = 'cpk_' + +window.his_id;

    var chart1 = creat_div_summary_big(main_id_text);
    var chart11 = creat_div_summary_big(by_station_id_text);
    var chart12 = creat_div_summary_big(byconfig_id_text);
    var chart2 = creat_div_summary_big(sub_id_text);
    var chart3 = creat_div_summary_big(th_id_text);

    if(chartsDivnumber >= 1) {
        chart.append(chart1);
        chart_id.main_id = '#' + main_id_text;
    }

    if(chartsDivnumber >= 2) {
        chart.append(chart11);
        chart_id.stationids_id = '#' + by_station_id_text;
    }

    if(chartsDivnumber >= 3) {
        chart.append(chart12);
        chart_id.byconfig_id = '#' + byconfig_id_text;
    }

    if(chartsDivnumber >= 4 && is_dif_sn === undefined) {
        chart.append(chart2);
        chart_id.sub_id = '#' + sub_id_text;
    }

    if(chartsDivnumber >= 5) {
        chart.append(chart3);
        chart_id.th_id = '#' + th_id_text;
    }

    window.scatter_id += 1;
    window.his_id += 1;

    return chart_id;
};

var Creat_summarydiv = function(chartsDivnumber, is_dif_sn) {

    chartsDivnumber = (typeof chartsDivnumber !== 'undefined') ? chartsDivnumber : 5;

    var chart_id = {};
    chart_id.main_id = null;
    chart_id.stationids_id = null;
    chart_id.byconfig_id = null;
    chart_id.sub_id = null;
    chart_id.th_id = null;
    Select_station(chart_id, chartsDivnumber, is_dif_sn);

    return chart_id;
};

var Mar_creat_summary = function(id, summary_data) {

    if(id === null) {
        console.log('Mar_creat_summary id', id)
        return
    };

    var x_title = summary_data.items,
        chart_title = summary_data.chart_title,
        x_name = summary_data.x_name,
        y_name = summary_data.y_name,
        flag = summary_data.scrollbar_flag, // 设置一个滚动条的开关,默认情况下关闭
        max_value = summary_data.max_value,
        yAxis2_title = summary_data.yAxis2_title;

    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            zoomType: 'x',
        },
        title: {
            text: chart_title,
        },
        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
        },
        xAxis: [{
            gridLineWidth: 1,
            crosshair: true,
            min: 0,
            max: max_value,
//          type: 'category',
            categories:summary_data.items,
            scrollbar: {
                enabled: flag //是否产生滚动条
            },
            title: {
                text: x_name
            },
            labels: {
                useHTML: true,
                formatter: function() {
                    Mar_click_summary_item();
                    var name = window.Mar_click_station_id_dict[this.value];
//                  var stitle = LookforPosList(this.value, ' ')
                    return '<a class="item_skip" onclick=Mar_click_summary_item() href="#" name="' + name + '">' + this.value + '</a>';
                },
                style:summary_data.items_tyle,
            },
        }, ],
        yAxis: [

            {
                gridLineWidth: 1,
                crosshair: true,
                title: {
                    text: ' Average '
                },
            },
            {
                gridLineWidth: 1,
                crosshair: true,
                reversed: false,
                opposite: true,
                title: {
                    text: yAxis2_title
                },
                min: summary_data.min_y,
                max: summary_data.max_y,
            }
        ],
        exporting: {
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            buttons: {
                contextButton: {
                    menuItems: [
                        dafaultMenuItem[3],
                    ]
                }
            },
            filename: summary_data.filename,
        },
        series: summary_data.means,
    });
};

var Mar_creat_summary_bystation = function(id, Inf, summary_data) {
    if(id === null) {
        return
    };

    var data = Inf.bystation_ids,
        chart_title = 'Average ByStation',
        x_name = summary_data.x_name,
        y_name = summary_data.y_name;

    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            zoomType: 'x',
        },
        title: {
            text: window.alias_type + ' ' + chart_title,
        },
        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
        },
        xAxis: [{

            gridLineWidth: 1,
            crosshair: true,
            min: 0,
            max: summary_data.max_value,
//          type: 'category',
            categories:summary_data.items,
            scrollbar: {
                enabled: summary_data.max_value //是否产生滚动条
            },
            title: {
                text: x_name
            },
            labels: { //坐标轴标签
                useHTML: true,
                formatter: function() {
                    Mar_click_summary_item();
                    var name = window.Mar_click_station_id_dict[this.value];
//                  var stitle = LookforPosList(this.value, ' ')
                    return '<a class="item_skip" onclick=Mar_click_summary_item() href="#" name="' + name + '">' + this.value + '</a>';
                },
                style:summary_data.items_tyle,
            },
        }],
        yAxis: [{
            gridLineWidth: 1,
            crosshair: true,
            title: {
                text: ' Average '
            },
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
            },
        },
        exporting: {
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            buttons: {
                contextButton: {
                    menuItems: [
                        dafaultMenuItem[3]
                    ]
                }
            },
            filename: summary_data.filename,
        },
        series: data
    });

};

var Mar_creat_summary_byconfig = function(id, Inf, summary_data) {

    if(id === null) {
        return
    };

    var data = Inf.byconfigs,
        chart_title = 'Average ByConfig',
        x_name = summary_data.x_name,
        y_name = summary_data.x_name;

    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            zoomType: 'x',

        },
        title: {
            text: window.alias_type + ' ' + chart_title,
        },

        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
        },
        xAxis: [{
            gridLineWidth: 1,
            crosshair: true,
            min: 0,
            max: summary_data.max_value,
//          type: 'category',
            categories:summary_data.items,
            scrollbar: {
                enabled: summary_data.scrollbar_flag, //是否产生滚动条
            },

            title: {
                text: x_name,
            },
            labels: { //坐标轴标签
                useHTML: true,
                formatter: function() {
                    Mar_click_summary_item();
                    var name = window.Mar_click_station_id_dict[this.value];
//                  var stitle = LookforPosList(this.value, ' ')
                    return '<a class="item_skip" onclick=Mar_click_summary_item() href="#" name="' + name + '">' + this.value + '</a>';
                },
                style:summary_data.items_tyle,
            },
        }, ],
        yAxis: [{
            gridLineWidth: 1,
            crosshair: true,
            title: {
                text: ' Average '
            },
        }, ],

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
            },
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
            filename: summary_data.filename,
        },
        series: data
    });
};

var Mar_creat_Rsummary = function(id, summary_data) {

    if(id === null) {
        return
    };
    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            zoomType: 'x',
        },
        title: {
            text: summary_data.chart_rtitle,
        },
        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
        },
        xAxis: {
            min: 0,
            max: summary_data.max_value,
            gridLineWidth: 1,
//          type: 'category',
            categories:summary_data.items,
            title: {
                text: ' testing item '
            },
            scrollbar: {
                enabled: summary_data.scrollbar_flag, //是否产生滚动条
            },
            labels: { //坐标轴标签
                useHTML: true,
                formatter: function() {
                    Mar_click_summary_item();
                    var name = window.Mar_click_station_id_dict[this.value];
//                  var stitle = LookforPosList(this.value, ' ');
                    return '<a class="item_skip" onclick=Mar_click_summary_item() href="#" name="' + name + '">' + this.value + '</a>';
                },
                style:summary_data.items_tyle,
            },
        },
        yAxis: {
            min: -1,
            max: 1,
            gridLineWidth: 1,
            crosshair: true,
            title: {
                text: ' Pearson '
            },
            plotLines: summary_data.plotlinesR,
        },

        exporting: {
            buttons: {
                contextButton: {
                    // 自定义导出菜单项目及顺序
                    menuItems: [
                        dafaultMenuItem[3],
                    ]
                }
            },
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            filename: summary_data.filenameR,
        },
        series: summary_data.persons,
    });
};

var Mar_creat_CPKsummary = function(id, summary_data) {

    if(id === null) {
        return
    };

    var dafaultMenuItem = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    $(id).highcharts({
        chart: {
            zoomType: 'x',
        },
        title: {
            text: summary_data.chart_ctitle,
        },
        credits: {
            enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
            text: 'NPI-RF-FATP-SW', // 显示的文字
            href: 'http://8.175.94.58:82/login/', // 链接地址
        },
        xAxis: {
            min: 0,
            max: summary_data.max_value,
            gridLineWidth: 1,
//          type: 'category',
            categories:summary_data.items,
            title: {
                text: ' testing item '
            },
            scrollbar: {
                enabled: summary_data.scrollbar_flag //是否产生滚动条
            },
            labels: { //坐标轴标签
                useHTML: true,

                formatter: function() {
                    Mar_click_summary_item();
                    var name = window.Mar_click_station_id_dict[this.value];
//                  var stitle = LookforPosList(this.value, ' ');
                    return '<a class="item_skip" onclick=Mar_click_summary_item() href="#" name="' + name + '">' + this.value + '</a>';
                },
                style:summary_data.items_tyle,
            },
        },
        yAxis: {
            gridLineWidth: 1,
            crosshair: true,
            title: {
                text: summary_data.chart_ctitle
            },
            plotLines: [{
                color: 'red',
                dashStyle: 'dot',
                width: 2,
                value: 1.33,
                label: {
                    rotation: 0,
                    y: 3,
                    style: {
                        fontStyle: 'italic',
                        color: 'red'
                    },
                    text: 'CPK ' + 1.33,
                },
                zIndex: 2,
            }, ]

        },
        exporting: {
            sourceWidth: exportWidth,
            sourceHeight: exportHeight,
            buttons: {
                contextButton: {
                    menuItems: [
                        dafaultMenuItem[3],
                    ]
                }
            },
            filename: summary_data.chart_ctitle,
        },
        series: summary_data.cpks,
    });

};
