/**
 * Created by Viking on 2017/5/12.
 */


layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

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

    const faceItem = {
        template:'<span class="reg-face-item" @dblclick="popInfo">\
        <img :src="record.fullImage">\
        <label>{{record.name}}</label>\
        </span>',
        props:['record','index'],
        methods:{
            popInfo:function () {
                registerFaceInfo.isShow = true;
                registerFaceInfo.id = this.record.id;
                registerFaceInfo.name = this.record.name;
                registerFaceInfo.selectGenders.type = this.record.gender;
                registerFaceInfo.selectTypes.type = this.record.label;
                registerFaceInfo.passportNumber = this.record.passportNumber;
                registerFaceInfo.place = this.record.place;
                registerFaceInfo.comments = this.record.comments;
                registerFaceInfo.fullImage = this.record.fullImage;
                registerFaceInfo.createTime = this.record.createTime;
                registerFaceInfo.index = this.index;

                registerFaceInfo.thisLayer = layer.open({
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
            }
        }
    };

    let timeMake = function (time) {
        let startYear = parseInt(time.year);
        let startMonth = parseInt(time.month) - 1;
        let startDay = parseInt(time.day);
        let startHour = parseInt(time.hour);
        let startMinute = parseInt(time.minute);

        let dayOfMonth=[31,29,31,30,31,30,31,31,30,31,30,31];
        if(startYear > 3000 || startYear < 1900 || startMonth < 0 || startMonth > 11 || startDay < 1 || startDay > dayOfMonth[startMonth] || startHour < 0 || startHour > 24 || startMinute < 0 || startMinute > 60 ){
           return -1;
        }
        return new Date(startYear,startMonth,startDay,startHour,startMinute,30);
    };

    let setTimeNow = function () {
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
                startTime:'',
                endTime:''
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
            records:[]
        },
        mounted:function (){
            this.endTime = setTimeNow();
        },
        watch:{
          records:function () {
              laypage({
                  cont: 'laypager'
                  ,pages: Math.ceil(this.records.length/24)
                  ,first: 1
                  ,last: Math.ceil(this.records.length/24)
                  ,prev: '<em><</em>'
                  ,next: '<em>></em>'
                  ,skin: '#202d24'
                  ,groups: 3
                  ,jump: function(obj) {
                      faceQuery.curPage = obj.curr - 1;
                  }
              });
          }
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

                    if (startDate === -1 || endDate === -1 || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                        throw "时间格式错误！";
                    }

                    if(endDate < startDate){
                        throw "结束时间应大于开始时间！";
                    }
                }catch (err){
                    this.queryReset();
                    layer.msg(err,{
                        time:2000,
                        icon:2
                    });
                    return;
                }
                this.queryCondition.startTime = startDate;
                this.queryCondition.endTime = endDate;
                axios({
                    method:"post",
                    url:"/get_reg_face",
                    data:this.queryCondition
                })
                    .then(function (response) {
                        if(response.data.type === "REG"){
                            faceQuery.records = response.data.children;
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
            }
        },
        components:{
            'face-item':faceItem
        }
    });

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

    let registerFaceInfo = new Vue({
        el:"#reg-face-info",
        data:{
            id:'-1',
            index:'',
            name:'',
            passportNumber:'',
            gender:'',
            selectTypes:{
                type:'白名单',
                disabled:true,
                data:['白名单','黑名单']
            },
            selectGenders:{
                type:'男',
                disabled:true,
                data:['男','女']
            },
            fullImage:'',
            createTime:'',
            place:'',
            comments:'无',
            isShow:false,
            isModify:false,
            thisLayer:null
        },
        computed:{
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
        methods: {
            closeThis:function () {
              layer.close(this.thisLayer);
              this.isModify = false;
              this.isShow = false;
              this.selectTypes.disabled = true;
              this.selectGenders.disabled = true;
            },
            toModify:function () {
                this.isModify = true;
                this.selectTypes.disabled = false;
                this.selectGenders.disabled = false;
            },
            toSubmit:function () {
                this.isModify = false;
                this.selectTypes.disabled = true;
                this.selectGenders.disabled = true;
                let data = {
                    id:this.id,
                    name:this.name,
                    gender:this.selectGenders.type,
                    label:this.selectTypes.type,
                    passportNumber:this.passportNumber,
                    createTime:this.createTime,
                    place:this.place,
                    comments:this.comments,
                    fullImage:this.fullImage
                };
                /* axios({
                    method:'post',
                    url:'',
                    data:data,
                    async:false
                })
                    .then(function (response) {

                    }).catch(function (err) {

                }); */

                let index = faceQuery.curPage * 24 + this.index;
                let tmpRecord = faceQuery.records[index];
                tmpRecord.name = data.name;
                tmpRecord.gender = data.gender;
                tmpRecord.label = data.label;
                tmpRecord.passportNumber = data.passportNumber;
                tmpRecord.createTime = data.createTime;
                tmpRecord.place = data.place;
                tmpRecord.comments = data.comments;
                this.isShow = false;
                layer.close(this.thisLayer);
            }
        },
        components:{
            'frs-select':frsSelect
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
            number:"",
            site:"",
            type:"",
            remark:"",
            endProgress:100,
            curProgress:100,
            progressTimer: null,
            errorMessage:"无"
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
                    layer.msg("请选择图片文件！",{
                        icon:2,
                        time:2000
                    });
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
                    layer.alert('请选择人脸图片！',{
                        icon: 2,
                        title:'上传失败'
                    });
                    return;
                }

                if(images.length === 0){
                    layer.alert('请选择人脸图片！',{
                        icon: 2,
                        title:'上传失败'
                    });
                    document.getElementById("multi-upload").value = '';
                    return;
                }
                let formData = new FormData();
                let success = 0;
                let imageType = /image.*/;
                for(let i = 0;i < images.length;i++){
                    if(images[i].type.match(imageType)){
                        formData.append('image' + success,images[i]);
                        success++;
                    }
                }
                formData.append('number',success);
                formData.append('type',this.selectTypes.type);

                document.getElementById("multi-upload").value = '';
                axios({
                    method: 'post',
                    url: '/user/12345',
                    responseType:'json',
                    data: formData,
                    headers: {
                        'X-File-Name': 'multi-images',
                        'Content-Type': 'multipart/form-data'
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(function (response) {
                        layer.msg('成功上传图片 '+success+' 张, 失败 ' + (images.length - success) + " 张");
                    })
                    .catch(function (error) {

                    });
            },
            singleSubmit:function (event) {
                let img = document.getElementById("single-upload").files[0];
                let imageType = /image.*/;
                if(img === undefined || img === null){
                    layer.alert('请选择人脸图片！',{
                        icon: 2,
                        title:'上传失败'
                    });
                    return;
                }
                if(!img.type.match(imageType)){
                    layer.alert('请选择人脸图片！',{
                        icon: 2,
                        title:'上传失败'
                    });
                    return;
                }
                if(faceReg.type !== "白名单" || faceReg.type !== "黑名单"){
                    layer.msg('类别填写错误，请修正！',{
                        icon:2,
                        time:2000
                    });
                    return;
                }
                let formData = new FormData();
                formData.append("image",img);
                formData.append("name",faceReg.name);
                formData.append("gender",faceReg.gender);
                formData.append("type",faceReg.type);
                formData.append("passportNumber",faceReg.number);
                formData.append("site",faceReg.site);
                formData.append("remark",faceReg.remark);
                axios({
                    method: 'post',
                    url: '/user/12345',
                    responseType:'json',
                    data: formData,
                    headers: {
                        'X-File-Name': 'single-image',
                        'Content-Type': 'multipart/form-data'
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(function (response) {
                        layer.msg('注册成功！',{
                            icon:1,
                            time:2000
                        });
                        faceReg.name = "";
                        faceReg.gender = "";
                        faceReg.type = "";
                        faceReg.number = "";
                        faceReg.site = "";
                        faceReg.remark = "";
                        document.getElementById("single-image").src = "lib/img/ironman.jpg";
                        document.getElementById("single-upload").value = '';
                    })
                    .catch(function (error) {

                    });
            }
        },
        components:{
            'frs-select':frsSelect
        }
    });



    $(document).ready(function(){
        axios({
            method: 'get',
            url: '/get_device_list',
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                if(response.data.type === 'OK'){
                    deviceList.deviceNodes = response.data.children;
                    $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
                }

            })
            .catch(function (error) {

            });

    });


    exports('face-register', {});
});


