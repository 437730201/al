//  作者：Marst
//	时间：2018-01-19
//	描述：correction_calculation@1.0
"use strict"

var Mar_changelimit = function(js_data_one, js_data_two, urlist, limits_update) {

    if((limits_update !== undefined) && (limits_update !== [])) {

        var limits = limits_update;
        js_data_one.limits1 = [limits.upx, limits.lowx];
        js_data_two.limits1 = [limits.upy, limits.lowy];
        limits_update = [];
        console.log('limit change')
    } else {
        //      console.log('limit no change')
    }
};

var Common_sns = function(js_data_one, js_data_two, del_sn_list) {

    var sns_data_one = js_data_one.sns;
    var sns_data_two = js_data_two.sns;

    var comSN = [];

    for(var i = 0; i < sns_data_one.length; i++) {
        var sn = sns_data_one[i];
        var is_same_sn = sns_data_two.indexOf(sn);
        // is_same_sn ===  -1 不相同
        if(is_same_sn !== -1) {
            //不重复添加sn
            var is_in_comSN = comSN.indexOf(sn);

            // is_in_comSN === -1 不存在
            if(is_in_comSN === -1) {
                if(del_sn_list.indexOf(sn) !== -1) {

                } else {
                    comSN.push(sn);
                }

            } else {

            }
        } else {

        }
    }

    return comSN;
};

// 将sn 相应的 config,unit_no 以 字典的信息存储起来 
var Get_sn_database = function(js_data) {

    var sn_inf = {};
    var sns = js_data.sns;
    var configs = js_data.configs;
    var unit_nos = js_data.unit_no;

    for(var j = 0; j < sns.length; j++) {
        var each_sn = sns[j];
        var each_config = configs[j];
        var each_unitno = unit_nos[j]

        if(each_sn in sn_inf) {

        } else {
            sn_inf[each_sn] = [each_sn, each_config, each_unitno];
        }
    }
    return sn_inf;
};

// to buildup the data set as I wish.
var Set_data_group = function(sns, data1, data2) {
    //  此处删除了  非数值的组合.

    var valid_sn = [],
        data_group = [],
        vaild_stationid = [],
        vaild_stationidY = [],
        valList = [],
        valList2 = [];

    var data = {};
    data.valList = valList;
    data.valList2 = valList2;
    data.data_group = data_group;
    data.valid_sn = valid_sn;
    data.valid_snY = valid_sn;
    data.limit_x = data1.limits1;
    data.limit_y = data2.limits1;
    data.applimit_x = data1.limits2;
    data.applimit_y = data2.limits2;
    data.short_item_x = data1.short_item;
    data.short_item_y = data2.short_item;
    data.long_item_x = data1.long_item;
    data.long_item_y = data2.long_item;
    data.sku_x = data1.sku;
    data.sku_y = data2.sku;
    data.station_x = data1.station;
    data.station_y = data2.station;
    data.vaild_stationid = vaild_stationid;
    data.vaild_stationidY = vaild_stationidY;

    var retest_one = data1.save_retest;
    var retest_two = data2.save_retest;

    for(var i = 0; i < sns.length; i++) {
        var sn = sns[i];

        var val_one = retest_one[sn];
        var valone = val_one[0];
        var stationid = val_one[2];

        var val_two = retest_two[sn];
        var valtwo = val_two[0];
        var stationidy = val_two[2];

        // 去除 无效数据的组合

        if(isNaN(valone) || isNaN(valtwo) || valone == '' || valtwo == '') {

        } else {
            valid_sn.push(sn);
            valList.push(valone);
            valList2.push(valtwo);
            vaild_stationid.push(stationid);
            vaild_stationidY.push(stationidy);
            data_group.push([valone, valtwo]);
        }
    }
    return data;
};

var Compare_time = function(t1, t2) {

    var is_end = false;

    t1 = t1.replace("-", "/");
    t2 = t2.replace("-", "/");
    var d1 = new Date(Date.parse(t1));
    var d2 = new Date(Date.parse(t2));

    if(d1 > d2) {
        is_end = true;

    } else {
        is_end = false;

    }
    return is_end;
};

var Clear_bysns = function(targetSns, js_data) {

    var vals = js_data.val;

    try {
        var sns = js_data.sns;
        if(sns === undefined) throw 'No found sns from js_data';
    } catch(TypeError) {
        alert(TypeError)
    }

    var retest = {};
    var save_retest = {};
    retest.limits1 = js_data.limits1;
    retest.limits2 = js_data.limits2;
    retest.short_item = js_data.short_item;
    retest.long_item = js_data.long_item;
    retest.sku = js_data.sku;
    retest.station = js_data.station;
    retest.save_retest = save_retest;

    for(var i = 0; i < sns.length; i++) {
        var sn = sns[i];
        var endval = vals[i];
        var endTime = null;

        var is_in_targetSn = targetSns.indexOf(sn)
        if(is_in_targetSn !== -1) {

            save_retest[sn] = [endval, endTime];
        } else {

        }
    }
    return retest;
};

var Clear_retest = function(targetSns, js_data, is_same) {

    var retest = {};
    var save_retest = {};
    var del_retest = {};
    var save_retest_sn = [];
    try {
        var endTimes = js_data.end_time;
        if(endTimes === undefined) throw 'No found endTimes from js_data';

    } catch(TypeError) {
        alert(TypeError)
    }

    try {
        var sns = js_data.sns;
        if(sns === undefined) throw 'No found sns from js_data';
    } catch(TypeError) {
        alert(TypeError)
    }

    try {
        var station_ids = js_data.station_ids;
        if(sns === undefined) throw 'No found sns from js_data';
    } catch(TypeError) {
        alert(TypeError)
    }

    var vals = js_data.val;
    retest.save_retest = save_retest;
    retest.del_retest = del_retest;
    retest.limits1 = js_data.limits1;
    retest.limits2 = js_data.limits2;
    retest.short_item = js_data.short_item;
    retest.long_item = js_data.long_item;
    retest.sku = js_data.sku;
    retest.station = js_data.station;
    retest.sns = save_retest_sn;

    for(var i = 0; i < sns.length; i++) {
        var sn = sns[i];

        if(is_same === undefined) {
            var is_in_targetSn = 1;
        } else {
            var is_in_targetSn = targetSns.indexOf(sn);
        }

        if(is_in_targetSn === -1) {
            continue;
        }

        var endval = vals[i];
        var endTime = endTimes[i];
        var station_id = station_ids[i];
        if(save_retest[sn] !== undefined) {
            var raw_value = save_retest[sn][0];
            var raw_time = save_retest[sn][1];

            var is_end_later_raw = Compare_time(endTime, raw_time);
            if(is_end_later_raw) {

                save_retest[sn] = [endval, endTime, station_id];

            } else {
                if(del_retest[sn] !== undefined) {
                    del_retest[sn].push([raw_value, raw_time, station_id]);
                } else {
                    del_retest[sn] = [];
                    del_retest[sn].push([raw_value, raw_time, station_id]);
                }
            }
        } else {
            save_retest_sn.push(sn);
            save_retest[sn] = [endval, endTime, station_id];
        }

    }

    return retest;
};

