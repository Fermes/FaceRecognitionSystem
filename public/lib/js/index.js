/**
 * Created by Viking on 2017/5/4.
 */


layui.define(['layer', 'form', 'element', 'laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage = layui.laypage;

    let client_id = 0;
    let ws = new WebSocket('ws://' + document.location.hostname + ':1001');

    ws.onopen = function () {

    };
    ws.onclose = function () {
        layer.msg('服务器连接断开,请刷新界面！');
    };
    ws.onerror = function () {
        layer.msg('数据传输错误！');
    };
    ws.onmessage = function (receiveMsg) {

    };
    ws.ondata = function (record) {
        if(record.name === 'CLIENTID'){
            client_id = record.children.id;
        } else if (record.name === 'HIT') {
            recordTable.records.unshift(record.children);
            layer.close(layer.index);
            popWindow(record.children);
        } else if (record.name === 'NOHIT') {
            nohitRecords.records.unshift(record.children);
        }
    };

    let socket = io(document.location.hostname + ':1001');
    socket.on('nohit-record', function (record) {
        if (record.type === 'NOHIT') {
            nohitRecords.records.unshift(record.children);
        } else {

        }
    });
    socket.on('hit-record', function (record) {
        if (record.type === 'HIT') {
            recordTable.records.unshift(record.children);
            layer.close(layer.index);
            popWindow(record.children);
        } else {

        }
    });

    let deviceList = new Vue({
        el: "#deviceList",
        data: {
            value: "",
            setting: {
                edit: {
                    enable: true
                },
                view: {
                    showIcon: false,
                    showLine: false,
                    fontCss: getFontCss
                },
                callback: {
                    onDrop: dragToPlay
                }
            },
            deviceNodes: [],
            preNodeList: null
        },
        watch: {
            value: function (newValue) {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                zTree.expandAll(false);
                this.searchNode(newValue);
            },
            deviceNodes: function () {
                $.fn.zTree.init($("#deviceTree"), this.setting, this.deviceNodes);
            }
        },
        methods: {
            searchNode: _.debounce(
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
        if (treeNode.state === '离线') {
            return {color: 'red'};
        } else {
            return (treeNode.highlight) ? {color: "#2fbb3e", "font-weight": "bold"} : {
                color: "#2fbb3e",
                "font-weight": "normal"
            };
        }
    }

    let cameraTotal = new Vue({
        el: "#camera-total",
        data: {
            camera_address0: "",
            camera_address1: "",
            camera_address2: "",
            camera_address3: "",
            camera_address4: "",
            camera_4x4: true,
            isPop: true
        },
        computed: {},
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
            camera_4x4: function (newMode) {
                if (newMode) {
                    stopPlay("camera0");
                } else {
                    stopPlay("camera1");
                    stopPlay("camera2");
                    stopPlay("camera3");
                    stopPlay("camera4");
                }
            }
        },
        methods: {
            switchPlayMode: function () {
                this.camera_4x4 = !this.camera_4x4;
            }
        }
    });

    function dragToPlay(e, treeId, treeNodes, targetNode, moveType) {
        if (treeNodes[0].isParent) {
            return;
        }
        let creatRtsp = function (tmpNode) {
            return 'rtsp://' + tmpNode.username + ':' + tmpNode.pwd + '@' + tmpNode.ip + ':' + tmpNode.port + '/' + tmpNode.stream;
        };
        switch (e.target.id) {
            case 'camera0':
                cameraTotal.camera_address0 = creatRtsp(treeNodes[0]);
                break;
            case 'camera1':
                cameraTotal.camera_address1 = creatRtsp(treeNodes[0]);
                break;
            case 'camera2':
                cameraTotal.camera_address2 = creatRtsp(treeNodes[0]);
                break;
            case 'camera3':
                cameraTotal.camera_address3 = creatRtsp(treeNodes[0]);
                break;
            case 'camera4':
                cameraTotal.camera_address4 = creatRtsp(treeNodes[0]);
                break;
            default:
                return;
        }
    }


    const nohitImg = {
        props: ['img'],
        template: '<div><img :src="img.queryImage"> <p>{{img.createTime}}<br/><br/>{{img.place}}</p></div>'
    };

    let nohitRecords = new Vue({
        el: "#nohit-image",
        data: {
            records: []
        },
        watch: {
            records: function () {
                while (this.records.length > 8) {
                    this.records.pop();
                }
            }
        },
        methods: {},
        components: {
            'nohit-img': nohitImg
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


    let recordTable = new Vue({
        el: "#record-table",
        data: {
            curPage: 0,
            newRecord: {
                id: -1,
                createTime: '',
                place: '',
                queryImage: '',
                cameraId: '',
                user: {
                    id: -1,
                    name: '\0',
                    nationality: '',
                    gender: '',
                    thumbnailName: '',
                    fullImage: '',
                    thumbnailImage: '',
                    comments: '',
                    label: '',
                    passportNumber: ''
                }
            },
            records: []
        },
        watch: {
            records: function () {
                while (this.records.length > 100) {
                    this.records.pop();
                }
                if (recordTable.records.length / 5 < 20) {
                    layui.laypage({
                        cont: 'laypager'
                        , pages: Math.ceil(recordTable.records.length / 5)
                        , first: 1
                        , last: Math.ceil(recordTable.records.length / 5)
                        , prev: '<em><</em>'
                        , next: '<em>></em>'
                        , skin: '#202d24'
                        , groups: 3
                        , jump: function (obj) {
                            recordTable.curPage = obj.curr - 1;
                        }
                    });
                }
            }
        },
        computed: {
            pageRecords: function () {
                let start = this.curPage * 5;
                let end = (start + 5) > this.records.length ? (this.records.length) : (start + 5);
                let result = this.records.slice(start, end);
                while (result.length < 5) {
                    result.push(this.newRecord);
                }
                return result;
            }
        },
        methods: {
            styleObject: function (index) {
                if (this.pageRecords[index].user.label === "黑名单") {
                    return {
                        color: "red"
                    };
                } else if (this.pageRecords[index].user.name === "\0") {
                    if (index % 2 === 0) {
                        return {
                            color: "#0a0f0b"
                        }
                    } else {
                        return {
                            color: "#141e16"
                        }
                    }

                } else {
                    return "";
                }
            },
            popWin: function (num) {
                if (this.pageRecords[num].user.name !== '\0') {
                    popWindow(this.records[this.curPage * 5 + num]);
                }
            }
        }
    });

    function stopPlay(id) {
        let vlc = document.getElementById(id);
        vlc.playlist.stop();
    }

    function popWindow(node) {
        let tmpContent = "";
        if (node.user.label === "黑名单") {
            tmpContent = '<div class="pop-main">\
                              <div class="pop-title">\
                                  <p>警告！发现黑名单</p>\
                              </div>\
                              <div class="pop-info">\
                                  <img src=' + node.user.fullImage + '>\
                                  <img src=' + node.queryImage + '>\
                                  <label>姓名</label><p>' + node.user.name + '</p>\
                                  <label>类别</label><p>' + node.user.label + '</p>\
                                  <label>时间</label><p>' + node.createTime + '</p>\
                                  <label>地点</label><p>' + node.place + '</p>\
                                  <label>备注</label><p>' + node.user.comments + '</p>\
                              </div>\
                          </div>';
        } else if (node.user.label === "白名单") {
            tmpContent = '<div class="pop-main pop-main-white">\
                              <div class="pop-title">\
                                  <p>发现白名单</p>\
                              </div>\
                              <div class="pop-info">\
                                  <img src=' + node.user.fullImage + '>\
                                  <img src=' + node.queryImage + '>\
                                  <label>姓名</label><p>' + node.user.name + '</p>\
                                  <label>类别</label><p>' + node.user.label + '</p>\
                                  <label>时间</label><p>' + node.createTime + '</p>\
                                  <label>地点</label><p>' + node.place + '</p>\
                                  <label>备注</label><p>' + node.user.comments + '</p>\
                              </div>\
                          </div>';
        }
        layer.open({
            type: 1,
            title: false,
            shadeClose: true,
            anim: 1,
            area: ['64rem', '34rem'],
            shade: 0.6,
            content: tmpContent
        });
    }

    function play(id, camera_address) {
        let vlc = document.getElementById(id);
        vlc.playlist.clear();
        let itemId = vlc.playlist.add(camera_address);
        vlc.playlist.playItem(itemId);
    }


    axios({
        method: 'get',
        url: '/get_device_list',
        responseType: 'json',
        async: false
    })
        .then(function (response) {
            if (response.data.name === 'OK') {
                deviceList.deviceNodes = response.data.children;
                $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
            } else {

            }
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
            if (response.data.name === 'OK') {
                recordTable.records = response.data.children;
                layui.laypage({
                    cont: 'laypager',
                    pages: Math.ceil(recordTable.records.length / 5) > 20 ? 20 : Math.ceil(recordTable.records.length / 5),
                    first: 1,
                    last: Math.ceil(recordTable.records.length / 5) > 20 ? 20 : Math.ceil(recordTable.records.length / 5),
                    prev: '<em><</em>',
                    next: '<em>></em>',
                    skin: '#202d24',
                    groups: 3,
                    jump: function (obj) {
                        recordTable.curPage = obj.curr - 1;
                    }
                });
            } else {

            }
        })
        .catch(function (error) {

        });




    exports('index', {});
});

