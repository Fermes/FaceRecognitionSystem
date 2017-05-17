/**
 * Created by Viking on 2017/5/16.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    var layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

    laypage({
        cont: 'laypager'
        ,pages: Math.ceil(recordTable.records.length/20)
        ,first: 1
        ,last: Math.ceil(recordTable.records.length/20)
        ,prev: '<em><</em>'
        ,next: '<em>></em>'
        ,skin: '#202d24'
        ,groups: 3
        ,jump: function(obj) {
            recordTable.curPage = obj.curr - 1;
        }
    });
    exports('statistics-query', {});
});