var Clear_retest_byTime = function(targetSns, js_data, is_same) {

    if(js_data.data_type === 'Chamber') {
        var retest = Clear_bysns(targetSns, js_data);
        return retest;
    }

    var retest = Clear_retest(targetSns, js_data, is_same);

    return retest;
};

// give a array return  max min mean std Pearson coe 
// 第二道防线 避免数据中  含非数值的数组的情况

var Mar_select_limit = function(limit, applimit) {

    if((applimit[0] === 'NA') || (applimit[0] === '') || (applimit[1] === 'NA') || (applimit[1] === '')) {
        var cpk_limit = limit;
    } else {
        var cpk_limit = applimit;
    }

    return cpk_limit;
};

var Calculation_norm = function(data, cpk_limit, is_na, is_pathloss) {
    //isNaN(valone)
    var tableVal = {};
    // 
    var Mar_average = function(arr) {
        var total = arr.sum();
        var average = total / arr.length;

        return average;
    };

    var Mar_std = function(arr) {
        var average = Mar_average(arr);
        var sum_drift = 0;
        var stdval = 0;
        var na_num = 0;
        for(var i = 0; i < arr.length; i++) {

            var ele = arr[i];
            if(isNaN(ele)) {
                na_num += 1;
            } else {
                var drift = Math.pow(ele - average, 2);
                sum_drift += drift;
            }
        }
        var stdval_row = sum_drift / (arr.length - na_num);
        var stdval = Math.sqrt(stdval_row);
        return stdval;
    }

    var Mar_cpk = function(arr, limit) {

        try {
            var low = parseFloat(limit[1]);
            if(low === undefined) throw 'No found low from js_data';

        } catch(TypeError) {
            var cpk = 0;
            console.log(TypeError)
            return cpk

        }

        try {
            var up = parseFloat(limit[0]);
            if(up === undefined) throw 'No found low from js_data';

        } catch(TypeError) {
            var cpk = null;
            console.log(TypeError)
            return cpk

        }

        var cpk_one = (Mar_average(arr) - low) / (3 * Mar_std(arr));
        var cpk_two = (up - Mar_average(arr)) / (3 * Mar_std(arr));

        if(cpk_one > cpk_two) {
            var cpk = cpk_two;
        } else {
            var cpk = cpk_one;
        }

        return cpk;
    }

    tableVal['total'] = data.length;
    tableVal['max'] = data.max();
    tableVal['min'] = data.min();
    //		tableVal['sum'] = data.sum();
    var ave = Mar_average(data);
    tableVal['average'] = ave;
    var std = Mar_std(data);
    tableVal['std'] = std;
    if(is_na === false) {
        tableVal['cpk'] = Mar_cpk(data, cpk_limit);
    } else if(is_pathloss === true) {
        tableVal['cpk'] = 0;
    } else {
        cpk_limit = [ave + 3 * std, ave - 3 * std];
        tableVal['cpk'] = Mar_cpk(data, cpk_limit);
    };
    tableVal.cpk_limit = cpk_limit;
    return tableVal;
};

var Calculation_coe = function(arr, arr2, is_same_sn) {

    var CoeInf = {};

    if(is_same_sn === undefined || is_same_sn === false) {
        CoeInf.a = null;
        CoeInf.b = null;
        CoeInf.r = null;
        CoeInf.exp = null;
        CoeInf.line = null;
        return CoeInf;
    }

    var get_sum_doule = function(arr, arr2) {

        var num = arr.length;
        var num2 = arr2.length;
        var sumV = 0;
        if(num === num2) {
            for(var i = 0; i < num; i++) {
                var xv = arr[i];
                var yv = arr2[i];
                sumV += xv * yv;
            }
        }
        return sumV;

    };

    var CoeR = function(arr, arr2) {
        var num = arr.length;
        var sumxy = get_sum_doule(arr, arr2);
        var sumxx = get_sum_doule(arr, arr);
        var sumyy = get_sum_doule(arr2, arr2);
        var sumNxy = sumxy * num;
        var sumX = arr.sum();
        var sumY = arr2.sum();
        var r_son = sumNxy - sumX * sumY;
        var r_parent_x = Math.sqrt(num * sumxx - Math.pow(sumX, 2));
        var r_parent_y = Math.sqrt(num * sumyy - Math.pow(sumY, 2));
        var r_parent = r_parent_x * r_parent_y;
        var r = r_son / r_parent;

        return r;
    };

    var CoeA = function(arr, arr2) {
        var num = arr.length,
            num2 = arr2.length;

        var Sumxy = get_sum_doule(arr, arr2);
        var SumNxy = Sumxy * num;

        var sumX = arr.sum();
        var sumY = arr2.sum();

        var Sumxx = get_sum_doule(arr, arr);
        var SumNxx = Sumxx * num;

        var a = (SumNxy - sumX * sumY) / (SumNxx - Math.pow(sumX, 2));
        return a;
    };

    var CoeB = function(arr, arr2) {
        var num = arr.length;
        var a = CoeA(arr, arr2);
        var sumX = arr.sum();
        var sumY = arr2.sum();
        var b = sumY / num - a * (sumX / num)
        return b;
    };

    CoeInf['a'] = CoeA(arr, arr2);
    CoeInf['b'] = CoeB(arr, arr2);
    CoeInf['r'] = CoeR(arr, arr2);

    var formula = Rformula(CoeInf, arr)
    CoeInf['exp'] = formula.exp;
    CoeInf['line'] = formula.line;
    return CoeInf;
};

var Calculation_persist = function(value, digit) {

    digit = (typeof digit !== 'undefined') ? digit : 0;

    value = (typeof value !== 'undefined') ? value : 0;

    try {
        return value.toFixed(digit);
    } catch(e) {
        return value;
        //TODO handle the exception
    }

};

var Calculation_persist_float = function(value, digit) {

    digit = (typeof digit !== 'undefined') ? digit : 0;

    value = (typeof value !== 'undefined') ? value : 0;

    try {
        return parseFloat(value.toFixed(digit));
    } catch(e) {
        value = (value !== NaN) ? value : 0;
        return value;
        //TODO handle the exception
    }

};

var Calculation_table = function(data_group, cal, cal2, Coe, is_pathloss) {

    var table = [];

    table.push(window.table_header_title);

    if(is_pathloss === false) {
        var low_limit_x = Calculation_persist_float(data_group.limit_x[0], 2);
        var up_limit_x = Calculation_persist_float(data_group.limit_x[1], 2);

        var low_limit_y = Calculation_persist_float(data_group.limit_y[0], 2);
        var up_limit_y = Calculation_persist_float(data_group.limit_y[1], 2);
    } else {
        var low_limit_x = 'NA';
        var up_limit_x = 'NA';

        var low_limit_y = 'NA';
        var up_limit_y = 'NA';
    }

    table.push([data_group.sku_x,
        data_group.station_x,
        data_group.short_item_x,
        //					data_group.long_item_x,
        Calculation_persist(Coe.r, 3), //Coe.r.toFixed(4),
        Calculation_persist(cal.std, 2), //cal.std.toFixed(3),
        Calculation_persist(cal.cpk, 2), //cal.cpk.toFixed(2),
        Calculation_persist(cal.total), //cal.total,
        Calculation_persist(cal.average, 2), //cal.average.toFixed(3),
        Calculation_persist(cal.max, 2), //cal.max.toFixed(3),
        Calculation_persist(cal.min, 2), //cal.min.toFixed(3),
        low_limit_x, //parseFloat(data_group.limit_x[0]).toFixed(2),
        up_limit_x, //parseFloat(data_group.limit_x[1]).toFixed(2),
        data_group.applimit_x[0],
        data_group.applimit_x[1],
    ]);
    table.push([data_group.sku_y,
        data_group.station_y,
        data_group.short_item_y,
        //					data_group.long_item_y,
        Calculation_persist(Coe.r, 3), //Coe.r.toFixed(4),
        Calculation_persist(cal2.std, 2), //cal2.std.toFixed(3),
        Calculation_persist(cal2.cpk, 2), //cal2.cpk.toFixed(2),
        Calculation_persist(cal2.total), //cal2.total,
        Calculation_persist(cal2.average, 2), //cal2.average.toFixed(3),
        Calculation_persist(cal2.max, 2), //cal2.max.toFixed(3),
        Calculation_persist(cal2.min, 2), //cal2.min.toFixed(3),
        low_limit_y, //parseFloat(data_group.limit_y[0]).toFixed(2),
        up_limit_y, //parseFloat(data_group.limit_y[1]).toFixed(2),
        data_group.applimit_y[0],
        data_group.applimit_y[1],
    ]);

    return table;
};

