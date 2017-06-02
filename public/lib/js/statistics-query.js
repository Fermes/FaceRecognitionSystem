/**
 * Created by Viking on 2017/5/16.
 */
layui.define(['layer', 'form', 'element', 'laypage'], function (exports) {
    let layer = layui.layer,
        form = layui.form(),
        laypage = layui.laypage;

    let deviceList = new Vue({
        el: "#deviceList",
        data: {
            value: "",
            setting: {
                edit: {
                    enable: true
                },
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: {"Y": "", "N": ""}
                },
                view: {
                    showIcon: false,
                    showLine: false,
                    fontCss: getFontCss
                },
                callback: {
                    //onDrop:dragToPlay
                }
            },
            deviceNodes: [],
            preNodeList: null,
            allChecked: false
        },
        watch: {
            value: function (newValue) {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                zTree.expandAll(false);
                this.searchNode(newValue);
            }
        },
        methods: {
            searchNode: _.debounce(
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
            revertCheck: function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                let allNodes = zTree.transformToArray(zTree.getNodes());
                for (let i = 0; i < allNodes.length; i++) {
                    zTree.checkNode(allNodes[i]);
                }
            },
            allCheck: function () {
                let zTree = $.fn.zTree.getZTreeObj("deviceTree");
                this.allChecked = !this.allChecked;
                zTree.checkAllNodes(this.allChecked);
            }
        }
    });

    const timeMake = function (time) {
        let startYear = parseInt(time.year);
        let startMonth = parseInt(time.month) - 1;
        let startDay = parseInt(time.day);
        let startHour = parseInt(time.hour);
        let startMinute = parseInt(time.minute);

        let dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let date = new Date(startYear, startMonth, startDay, startHour, startMinute, 30);
        if (startYear > 3000 || startYear < 1900 || startMonth < 0 || startMonth > 11 || startDay < 1 || startDay > dayOfMonth[startMonth] || startHour < 0 || startHour > 24 || startMinute < 0 || startMinute > 60 || isNaN(date.getTime())) {
            return -1;
        }
        return date;
    };

    const timeRegular = function (date) {
        let time = {
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: ''
        };
        time.year = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        time.month = (month < 10) ? "0" + month : month.toString();
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
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: '',
        };
        endTime.year = now.getFullYear().toString();
        let month = now.getMonth() + 1;
        endTime.month = (month < 10) ? "0" + month : month.toString();
        let day = now.getDate();
        endTime.day = (day < 10) ? "0" + day : day.toString();
        let hour = now.getHours();
        endTime.hour = (hour < 10) ? "0" + hour : hour.toString();
        let minute = now.getMinutes();
        endTime.minute = (minute < 10) ? "0" + minute : minute.toString();
        return endTime;
    };

    let queryCondition = new Vue({
        el: "#query-condition",
        data: {
            selectTypes: {
                type: '白名单',
                isShow: false,
                disabled: false,
                data: ['白名单', '黑名单']
            },
            selectResults: {
                type: '已识别',
                isShow: false,
                disabled: false,
                data: ['已识别', '未识别']
            },
            name: "",
            startTime: {
                year: "2017",
                month: "01",
                day: "01",
                hour: "01",
                minute: "01"
            },
            endTime: {
                year: "",
                month: "",
                day: "",
                hour: "",
                minute: ""
            },
            passportNumber: ""
        },
        watch: {},
        methods: {
            querySubmit: function () {
                let startDate = '', endDate = '';
                try {
                    startDate = timeMake(this.startTime);

                    endDate = timeMake(this.endTime);

                    if (startDate === -1 || endDate === -1) {
                        throw "时间格式错误！";
                    }

                    if (endDate < startDate) {
                        throw "结束时间应大于开始时间！";
                    }

                    startDate = timeRegular(startDate);
                    endDate = timeRegular(endDate);
                } catch (err) {
                    this.queryReset();
                    layer.msg(err, {
                        time: 2000,
                        icon: 2
                    });
                    return;
                }

                if (this.selectResults.type === '已识别') {
                    axios({
                        method: "post",
                        url: "/search_hit",
                        data: {
                            type: this.selectTypes.type,
                            result: this.selectResults.type,
                            name: this.name,
                            startTime: startDate,
                            endTime: endDate,
                            passportNumber: this.passportNumber
                        },
                        responseType: 'json',
                        async: false
                    })
                        .then(function (response) {
                            if (response.data.type === 'OK') {
                                recordTable.records = response.data.children;
                            }
                        })
                        .catch(function (err) {

                        });
                }
            },
            queryReset: function () {
                this.selectTypes.type = "白名单";
                this.selectResults.type = "已识别";
                this.name = "";
                this.startTime.year = "2017";
                this.startTime.month = "01";
                this.startTime.day = "01";
                this.startTime.hour = "01";
                this.startTime.minute = "01";
                let now = new Date();
                this.endTime.year = now.getFullYear().toString();
                let month = now.getMonth() + 1;
                this.endTime.month = (month < 10) ? "0" + month : month.toString();
                let day = now.getDate();
                this.endTime.day = (day < 10) ? "0" + day : day.toString();
                let hour = now.getHours();
                this.endTime.hour = (hour < 10) ? "0" + hour : hour.toString();
                let minute = now.getMinutes();
                this.endTime.minute = (minute < 10) ? "0" + minute : minute.toString();
                this.passportNumber = "";
            },
            selectItem: function (item, type) {
                this[item].type = type;
                this[item].isShow = !this[item].isShow;
            },
            selectNodeShow: function (item) {
                this[item].isShow = !this[item].isShow;
            }
        }
    });

    const popHitRecord = {
        template: '<div :class="popStyle">\
                      <div class="pop-title">\
                          <p>{{popTitle}}</p>\
                      </div>\
                      <div class="pop-info">\
                          <img :src="popRecord.record.user.fullImage">\
                          <img :src="popRecord.record.queryImage">\
                          <label>姓名</label><p>{{popRecord.record.user.name}}</p>\
                          <label>类别</label><p>{{popRecord.record.user.label}}</p>\
                          <label>时间</label><p>{{popRecord.record.createTime}}</p>\
                          <label>地点</label><p>{{popRecord.record.place}}</p>\
                          <label>备注</label><textarea>{{popRecord.record.user.comments}}</textarea>\
                      </div>\
                  </div>',
        props: ['pop-record'],
        computed: {
            popStyle: function () {
                if (this.popRecord.record === null) {
                    return {};
                }
                if (this.popRecord.record.user.label === '黑名单') {
                    return {
                        'pop-main': true
                    }
                } else {
                    return {
                        'pop-main': true,
                        'pop-main-white': true
                    }
                }
            },
            popTitle: function () {
                if (this.popRecord.record === null) {
                    return '';
                }
                return this.popRecord.record.user.label === '黑名单' ? '警告！发现黑名单' : '发现白名单';
            }
        }
    };

    let recordTable = new Vue({
        el: "#record-table",
        data: {
            curPage: 0,
            newRecord: {
                id: -1,
                createTime: '',
                place: '',
                queryImage: '',
                cameraId: '',
                user: {
                    id: -1,
                    name: '\0',
                    nationality: '',
                    gender: '',
                    thumbnailName: '',
                    fullImage: '',
                    thumbnailImage: '',
                    comments: '',
                    label: '',
                    passportNumber: ''
                }
            },
            records: [],
            popRecord: {
                index: -1,
                record: null,
                isShow: false,
                thisLayer: null
            }
        },
        watch: {
            records: function () {
                laypage({
                    cont: 'laypager'
                    , pages: Math.ceil(recordTable.records.length / 20)
                    , first: 1
                    , last: Math.ceil(recordTable.records.length / 20)
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
        computed: {
            pageRecords: function () {
                let start = this.curPage * 20;
                let end = (start + 20) > this.records.length ? (this.records.length) : (start + 20);
                let result = this.records.slice(start, end);
                while (result.length < 20) {
                    result.push(this.newRecord);
                }
                return result;
            }
        },
        methods: {
            styleObject: function (index) {
                if (this.pageRecords[index].user.label === "黑名单") {
                    return {
                        color: "red"
                    };
                } else if (this.pageRecords[index].user.name === "\0") {
                    if (index % 2 === 0) {
                        return {
                            color: "#0a0f0b"
                        }
                    } else {
                        return {
                            color: "#141e16"
                        }
                    }

                } else {
                    return "";
                }
            },
            popRecordInfo: function (index) {
                this.popRecord.index = index + this.curPage * 20;
                this.popRecord.record = JSON.parse(JSON.stringify(this.records[this.popRecord.index]));
                this.popRecord.thisLayer = layer.open({
                    type: 1,
                    shade: 0.6,
                    shadeClose: true,
                    title: false,
                    area: ['64rem', '34rem'],
                    content: $('#pop-hit-record'),
                    end: function () {
                        recordTable.popRecord.isShow = false;
                    }
                });
                this.popRecord.isShow = true;
            },
            deleteItem: function (index) {
                let target = '';

                if (index === -1) {
                    target = '所有项目';
                } else {
                    index = index + this.curPage * 20;
                    target = this.records[index].user.name;
                }
                layer.confirm("确定要删除 " + target + ' 么？', {
                    title: '删除确认',
                    btn: ['删除', '取消']
                }, function (layero) {
                    if (index === -1) {
                        recordTable.records.splice(0, recordTable.records.length);
                    } else {
                        recordTable.records.splice(index, 1);
                    }
                    layer.close(layero);
                }, function () {

                });
            }
        },
        components: {
            'pop-hit-record': popHitRecord
        }
    });


    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color: "#2fbb3e", "font-weight": "bold"} : {
            color: "#2fbb3e",
            "font-weight": "normal"
        };
    }

    $(document).ready(function () {
        $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
        queryCondition.queryReset();
        axios({
            method: 'get',
            url: '/get_device_list',
            responseType: 'json',
            async: false
        })
            .then(function (response) {
                if (response.data.type === 'OK') {
                    deviceList.deviceNodes = response.data.children;
                    $.fn.zTree.init($("#deviceTree"), deviceList.setting, deviceList.deviceNodes);
                }
            })
            .catch(function (error) {

            });
    });

    exports('statistics-query', {});
});



