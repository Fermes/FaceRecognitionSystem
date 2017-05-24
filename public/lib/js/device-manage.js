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
        <div class="device-info" @dblclick="toShowChildren">\
        <div class="switch-icon" :style="switchStyle"></div>\
            <span>{{deviceNode.name}}</span>\
            <span>{{deviceNode.id}}</span>\
            <span>{{deviceNode.brand}}</span>\
            <span>{{deviceNode.ip}}</span>\
            <span>{{deviceNode.port}}</span>\
            <span>{{deviceNode.username}}</span>\
            <span>{{deviceNode.password}}</span>\
            <span>{{deviceNode.stream}}</span>\
            <span>{{deviceNode.timeout}}</span>\
            <span>{{deviceNode.state}}</span>\
            <span><label @click="changeDevice">修改</label><img src="lib/img/down.png" @click="toShowMenu(-1)"></span>\
            <div class="device-menu" v-show="showMenu.deviceMenu"><button @click="deleteItem">删除</button><button @click="addCamera">添加摄像机</button></div>\
        </div>\
        <ul v-show="showChildren">\
            <li v-for="(camera,index) in deviceNode.children">\
                <span>{{camera.name}}</span>\
                <span>{{camera.id}}</span>\
                <span>{{camera.brand}}</span>\
                <span>{{camera.ip}}</span>\
                <span>{{camera.port}}</span>\
                <span>{{camera.username}}</span>\
                <span>{{camera.password}}</span>\
                <span>{{camera.stream}}</span>\
                <span>{{camera.timeout}}</span>\
                <span>{{camera.state}}</span>\
                <span><label @click="changeCamera(index)">修改</label><img src="lib/img/down.png" @click="toShowMenu(index)"></span>\
                <div class="device-menu" v-if="showMenu.cameraMenu[index] && !showMenu.deviceMenu" ><button @click="deleteCamera(index)">删除</button></div>\
            </li>\
        </ul>\
        </div>',
        data:function () {
            return {
                showChildren:false,
                showMenu:{
                    deviceMenu:false,
                    cameraMenu:[]
                }
            }
        },
        props:['deviceNode','parentIndex'],
        computed:{
            switchStyle:function () {
                if(this.showChildren){
                    return {
                        'background': 'url("lib/img/left_menu.png") no-repeat',
                        'background-position': '0px -20px'
                    }
                }else{
                    return {
                        'background': 'url("lib/img/left_menu.png") no-repeat',
                        'background-position': '-20px -20px'

                    }
                }
            }
        },
        methods:{
            toShowChildren:function () {
                while (this.showMenu.cameraMenu.length < this.deviceNode.children.length){
                    this.showMenu.cameraMenu.push(false);
                }
                this.showChildren = !this.showChildren;
            },
            toShowMenu:function (num) {
                if (num === -1) {
                    this.showMenu.deviceMenu = !this.showMenu.deviceMenu;
                } else {
                    if (!this.showMenu.deviceMenu) {
                        Vue.set(this.showMenu.cameraMenu, num, !this.showMenu.cameraMenu[num]);
                    }
                }
            },
            changeDevice:function () {
              this.$emit('change-device');
            },
            changeCamera:function (cameraIndex) {
                this.$emit('change-camera',this.parentIndex,cameraIndex);
            },
            deleteItem:function () {
                this.showMenu.deviceMenu = false;
                this.$emit('delete-device');
            },
            deleteCamera:function (cameraIndex) {
                Vue.set(this.showMenu.cameraMenu,cameraIndex,false)
                this.$emit('delete-camera',this.parentIndex,cameraIndex);
            },
            addCamera:function () {
                this.showMenu.deviceMenu = false;
                this.$emit('add-camera');
            }
        }
    };


    let deviceManage = new Vue({
        el:"#device-manage",
        data:{
            deviceShowMode:0,
            btnShowMode:0,
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