var Mar_click_summary_item = function() {

    $(".item_skip").on("click", function() {
        var name = this.name,
            keyID = parseInt(name),
            urlList = window.item_dict[keyID],
            url1 = urlList[0],
            url2 = urlList[1];
        if(window.click_onetime != "creat finish") {

            if(url1.indexOf('ChamberJS') === -1) {
                var url1 = 'js/LJsData/' + url1;
            } else {
                var url1 = url1;
            }

            if(url2.indexOf('ChamberJS') === -1) {
                var url2 = 'js/RJsData/' + url2;
            } else {
                var url2 = url2;
            }

            var chart = $("#chart_con");
            chart.empty();
            return_back(window.click_station_node);
            Select_itemdata(url1, url2);

            window.click_onetime = "creat finish";
        }

    });

};

var Mar_click_summary_item2 = function() {
    //item_skip
    $(".item_skip2").on("click", function() {

        var name = this.name;
        var keyID = parseInt(name);
        var urlList = window.item_dict[keyID];
        var url1 = urlList[0];
        var url2 = urlList[1];

        if(window.click_onetime != "creat finish") {

            if(url1.indexOf('ChamberJS') === -1) {
                var url1 = 'js/LJsData/' + url1;
            } else {
                var url1 = url1;
            }

            if(url2.indexOf('ChamberJS') === -1) {
                var url2 = 'js/RJsData/' + url2;
            } else {
                var url2 = url2;
            }
            var chart = $("#chart_con");
            chart.empty();
            Select_itemdata(url1, url2);
            return_back(window.click_station_node);
            window.click_onetime = "creat finish";
        }
    });
};

var creat_summary_inf = function(arr) {

    var inf = {}
    var title = window.table_header_title;

    var nodes = window.click_station_node;

    for(var i = 0; i < arr.length; i++) {
        var k = title[i];
        var value = arr[i];

        if(k == 'Item') {

            var name = window.Mar_click_station_id_dict[value];
            Mar_click_summary_item2()

            value = '<a class="item_skip2" onclick=Mar_click_summary_item2() href="#" name="' + name + '">' + value + '</a>';

        }
        inf[k] = value;
    }
    return inf;
};

var Mar_collect_station_ids = function(collect_arr, station_averages, station_ids) {

    collect_arr.push([station_ids, station_averages])

};

var Mar_collect_Stationinf = function(tableInf) {
    var a = tableInf[1];
    var b = tableInf[2];
    var itemA = a[2],
        itemB = b[2];

    if(a[7] === 'NaN' && b[7] === 'NaN') {
        return
    }

    if(window.click_station.left.items.indexOf(itemA) !== -1 && window.click_station.right.items.indexOf(itemB) !== -1) {
        console.log('repeat itemA', itemA)
        console.log('repeat itemB', itemB)
        return
    }

    window.click_station.left.items.push(itemA);
    window.click_station.left.stds.push([itemA, parseFloat(a[4])]);
    window.click_station.left.cpks.push([itemA, parseFloat(a[5])]);
    window.click_station.left.means.push([itemA, parseFloat(a[7])]);
    window.click_station.left.limits_low.push([itemA, parseFloat(a[11])]);
    window.click_station.left.limits_up.push([itemA, parseFloat(a[10])]);
    //  console.log('config_x_average',tableInf.config_x_average)
    Mar_collect_station_ids(window.click_station.left.stationids_average, tableInf.station_id_x_average.station_averages, tableInf.station_id_x_average.station_ids);
    Mar_collect_station_ids(window.click_station.left.configs_average, tableInf.config_x_average.config_averages, tableInf.config_x_average.configs)
    window.click_station.right.items.push(itemB);
    window.click_station.right.stds.push([itemB, parseFloat(b[4])]);
    window.click_station.right.cpks.push([itemB, parseFloat(b[5])]);
    window.click_station.right.means.push([itemB, parseFloat(b[7])]);
    window.click_station.right.limits_low.push([itemB, parseFloat(b[11])]);
    window.click_station.right.limits_up.push([itemB, parseFloat(b[10])]);
    //  console.log('config_y_average',tableInf.config_y_average)

    Mar_collect_station_ids(window.click_station.right.stationids_average, tableInf.station_id_y_average.station_averages, tableInf.station_id_y_average.station_ids);
    Mar_collect_station_ids(window.click_station.right.configs_average, tableInf.config_y_average.config_averages, tableInf.config_y_average.configs)
    window.click_station.Rs.push([itemA, parseFloat(a[3])]);
    window.click_station.Gaps.push([itemA, parseFloat(a[7]) - parseFloat(b[7])])

    window.click_station.total.push(creat_summary_inf(a));
    window.click_station.total.push(creat_summary_inf(b));
};

var Mar_creat_stationsummary_Table = function(id, titleorder, tableinf) {

    $(document).ready(function() {
        // Set defaults value
        $.extend($.fn.dataTable.defaults, {
            searching: true,
            ordering: true
        });

        var summary_table = $('#summaryTab').DataTable({
            "columns": titleorder,
            data: tableinf,
            paging: false,
            searching: true,
            ordering: true,
            select: true,
            stateSave: true,
            dom: 'Bfrtip',
            buttons: [
                'excelHtml5',
            ],

        });

        try {
            var my_div = document.getElementById(id);
            my_div.appendChild(summary_table);
        } catch(TypeError) {
            //          console.log(TypeError)
        }

    });
};

// check_keyword in string
var Mar_check_keyword = function(keyV, str) {
    if(str.toLowerCase().indexOf(keyV) !== -1) {
        return true;
    } else {
        return false;
    }
};

var Mar_add_blank_intheEnd = function(arr) {

    for(var i = 0; i < arr.length; i++) {
        arr[i].push('');
    }

};

