/**
 * Created by Viking on 2017/5/4.
 */


layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

    let socket = io('10.141.5.146:1001');

    let deviceList=new Vue({
        el:"#deviceList",
        data:{
            value:"",
            setting:{
                edit:{
                    enable:true
                },
                view:{
                    showIcon:false,
                    showLine:false,
                    fontCss: getFontCss
                },
                callback:{
                    onDrop:dragToPlay
                }
            },
            deviceNodes:[],
            preNodeList:null
        },
        watch:{
            value: function (newValue) {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                zTree.expandAll(false);
                this.searchNode(newValue);
            },
            deviceNodes:function () {
                $.fn.zTree.init($("#deviceTree"), this.setting, this.deviceNodes);
            }
        },
        methods: {
            searchNode:_.debounce(
                function (newValue) {
                    if (newValue === "") {
                        return;
                    }
                    let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                    let nodeList = zTree.getNodesByParamFuzzy("name", newValue);
                    if (nodeList.length > 0) {
                        if (this.preNodeList === null) {
                            this.preNodeList = nodeList;

                        } else {
                            for (let i = 0; i < this.preNodeList.length; i++) {
                                this.preNodeList[i].highlight = false;
                                zTree.updateNode(this.preNodeList[i]);
                            }
                            this.preNodeList = nodeList;
                        }
                        for (let i = 0; i < nodeList.length; i++) {
                            nodeList[i].highlight = true;
                            zTree.updateNode(nodeList[i]);
                            if (!nodeList[i].isParent) {
                                zTree.expandNode(nodeList[i].getParentNode(), true, false, true);
                            } else {
                                zTree.expandNode(nodeList[i], true, false, true);
                            }
                        }

                    }
                }, 300
            )
        }
    });

    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color:"#2fbb3e", "font-weight":"bold"} : {color:"#2fbb3e", "font-weight":"normal"};
    }

    let cameraTotal=new Vue({
        el: "#camera-total",
        data: {
            camera_address0: "",
            camera_address1: "",
            camera_address2: "",
            camera_address3: "",
            camera_address4: "",
            camera_4x4: true,
            isPop:true
        },
        computed:{

        },
        watch: {
            camera_address0: function (newAddress) {
                play('camera0', newAddress)
            },
            camera_address1: function (newAddress) {
                play('camera1', newAddress)
            },
            camera_address2: function (newAddress) {
                play('camera2', newAddress)
            },
            camera_address3: function (newAddress) {
                play('camera3', newAddress)
            },
            camera_address4: function (newAddress) {
                play('camera4', newAddress)
            },
            camera_4x4:function (newMode) {
                if(newMode){
                    stopPlay("camera0");
                }else{
                    stopPlay("camera1");
                    stopPlay("camera2");
                    stopPlay("camera3");
                    stopPlay("camera4");
                }
            }
        },
        methods:{
            switchPlayMode:function () {
                this.camera_4x4 = !this.camera_4x4;
            }
        }
    });

    function dragToPlay(e, treeId, treeNodes, targetNode, moveType) {
        if (treeNodes[0].isParent) {
            return;
        }
        switch (e.target.id) {
            case 'camera0':
                cameraTotal.camera_address0 = treeNodes[0].ip;
                break;
            case 'camera1':
                cameraTotal.camera_address1 = treeNodes[0].ip;
                break;
            case 'camera2':
                cameraTotal.camera_address2 = treeNodes[0].ip;
                break;
            case 'camera3':
                cameraTotal.camera_address3 = treeNodes[0].ip;
                break;
            case 'camera4':
                cameraTotal.camera_address4 = treeNodes[0].ip;
                break;
            default:
                return;
        }

    }


    const nothitImg = {
        props: ['photo'],
        template: '<div><img :src="photo.img_path"> <p>{{photo.time}}<br/><br/>{{photo.site}}</p></div>'
    };

    let nothitPhoto=new Vue({
        el:"#nothit-photo",
        data:{
            newRecord:{
                img_path:"",
                time:"",
                site:""
            },
            records:[
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"锡林郭勒-碧桂园-设备01-Camera01"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                },
                {
                    img_path:"lib/img/person.jpg",
                    time:"2017-04-26 08:53",
                    site:"上海-小区2-camera10"
                }
            ]
        },
        computed:{
            eightRecords:function () {
                while(this.records.length>8){
                    this.records.pop();
                }
                return this.records;
            }
        },
        methods:{
            addRecord:function (path,time,site) {
                this.newRecord.img_path=path;
                this.newRecord.time=time;
                this.newRecord.site=site;

                this.records.unshift(this.newRecord);

                this.newRecord.img_path="";
                this.newRecord.time="";
                this.newRecord.site="";
            }
        },
        components:{
            'nothit-img':nothitImg
        }
    });

    Date.prototype.Format = function (fmt) { //author: meizz
        let o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


    let recordTable=new Vue({
        el:"#record-table",
        data:{
            curPage: 0,
            newRecord:{
                id:-1,
                name:"\0",
                type:"",
                number:"",
                time:"",
                site:""
            },
            records:[]
        },
        watch:{
            records:function () {
                layui.laypage({
                    cont: 'laypager'
                    ,pages: Math.ceil(recordTable.records.length/5)
                    ,first: 1
                    ,last: Math.ceil(recordTable.records.length/5)
                    ,prev: '<em><</em>'
                    ,next: '<em>></em>'
                    ,skin: '#202d24'
                    ,groups: 3
                    ,jump: function(obj) {
                        recordTable.curPage = obj.curr - 1;
                    }
                });
            }
        },
        computed:{
            pageRecords:function () {
                let start = this.curPage * 5;
                let end = (start + 5) > this.records.length ? (this.records.length) : (start + 5);
                let result = this.records.slice(start, end);
                while(result.length < 5){
                    result.push(this.newRecord);
                }
                return result;
            }
        },
        methods:{
            styleObject:function (index) {
                if(this.pageRecords[index].type==="黑名单"){
                    return {
                        color:"red"
                    };
                }else if(this.pageRecords[index].name==="\0"){
                    if(index%2===0){
                        return {
                            color: "#0a0f0b"
                        }
                    }else{
                        return{
                            color:"#141e16"
                        }
                    }

                }else{
                    return "";
                }
            },
            addRecord:function (id,name,type,number,time,site) {
                this.newRecord.id = id;
                this.newRecord.name = name;
                this.newRecord.type = type;
                this.newRecord.number = number;
                this.newRecord.time = time;
                this.newRecord.site = site;

                this.records.unshift(this.newRecord);
                if(this.records.length > 100){
                    this.records.pop();
                }
                this.newRecord = {
                    id:-1,
                    name:"\0",
                    type:"",
                    number:"",
                    time:"",
                    site:""
                };
            },
            popWin:function (num) {
                popWindow(this.records[this.curPage * 5 + num]);
            }
        }
    });

    function stopPlay(id) {
        let vlc = document.getElementById(id);
        vlc.playlist.stop();
    }

    function popWindow(node) {
        let tmpContent = "";
        if(node.type==="黑名单"){
            tmpContent = '<div class="pop-main">\
                              <div class="pop-title">\
                                  <p>警告！发现黑名单</p>\
                              </div>\
                              <div class="pop-info">\
                                  <img src="lib/img/ironman.jpg">\
                                  <img src="lib/img/ironman2.jpg">\
                                  <label>姓名</label><p>'+node.name+'</p>\
                                  <label>类别</label><p>'+node.type+'</p>\
                                  <label>时间</label><p>'+node.time+'</p>\
                                  <label>地点</label><p>'+node.site+'</p>\
                                  <label>备注</label><p>'+node.remark+'</p>\
                              </div>\
                          </div>';
        }else if(node.type === "白名单"){

            tmpContent = '<div class="pop-main pop-main-white">\
                              <div class="pop-title">\
                                  <p>发现白名单</p>\
                              </div>\
                              <div class="pop-info">\
                                  <img src="lib/img/ironman.jpg">\
                                  <img src="lib/img/ironman2.jpg">\
                                  <label>姓名</label><p>' + node.name + '</p>\
                                  <label>类别</label><p>' + node.type + '</p>\
                                  <label>时间</label><p>' + node.time + '</p>\
                                  <label>地点</label><p>' + node.site + '</p>\
                                  <label>备注</label><p>' + node.remark + '</p>\
                              </div>\
                          </div>';
        }
        layer.open({
            type: 1,
            title:false,
            shadeClose: true,
            anim:1,
            area:['64rem','34rem'],
            shade:0.6,
            content: tmpContent
        });
    }

    function play(id,camera_address){
        let vlc = document.getElementById(id);
        vlc.playlist.clear();
        let itemId = vlc.playlist.add(camera_address);
        vlc.playlist.playItem(itemId);
    }

    function fullScreen(id) {
        let vlc = document.getElementById(id);
        vlc.fullscreen = true;
    }

    $(document).ready(function(){

        axios({
            method: 'get',
            url: '/get_device_list',
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                deviceList.deviceNodes = response.data.children;
                $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
            })
            .catch(function (error) {

            });
        axios({
            method: 'get',
            url: '/get_hit_list',
            params: {
                n: 100
            },
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                let records = response.data.children;
                for (let i = 0; i < records.length; i++) {
                    recordTable.addRecord(records[i].id, records[i].user.name, records[i].user.label, records[i].user.passportNumber, records[i].createTime, records[i].place);
                }
            })
            .catch(function (error) {

            });
        $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
    });
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

    layui.laypage({
        cont: 'laypager'
        ,pages: Math.ceil(recordTable.records.length/5)
        ,first: 1
        ,last: Math.ceil(recordTable.records.length/5)
        ,prev: '<em><</em>'
        ,next: '<em>></em>'
        ,skin: '#202d24'
        ,groups: 3
        ,jump: function(obj) {
            recordTable.curPage = obj.curr - 1;
        }
    });

    exports('index', {});
});

