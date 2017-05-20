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
            <p v-if="btnShowMode === 2" @click="deleteItem">删除</p>\
        </span>\
        <ul v-show="showChildren">\
            <li v-for="(camera,index) in deviceNode.children" :key="index">\
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
                <p v-if="btnShowMode === 2" @click="deleteCamera(index)">删除</p>\
            </li>\
        </ul>\
        </div>',
        data:function () {
            return {
                showChildren:false
            }
        },
        props:['deviceNode','btnShowMode','parentIndex'],
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
                this.showChildren = !this.showChildren;
            },
            deleteItem:function () {
                this.$emit('delete-device');
            },
            deleteCamera:function (cameraIndex) {
                this.$emit('delete-camera',this.parentIndex,cameraIndex);
            }
        }
    }
    Date.prototype.Format = function (fmt) { //author: meizz
        let o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    let deviceManage = new Vue({
        el:"#device-manage",
        data:{
            deviceShowMode:0,
            btnShowMode:0,
            cityIndex:0,
            courtIndex:0,
            deviceNodes:deviceList.deviceNodes
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
                    if(this.deviceShowMode === 2){
                        this.btnShowMode = 2;
                    }else{
                        this.btnShowMode = 1;
                    }
                }else{
                    this.btnShowMode = 0;
                }
            },
            siteClick:function (num) {
                if(this.btnShowMode !== 0){
                    return ;
                }
                if(this.deviceShowMode === 0){
                    this.cityIndex = num;
                    this.courtIndex = -1;
                    this.deviceShowMode = 1;
                }else{
                    this.deviceShowMode = 2;
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