var Mar_by_station_datastructure = function(id_name, station_name) {

    var data = {
        'name': id_name,
        'stickyTracking': false,

        'type': 'spline',
        'data': [],
        'xAxis': 0,
        'yAxis': 0,
        'pointPadding': 0,
        'groupPadding': 0,
        'showInLegend': true,
        //              pointPlacement: 'between',
        'tooltip': {
            pointFormat: '<td style="padding:0"><b>Average：{point.y:.2f}</b></td></tr>' +
                '<br><td style="padding:0"><b>' + id_name + '</b></td></tr>' +
                '<br><td style="padding:0"><b>' + station_name + '</b></td></tr>'
        },
    }
    return data;
};

var Mar_creat_stationid_structure = function(stationids_average, station_name) {

    var data = [];
    //  console.log('stationids_average',stationids_average)
    if(stationids_average === undefined) {
        return data;
    }

    var ids = stationids_average[0];
    //  console.log('ids',ids)
    for(var i = 0; i < ids.length; i++) {

        var each_item = ids[i];
        var each_item_data = Mar_by_station_datastructure(each_item, station_name);

        data.push(each_item_data);
    }
    return data;
};

var Mar_limits_data_structure = function(limits, station_name, title) {

    var data = {
        'name': title,
        'stickyTracking': false,

        'type': 'spline',
        'data': limits,
        'xAxis': 0,
        'yAxis': 0,
        'pointPadding': 0,
        'groupPadding': 0,
        'showInLegend': true,
        //              pointPlacement: 'between',
        'tooltip': {
            pointFormat: '<td style="padding:0"><b>limit ：{point.y}</b></td></tr>' +
                '<br><td style="padding:0"><b>' + title + '</b></td></tr>' +
                '<br><td style="padding:0"><b>' + station_name + '</b></td></tr>'
        },
    }
    return data;

};

var Mar_update_combine = function(station_ids_data, each_stationid_average) {

    //  console.log('each_stationid_average',each_stationid_average)
    //  console.log('station_ids_data',station_ids_data)
    var stationids = each_stationid_average[0];
    var averages = each_stationid_average[1];

    for(var i = 0; i < stationids.length; i++) {

        var each_id = stationids[i];
        var each_average = averages[i];

        if(station_ids_data[i] !== undefined) {
            station_ids_data[i].data.push(each_average);
        }
    }
};

var Mar_set_diver = function(station, station_name, keep_items) {

    var items = station.items;
    var stationids_average = station.stationids_average;
    var configs_average = station.configs_average;

    var station_ids_data = Mar_creat_stationid_structure(stationids_average[0], station_name);
    var configs_data = Mar_creat_stationid_structure(configs_average[0], station_name);

    var stationDiv = {};
    stationDiv.station_ids_data = station_ids_data;
    stationDiv.configs_data = configs_data;

    for(var i = 0; i < items.length; i++) {

        if(keep_items !== undefined) {
            var each_item = items[i];
            if(keep_items.indexOf(each_item) === -1) {
                continue
            }
        }

        var each_stationid_average = stationids_average[i];
        var each_config_average = configs_average[i];
        Mar_update_combine(station_ids_data, each_stationid_average);
        Mar_update_combine(configs_data, each_config_average);
    }

    return stationDiv;
};

var Calculation_summary_table = function(summary_dict, stationXName, stationYName, keep_items) {

    var Inf = {};

    var stationX = Mar_set_diver(summary_dict.left, stationXName, keep_items);
    var stationY = Mar_set_diver(summary_dict.right, stationYName, keep_items);
    Inf.stationX = stationX;
    Inf.stationY = stationY;

    return Inf;
};

var Mar_select_items_bysearch = function(Inf, summary_data, is_pathloss) {
    // lows ups 暂时只取 一个工站的limits作为 共同limit
    //  console.log('Inf',Inf)
    var other = {};
    if(is_pathloss === false) {
        other.bystation_ids = Inf.stationX.station_ids_data.concat(Inf.stationY.station_ids_data, summary_data.limits);
        //      other.byconfigs = Inf.stationX.configs_data.concat(Inf.stationY.configs_data, summary_data.limits);
        other.byconfigs = Inf.stationX.configs_data.concat(summary_data.limits);
    } else {
        other.bystation_ids = Inf.stationX.station_ids_data.concat(Inf.stationY.station_ids_data);

        //      other.byconfigs = Inf.stationX.configs_data.concat(Inf.stationY.configs_data);
        other.byconfigs = Inf.stationX.configs_data;
    }

    return other;
};

var Rformula = function(CoeInf, arr) {

    var formula = {};
    var a = CoeInf.a;
    var b = CoeInf.b;
    var r = CoeInf.r;

    var min_x = arr.min();
    var max_x = arr.max();

    var min_y = a * min_x + b;
    var max_y = a * max_x + b;

    var a_string = String(a.toFixed(2));
    var b_string = String(b.toFixed(2));
    var r_string = String(r.toFixed(3));

    if(a > 0) {
        var exp = 'y = ' + b_string + ' + ' + a_string + 'x' + ',Pearson = ' + r_string;
    } else {
        var exp = 'y = ' + b_string + ' ' + a_string + 'x' + ',Pearson = ' + r_string;
    }

    formula.exp = exp;
    formula.line = [
        [parseFloat(min_x), parseFloat(min_y)],
        [parseFloat(max_x), parseFloat(max_y)]
    ];

    return formula;
};

var Mar_setGuidespoint = function(limits_x, limits_y) {
    var lowx = parseFloat(limits_x[1]) - 3;
    var upx = parseFloat(limits_x[0]) + 3;

    var lowy = parseFloat(limits_y[1]) - 3;
    var upy = parseFloat(limits_y[0]) + 3;

    var guides = {
        type: 'scatter',
        name: 'Guides ',
        color: window.guides_color,
        data: [
            [lowx, lowy],
            [upx, upy]
        ],
    };
    return guides;

};

var Mar_setGuidespointHis = function(limits_x, limits_y) {
    var lowx = parseFloat(limits_x[1]) - 3;
    var upx = parseFloat(limits_x[0]) + 3;

    var lowy = parseFloat(limits_y[1]) - 3;
    var upy = parseFloat(limits_y[0]) + 3;

    var guides = {
        type: 'scatter',
        name: 'Guides ',
        color: window.guides_color,
        data: [
            [lowx, 3],
            [upx, 3]
        ],
    };
    return guides;

};

var Set_target = function(limits_x, limits_y) {

    var Mar_average = function(arr) {
        var total = arr.sum();

        var average = total / arr.length;

        return average;
    };

    if(limits_x[0] !== null) {
        var target = Mar_average([parseFloat(limits_x[0]), parseFloat(limits_x[1])]);
    } else {
        var target = Mar_average([parseFloat(limits_y[0]), parseFloat(limits_y[1])]);
    }

    var target_ = {
        color: 'yellow',
        dashStyle: 'dot',
        width: 2,
        value: target,
        label: {
            rotation: 0,
            x: -12,
            y: 8,
            style: {
                fontStyle: 'italic',
                color: window.Correl_Regress_X_Y_color
            },
            text: 'Target' + '<br>' + parseFloat(target).toFixed(2),

        },
        zIndex: 2,

    };

    return target_;
}

//返回bool
function abSort(a, b) {
    return a - b;
};

var Mar_percent = function(arr, percent) {
    var arrOrder = arr.sort(function(a, b) {
        return a - b;
    });

    var num = arr.length;
    var pos = (num - 1) * percent;
    var pos_down = Math.floor(pos);
    var pos_up = Math.ceil(pos);
    var Qvalue = arrOrder[pos_down] * (pos_up - pos) + arrOrder[pos_up] * (pos - pos_down);
    return Qvalue;
};

