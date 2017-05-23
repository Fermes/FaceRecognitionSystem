/**
 * Created by Viking on 2017/5/17.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage,
        element = layui.element();

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

                }
            },
            deviceNodes: [],
            preNodeList:null
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
            )
        }
    });


    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color:"#2fbb3e", "font-weight":"bold"} : {color:"#2fbb3e", "font-weight":"normal"};
    }

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
                deviceManage.deviceNodes = deviceList.deviceNodes;
            })
            .catch(function (error) {

            });
    });

    const siteItem = {
        template:'<span class="site-item" v-on:click="changeInterface">\
        <span class="site-item-icon" v-show="showButton" @click="deleteItem"></span>\
                <p>{{item.name.split(" ")[0]}}</p>\
                <p>{{item.date}}</p>\
                <p>{{item.errorNumber}}错误&nbsp;&nbsp;{{item.offlineNumber}}离线</p>\
    </span>',
        props:['item','mode'],
        computed:{
            showButton:function () {
                return this.mode === 1;
            }
        },
        methods:{
            changeInterface:function () {
                this.$emit('change-interface');
            },
            deleteItem:function () {
                this.$emit('delete-item');
            }
        }
    };
    const deviceItem = {
        template: ' <div class="device-item">\
        <span class="device-info"v-on:dblclick="toShowChildren">\
            <span class="device-switch-icon" :style="switchStyle" ></span>\
            <p>{{deviceNode.name}}</p>\
            <p>{{deviceNode.id}}</p>\
            <p>{{deviceNode.brand}}</p>\
            <p>{{deviceNode.ip}}</p>\
            <p>{{deviceNode.port}}</p>\
            <p>{{deviceNode.username}}</p>\
            <p>{{deviceNode.password}}</p>\
            <p>{{deviceNode.stream}}</p>\
            <p>{{deviceNode.timeout}}</p>\
            <p>{{deviceNode.state}}</p>\
            <p><label @click="changeDevice">修改</label><img src="lib/img/down.png" @click="toShowMenu(-1)"></p>\
            <div class="device-menu" v-show="showDeviceMenu"><button @click="deleteItem">删除</button><button @click="addCamera">添加摄像机</button></div>\
        </span>\
        <ul v-if="showChildren">\
            <li v-for="(camera,num) in deviceNode.children" :key="index">\
                <p>{{camera.name}}</p>\
                <p>{{camera.id}}</p>\
                <p>{{camera.brand}}</p>\
                <p>{{camera.ip}}</p>\
                <p>{{camera.port}}</p>\
                <p>{{camera.username}}</p>\
                <p>{{camera.password}}</p>\
                <p>{{camera.stream}}</p>\
                <p>{{camera.timeout}}</p>\
                <p>{{camera.state}}</p>\
                <p><label @click="changeCamera(index)">修改</label><img src="lib/img/down.png" @click="toShowMenu(index)"></p>\
                <div class="device-menu" v-show="showCameraMenu(index)"><button @click="deleteCamera(index)">删除</button></div>\
            </li>\
        </ul>\
        </div>',
        props:['deviceNode','parentIndex'],
        data:function () {
            return {
                showChildren:false,
                showDeviceMenu:false,
                cameraMenu:[true,true,true]
            }
        },
        computed:{
            switchStyle:function () {
                if(this.showChildren){
                    return {
                        'background-image': 'url("lib/img/left_menu.png")',
                        'background-position': '0px -20px'
                    }
                }else{
                    return {
                        'background-image': 'url("lib/img/left_menu.png")',
                        'background-position': '-20px -20px'
                    }
                }
            }
        },
        methods:{
            toShowChildren:function () {
                while (this.cameraMenu.length < this.deviceNode.children.length){
                    this.cameraMenu.push(false);
                }
                this.showChildren = !this.showChildren;
            },
            showCameraMenu:function (index) {
                if(this.cameraMenu[index] === undefined){
                    this.cameraMenu[index] = false;
                    return true;
                }
                return this.cameraMenu[index];
            },
            toShowMenu:function (num) {
                if(num === -1){
                    this.showDeviceMenu = !this.showDeviceMenu;
                    return;
                }
                this.cameraMenu[num] = !this.cameraMenu[num];

            },
            changeDevice:function () {
              this.$emit('change-device');
            },
            changeCamera:function (cameraIndex) {
                this.$emit('change-camera',this.parentIndex,cameraIndex);
            },
            deleteItem:function () {
                this.$emit('delete-device');
                this.showDeviceMenu = false;
            },
            deleteCamera:function (cameraIndex) {
                this.$emit('delete-camera',this.parentIndex,cameraIndex);
                this.showCameraMenu[cameraIndex] = false;
            },
            addCamera:function () {
                this.$emit('add-camera');
                this.showDeviceMenu = false;
            }
        }
    };


    let deviceManage = new Vue({
        el:"#device-manage",
        data:{
            deviceShowMode:2,
            btnShowMode:2,
            cityIndex:0,
            courtIndex:0,
            deviceNodes:[]
        },
        computed:{
            siteNodes:function () {
                if(this.deviceShowMode === 0){
                    return this.deviceNodes;
                }else{
                    return this.deviceNodes[this.cityIndex].children;
                }
            }
        },
        methods:{
            navClick:function (num) {
                this.btnShowMode = 0;
                if(num === -1){
                    this.deviceShowMode = 0;
                    this.cityIndex = -1;
                }else{
                    this.deviceShowMode = 1;
                    this.courtIndex = -1;
                }
            },
            btnClick:function () {
                if(this.btnShowMode === 0){
                    this.btnShowMode = 1;
                }else if(this.btnShowMode === 1){
                    this.btnShowMode = 0;
                }else{

                }
            },
            siteClick:function (num) {
                if(this.btnShowMode === 1){
                    return ;
                }
                if(this.deviceShowMode === 0){
                    this.cityIndex = num;
                    this.courtIndex = -1;
                    this.deviceShowMode = 1;
                }else{
                    this.deviceShowMode = 2;
                    this.btnShowMode = 2;
                    this.courtIndex = num;
                }
            },
            showButton:function (curMode) {
                return curMode === this.btnShowMode;
            },
            showNav:function (curMode) {
                return curMode <= this.deviceShowMode;
            },
            showMode:function (curMode) {
                return curMode === this.deviceShowMode || (curMode === 0 && this.deviceShowMode === 1);
            },
            deleteConfirm:function (parentNode,num) {
                layer.confirm("确定要删除 " + parentNode[num].name +' 么？',{
                    icon: 0,
                    skin: 'layui-layer-molv',
                    btn:['删除','取消']
                },function (index) {
                    parentNode.splice(num,1);
                    $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
                    layer.close(index);
                },function () {

                });
            },
            deleteItem:function (deviceIndex) {
                if(this.deviceShowMode === 0){
                    this.deleteConfirm(this.deviceNodes,deviceIndex);
                }else if(this.deviceShowMode === 1){
                    this.deleteConfirm(this.deviceNodes[this.cityIndex].children,deviceIndex);
                }else{
                    this.deleteConfirm(this.deviceNodes[this.cityIndex].children[this.courtIndex].children,deviceIndex);
                }
            },
            changeDevice:function (deviceIndex) {
                layer.msg('修改设备'+deviceIndex);
            },
            changeCamera:function (deviceIndex,cameraIndex) {
                layer.msg(deviceIndex+'修改'+cameraIndex);
            },
            addCamera:function (deviceIndex) {
                layer.msg('增加摄像头'+deviceIndex);
            },
            deleteCamera:function (deviceIndex,cameraIndex) {
                this.deleteConfirm(this.deviceNodes[this.cityIndex].children[this.courtIndex].children[deviceIndex].children,cameraIndex);
            }
        },
        components:{
            'site-item':siteItem,
            'device-item':deviceItem
        }
    });


    exports('device-manage', {});
});

