var Mar_Summary_Table = function() {

    var sumTab_id = Creat_summarytabdiv();

    Mar_creat_stationsummary_Table(sumTab_id, window.click_station.titleorder, window.click_station.total);

};

var Mar_check_pathloss = function(alias) {

    if(alias !== undefined) {
        var alias_name = alias[0];
        if(alias_name.indexOf('Pathloss') != -1) {
            var is_pathloss = true;
        } else {
            var is_pathloss = false;
        }
    }
    return is_pathloss;
};


var StartSummary = function(stationX,stationY,is_pathloss,is_keyDown,keep_items){
    
    var summary = window.click_station;
    summary.stationx = stationX;
    summary.stationy = stationY;
    
//  if(keep_items !== undefined){
//      if(keep_items.length === summary.left.items.length){
//          return
//      }
//  }
    
    var summary_data = Mar_summary(summary, is_pathloss,keep_items);
    //      console.log('summary', summary)
    var Inf = Calculation_summary_table(summary, stationX, stationY,keep_items);
    var inf = Mar_select_items_bysearch(Inf, summary_data, is_pathloss);
    // 值为空 不画图
    inf.x = stationX;
    inf.y = stationY;
    
    if(is_keyDown === undefined){
        var chart_id = Creat_summarydiv(summary_data.creat_summary_amount);
        window.chart_id = chart_id;
    }
    else{
        var chart_id = window.chart_id;
    }
    
//      console.log('summary_data',summary_data)
    Mar_creat_summary(chart_id.main_id, summary_data);
    Mar_creat_Rsummary(chart_id.sub_id, summary_data);
    Mar_creat_CPKsummary(chart_id.th_id, summary_data);

    Mar_creat_summary_bystation(chart_id.stationids_id, inf, summary_data);
    Mar_creat_summary_byconfig(chart_id.byconfig_id, inf, summary_data);
    
    if(is_keyDown === undefined){
        Mar_Summary_Table();    
    }
    
    
}