var Box_ele = function(arr, n) {

    var boxEle = {};
    var boxvalue = [];
    var Q_min = null;
    var Q_max = null;
    var arrOrder = arr.sort(abSort);
    boxEle.ele = boxvalue;
    boxEle.up = Q_max;
    boxEle.low = Q_min;
    var num = arr.length;
    //整除 与 非整除
    if(num % 2 === 0) {
        Q1 = Mar_percent(arr, 0.25);
        Q2 = Mar_percent(arr, 0.50);
        Q3 = Mar_percent(arr, 0.75);
    } else {
        var pos1 = Math.round((num - 1) * 0.25);
        var pos2 = Math.round((num - 1) * 0.50);
        var pos3 = Math.round((num - 1) * 0.75);

        var Q1 = arrOrder[pos1];
        var Q2 = arrOrder[pos2];
        var Q3 = arrOrder[pos3];
    }
    var Qrange = Q3 - Q1;
    var Q_min = Q1 - Qrange * 1.50;
    var Q_max = Q3 + Qrange * 1.50;
    var boxvalue = [n, Q_min, Q1, Q2, Q3, Q_max];
    boxEle.boxvalue = boxvalue;
    boxEle.min = Q_min;
    boxEle.max = Q_max;

    return boxEle;
};

var Box_outliers = function(arr, boxele, n, sn, sn_database, name) {
    var outliers = [];
    //			var boxEle = Box_ele(arr);
    var minBox = boxele.min;
    var maxBox = boxele.max;

    for(var i = 0; i < arr.length; i++) {
        var each_value = arr[i];
        var each_sn = sn[i];
        if(each_value < minBox || each_value > maxBox) {

            var each_outlier = {};
            //如何确定x?
            each_outlier.x = n;
            each_outlier.y = each_value;
            each_outlier.name = name;
            var each_sn_inf = sn_database[each_sn];
            each_outlier.sn = each_sn;
            each_outlier.config = each_sn_inf[1];
            each_outlier.no = each_sn_inf[2];
            outliers.push(each_outlier);
        } else {

        }
    }
    return outliers;
};

var Calculation_boxvalues = function(data_group) {

    var arr = data_group.valList;
    var arr2 = data_group.valList2;
    var sn = data_group.valid_sn;

    var boxvalue = [Box_ele(arr, 3).boxvalue, Box_ele(arr2, 4).boxvalue];

    return boxvalue;
};

var Calculation_boxoutliers = function(data_group, sn_database) {

    //		var arr = data_group.valList;
    //		var arr2 = data_group.valList2;
    var data = data_group.valList;
    var dataY = data_group.valList2;
    var sn = data_group.valid_sn;
    var sn_y = data_group.valid_snY;

    var item_x = data_group.short_item_x;
    var item_y = data_group.short_item_y;

    var outlier_one = Box_outliers(Calculation_dataCopy(data), Box_ele(Calculation_dataCopy(data)), 3, sn, sn_database, item_x);
    var outlier_two = Box_outliers(Calculation_dataCopy(dataY), Box_ele(Calculation_dataCopy(dataY)), 4, sn_y, sn_database, item_y);
    var outliers = outlier_one.concat(outlier_two);
    return outliers;
};

var Calculation_dataCopy = function(data) {

    var new_arr = [];
    for(var i = 0; i < data.length; i++) {
        var value = data[i];
        new_arr.push(value);
    }
    return new_arr;
};

var Calculation_box = function(data_group, sn_database) {

    var boxInf = {};
    boxInf.boxvalue = Calculation_boxvalues(data_group);
    boxInf.outliers = Calculation_boxoutliers(data_group, sn_database);

    var x = data_group.sku_x;
    var y = data_group.sku_y;

    boxInf.categories = ['', '', '', x, y, '']
    return boxInf;
};

var Mar_set_scatter_data_structure = function(rawdata, url1, url2) {

    var data = {
        name: 'Scatter',
        stickyTracking: false,
        type: 'scatter',
        xAxis: 0,
        yAxis: 0,
        pointPadding: 0,
        groupPadding: 0,
        showInLegend: true,
        color: 'red',
        data: rawdata,
        turboThreshold: 30000,
        //      tooltip: {
        //          formatter: function() {
        //              if(this.point.each_sn) {
        //                  var main = '<br><span style="color:' + window.color_red + ' ">' + scatter_data.station_x + '</span>' + ' : ' + this.point.x +
        //                      '<br/>station id : ' + this.point.x_Station_ID +
        //                      '<br><span style="color:' + window.color_blue + ' ">' + scatter_data.station_y + '</span>' + ' : ' + this.point.y +
        //                      '<br/>station id : ' + this.point.y_Station_ID +
        //                      '<br/>SN : ' + this.point.each_sn
        //                  if(this.point.each_config) {
        //                      var main = main +
        //                          '<br/>Config : ' + this.point.each_config +
        //                          '<br/>Unit No : ' + this.point.each_no
        //                  }
        //                  main = main + '<br/><span style="display:none">url1:' + scatter_data.url1 + '</span>' +
        //                      '<br/><span style="display:none">url2:' + scatter_data.url2 + '</span>'
        //
        //                  return main;
        //              } else {
        //                  return '' + this.point.x +
        //                      '<br/>' + this.point.y
        //              }
        //          }
        //      },
    };
    return data;
};

var Mar_set_Regressionline = function(linedata) {

    var regline = {
        type: 'line',
        name: 'Regression line',
        data: linedata,
        color: 'green',
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    };
    return regline;
};

var Mar_set_limits_line_structure = function(value_, text_) {

    var limit_line = {
        color: 'red',
        dashStyle: 'dot',
        width: 2,
        value: value_,
        label: {
            rotation: 0,
            y: 8,
            style: {
                fontStyle: 'italic',
                color: window.Correl_Regress_X_Y_color
            },
            text: text_,
        },
        zIndex: 2
    };

    return limit_line;
};

var Mar_set_limits_line = function(cpk_limit, is_pathloss) {

    if(is_pathloss === false) {
        var low_limit_value = parseFloat(cpk_limit[1]);
        var low_limit_text = 'low limit ' + parseFloat(cpk_limit[1]).toFixed(2);

        var up_limit_value = parseFloat(cpk_limit[0]);
        var up_limit_text = 'Up limit ' + parseFloat(cpk_limit[0]).toFixed(2);

    } else {
        var low_limit_value = null;
        var low_limit_text = null;

        var up_limit_value = null;
        var up_limit_text = null;

    }

    var lx = Mar_set_limits_line_structure(low_limit_value, low_limit_text);
    var ux = Mar_set_limits_line_structure(up_limit_value, up_limit_text);
    var plotLines = [lx, ux];

    return plotLines;
};

