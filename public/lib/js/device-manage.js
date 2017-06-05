/**
 * Created by Viking on 2017/5/17.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage,
        element = layui.element();

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
        }
    };

    axios({
        method: 'get',
        url: '/get_device_list',
        responseType: 'json',
        async: false
    })
        .then(function (response) {
            if(response.data.name === 'OK'){
                deviceList.deviceNodes = response.data.children;
                deviceManage.deviceNodes = deviceList.deviceNodes;
                $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
            }else {

            }
        })
        .catch(function (error) {

        });

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
        if(treeNode.state === '离线'){
            return {color:'red'};
        }else{
            return (treeNode.highlight) ? {color:"#2fbb3e", "font-weight":"bold"} : {color:"#2fbb3e", "font-weight":"normal"};
        }
    }

    const siteItem = {
        template:'<span class="site-item" v-on:click="changeInterface">\
        <span class="site-item-icon" v-show="showButton" @click="deleteItem"></span>\
                <p>{{item.name}}</p>\
                <p>{{item.createTime.split(" ")[0]}}</p>\
                <p>{{item.offlineNumber}}&nbsp;&nbsp;离线</p>\
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
            <span>-</span>\
            <span>{{deviceNode.ip}}</span>\
            <span>-</span>\
            <span>{{deviceNode.username}}</span>\
            <span>{{deviceNode.pwd}}</span>\
            <span>-</span>\
            <span>-</span>\
            <span :style="stateStyle(-1)">{{deviceNode.state}}</span>\
            <span><label @click="changeDevice">修改</label><img src="lib/img/down.png" @mouseover="toShowMenu(-1)" @mouseout="toCloseMenu(-1)"></span>\
            <transition name="menu">\
            <div class="device-menu" v-show="showMenu.deviceMenu" @mouseover="toShowMenu(-1)" @mouseout="toCloseMenu(-1)"><button @click="deleteItem">删除</button><button @click="addCamera">添加摄像机</button></div></transition>\
        </div>\
        <ul v-if="showChildren">\
            <li v-for="(camera,index) in deviceNode.children">\
                <span>{{camera.name}}</span>\
                <span>{{camera.id}}</span>\
                <span>{{camera.brand}}</span>\
                <span>{{camera.ip}}</span>\
                <span>{{camera.port}}</span>\
                <span>{{camera.username}}</span>\
                <span>{{camera.pwd}}</span>\
                <span>{{camera.stream}}</span>\
                <span>{{camera.delay}}</span>\
                <span :style="stateStyle(index)">{{camera.state}}</span>\
                <span><label @click="changeCamera(index)">修改</label><img src="lib/img/down.png" @mouseenter="toShowMenu(index) " @mouseleave="toCloseMenu(index)"></span>\
                <transition name="menu">\
                <div class="device-menu" v-if="showMenu.cameraMenu[index] && !showMenu.deviceMenu" @mouseenter="toShowMenu(index)" @mouseleave="toCloseMenu(index)"><button @click="deleteCamera(index)">删除</button></div></transition>\
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
        mounted:function () {
            while (this.showMenu.cameraMenu.length < this.deviceNode.children.length){
                this.showMenu.cameraMenu.push(false);
            }
        },
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
            stateStyle:function (index) {
              if(index === -1){
                   if(this.deviceNode.state === '离线'){
                       return {
                           'color':'red'
                       }
                   }
              }else{
                  if(this.deviceNode.children[index].state === '离线'){
                      return {
                          'color':'red'
                      }
                  }
              }
            },
            toShowChildren:function () {
                this.showChildren = !this.showChildren;
            },
            toShowMenu:function (index) {
                if (index === -1) {
                    this.showMenu.deviceMenu = true;
                } else {
                    Vue.set(this.showMenu.cameraMenu, index, true);
                }
            },
            toCloseMenu:function (index) {
              if(index === -1){
                  this.showMenu.deviceMenu = false;
              }  else{
                  Vue.set(this.showMenu.cameraMenu,index,false);
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
            deviceNodes:[]
        },
        computed:{

        },
        methods:{
            navClick:function (num) {
                if(num === -1){
                    this.btnShowMode = 0;
                    this.deviceShowMode = 0;
                }else{
                    this.deviceShowMode = 1;
                    this.cityIndex = num;
                }
            },
            btnClick:function () {
                if(this.btnShowMode === 0){
                    this.btnShowMode = 1;
                }else if(this.btnShowMode === 1){
                    this.btnShowMode = 0;
                }
            },
            siteClick:function (num) {
                if(this.btnShowMode === 1){
                    return ;
                }
                this.cityIndex = num;
                this.deviceShowMode = 1;
                this.btnShowMode = 2;
            },
            showButton:function (curMode) {
                return curMode === this.btnShowMode;
            },
            deleteConfirm:function (parentNode,num) {
                let __this = this;
                layer.confirm("确定要删除 " + parentNode[num].name +' 么?这会删除相关的所有记录',{
                    title:'删除确认',
                    btn:['删除','取消']
                },function (index) {
                    if(__this.deviceShowMode === 0) {
                        axios({
                            method:'post',
                            url:'/delete_region',
                            responseType:'json',
                            data:{
                                'client_id':client_id,
                                id:parentNode[num].id
                            }
                        })
                            .then(function (response) {
                                if(response.data.name === 'OK'){
                                    parentNode.splice(num,1);
                                    layer.close(index);
                                    layer.msg('删除成功');
                                }else{
                                    layer.msg('删除失败,请检查');
                                }
                            })
                            .catch(function (error) {
                                layer.alert(error.message,{
                                    title:'错误'
                                })
                            })
                    }else if(parentNode[num].children !== undefined){
                        axios({
                            method:'post',
                            url:'/delete_device',
                            responseType:'json',
                            data:{
                                'client_id':client_id,
                                id:parentNode[num].id
                            }
                        })
                            .then(function (response) {
                                if(response.data.name === 'OK'){
                                    parentNode.splice(num,1);
                                    layer.close(index);
                                    layer.msg('删除成功');
                                }else{
                                    layer.msg('删除失败,请检查');
                                }
                            })
                            .catch(function (error) {
                                layer.alert(error.message,{
                                    title:'错误'
                                })
                            })
                    }else {
                        axios({
                            method:'post',
                            url:'/delete_camera',
                            responseType:'json',
                            data:{
                                'client_id':client_id,
                                id:parentNode[num].id
                            }
                        })
                            .then(function (response) {
                                if(response.data.name === 'OK'){
                                    parentNode.splice(num,1);
                                    layer.close(index);
                                    layer.msg('删除成功');
                                }else{
                                    layer.msg('删除失败,请检查');
                                }
                            })
                            .catch(function (error) {
                                layer.alert(error.message,{
                                    title:'错误'
                                })
                            })
                    }
                },function () {

                });
            },
            deleteItem:function (deviceIndex) {
                if(this.deviceShowMode === 0){
                    this.deleteConfirm(this.deviceNodes,deviceIndex);
                }else{
                    this.deleteConfirm(this.deviceNodes[this.cityIndex].children,deviceIndex);
                }
            },
            addItem:function () {
                let __this = this;
                let date = new Date();
                let now = date.getFullYear().toString() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1).toString()) + '-' + (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString());

                layer.prompt({
                    value: '',
                    title: '请输入地区名'
                }, function(value, index, elem){
                    axios({
                        method:'post',
                        url:'/add_region',
                        data:{
                            name:value
                        }
                    })
                        .then(function (response) {
                            if(response.data.name === 'OK'){
                                let tmpNode = {
                                    id:response.data.children.id,
                                    name:value,
                                    createTime:now,
                                    offlineNumber:0,
                                    children:[]
                                };
                                if(__this.deviceShowMode === 0){
                                    __this.deviceNodes.push(tmpNode);
                                }else if(__this.deviceShowMode === 1){
                                    __this.deviceNodes[__this.cityIndex].children.push(tmpNode);
                                }
                            } else {
                                layer.alert('添加区域失败，请检查',{title:'错误'});
                            }
                        })
                        .catch(function (error) {
                            layer.alert(error.message, {title:'错误'});
                        });
                    layer.close(index);
                });
            },
            changeDevice:function (deviceIndex) {
                processDevice.deviceIndex = deviceIndex;
                processDevice.mode = '修改设备';
                let curDevice = this.deviceNodes[this.cityIndex].children[deviceIndex];
                processDevice.newDevice.id = curDevice.id;
                processDevice.newDevice.name = curDevice.name;
                processDevice.newDevice.ip = curDevice.ip;
                processDevice.newDevice.username = curDevice.username;
                processDevice.newDevice.pwd = curDevice.pwd;
                processDevice.newDevice.state = curDevice.state;
                processDevice.showThis = true;
                processDevice.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    closeBtn:0,
                    shadeClose:false,
                    title: false,
                    area: ['64.1rem','24.1rem'],
                    content: $('#device-process'),
                    cancel: function(){

                    }
                });
            },
            addDevice:function () {
                processDevice.mode = '添加设备';
                processDevice.deviceIndex = -1;
                processDevice.showThis = true;
                processDevice.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    closeBtn:0,
                    shadeClose:false,
                    title: false,
                    area: ['64.1rem','24.1rem'],
                    content: $('#device-process'),
                    cancel: function(){

                    }
                });
            },
            changeCamera:function (deviceIndex,cameraIndex) {
                processCamera.deviceIndex = deviceIndex;
                processCamera.cameraIndex = cameraIndex;
                processCamera.newCamera = JSON.parse(JSON.stringify(this.deviceNodes[this.cityIndex].children[deviceIndex].children[cameraIndex]));
                processCamera.mode = '修改摄像机';
                processCamera.showThis = true;
                processCamera.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    closeBtn:0,
                    shadeClose:false,
                    title: false,
                    area: ['64.1rem','36.1rem'],
                    content: $('#camera-process'),
                    cancel: function(){

                    }
                });
            },
            addCamera:function (deviceIndex) {
                processCamera.deviceIndex = deviceIndex;
                processCamera.cameraIndex = -1;
                processCamera.showThis = true;
                processCamera.mode = '添加摄像机';
                processCamera.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    closeBtn:0,
                    shadeClose:false,
                    title: false,
                    area: ['64.1rem','36.1rem'],
                    content: $('#camera-process'),
                    cancel: function(){
                    }
                });
            },
            deleteCamera:function (deviceIndex,cameraIndex) {
                this.deleteConfirm(this.deviceNodes[this.cityIndex].children[deviceIndex].children,cameraIndex);
            }
        },
        components:{
            'site-item':siteItem,
            'device-item':deviceItem
        }
    });

    let processDevice = new Vue({
        el:'#device-process',
        data: {
            deviceIndex: -1,
            mode:'添加设备',
            thisLayer:null,
            newDevice: {
                name:'',
                id:'-1',
                ip:'',
                username:'',
                pwd:'',
                state:'空闲',
                children:[]
            },
            showSelectStates:false,
            selectStates:['空闲','工作','离线'],
            showThis:false
        },
        methods:{
            closeThis:function () {
                layer.close(this.thisLayer);
                this.deviceIndex = -1;
                this.showThis = false;
                this.newDevice = {
                    name:'',
                    id:'-1',
                    ip:'',
                    username:'',
                    pwd:'',
                    state:'空闲',
                    children:[]
                };
            },
            selectState:function (index) {
                this.newDevice.state =  this.selectStates[index];
                this.showSelectStates = false;
            },
            doDeviceProcess:function () {
                let par = deviceManage.deviceNodes[deviceManage.cityIndex].children;
                let __this = this;
                let newDeviceInfo = {
                    client_id:client_id,
                    ip:this.newDevice.ip,
                    name:this.newDevice.name,
                    username:this.newDevice.username,
                    pwd:this.newDevice.pwd,
                    state:this.newDevice.state,
                    region_id:deviceManage.deviceNodes[deviceManage.cityIndex].id,
                    similarity:50,
                    quality:50,
                    hit_limit:100000,
                    nothit_limit:50000,
                    cpinterval:500,
                    voice_opt:true,
                    switch_opt:false,
                    switch_opt_time:1000,
                    alarm_big_opt:'',
                    alarm_small_opt:''
                };
                if(this.mode === '添加设备'){
                    axios({
                        method:'post',
                        url:'/add_device',
                        data:newDeviceInfo,
                        responseType:'json'
                    })
                        .then(function (response) {
                            if(response.data.name === 'OK'){
                                newDeviceInfo.id = response.data.children.id;
                                newDeviceInfo.children = [];
                                par.push(deviceInfo);
                            }else {
                                layer.alert('新增设备出错,请检查',{title:'错误'});
                            }
                        })
                        .catch(function (error) {
                            layer.alert(error.message,{title:'错误'});
                        })
                }else if(this.mode === '修改设备'){
                    newDeviceInfo.id = par[__this.deviceIndex].id;
                    newDeviceInfo.similarity = par[__this.deviceIndex].similarity;
                    newDeviceInfo.quality = par[__this.deviceIndex].quality;
                    newDeviceInfo.hit_limit = par[__this.deviceIndex].hit_limit;
                    newDeviceInfo.nothit_limit = par[__this.deviceIndex].nothit_limit;
                    newDeviceInfo.cpinterval = par[__this.deviceIndex].cpinterval;
                    newDeviceInfo.switch_opt = par[__this.deviceIndex].switch_opt;
                    newDeviceInfo.switch_opt_time = par[__this.deviceIndex].switch_opt_time;
                    newDeviceInfo.voice_opt = par[__this.deviceIndex].voice_opt;
                    newDeviceInfo.alarm_big_opt = par[__this.deviceIndex].alarm_big_opt;
                    newDeviceInfo.alarm_small_opt = par[__this.deviceIndex].alarm_small_opt;
                    axios({
                        method:'post',
                        url:'/update_device',
                        data:newDeviceInfo,
                        responseType:'json'
                    })
                        .then(function (response) {
                            if(response.data.name === 'OK'){
                                newDeviceInfo.children = par[__this.deviceIndex].children;
                                Vue.set(par, __this.deviceIndex, newDeviceInfo);
                            }else {
                                layer.alert('修改设备出错,请检查',{title:'错误'});
                            }
                        })
                        .catch(function (error) {
                            layer.alert(error.message,{title:'错误'});
                        })
                }
                layer.close(this.thisLayer);
                this.showThis = false;
                this.newDevice={
                    name:'',
                    id:'-1',
                    ip:'',
                    username:'',
                    pwd:'',
                    state:'空闲',
                    children:[]
                };
            }
        }
    });

    let processCamera = new Vue({
        el:'#camera-process',
        data: {
            deviceIndex: -1,
            cameraIndex: -1,
            mode:'添加摄像机',
            thisLayer:null,
            newCamera: {
                name: '',
                id: '-1',
                brand: '',
                ip: '',
                port: '',
                username: '',
                pwd: '',
                stream: '',
                delay: '',
                state: '空闲'
            },
            showSelectStates:false,
            selectStates:['空闲','工作','离线'],
            showThis:false
        },
        methods:{
            closeThis:function () {
              layer.close(this.thisLayer);
              this.showThis = false;
              this.newCamera = {
                  name: '',
                  id: '-1',
                  brand: '',
                  ip: '',
                  port: '',
                  username: '',
                  pwd: '',
                  stream: '',
                  delay: '',
                  state: '空闲'
              };
            },
            selectState:function (index) {
              this.newCamera.state =   this.selectStates[index];
              this.showSelectStates = false;
            },
            doCameraProcess:function () {
                let __this = this;
                let par = deviceManage.deviceNodes[deviceManage.cityIndex].children[this.deviceIndex].children;
                let deviceId = deviceManage.deviceNodes[deviceManage.cityIndex].children[this.deviceIndex].id;
                if(this.newCamera.name === '' || this.newCamera.username === '' || this.newCamera.pwd === ''){
                    return;
                }
                let cameraInfo = {
                    client_id:client_id,
                    ip:__this.newCamera.ip,
                    port:__this.newCamera.port,
                    name:__this.newCamera.name,
                    username:__this.newCamera.username,
                    pwd:__this.newCamera.pwd,
                    stream:__this.newCamera.stream,
                    device_id: deviceId,
                    brand:__this.newCamera.brand,
                    delay:__this.newCamera.delay,
                    state:__this.newCamera.state
                };
                if(__this.mode === '添加摄像机'){
                    axios({
                        method:'post',
                        url:'/add_camera',
                        responseType:'json',
                        data:cameraInfo
                    })
                        .then(function (response) {
                            if(response.data.name === 'OK'){
                                cameraInfo.id = response.data.children.id;
                                par.push(cameraInfo);
                            }else {
                                layer.alert('新增摄像机失败,请检查',{title:'错误'});
                            }
                        })
                        .catch(function (error) {
                            layer.alert(error.message,{title:'错误'});
                        });
                }else if(__this.mode === '修改摄像机'){
                    cameraInfo.id = __this.newCamera.id;
                    axios({
                        method:'post',
                        url:'/update_camera',
                        responseType:'json',
                        data:cameraInfo
                    })
                        .then(function (response) {
                            if(response.data.name === 'OK'){
                                cameraInfo.id = par[__this.cameraIndex].id;
                                Vue.set(par,__this.cameraIndex,cameraInfo);
                            }else {
                                layer.alert('修改摄像机失败,请检查',{title:'错误'});
                            }
                        })
                        .catch(function (error) {
                            layer.alert(error.message,{title:'错误'});
                        });

                }
                layer.close(this.thisLayer);
                this.showThis = false;
                this.newCamera={
                    name: '',
                    id: '-1',
                    brand: '',
                    ip: '',
                    port: '',
                    username: '',
                    pwd: '',
                    stream: '',
                    delay: '',
                    state: '空闲'
                };
            }
        }
    });

    exports('device-manage', {});
});

