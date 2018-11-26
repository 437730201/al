//  作者：Marst
//  时间：2018-01-19
//  描述：correction_calculation@1.0
"use strict"

window.color_red = "#fc8989";
window.color_blue = "#00e7d2";
window.click_onetime = 'one';
var is_wipas = true;

if(is_wipas === true) {
        $('#setting_modal').css({
            'background': '#069296',
            'opacity': '0.9',
            'border': '4px solid #29d8de',
            'box-shadow': '1px -1px 11px 5px #ccc'
        });
        $('#data_con').css('border', 'none');
        $('#set_con').css('borderWidth', '0');
        $('.modal-header').css('border', 'none');
        $('#text_con').css('borderWidth', '0');
        $('.modal-footer').css('borderWidth', '0');
        $('#myModalLabel').css('color', 'white');
        $('#btn_close').css('color', '#dae3e6');
        $('#btn_close').css('opacity', '1');
        $('#data_tab').css('color', 'white');
        $('#version').css('color', '#ccc');
        $('#chart_con').css('background', 'linear-gradient(to right, #19213a 0%, #275690 100%)');
        $('#tree_con').css('background', 'linear-gradient(to top, #01081f 0%, #13224c 100%)');
        $('.list-group').css('color', 'white');
        window.new_tree_Color = 'white';
        window.new_tree_onhoverColor = '#1c2f61';
        window.new_tree_selectedBackColor = '#2b4e58';
        window.div_tab_color = 'white';
        window.Correlation_backgroundColor1 = 'rgb(25,33,58)';
        window.Correlation_backgroundColor2 = 'rgb(32,61,103)';
        window.Regression_backgroundColor1 = 'rgb(25,33,58)';
        window.Regression_backgroundColor2 = 'rgb(39, 86, 144)';
        window.Correl_Regress_tab_borderColor = 'rgb(29,251,232)';
        window.Correl_Regress_titleColor = '#1dfbe8';
        window.Correl_Regress_legendColor = 'white';
        window.Correl_Regress_X_Y_color = 'white';
        window.tree_color = '#fff';
        window.tree_onhoverColor = '#01b2ac';
        window.tree_selectedBackColor = '#29d8de';
        window.R_standard = 0.6;
//  $('#setting_modal').css({
//      'background': '#F0F0F0',
//      'opacity': '0.9',
//      'border': '2px solid #BBBBBB',
//      'box-shadow': '1px -1px 11px 5px #ccc'
//  });
//  $('#data_con').css('border', 'none');
//  $('#set_con').css('borderWidth', '0');
//  $('.modal-header').css('border', 'none');
//  $('#text_con').css('borderWidth', '0');
//  $('.modal-footer').css('borderWidth', '0');
//  $('#myModalLabel').css('color', '#5D5D5D');
//  $('#btn_close').css('color', '#dae3e6');
//  $('#btn_close').css('opacity', '1');
//  $('#data_tab').css('color', '#5D5D5D');
//  $('#version').css('color', '#5D5D5D');
//  $('#chart_con').css('background', '#F3F3F3');
//  $('#tree_con').css('background', '#fbede4');
//  $('.list-group').css('color', 'white');
//  window.new_tree_Color = '#5D5D5D';
//  window.new_tree_onhoverColor = '#C5CDD0';
//  window.new_tree_selectedBackColor = '#2b4e58';
//  window.div_tab_color = '#5D5D5D';
//  //  window.Correlation_backgroundColor1 = 'rgb(25,33,58)';
//  window.Correlation_backgroundColor1 = '#93D4DA';
//  window.Correlation_backgroundColor2 = 'rgb(32,61,103)';
//  window.Regression_backgroundColor1 = 'rgb(25,33,58)';
//  window.Regression_backgroundColor2 = 'rgb(39, 86, 144)';
//  window.Correl_Regress_tab_borderColor = 'rgb(29,251,232)';
//  window.Correl_Regress_titleColor = '#F7707E';
//  window.Correl_Regress_legendColor = 'white';
//  window.Correl_Regress_X_Y_color = 'white';
//  window.tree_color = '#5D5D5D';
//  window.tree_onhoverColor = '#01b2ac';
//  window.tree_selectedBackColor = '#29d8de';
//  window.color_blue = "#00C0C7";
//  window.guides_color = '#93D4DA';

} else {
    window.new_tree_onhoverColor = undefined;
    window.new_tree_selectedBackColor = undefined;
    window.color_blue = "black";
    window.div_tab_color = 'black';
    window.Correlation_backgroundColor1 = 'rgb(254,214,227)';
    window.Correlation_backgroundColor2 = 'rgb(168,237,234)';
    window.Regression_backgroundColor1 = 'rgb(254,214,227)';
    window.Regression_backgroundColor2 = 'rgb(168,237,234)';
    window.Correl_Regress_tab_borderColor = '#999';
    window.Correl_Regress_titleColor = 'black';
    window.Correl_Regress_legendColor = 'black';
    window.Correl_Regress_X_Y_color = 'black';
    window.tree_color = undefined;
    window.tree_onhoverColor = undefined;
    window.tree_selectedBackColor = undefined;
    window.R_standard = 0.7;
    window.guides_color = 'rgb(254,214,227)';
};

