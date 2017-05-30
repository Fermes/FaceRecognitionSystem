/**
 * Created by Viking on 2017/5/16.
 */
layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

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
              laypage({
                  cont: 'laypager'
                  ,pages: Math.ceil(recordTable.records.length/20)
                  ,first: 1
                  ,last: Math.ceil(recordTable.records.length/20)
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
                let start=this.curPage * 20;
                let end = (start + 20) > this.records.length ? (this.records.length) : (start + 20);
                let result = this.records.slice(start, end);
                while(result.length < 20){
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
                this.newRecord.id = -1;
                this.newRecord.name = name;
                this.newRecord.type = type;
                this.newRecord.number = number;
                this.newRecord.time = time;
                this.newRecord.site = site;

                this.records.push(this.newRecord);

                this.newRecord = {
                    id: -1,
                    name: "\0",
                    type: "",
                    number: "",
                    time: "",
                    site: ""
                };
            }
        }
    });

    let queryCondition = new Vue({
        el:"#query-condition",
        data:{
            selectTypes:{
                type:'白名单',
                isShow:false,
                data:['白名单','黑名单']
            },
            selectResults:{
                type:'已识别',
                isShow:false,
                data:['已识别','未识别']
            },
            name:"",
            startTime:{
                year:"2017",
                month:"01",
                day:"01",
                hour:"01",
                minute:"01"
            },
            endTime:{
                year:"",
                month:"",
                day:"",
                hour:"",
                minute:""
            },
            passportNumber:""
        },
        watch:{

        },
        methods:{
            querySubmit:function () {
                try{
                    let startYear = parseInt(this.startTime.year);
                    let startMonth = parseInt(this.startTime.month) - 1;
                    let startDay = parseInt(this.startTime.day);
                    let startHour = parseInt(this.startTime.hour);
                    let startMinute = parseInt(this.startTime.minute);
                    let startDate = new Date(startYear,startMonth,startDay,startHour,startMinute,30);

                    let endYear = parseInt(this.endTime.year);
                    let endMonth = parseInt(this.endTime.month) - 1;
                    let endDay = parseInt(this.endTime.day);
                    let endHour = parseInt(this.endTime.hour);
                    let endMinute = parseInt(this.endTime.minute);
                    let endDate = new Date(endYear,endMonth,endDay,endHour,endMinute,30);

                    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                        throw "时间格式错误！";
                    }

                    let dayOfMonth=[31,29,31,30,31,30,31,31,30,31,30,31];
                    if(startYear > 3000 || startYear < 1900 || startMonth < 0 || startMonth > 11 || startDay < 1 || startDay > dayOfMonth[startMonth] || startHour < 0 || startHour > 24 || startMinute < 0 || startMinute > 60 || endYear > 3000 || endYear < 1900 || endMonth < 0 || endMonth > 11 || endDay < 1 || endDay > dayOfMonth[endMonth] || endHour < 0 || endHour > 24 || endMinute < 0 || endMinute > 60){
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

                axios({
                    method:"post",
                    url:"",
                    data:{
                        type:this.selectTypes.type,
                        result:this.selectResults.type,
                        name:this.name,
                        startTime:this.startTime,
                        endTime:this.endTime,
                        passportNumber:this.passportNumber
                    }
                })
                    .then(function (response) {

                    })
                    .catch(function (err) {

                    });
            },
            queryReset:function () {
                this.selectTypes.type="白名单";
                this.selectResults.type="已识别";
                this.name="";
                this.startTime.year = "2017";
                this.startTime.month = "01";
                this.startTime.day = "01";
                this.startTime.hour = "01";
                this.startTime.minute = "01";
                let now = new Date();
                this.endTime.year = now.getFullYear().toString();
                let month = now.getMonth()+1;
                this.endTime.month = (month < 10) ? "0"+month : month.toString() ;
                let day = now.getDate();
                this.endTime.day = (day < 10) ? "0" + day : day.toString();
                let hour = now.getHours();
                this.endTime.hour = (hour < 10) ? "0" + hour : hour.toString();
                let minute = now.getMinutes();
                this.endTime.minute = (minute < 10) ? "0" + minute : minute.toString();
                this.passportNumber = "";
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

    $(document).ready(function(){
        $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
        queryCondition.queryReset();
        axios({
            method: 'get',
            url: '/get_device_list',
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                if(response.data.type==='OK'){
                    deviceList.deviceNodes = response.data.children;
                    $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
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
        ,pages: Math.ceil(recordTable.records.length/20)
        ,first: 1
        ,last: Math.ceil(recordTable.records.length/20)
        ,prev: '<em><</em>'
        ,next: '<em>></em>'
        ,skin: '#202d24'
        ,groups: 3
        ,jump: function(obj) {
            recordTable.curPage = obj.curr - 1;
        }
    });

    exports('statistics-query', {});
});



