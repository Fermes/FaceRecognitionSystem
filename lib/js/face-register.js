/**
 * Created by Viking on 2017/5/12.
 */
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

layui.define(['layer', 'form', 'element','laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage=layui.laypage;

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

let deviceList=new Vue({
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
        deviceNodes: [
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
});



let faceReg = new Vue({
        el:"#face-reg",
        data:{
            multiType:"白名单",
            name:"",
            gender:"",
            type:"",
            number:"",
            address:"",
            remark:""
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
                formData.append('type',this.multiType);

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
                if(typeof(img) === "undefined" || typeof(img) ==="null"){
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
                    layer.msg('类别填写错误，请重新填写！');
                    faceReg.type = "";
                    return;
                }
                let formData = new FormData();
                formData.append("image",img);
                formData.append("name",faceReg.name);
                formData.append("gender",faceReg.gender);
                formData.append("type",faceReg.type);
                formData.append("passportNumber",faceReg.number);
                formData.append("address",faceReg.address);
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
                        faceReg.address = "";
                        faceReg.remark = "";
                        document.getElementById("single-image").src = "lib/img/ironman.jpg";
                        document.getElementById("single-upload").value = '';
                    })
                    .catch(function (error) {

                    });
            }
        }
    });