var Build_scatter_data = function(dataGroup, sn_database, Guidespoint, cpk_limit_x, cpk_limit_y, is_pathloss, Coe, url1, url2) {

    var scatterList = {};

    var val_dict_list = [];
    var snOrder = dataGroup.valid_sn;
    var data = dataGroup.data_group;

    var station_ids = dataGroup.vaild_stationid;
    var station_ids_y = dataGroup.vaild_stationidY;

    scatterList.data = val_dict_list;
    scatterList.short_item_x = dataGroup.short_item_x;
    scatterList.short_item_y = dataGroup.short_item_y;
    scatterList.station_x = dataGroup.station_x;
    scatterList.station_y = dataGroup.station_y;

    for(var i = 0; i < snOrder.length; i++) {
        var each_sn = snOrder[i];
        var per_value = data[i];
        var each_stationid = station_ids[i];
        var each_stationidy = station_ids_y[i];
        var val_dict = {};
        val_dict['x'] = per_value[0];
        val_dict['y'] = per_value[1];

        var each_sn_inf = sn_database[each_sn];
        val_dict.each_sn = each_sn_inf[0];
        val_dict.each_config = each_sn_inf[1];
        val_dict.each_no = each_sn_inf[2];
        val_dict.x_Station_ID = each_stationid;
        val_dict.y_Station_ID = each_stationidy;
        val_dict_list.push(val_dict);
    }

    var scatter = Mar_set_scatter_data_structure(val_dict_list, url1, url2);
    var regline = Mar_set_Regressionline(Coe.line);

    scatterList.groupdata = [scatter, regline, Guidespoint];

    return scatterList;
};

var histogram = function(data, step) {
    var histo = {},
        x,
        i,
        arr = [];
    // Group down
    for(i = 0; i < data.length; i++) {
        x = Math.floor(data[i] / step) * step;
        if(!histo[x]) {
            histo[x] = 0;
        }
        histo[x]++;
    }
    // Make the histo group into an array
    for(x in histo) {
        if(histo.hasOwnProperty((x))) {
            arr.push([parseFloat(x), histo[x]]);

        }
    }
    // Finally, sort the array
    arr.sort(function(a, b) {
        return a[0] - b[0];
    });

    return arr;
};

var Mar_his_data_structure = function(line_data, station_name, color_line, plot_type) {

    var data = {
        stickyTracking: false,
        name: station_name + ' ' + plot_type,
        type: plot_type,
        data: line_data,
        color: color_line,
        pointPadding: 0.2,
        groupPadding: 0,
        tooltip: {
            headerFormat: 'Units amount<br/>',
            pointFormat: 'area: {point.x:.2f}<br/>' +
                'units: {point.y:.0f}<br/>',
        },
        //      dataLabels: {
        //          enabled: true,
        //          format: '{y:.f}'
        //      },
    };
    return data;
};

var Mar_add_his_limit_lines = function(target, limits_linex, is_pathloss) {
    if(is_pathloss === false) {
        if(target != undefined && limits_linex != undefined) {
            var limit_lines = limits_linex.concat(target);
        } else if(target != undefined && limits_linex === undefined) {
            return target;
        } else {
            return limits_linex;
        }

    } else {
        var limit_lines = null;
    }
    return limit_lines;
};

var Build_his_data = function(data_group, Guidespoint, limit_lines) {

    var data = {};
    var x_data = histogram(data_group.valList, 0.2);
    var y_data = histogram(data_group.valList2, 0.2);
    //  console.log('data_group',data_group)
    var spline_data_x = Mar_his_data_structure(x_data, data_group.station_x, window.color_red, 'spline');
    var column_data_x = Mar_his_data_structure(x_data, data_group.station_x, window.color_red, 'column');

    var spline_data_y = Mar_his_data_structure(y_data, data_group.station_y, window.color_blue, 'spline');
    var column_data_y = Mar_his_data_structure(y_data, data_group.station_y, window.color_blue, 'column');

    var his_data = [spline_data_x, column_data_x, spline_data_y, column_data_y, Guidespoint];

    data.station_x = data_group.station_x;
    data.station_y = data_group.station_y;
    data.short_item_x = data_group.short_item_x;
    data.short_item_y = data_group.short_item_y;
    data.his_data = his_data;
    data.limit_lines = limit_lines;
    data.limit_x = data_group.limit_x;
    data.limit_y = data_group.limit_y;

    return data;
}

//  Deal with the data of Chamber

var Mar_gaps = function(Xaverages, Yaverages) {

    var gaps = [];

    for(var i = 0; i < Xaverages.length - 1; i++) {
        var x = Xaverages[i];
        var y = Yaverages[i];
        var gap = x - y;
        gaps.push(gap)
    }

    return gaps;
};

var Mar_bystation = function(station_ids, vals) {
    // diliver the data by station
    var station_dict = {};
    //  console.log('station_ids',station_ids)
    if(vals != undefined) {

        for(var i = 0; i < vals.length; i++) {
            var each_val = vals[i];
            var each_station_id = station_ids[i];

            if(each_station_id in station_dict) {
                station_dict[each_station_id].push(each_val);
            } else {
                station_dict[each_station_id] = [each_val];
            }
        }

    } else {

    }
    return station_dict;
};

var Mar_bystation_get_average = function(station_dict, vals, item_name, cpk_limit) {

    var station_inf = {};
    var station_ids = [];
    var station_averages = [];

    var Mar_average = function(arr) {
        var total = arr.sum();
        var average = total / arr.length;

        return average;
    };

    var station_id_dict = Mar_bystation(station_dict, vals);

    for(var i in station_id_dict) {

        station_ids.push(i);
        var station_arr = station_id_dict[i];

        if(station_arr.length === 1) {

            var each_station_average = station_arr[0];
        } else {
            var each_station_average = Mar_average(station_arr);
        }
        station_averages.push([item_name, each_station_average]);

    }

    station_inf.station_ids = station_ids;
    station_inf.station_averages = station_averages;
    station_inf.cpk_limit = cpk_limit;

    return station_inf;
};

var Mar_get_config = function(snList, sn_database) {

    var config_list = [];

    if(sn_database === undefined) {
        return config_list;
    }

    for(var i = 0; i < snList.length; i++) {
        var each_sn = snList[i];
        if(each_sn !== '') {
            if(each_sn in sn_database) {
                var each_config = sn_database[each_sn][1];
                //              console.log('each_config',each_config)
            } else {
                var each_config = 'no config';
            }
        } else {
            var each_config = 'no config';
        }
        config_list.push(each_config);
    }
    return config_list;
};

var Mar_byconfigs_get_average = function(snList, vals, item_name, sn_database) {

    var config_inf = {};
    var configs = [];
    var config_averages = [];

    var Mar_average = function(arr) {
        var total = arr.sum();
        var average = total / arr.length;

        return average;
    };

    var config_list = Mar_get_config(snList, sn_database);

    var config_dict = Mar_bystation(config_list, vals);

    for(var i in config_dict) {

        configs.push(i);
        var config_arr = config_dict[i];

        if(config_arr.length === 1) {
            var each_config_average = config_arr[0];
        } else {
            var each_config_average = Mar_average(config_arr);
        }
        config_averages.push([item_name, each_config_average]);
    }

    config_inf.configs = configs;
    config_inf.config_averages = config_averages;

    return config_inf;
};

var LookforPosList = function(str, target) {

    var positions = [];

    if(str === '') {
        return str;
    }

    function searchSubStr(str, subStr) {

        var pos = str.indexOf(subStr);
        while(pos > -1) {
            if(positions.length > 3) {
                break;
            }
            positions.push(pos);
            pos = str.indexOf(subStr, pos + 1);
        }
    };

    try {
        searchSubStr(str, target);
    } catch(TypeError) {
        return str;
    }

    if(positions.length >= 4) {
        var stitle = str.substring(0, positions[3]);
    } else {
        var stitle = str;
    }

    return stitle;
}