var Mar_select_Same_SN = function(url1, url2, js_data_one, js_data_two, del_sn_list, creat_summary, charts_id, is_same_sn) {

    if(is_same_sn === true) {
        var comsns = Common_sns(js_data_one, js_data_two, del_sn_list);
        if(comsns.length === 0 && creat_summary == false) {
            alert('No same sn data,Please check the csv file.')
        }
    } else {
        var comsns = [];
    }

    var is_na = js_data_one.is_na;
    var alias = js_data_one.alias;
    var is_pathloss = Mar_check_pathloss(alias);
    //  删除重测 并找到 相同的sn 数据
    var retest_one = Clear_retest_byTime(comsns, js_data_one, is_same_sn);
    var retest_two = Clear_retest_byTime(comsns, js_data_two, is_same_sn);
    //建立起sn_database   需要考虑数据类型  若 是 por数据 可以进行下面这一步
    if(is_same_sn === true) {
        var sn_database = Get_sn_database(js_data_one),
            data_group = Set_data_group(comsns, retest_one, retest_two);
    } else {
        var dataSet = [js_data_one, js_data_two];
        var sn_database = Get_snDif_database(dataSet),
            data_group = Mar_set_data_dif_group(retest_one, retest_two);
    }
//  console.log('data_group', data_group)
    var cpk_limit_x = Mar_select_limit(data_group.limit_x, data_group.applimit_x);
    var cpk_limit_y = Mar_select_limit(data_group.limit_y, data_group.applimit_y)

    var cal = Calculation_norm(data_group.valList, cpk_limit_x, is_na, is_pathloss),
        cal2 = Calculation_norm(data_group.valList2, cpk_limit_y, is_na, is_pathloss);
    data_group.limit_x = cal.cpk_limit;
    data_group.limit_y = cal2.cpk_limit;
    var cpk_limit_x = cal.cpk_limit,
        cpk_limit_y = cal2.cpk_limit;

    var Coe = Calculation_coe(data_group.valList, data_group.valList2,is_same_sn);
    var tableInf = Calculation_table(data_group, cal, cal2, Coe, is_pathloss);

    window.perfor_items.push(url1);
    if(creat_summary === false) {
        var charts_id = Mar_clear_div(is_same_sn, charts_id);

        var limits_linex = Mar_set_limits_line(cpk_limit_x, is_pathloss),
            limits_liney = Mar_set_limits_line(cpk_limit_y, is_pathloss);
        // 构建绘图  散点数据       
        var Guidespoint = Mar_setGuidespoint(cpk_limit_x, cpk_limit_y);
        /// scatter plot
        if(is_same_sn === true) {
            var scatter_data = Build_scatter_data(data_group, sn_database, Guidespoint, cpk_limit_x, cpk_limit_y, is_pathloss, Coe, url1, url2);
            scatter_data.url1 = url1;
            scatter_data.url2 = url2;

            scatter_data.limits_linex = limits_linex;
            scatter_data.limits_liney = limits_liney;
            //scatter_id
            var scatter_id = charts_id.scatter_id;
            Mar_coeScatter(scatter_data, scatter_id);
            var btn_id_right_text = charts_id.btn_id_right_text;
            $(scatter_id).append("<button id=" + btn_id_right_text + " class='btn btn-danger' style='display: none;height: 2.2rem;padding-top: 0.2rem;z-index: 2;position: absolute;top: 3.76rem;left: 4rem;'><i class='glyphicon glyphicon-ok'></i>OK</button>")
            reDraw(scatter_id, '#' + btn_id_right_text, del_sn_list);
        }
//      $('#confirm_btn_limit').unbind('click').click(function() {});

        var url_list = [url1, url2];

        //      console.log('data_group',data_group)
        var target = Set_target(cpk_limit_x, cpk_limit_y),
            limit_lines = Mar_add_his_limit_lines(target, limits_linex, is_pathloss),
            Guidespoint2 = Mar_setGuidespointHis(cpk_limit_x, cpk_limit_y),
            his_data = Build_his_data(data_group, Guidespoint2 , limit_lines);

        var limit_btn_text = charts_id.limit_btn_text;
        window.his_btn_url[limit_btn_text] = url_list;
        Mar_mixture(charts_id, his_data, limit_btn_text, del_sn_list);
        Mar_table(charts_id.tab_id, tableInf, is_pathloss);
    } else {
        var station_id_x_average = Mar_bystation_get_average(data_group.vaild_stationid, data_group.valList, data_group.short_item_x, cpk_limit_x),
            station_id_y_average = Mar_bystation_get_average(data_group.vaild_stationidY, data_group.valList2, data_group.short_item_x, cpk_limit_y);
        tableInf.station_id_x_average = station_id_x_average;
        tableInf.station_id_y_average = station_id_y_average;

        if(data_group.valid_sn) {
            var config_x_average = Mar_byconfigs_get_average(data_group.valid_sn, data_group.valList, data_group.short_item_x, sn_database),
                config_y_average = Mar_byconfigs_get_average(data_group.valid_snY, data_group.valList2, data_group.short_item_x, sn_database);
        } else {
            var config_x_average = [],
                config_y_average = [];
        }
        tableInf.config_x_average = config_x_average;
        tableInf.config_y_average = config_y_average;
        Mar_collect_Stationinf(tableInf);
        
        window.stationX = tableInf[1][1];
        window.stationY = tableInf[2][1];
        window.is_pathloss = is_pathloss;
    }
    // start summary 
    if(window.perfor_items.length === window.perforNumber&&creat_summary === true) {
        console.log('start summary______________________')
        StartSummary(window.stationX,window.stationY,window.is_pathloss);
    } else {

    }

};

var Mar_sninfLoop = function(js_data, sn_inf) {
    // 收集每个sn 对应的inf，若没有直接返回
    var sns = js_data.sns;

    try {
        var configs = js_data.configs;
        if(configs === undefined) throw 'No configs inf from js_data';

    } catch(TypeError) {
        console.log(TypeError)
        return sn_inf;
    }

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

var Coe_format = function() {

    CoeInf = {};
    CoeInf['a'] = null;
    CoeInf['b'] = null;
    CoeInf['r'] = null;

    CoeInf['exp'] = null;
    CoeInf['line'] = null;

    return CoeInf;
};

var Mar_clear_div = function(is_same_sn, charts_id) {
    $('#confirm_btn_limit').unbind('click').click(function() {

    });

    if(charts_id === undefined) {
        if(is_same_sn === true) {
            return Add_div_pictures();
        } else {
            return Add_div_pictures(1);
        }
    } else {
        if(is_same_sn === true) {
            var scatter_div = $(charts_id.scatter_id);
            scatter_div.empty();
        }

        var his_div = $(charts_id.his_id);
        his_div.empty();

        var tab_div = $(charts_id.tab_id);
        tab_div.empty();
    }
    return charts_id;
};
