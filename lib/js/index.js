/**
 * Created by Viking on 2017/5/4.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    var layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;


    /*
    $(document).ready(function () {
        if (ws === null) {
            ws = new WebSocket(wsUrl);
        }

        ws.onopen = function () {
            layer.alert('服务器连接断开,请刷新界面！', {
                icon: 0,
                title: '警告'
            });
            layer.msg('服务器已连接', {
                time: 2000
            });
        };
        ws.onclose = function () {
            layer.alert('服务器连接断开,请刷新界面！', {
                icon: 0,
                title: '警告'
            });
        };
        ws.onerror = function () {
            layer.msg('数据传输错误！');
        };
        ws.onmessage = function (receiveMsg) {

        };
        ws.ondata = function (receiveData) {
        };
    })
    */
    exports('index', {});
})
