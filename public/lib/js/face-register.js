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
        watch: {
            records: function () {
                layui.laypage({
                    cont: 'laypager'
                    , pages: Math.ceil(recordTable.records.length / 25)
                    , first: 1
                    , last: Math.ceil(recordTable.records.length / 25)
                    , prev: '<em><</em>'
                    , next: '<em>></em>'
                    , skin: '#202d24'
                    , groups: 3
                    , jump: function (obj) {
                        recordTable.curPage = obj.curr - 1;
                    }
                });
            }
        },
        computed:{
            pageRecords:function () {
                let start=this.curPage * 25;
                let end = (start + 25) > this.records.length ? (this.records.length) : (start + 25);
                let result = this.records.slice(start, end);
                while(result.length < 25){
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

                this.records.push(this.newRecord);

                this.newRecord = {
                    id:-1,
                    name: "\0",
                    type: "",
                    number: "",
                    time: "",
                    site: ""
                };
            }
        }
    });

    let faceReg = new Vue({
        el:"#face-reg",
        data:{
            selectTypes:{
                type:'白名单',
                isShow:false,
                data:['白名单','黑名单']
            },
            name:"",
            gender:"",
            type:"",
            number:"",
            site:"",
            remark:"",
            endProgress:100,
            curProgress:100,
            progressTimer: null
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
            },
            selectItem:function (item,type) {
                this[item].type = type;
                this[item].isShow = !this[item].isShow;
            },
            selectNodeShow:function (item) {
                this[item].isShow = !this[item].isShow;
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
                let records = response.data;
                for (let i = 0; i < records.length; i++) {
                    recordTable.addRecord(records[i].id, records[i].user.name, records[i].user.label, records[i].user.passportNumber, records[i].createTime, records[i].place);
                }
            })
            .catch(function (error) {

            });
    });

    laypage({
        cont: 'laypager'
        ,pages: Math.ceil(recordTable.records.length/25)
        ,first: 1
        ,last: Math.ceil(recordTable.records.length/25)
        ,prev: '<em><</em>'
        ,next: '<em>></em>'
        ,skin: '#202d24'
        ,groups: 3
        ,jump: function(obj) {
            recordTable.curPage = obj.curr - 1;
        }
    });

    exports('face-register', {});
});


