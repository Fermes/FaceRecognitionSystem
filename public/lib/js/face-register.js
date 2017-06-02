/**
 * Created by Viking on 2017/5/12.
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
        let msg = receiveMsg.split(':');
        if(msg[0] === 'id'){
            client_id = msg[2];
        }
    };
    ws.ondata = function (record) {

    };

    let deviceList=new Vue({
        el:"#device-list",
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
            deviceNodes: [],
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

    const frsSelect = {
        template:'<span class="select-item">\
        <label @click="selectNodeShow">{{select.type}}</label>\
    <span class="select-node" v-show="isShow">\
        <label v-for="(type,index) in select.data" :key="index" @click="selectItem(type)">{{type}}</label>\
    </span>\
    </span>',
        data:function () {
            return {
                isShow:false
            }
        },
        props:['select'],
        methods:{
            selectNodeShow:function () {
                if(!this.select.disabled){
                    this.isShow = !this.isShow;
                }
            },
            selectItem:function (type) {
                this.select.type = type;
                this.isShow = !this.isShow;
                this.$emit('update:select',this.select);
            }
        }
    };

    const regFaceInfo = {
        template:'<div class="reg-face-info" v-show="popRecord.isShow"><span class="close-icon" @click="closeThis"></span>\
        <div class="reg-face-title">\
        <label>人脸信息</label>\
        </div>\
        <div class="reg-face-content"><span><img :src="popRecord.record.fullImage"></span><span>\
        <label>姓名</label>\
        <label>证件号</label>\
        <input :disabled="!isModify" v-model="popRecord.record.name" :style="modifyStyle">\
        <input :disabled="!isModify" v-model="popRecord.record.passportNumber" :style="modifyStyle">\
        <label>性别</label>\
        <label>类别</label>\
        <frs-select :select.sync="selectGenders"></frs-select>\
        <frs-select :select.sync="selectTypes"></frs-select>\
        <label>注册时间</label>\
        <input :disabled="!isModify" v-model="popRecord.record.createTime" :style="modifyStyle">\
        <label>地址</label>\
        <input :disabled="!isModify" v-model="popRecord.record.place" :style="modifyStyle">\
        <label>备注</label>\
        <textarea :disabled="!isModify" v-model="popRecord.record.comments"></textarea></span>\
        <button v-if="!isModify" @click="toModify">修改</button>\
        <button v-if="isModify" @click="toSubmit">应用</button>\
        </div>\
        </div>',
        props:['pop-record'],
        data:function () {
          return {
              isModify:false
          }
        },
        computed:{
            selectGenders:function () {
                let gender = (this.popRecord.record.gender === undefined) ? '' : this.popRecord.record.gender;
                return {
                    type: gender,
                    disabled:true,
                    data:['男','女']
                }
            },
            selectTypes:function () {
                let label = (this.popRecord.record.label === undefined) ? '' : this.popRecord.record.label;
                return {
                    type:label,
                    disabled:true,
                    data:['白名单','黑名单']
                }
            },
            modifyStyle:function () {
                if(this.isModify){
                    return {
                        'border-bottom':'2px solid #1b5c24'
                    }
                }else{
                    return {

                    }
                }
            }
        },
        methods:{
            closeThis:function(){
                layer.close(this.popRecord.thisLayer);
                this.popRecord.isShow = false;
                this.selectGenders.disabled = true;
                this.selectTypes.disabled = true;
                this.isModify = false;
            },
            toModify:function () {
                this.isModify = true;
                this.selectGenders.disabled = false;
                this.selectTypes.disabled = false;
            },
            toSubmit:function () {
                this.isModify = false;
                this.selectGenders.disabled = true;
                this.selectTypes.disabled = true;
                this.popRecord.record.gender = this.selectGenders.type;
                this.popRecord.record.label = this.selectTypes.type;
                this.$emit('update-item',JSON.parse(JSON.stringify(this.popRecord.record)))
            }
        },
        components:{
            'frs-select':frsSelect
        }
    };

    const faceItem = {
        template:'<span class="reg-face-item" @dblclick="popInfo">\
        <img :src="record.fullImage">\
        <label>{{record.name}}</label>\
        </span>',
        props:['record','index'],
        methods:{
            popInfo:function () {
                this.$emit('pop-info',this.index)
            }
        }
    };

    const timeMake = function (time) {
        let startYear = parseInt(time.year);
        let startMonth = parseInt(time.month) - 1;
        let startDay = parseInt(time.day);
        let startHour = parseInt(time.hour);
        let startMinute = parseInt(time.minute);

        let dayOfMonth=[31,29,31,30,31,30,31,31,30,31,30,31];
        let date = new Date(startYear,startMonth,startDay,startHour,startMinute,30);
        if(startYear > 3000 || startYear < 1900 || startMonth < 0 || startMonth > 11 || startDay < 1 || startDay > dayOfMonth[startMonth] || startHour < 0 || startHour > 24 || startMinute < 0 || startMinute > 60 || isNaN(date.getTime())){
            return -1;
        }
        return date;
    };

    const timeRegular = function (date) {
        let time = {
            year:'',
            month:'',
            day:'',
            hour:'',
            minute:''
        };
        time.year = date.getFullYear().toString();
        let month = date.getMonth()+1;
        time.month = (month < 10) ? "0"+month : month.toString() ;
        let day = date.getDate();
        time.day = (day < 10) ? "0" + day : day.toString();
        let hour = date.getHours();
        time.hour = (hour < 10) ? "0" + hour : hour.toString();
        let minute = date.getMinutes();
        time.minute = (minute < 10) ? "0" + minute : minute.toString();
        return time.year + '-' + time.month + '-' + time.day + ' ' + time.hour + ':' + time.minute + ':00';
    };

    const setTimeNow = function () {
        let now = new Date();
        let endTime = {
            year:'',
            month:'',
            day:'',
            hour:'',
            minute:'',
        };
        endTime.year = now.getFullYear().toString();
        let month = now.getMonth()+1;
        endTime.month = (month < 10) ? "0"+month : month.toString() ;
        let day = now.getDate();
        endTime.day = (day < 10) ? "0" + day : day.toString();
        let hour = now.getHours();
        endTime.hour = (hour < 10) ? "0" + hour : hour.toString();
        let minute = now.getMinutes();
        endTime.minute = (minute < 10) ? "0" + minute : minute.toString();
        return endTime;
    };



    let faceQuery = new Vue({
        el:"#face-query",
        data:{
            queryCondition:{
                name:'',
                label:'',
                passportNumber:'',
            },
            startTime:{
                year:'2017',
                month:'01',
                day:'01',
                hour:'01',
                minute:'01',
            },
            endTime:{
                year:'',
                month:'',
                day:'',
                hour:'',
                minute:'',
            },
            curPage:0,
            records:[],
            popRecord:{
                index:-1,
                record:null,
                isShow:false,
                thisLayer:null
            }
        },
        mounted:function (){
            this.endTime = setTimeNow();
        },
        computed:{
            pageRecords:function () {
                let start = this.curPage * 24;
                let end = (start + 24) > this.records.length ? (this.records.length) : (start + 24);
                return this.records.slice(start, end);
            }
        },
        methods:{
            querySubmit:function () {
                let startDate = '',endDate = '';
                try{
                    startDate = timeMake(this.startTime);

                    endDate = timeMake(this.endTime);

                    if (startDate === -1 || endDate === -1) {
                        throw "时间格式错误！";
                    }

                    if(endDate < startDate){
                        throw "结束时间应大于开始时间！";
                    }

                    startDate = timeRegular(startDate);
                    endDate = timeRegular(endDate);
                }catch (err){
                    this.queryReset();
                    layer.msg(err,{
                        time:2000,
                        icon:2
                    });
                    return;
                }

                let condition = {
                    dic: {
                        startTime: startDate,
                        endTime: endDate
                    },
                    name:this.queryCondition.name,
                    label:this.queryCondition.label,
                    passportNumber:this.queryCondition.passportNumber,
                    user_id:'',
                    device_id:''
                }
                let searchArea = {
                    'camera_list':[],
                    'device_list':[],
                    'region_list':[]
                };
                let deviceTree = $.fn.zTree.getZTreeObj("deviceTree");
                let checkNodes = deviceTree.getCheckedNodes();
                if(checkNodes.length > 0){
                    for(let i = 0;i < checkNodes.length;i++){
                        if(checkNodes[i].getParentNode() === null){
                            searchArea.region_list.push(checkNodes[i].id);
                        }else if(checkNodes[i].children === undefined){
                            searchArea.camera_list.push(checkNodes[i].id);
                        }else{
                            searchArea.device_list.push(checkNodes[i].id)
                        }
                    }
                    condition.dic.assign('search_area',searchArea);
                }
                axios({
                    method:"post",
                    url:"/search_face",
                    responseType:'json',
                    data:condition
                })
                    .then(function (response) {
                        if(response.data.name === "REG"){
                            faceQuery.records = response.data.children;
                            laypage({
                                cont: 'laypager'
                                ,pages: Math.ceil(faceQuery.records.length/24)
                                ,first: 1
                                ,last: Math.ceil(faceQuery.records.length/24)
                                ,prev: '<em><</em>'
                                ,next: '<em>></em>'
                                ,skin: '#202d24'
                                ,groups: 3
                                ,jump: function(obj) {
                                    faceQuery.curPage = obj.curr - 1;
                                }
                            });
                        }
                    })
                    .catch(function (err) {

                    });
            },
            queryReset:function () {
                this.queryCondition.name="";
                this.queryCondition.passportNumber = '';
                this.queryCondition.label = '';
                this.queryCondition.startTime = '';
                this.queryCondition.endTime = '';
                this.startTime = {
                    year:'2017',
                    month:'01',
                    day:'01',
                    hour:'01',
                    minute:'01'
                };
                this.endTime = setTimeNow();
            },
            popRecordInfo:function (index) {
                this.popRecord.index = index + this.curPage * 24;
                this.popRecord.record = JSON.parse(JSON.stringify(this.records[this.popRecord.index]));
                this.popRecord.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    closeBtn:0,
                    shadeClose:false,
                    title: false,
                    area: ['37.1rem','27.1rem'],
                    content: $('#reg-face-info'),
                    cancel: function(){
                    }
                });
                this.popRecord.isShow = true;
            },
            updateItem:function (newRecord) {
                axios({
                    method:'post',
                    url:'/update_user_to_platform',
                    responseType:'json',
                    data:newRecord
                })
                    .then(function (response) {
                        if(response.data.name === 'OK'){
                            Vue.set(this.records,this.popRecord.index,newRecord);
                        }else{
                            layer.alert('更新失败，请重试！');
                        }
                    });
            }
        },
        components:{
            'face-item':faceItem,
            'reg-face-info':regFaceInfo
        }
    });

    let faceReg = new Vue({
        el:"#face-reg",
        data:{
            selectTypes:{
                type:'白名单',
                data:['白名单','黑名单']
            },
            name:"",
            gender:"",
            passportNumber:"",
            place:"",
            label:"",
            comments:"",
            endProgress:100,
            curProgress:100,
            progressTimer: null,
            errorMessage:""
        },
        watch:{
            endProgress:function () {
                if(this.curProgress < this.endProgress){
                    this.progressTimer = setInterval('faceReg.curProgress++;',50);
                }
            },
            curProgress:function () {
                if(this.curProgress === this.endProgress){
                    clearInterval(this.progressTimer);
                }
            }
        },
        methods:{
            multiImages:function () {
                document.getElementById("multi-upload").click();
            },
            singleImage:function (){
                document.getElementById("single-upload").click();
            },
            imgPreview:function (e) {
                let img = document.getElementById("single-upload").files[0];
                let imageType = /image.*/;
                if(!img.type.match(imageType)){
                    layer.msg("请选择图片文件！");
                    document.getElementById("single-upload").value='';
                    return;
                }
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        document.getElementById("single-image").src = reader.result;
                    };
                })(img);
                reader.readAsDataURL(img);
            },
            progressStyle:function (num) {
                if(num <= this.curProgress / 2.5){
                    return {
                        backgroundColor:'#2fbb3e'
                    }
                }else{
                    return {
                        backgroundColor:'#f00000'
                    }
                }
            },
            multiSubmit:function () {
                let images = document.getElementById("multi-upload").files;
                if(images === undefined || images === null){
                    layer.msg('请选择人脸图片！');
                    return;
                }

                if(images.length === 0){
                    layer.msg('请选择人脸图片！');
                    document.getElementById("multi-upload").value = '';
                    return;
                }
                let __this = this;

                let faceIdList = [];
                let imageType = /image.*/;
                __this.errorMessage = '';
                for(let i = 0;i < images.length;i++){
                    if(images[i].type.match(imageType)){
                        let formData = new FormData();
                        formData.append('fullImage',images[i]);
                        formData.append('label',this.selectTypes.type);
                        axios({
                            method: 'post',
                            url: '/add_user_to_platform',
                            responseType:'json',
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                                // 'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            async:false
                        })
                            .then(function (response) {
                                if(response.data.name === 'OK'){
                                    faceIdList.push(response.data.children.id);
                                }
                                if(response.data.name === 'ERROR'){
                                    __this.errorMessage += images[i].name + ' 注册出错\n'
                                }
                            })
                            .catch(function (error) {

                            });
                    }else {
                        __this.errorMessage += images[i].name + ' 不是图片文件\n'
                    }
                }

                if(faceIdList.length > 0){
                    let deviceTree = $.fn.zTree.getZTreeObj("deviceTree");
                    let checkNodes = deviceTree.getCheckedNodes();
                    let deviceList = [];
                    if(checkNodes.length > 0){
                        for(let i = 0;i < checkNodes.length;i++){
                            if(checkNodes[i].getParentNode() !== null && checkNodes[i].children !== undefined){
                                deviceList.push(checkNodes[i].id);
                            }
                        }
                    }
                    axios({
                        method:'post',
                        url:'/add_batch_user_to_device',
                        data:{
                            'client_id':client_id,
                            'json_data':{
                                'deviceid_list':deviceList,
                                'cameraid_list':faceIdList
                            }
                        }
                    })
                        .then(function (response) {
                            if(response.data.name==='OK'){
                                layer.alert('上传完成,共 '+images.length +' 张图片,成功 '+success + ' 张',{
                                    title:'批量上传'
                                });
                                document.getElementById("multi-upload").value = '';
                            }else{
                                layer.alert('上传失败,请检查!');
                            }
                        })
                        .catch(function (error) {

                        });
                }
            },
            singleSubmit:function (event) {
                let img = document.getElementById("single-upload").files[0];
                let imageType = /image.*/;
                if(img === undefined || img === null){
                    layer.msg('请选择人脸图片！');
                    return;
                }
                if(!img.type.match(imageType)){
                    layer.msg('请选择人脸图片！');
                    return;
                }
                if(faceReg.label !== "白名单" || faceReg.label !== "黑名单"){
                    layer.msg('类别填写错误，请修正！');
                    return;
                }
                let formData = new FormData();
                formData.append("fullImage",img);
                formData.append("label",faceReg.label);
                if(faceReg.name !== ''){
                    formData.append("name",faceReg.name);
                }
                if(faceReg.gender　!== ''){
                    formData.append("gender",faceReg.gender);
                }
                if(faceReg.passportNumber !== ''){
                    formData.append("passportNumber",faceReg.passportNumber);
                }
                if(faceReg.place !== ''){
                    formData.append("place",faceReg.place);
                }
                if(faceReg.comments !== ''){
                    formData.append("comments",faceReg.comments);
                }
                axios({
                    method: 'post',
                    url: '/add_user_to_platform',
                    responseType:'json',
                    data: formData,
                    headers: {
                        'X-File-Name': 'single-image',
                        'Content-Type': 'multipart/form-data'
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(function (response) {
                        if(response.data.name == 'OK'){
                            layer.msg('注册成功！');
                            faceReg.name = "";
                            faceReg.gender = "";
                            faceReg.label = "";
                            faceReg.passportNumber = "";
                            faceReg.place = "";
                            faceReg.comments = "";
                            document.getElementById("single-image").src = "lib/img/ironman.jpg";
                            document.getElementById("single-upload").value = '';
                        }
                    })
                    .catch(function (error) {

                    });
            }
        },
        components:{
            'frs-select':frsSelect
        }
    });

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
            }

        })
        .catch(function (error) {

        });
    exports('face-register', {});
});