var Mar_summary_data_structure_mean = function(averages, station_name) {
    // + ' Average'
    var data_structure = {
        name: station_name + ' Average',
        stickyTracking: false,
        type: 'spline',
        xAxis: 0,
        yAxis: 0,
        data: averages,
        pointPadding: 0,
        groupPadding: 0,
        showInLegend: true,
        //      tooltip: {
        //          pointFormat: '<td style="padding:0"><b>Average：{point.y:.2f}</b></td></tr>' +
        //              '<br><td style="padding:0"><b>item:{point.x}</b></td></tr>' +
        //              '<br><td style="padding:0"><b>' + station_name + '</b></td></tr>'
        //      },
        tooltip: {
            pointFormat: '<td style="padding:0"><b>Average：{point.y}</b></td></tr>',
        },
        zIndex: 1,

    };
    return data_structure;
};

var Mar_summary_data_structure_stds = function(stds, station_name) {

    var data_structure = {
        name: station_name + ' Stds',
        stickyTracking: false,
        type: 'spline',
        xAxis: 0,
        yAxis: 1,
        data: stds,
        pointPadding: 0,
        groupPadding: 0,
        tooltip: {
            pointFormat: '<td style="padding:0"><b>Std：{point.y}</b></td></tr>',
        },
        dataLabels: {
            enabled: true
        },
        zIndex: 3,
    };

    return data_structure;

};

var Mar_summary_data_structure_gaps = function(gaps, station_name) {

    var data_structure = {
        name: station_name + ' Gaps',
        stickyTracking: false,
        type: 'column',
        xAxis: 0,
        yAxis: 1,
        color: '#1381e0',
        data: gaps,
        pointPadding: 0,
        groupPadding: 0.2,
        tooltip: {
            pointFormat: '<td style="padding:0"><b>gap：{point.y:.2f}</b></td></tr>',
        },
        dataLabels: {
            enabled: true,
            format: '{y:.2f}',
        },
        zIndex: 0,
        //      plotOptions: {
        //          area: {
        //              zIndex: 2
        //          }
        //      },
        //      legend: {
        //          
        //          floating: true,  
        //          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
        //          borderColor: '#CCC', 
        //          borderWidth: 1, 
        //          shadow: false
        //      }
    };
    return data_structure;
};

var Mar_summary_data_structure_limits = function(limits, datatype, station_name) {

    var data_structure = {
        name: station_name + ' ' + datatype,
        stickyTracking: false,
        type: 'spline',
        xAxis: 0,
        yAxis: 0,
        data: limits,
        pointPadding: 0,
        groupPadding: 0,
        //      showInLegend: true,
        //      pointPlacement: 'between',
        tooltip: {
            pointFormat: '<td style="padding:0"><b>' + datatype + ':{point.y}</b></td></tr>',
        },

    };
    return data_structure;
};

var Mar_summary_data_structure_lines = function(persons, datatype, station_name) {

    var data_structure = {
        name: station_name + ' ' + datatype,
        stickyTracking: false,
        type: 'spline',
        xAxis: 0,
        yAxis: 0,
        data: persons,
        pointPadding: 0,
        groupPadding: 0,
        tooltip: {
            pointFormat: '<td style="padding:0"><b>' + datatype + ':{point.y}</b></td></tr>',
        },
        dataLabels: {
            enabled: true
        },

        zoneAxis: 'y',
        zones: [{
            value: -1,
            color: '#336BFF',

        }, {
            value: -window.R_standard,
            color: '#FF3C33',
            dashStyle: 'dot'
        }, {
            value: window.R_standard,
            color: '#FF3C33',
            dashStyle: 'dot'
        }, {
            value: 1,
            color: '#336BFF',

        }],

    };
    return data_structure;
};

var Mar_summary_data_structure_linescpk = function(persons, datatype, station_name) {

    var data_structure = {
        name: station_name + ' ' + datatype,
        stickyTracking: false,
        type: 'spline',
        xAxis: 0,
        yAxis: 0,
        data: persons,
        pointPadding: 0,
        groupPadding: 0,
        tooltip: {
            pointFormat: '<td style="padding:0"><b>' + datatype + ':{point.y}</b></td></tr>',
        },
        dataLabels: {
            enabled: true
        },
    };
    return data_structure;
};

var Mar_summary_data_structure_plotLines = function() {

    var plotLines = [{
        color: 'red',
        dashStyle: 'dot',
        width: 2,
        value: window.R_standard,
        label: {
            rotation: 0,
            y: window.R_standard,
            style: {
                fontStyle: 'italic',
                color: 'red'
            },
            text: 'Pearson ' + window.R_standard,
        },
        zIndex: 2,
    }, {
        color: 'red',
        dashStyle: 'dot',
        width: 2,
        value: -window.R_standard,
        label: {
            rotation: 0,
            y: -window.R_standard,
            style: {
                fontStyle: 'italic',
                color: 'red'
            },
            text: 'Pearson -' + window.R_standard,
        },
        zIndex: 2,
    }, ]
    return plotLines;
};

var Mar_single_summary = function(station, station_name, is_pathloss) {

    var summary = {};
    var means = Mar_summary_data_structure_mean(station.means, station_name);

    if(is_pathloss === false) {
        var stds = Mar_summary_data_structure_stds(station.stds, station_name, is_pathloss);
        var lows = Mar_summary_data_structure_limits(station.limits_low, ' Lows', station_name);
        var ups = Mar_summary_data_structure_limits(station.limits_up, ' Ups', station_name);
        var cpks = Mar_summary_data_structure_linescpk(station.cpks, ' Cpks', station_name)
    } else {
        var stds = [null];
        var lows = [null];
        var ups = [null];
        var cpks = [null];
    }

    summary.means = means;
    summary.stds = stds;
    summary.lows = lows;
    summary.ups = ups;
    summary.cpks = cpks;

    return summary;
};

var Mar_title = function(summary_data, is_pathloss) {

    summary_data.chart_cpktitle = ' CPK';
    summary_data.chart_bytitle = ' ByStation';

    var Pfilename = summary_data.x_name + ' ' + summary_data.y_name + " " + window.alias_type;
    summary_data.filename = Pfilename + ' Average';
    summary_data.filenameR = Pfilename + ' Person';

    if(is_pathloss === true) {
        summary_data.yAxis2_title = 'Gaps';
        summary_data.chart_title = window.alias_type + ' ' + ' Average&Gap';
        summary_data.creat_summary_amount = 3;

    } else {
        summary_data.yAxis2_title = 'Stds';
        summary_data.chart_title = window.alias_type + ' ' + ' Average&Std';
        summary_data.creat_summary_amount = 5;
        summary_data.chart_rtitle = window.alias_type + ' ' + ' Pearson';
        summary_data.chart_ctitle = window.alias_type + ' ' + ' CPK';
    }

};

var Mar_summary_items_style = function() {

    var items_tyle = {
        'display': 'inline-block',
        'max-width': '140px',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'padding-right': '15px',
    }

    return items_tyle;
};

