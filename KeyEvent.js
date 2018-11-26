var get_table_data = function() {

    //summaryTab
    var tab = document.getElementById("summaryTab");
    var tabData = [];
    var keep_items = [];
    //  for(var i = 0; i < tab.rows.length; i++) {
    //      
    //      var each_row = [];
    //      for(var j = 0; j < tab.rows[i].cells.length; j++) {
    //          
    //          var cell_value = tab.rows[i].cells[j].innerHTML;
    //          each_row.push(cell_value);
    //          
    //      }
    //      
    //      tabData.push(each_row);
    //  }
    //  console.log('tabData',tabData);
    for(var i = 0; i < tab.rows.length; i++) {

        if(i === 0) {
            continue
        }
        var item = tab.rows[i].cells[2].innerHTML;
        var start = item.indexOf('">');
        var end = item.indexOf('</a>');
        //      console.log('start',start)
        //      console.log('end',end)
        var save_text = item.substring(start + 2, end);
        if(keep_items.indexOf(save_text) === -1) {
            keep_items.push(save_text)
        }
    }
    //  console.log('keep_items',keep_items);
    return keep_items;
}

function keyDown(e) {

    var keycode = e.which; //取得对应的键值（数字）  
    //  var realkey = String.fromCharCode(e.which); //取得代表改键的真正字符  
    //  alert(keycode)
    //  if(keycode === 122){
    //      $("body,html").css("background", "none");
    //  }

    if(keycode === 13) {
        var keep_items = get_table_data();
        var is_keyDown = true;
        
        StartSummary(window.stationX, window.stationY, window.is_pathloss, is_keyDown, keep_items);
    }
};

document.onkeydown = keyDown;
