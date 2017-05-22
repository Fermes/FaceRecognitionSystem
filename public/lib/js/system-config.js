/**
 * Created by Viking on 2017/5/22.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

    let deviceList = new Vue({
        el:"#deviceList",
        data:{
            value:"",
            setting:{
                edit:{
                    enable:true
                },
                check:{
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "", "N": "" }
                },
                view:{
                    showIcon:false,
                    showLine:false,
                    fontCss: getFontCss
                },
                callback: {
                    //onDrop:dragToPlay
                }
            },
            deviceNodes:[],
            preNodeList:null,
            allChecked:false
        },
        watch:{
            value: function (newValue) {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                zTree.expandAll(false);
                this.searchNode(newValue);
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
            ),
            revertCheck:function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                let allNodes = zTree.transformToArray(zTree.getNodes());
                for(let i = 0;i < allNodes.length;i++){
                    zTree.checkNode(allNodes[i]);
                }
            },
            allCheck:function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                this.allChecked = !this.allChecked;
                zTree.checkAllNodes(this.allChecked);
            }
        }
    });

    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color:"#2fbb3e", "font-weight":"bold"} : {color:"#2fbb3e", "font-weight":"normal"};
    }

    let systemSetting = new Vue({
        el:"#frs-set",
        data: {
            similarity:0,
            faceQuality:0,
            recCapacity:0,
            noRecCapacity:0,
            warnInfo:"",
            voice:false,
            switchOutput:false,
            switchOutputTime:"",
            intervalSecond:""
        },
        methods:{
            submitSetting:function () {
                axios({
                    method: 'post',
                    url: '/system_setting',
                    responseType: 'json',
                    data:{
                        similarity:this.similarity,
                        faceQuality:this.faceQuality,
                        recCapacity:this.recCapacity,
                        noRecCapacity:this.noRecCapacity,
                        warnInfo:this.warnInfo,
                        voice:this.voice,
                        switchOutput:this.switchOutput,
                        switchOutputTime:this.switchOutputTime,
                        intervalSecond:this.intervalSecond
                    },
                    async: false
                }).then(function (res) {
                    layer.msg(res.data,{
                        icon:1,
                        time:2000
                    });
                }).error(function (err) {

                });
            }
        }
    });
    $(document).ready(function(){
        $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
        axios({
            method: 'get',
            url: '/get_device_list',
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                deviceList.deviceNodes = response.data;
                $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
            })
            .catch(function (error) {

            });
    });

    exports('system-config', {});
});