window.table_header_title = ['Product', 'Station', 'Item', 'Pearson', 'Std',
    'CPK', 'Amount', 'Average', 'Max', 'Min',
    'Uplimit', 'Lowlimit', 'ApUplimit', 'ApLowlimit'
];

window.scatter_id = 0;
window.his_id = 0;
window.tab_id = 0;
window.his_btn_url = {};
window.his_btn_limit = {};
var left_flag;
window.left_tree_url = "js/left tree/tree.js";
window.right_tree_url = "js/right tree/tree.js";

window.select_left_station = [];
window.select_right_station = [];

var Mar_set_station_defaults = function() {

    window.click_sn = [];
    window.perfor_items = [];
    window.click_station = {};
    window.click_station.Rs = [];
    window.click_station.Gaps = [];
    window.click_station.total = [];
    window.click_station.idList = {};
    window.click_station.titleorder = [{
            "data": 'Product'
        },
        {
            "data": 'Station'
        },
        {
            "data": 'Item'
        },
        {
            "data": 'Pearson'
        },
        {
            "data": 'Std'
        },
        {
            "data": 'CPK'
        },
        {
            "data": 'Amount'
        },
        {
            "data": 'Average'
        },
        {
            "data": 'Max'
        },
        {
            "data": 'Min'
        },
        {
            "data": 'Uplimit'
        },
        {
            "data": 'Lowlimit'
        },
        {
            "data": 'ApUplimit'
        },
        {
            "data": 'ApLowlimit'
        }
    ]

    var left = {};
    left.items = [];
    left.stds = [];
    left.means = [];
    left.cpks = [];
    left.limits_low = [];
    left.limits_up = [];
    left.stationids_average = [];
    left.configs_average = [];
    window.click_station.left = left;

    var right = {}
    right.items = [];
    right.stds = [];
    right.means = [];
    right.cpks = [];
    right.limits_low = [];
    right.limits_up = [];
    right.stationids_average = [];
    right.configs_average = [];
    window.click_station.right = right;
    
    var chart = $("#chart_con");
    chart.empty();
    window.click_onetime = "one";
};


//var Mar_click_item_get_url = function(item) {
//
//  var nodes = window.click_station_node;
//
//  for(var i = 0; i < nodes.length; i++) {
//
//      var this_node = nodes[i];
//      var node_text = this_node.text;
//      if(node_text.indexOf(item) !== -1) {
//          var cog = this_node.js_file_list;
//          break;
//      }
//  }
//
//  if(cog === undefined) {
//      console.log('No found cog', cog)
//      return;
//  } else {
//      var url1 = cog[0];
//      var url2 = cog[1];
//      var name = url1 + '@' + url2;
//
//  }
//  return name;
//
//};
