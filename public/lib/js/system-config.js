/**
 * Created by Viking on 2017/5/22.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

    let client_id = '0';
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

        }
    };

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
                systemSetting.deviceIndex = 0;
            }

        })
        .catch(function (error) {
            layer.alert(error.message,{title:'错误'})
        });

    const settingDisplay = function (event, treeId, treeNode) {

        if(treeNode.getParentNode() === null){
            systemSetting.deviceIndex = 0;
            systemSetting.cityIndex = treeNode.getIndex();
        }else if(treeNode.children === undefined) {
            systemSetting.deviceIndex = treeNode.getParentNode().getIndex();
            systemSetting.cityIndex= treeNode.getParentNode().getParentNode().getIndex();
        } else {
            systemSetting.cityIndex = treeNode.getParentNode().getIndex();
            systemSetting.deviceIndex = treeNode.getIndex();
        }
    };

    let deviceList = new Vue({
        el: "#deviceList",
        data: {
            value: "",
            setting: {
                edit: {
                    enable: true
                },
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: {"Y": "s", "N": "ps"}
                },
                view: {
                    showIcon: false,
                    showLine: false,
                    fontCss: getFontCss
                },
                callback: {
                    onClick: settingDisplay
                }
            },
            deviceNodes: [],
            preNodeList: null,
            allChecked: false
        },
        watch: {
            value: function (newValue) {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                zTree.expandAll(false);
                this.searchNode(newValue);
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
            ),
            revertCheck: function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                let allNodes = zTree.transformToArray(zTree.getNodes());
                for (let i = 0; i < allNodes.length; i++) {
                    zTree.checkNode(allNodes[i]);
                }
            },
            allCheck: function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                this.allChecked = !this.allChecked;
                zTree.checkAllNodes(this.allChecked);
            }
        }
    });

    function getFontCss(treeId, treeNode) {
        if(treeNode.state === '离线'){
            return {color:'red'};
        }else{
            return (treeNode.highlight) ? {color:"#2fbb3e", "font-weight":"bold"} : {color:"#2fbb3e", "font-weight":"normal"};
        }
    }

    let systemSetting = new Vue({
        el:"#frs-set",
        data: {
            cityIndex:0,
            deviceIndex:-1,
            record:null
        },
        watch:{
            cityIndex: function () {
                this.record = JSON.parse(JSON.stringify(deviceList.deviceNodes[this.cityIndex].children[this.deviceIndex]));
                this.record.children = undefined;
                this.record.client_id = client_id;
            },
            deviceIndex: function () {
                this.record = JSON.parse(JSON.stringify(deviceList.deviceNodes[this.cityIndex].children[this.deviceIndex]));
                this.record.children = undefined;
                this.record.client_id = client_id;
            }
        },
        methods:{
            submitSetting:function () {
                let deviceTree = $.fn.zTree.getZTreeObj("deviceTree");
                let checkNodes = deviceTree.getCheckedNodes();
                let checkList = [];
                for (let i = 0; i < checkNodes.length; i++) {
                    if (checkNodes[i].getParentNode() !== null && checkNodes[i].children !== undefined) {
                        let tmpDevice = {
                            cityIndex:checkNodes[i].getParentNode().getIndex(),
                            deviceIndex:checkNodes[i].getIndex(),
                            record:null
                        };
                        let tmpNode = JSON.parse(JSON.stringify(deviceList.deviceNodes[tmpDevice.cityIndex].children[tmpDevice.deviceIndex]));
                        tmpNode.children = undefined;
                        tmpNode.client_id = client_id;
                        tmpDevice.record = tmpNode;
                        checkList.push(tmpDevice);
                    }
                }
                let __this = this;
                if(checkList.length === 0) {
                    $.ajax({
                        type:'post',
                        url:'/update_device',
                        async:false,
                        data:this.record,
                        success:function (response) {
                            if(response.name === 'OK') {
                                __this.record.children = deviceList.deviceNodes[__this.cityIndex].children[__this.deviceIndex].children;
                                Vue.set(deviceList.deviceNodes[__this.cityIndex].children,__this.deviceIndex,__this.record);
                                layer.msg(__this.record.name + ' 设置更改成功');
                            }else {
                                layer.alert(__this.record.name + '设置更改失败,请检查',{title:'错误'})
                            }
                        },
                        error:function (err) {
                            layer.alert(err,{title:'错误'});
                        }
                    });
                }else {
                    let tmpLayer = layer.confirm('您选择了多个设备，是否将设置应用到所有选定设备？',{
                        title:'更改设置',
                        btn:['确定','取消']
                    },function (index,layero) {
                        checkList.push({
                            cityIndex:__this.cityIndex,
                            deviceIndex:__this.deviceIndex,
                            record:JSON.parse(JSON.stringify(__this.record))
                        });
                        let multiDeviceSet = new Promise(function (resolve,reject) {
                                for (let i = 0; i < checkList.length; i++) {
                                    let tmpDevice = checkList[i];
                                    tmpDevice.record.similarity = __this.record.similarity;
                                    tmpDevice.record.quality = __this.record.quality;
                                    tmpDevice.record.hit_limit = __this.record.hit_limit;
                                    tmpDevice.record.nothit_limit = __this.record.nothit_limit;
                                    tmpDevice.record.alarm_big_opt = __this.record.alarm_small_opt;
                                    tmpDevice.record.alarm_small_opt = __this.record.alarm_small_opt;
                                    tmpDevice.record.voice_opt = __this.record.voice_opt;
                                    tmpDevice.record.switch_opt = __this.record.switch_opt;
                                    tmpDevice.record.switch_opt_time = __this.record.switch_opt_time;
                                    tmpDevice.record.cpinterval = __this.record.cpinterval;
                                    $.ajax({
                                        type: 'post',
                                        url: '/update_device',
                                        data: tmpDevice,
                                        async: false,
                                        success: function (response) {
                                            if (response.name === 'OK') {
                                                tmpDevice.record.children = deviceList.deviceNodes[tmpDevice.cityIndex].children[tmpDevice.deviceIndex].children;
                                                Vue.set(deviceList.deviceNodes[tmpDevice.cityIndex].children, tmpDevice.deviceIndex, tmpDevice.record);
                                            } else {
                                                layer.alert(tmpDevice.record.name + ' 设置更改失败,请检查');
                                            }
                                        },
                                        error: function (err) {
                                            layer.alert(error, {title: '错误'});
                                        }
                                    })
                                }
                                layer.close(tmpLayer);
                                resolve();
                            }
                        )

                    },function () {

                    });
                }

            }
        }
    });


    exports('system-config', {});
});

