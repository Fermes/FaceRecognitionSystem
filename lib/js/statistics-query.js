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
                name:"\0",
                type:"",
                number:"",
                time:"",
                address:""
            },
            records:[
                {
                    name:"爱立托木买买提题雨哦木老爱丽木么么哒",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"李亚民",
                    type:"白名单",
                    number:"210120198211073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-惠民小区-设备1-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托木买买提",
                    type:"黑名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },{
                    name:"爱立托买买提",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                },
                {
                    name:"爱立托木",
                    type:"白名单",
                    number:"210120196302073592",
                    time:"2017-01-20 13:23",
                    address:"乌鲁木齐-阳光小区-设备12-Camera01"
                }


            ]
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
            addRecord:function (name,type,number,time,address) {
                this.newRecord.name = name;
                this.newRecord.type = type;
                this.newRecord.number = number;
                this.newRecord.time = time;
                this.newRecord.address = address;

                this.records.push(this.newRecord);

                this.newRecord = {
                    name: "\0",
                    type: "",
                    number: "",
                    time: "",
                    address: ""
                };
            }
        }
    });

    let queryCondition = new Vue({
        el:"#query-condition",
        data:{
            type:"白名单",
            result:"已识别",
            name:"",
            startTime:{
                year:"2017",
                month:"01",
                day:"01",
                hour:"12",
                minute:"00"
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
                        type:this.type,
                        result:this.result,
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
                this.type="白名单";
                this.result="已识别";
                this.name="";
                this.startTime.year = "2017";
                this.startTime.month = "01";
                this.startTime.day = "01";
                this.startTime.hour = "12";
                this.startTime.minute = "00";
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
            deviceNodes:[
                {
                    name:"喀什",
                    date:"2017-05-18",
                    errorNumber:0,
                    offlineNumber:0,
                    children: [
                        {
                            name:"阳光小区 （1861人）",
                            date:"2017-05-18",
                            errorNumber:0,
                            offlineNumber:0,
                            children: [
                                {
                                    name:"喀什阳光1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        },
                                        {
                                            name: "Camera02",
                                            id: "6",
                                            brand: "Hikvision",
                                            ip: "192.168.14.139",
                                            port: "554",
                                            username: "admin",
                                            password: "admin12345",
                                            stream: "cam,realmonitor?channel=1subtype",
                                            timeout: "300",
                                            state: "空闲",
                                            nocheck: true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name:"惠民小区 （133人）",
                            date:"2017-05-18",
                            errorNumber:0,
                            offlineNumber:0,
                            children: [
                                {
                                    name:"喀什惠民1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"6",
                                            brand:"Hikvision",
                                            ip:"192.168.14.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]},
                {
                    name:"乌鲁木齐",
                    date:"2017-05-18",
                    errorNumber:2,
                    offlineNumber:2,
                    children: [
                        {
                            name:"乌鲁木齐小区 （1861人）",
                            date:"2017-05-18",
                            errorNumber:2,
                            offlineNumber:1,
                            children: [
                                {
                                    name:"乌鲁木齐1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"6",
                                            brand:"Hikvision",
                                            ip:"192.168.14.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name:"万科小区 （133人）",
                            date:"2017-05-18",
                            errorNumber:0,
                            offlineNumber:1,
                            children: [
                                {
                                    name:"乌鲁木齐万科1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"6",
                                            brand:"Hikvision",
                                            ip:"192.168.14.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]},
                {
                    name:"莎车",
                    date:"2017-05-18",
                    errorNumber:3,
                    offlineNumber:1,
                    children: [
                        {
                            name:"莎车阳光小区 （1861人）",
                            date:"2017-05-18",
                            errorNumber:1,
                            offlineNumber:0,
                            children: [
                                {
                                    name:"莎车阳光1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"6",
                                            brand:"Hikvision",
                                            ip:"192.168.14.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name:"碧桂园小区 （133人）",
                            date:"2017-05-18",
                            errorNumber:2,
                            offlineNumber:1,
                            children: [
                                {
                                    name:"莎车碧桂园1路设备",
                                    id:"1",
                                    brand:"-",
                                    ip:"192.168.104.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"2",
                                            brand:"Hikvision",
                                            ip:"192.168.104.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"2路设备",
                                    id:"4",
                                    brand:"-",
                                    ip:"192.168.1.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"5",
                                            brand:"Hikvision",
                                            ip:"192.168.14.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"6",
                                            brand:"Hikvision",
                                            ip:"192.168.14.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",nocheck:true
                                        }
                                    ]
                                },
                                {
                                    name:"3路设备",
                                    id:"7",
                                    brand:"-",
                                    ip:"192.168.13.138",
                                    port:"-",
                                    username:"admin",
                                    password:"admin12345",
                                    stream:"-",
                                    timeout:"-",
                                    state:"空闲",
                                    showChildren:false,
                                    children:[
                                        {
                                            name:"Camera01",
                                            id:"8",
                                            brand:"Hikvision",
                                            ip:"192.168.13.138",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        },
                                        {
                                            name:"Camera02",
                                            id:"9",
                                            brand:"DH",
                                            ip:"192.168.13.139",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        },
                                        {
                                            name:"Camera03",
                                            id:"10",
                                            brand:"DH",
                                            ip:"192.168.13.189",
                                            port:"554",
                                            username:"admin",
                                            password:"admin12345",
                                            stream:"cam,realmonitor?channel=1subtype",
                                            timeout:"300",
                                            state:"空闲",
                                            nocheck:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]}
            ],
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