var Select_items_index = function(raw_items, keep_items) {

    var index_list = [];

    for(var i = 0; i < keep_items.length; i++) {
        var each_item = keep_items[i];
        var each_index = raw_items.indexOf(each_item);

        if(each_index !== -1) {
            index_list.push(each_index);
        }

    }
    return index_list;
};

var fundata = function(arr, index_list) {

    var arr2 = [];
    for(var i = 0; i < index_list.length; i++) {
        var each_index = index_list[i];
        arr2.push(arr[each_index]);
    }
    return arr2;
};

var Mar_summary_data_format = function() {

    var station_format = {};
    //  station_format.configs_average =  [];
    //  station_format.cpks =  [];
    //  station_format.items =  [];
    //  station_format.limits_low =  [];
    //  station_format.limits_up =  [];
    //  station_format.means =  [];
    //  station_format.stationids_average =  [];
    //  station_format.stds =  [];
    var data_format = {};
    data_format.Gaps = [];
    data_format.Rs = [];
    data_format.idList = {};
    data_format.left = station_format;
    data_format.right = station_format;
    data_format.stationx = null;
    data_format.stationy = null;
    data_format.titleorder = [];
    data_format.total = [];
    return data_format;
};

var Select_keep_station_data = function(station, index_list) {

    var station_format = {};
    station_format.configs_average = null;
    station_format.cpks = fundata(station.cpks, index_list);
    station_format.items = fundata(station.items, index_list);
    station_format.limits_low = fundata(station.limits_low, index_list);
    station_format.limits_up = fundata(station.limits_up, index_list);
    station_format.means = fundata(station.means, index_list);
    station_format.stationids_average = null;
    station_format.stds = fundata(station.stds, index_list);

    return station_format;
};

var Select_keep_data = function(summary, index_list) {

    var data_format = Mar_summary_data_format();
//  console.log('Gaps', summary.Gaps)
//  console.log('index_list', index_list)
    data_format.Gaps = fundata(summary.Gaps, index_list);
//  console.log('data_format.Gaps', data_format.Gaps)
    data_format.Rs = fundata(summary.Rs, index_list);
    data_format.left = Select_keep_station_data(summary.left, index_list);
    data_format.right = Select_keep_station_data(summary.right, index_list);
    data_format.stationx = summary.stationx;
    data_format.stationy = summary.stationy;
    data_format.titleorder = summary.titleorder;
    data_format.total = summary.total;

    return data_format;
};

var Select_keep_items = function(summary, keep_items) {
//  console.log('summary', summary)
//  console.log('keep_items', keep_items)
    var index_list = Select_items_index(summary.left.items, keep_items);
//  console.log('index_list', index_list)
    var Keepdata = Select_keep_data(summary, index_list);
//  console.log('Keepdata', Keepdata)
    return Keepdata;
};

var Mar_summary = function(summary, is_pathloss, keep_items) {

    var summary_data = {};
    if(keep_items !== undefined) {
        var summary = Select_keep_items(summary, keep_items);
    }

    var summaryX = Mar_single_summary(summary.left, summary.stationx, is_pathloss);
    var summaryY = Mar_single_summary(summary.right, summary.stationy, is_pathloss);
    var Persons = Mar_summary_data_structure_lines(summary.Rs, ' Person', summary.stationx + ' ' + summary.stationy);
    var items_tyle = Mar_summary_items_style();
    summary_data.items = summary.left.items;
    //  console.log('items',summary_data.items)
    if(summary_data.items.length >= 25) {
        var scrollbar_flag = true;
        summary_data.max_value = 25;
    } else {
        var scrollbar_flag = false;
        summary_data.max_value = null;
    }

    summary_data.scrollbar_flag = scrollbar_flag;
    summary_data.x_name = summary.stationx;
    summary_data.y_name = summary.stationy;
    Mar_title(summary_data, is_pathloss);
    // summary data

    if(is_pathloss === false) {
        summary_data.means = [summaryX.means, summaryY.means, summaryX.stds, summaryY.stds, summaryX.ups, summaryX.lows];
        //      summary_data.means = [summaryX.means, summaryY.means, summaryX.stds, summaryY.stds];
        var min_y = -2;
        var max_y = 2;
    } else {
        var Gaps = Mar_summary_data_structure_gaps(summary.Gaps, summary.stationx + ' ' + summary.stationy)
        summary_data.means = [summaryX.means, summaryY.means, Gaps];
        var min_y = -10;
        var max_y = 10;

    }
    //  summary_data.means = [summaryX.ups, summaryX.lows];
    //  summary_data.means = [summaryX.means, summaryY.means, summaryX.stds, summaryY.stds];
    summary_data.limits = [summaryX.ups, summaryX.lows];
    summary_data.persons = [Persons];
    summary_data.plotlinesR = Mar_summary_data_structure_plotLines();
    summary_data.cpks = [summaryX.cpks, summaryY.cpks];
    summary_data.min_y = min_y;
    summary_data.max_y = max_y;
    summary_data.items_tyle = items_tyle;

    return summary_data;
};

var Get_snDif_database = function(js_data) {

    var sn_inf = {};
    // 先判断数据类型
    for(var i = 0; i < js_data.length; i++) {
        var each_data = js_data[i];
        sn_inf = Mar_sninfLoop(each_data, sn_inf);
    }
    return sn_inf;
};

var Mar_set_data_dif_group = function(data1, data2) {

    var valid_sn = [],
        valid_snY = [],
        vaild_stationid = [],
        vaild_stationidY = [],
        valList = [],
        valList2 = [];
    //  console.log('data1',data1)
    //  console.log('data2',data2)
    var data = {};
    data.valList = valList;
    data.valList2 = valList2;
    data.data_group = null;
    data.valid_sn = valid_sn;
    data.valid_snY = valid_snY;
    data.limit_x = data1.limits1;
    data.limit_y = data2.limits1;
    data.applimit_x = data1.limits2;
    data.applimit_y = data2.limits2;
    data.short_item_x = data1.short_item;
    data.short_item_y = data2.short_item;
    data.long_item_x = data1.long_item;
    data.long_item_y = data2.long_item;
    data.sku_x = data1.sku;
    data.sku_y = data2.sku;
    data.station_x = data1.station;
    data.station_y = data2.station;
    data.vaild_stationid = vaild_stationid;
    data.vaild_stationidY = vaild_stationidY;

    var retest_one = data1.save_retest;
    var retest_two = data2.save_retest;

    var snsX = data1.sns;
    var snsY = data2.sns;

    for(var i = 0; i < snsX.length; i++) {
        var sn = snsX[i];
        var val_one = retest_one[sn];
        var valone = val_one[0];
        var stationid = val_one[2];

        if(isNaN(valone) || valone == '') {

        } else {
            valid_sn.push(sn);
            valList.push(valone);
            vaild_stationid.push(stationid);
        }
    }

    for(var j = 0; j < snsY.length; j++) {
        var sn = snsY[j];
        var val_two = retest_two[sn];
        var valtwo = val_two[0];
        var stationidy = val_two[2];
        if(isNaN(valtwo) || valtwo == '') {

        } else {
            valid_snY.push(sn);
            valList2.push(valtwo);
            vaild_stationidY.push(stationidy);
        }
    }

    return data;
};
