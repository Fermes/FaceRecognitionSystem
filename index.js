const http = require('http');
let express = require('express');
let pug = require('pug');
let babel = require('jade-babel');
let bodyParser = require('body-parser');
let formidable = require('formidable');
let app = express();
let router = express.Router();


function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

let hostname = getIPAdress();
let port = '3000';
let wsServer = require('http').createServer(app);
let io = require('socket.io')(wsServer);
wsServer.listen(1001);

app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

let Mock = require('mockjs');

let deviceList = Mock.mock({
    name: 'OK',
    'children|10': [
        {
            'id|+1': 1,
            name: '@city',
            createTime: '@datetime',
            offlineNumber: '@natural(0, 4)',
            'children|1-6': [
                {
                    'id|+1': 1,
                    name: '@county',
                    ip: '@ip',
                    username: '@string(3,8)',
                    pwd: '@string(5,10)',
                    'state|1': ["空闲", "工作", "离线"],
                    'children|1-4': [
                        {
                            'id|+1': 1,
                            'name|+1': ['Camera01', 'Camera02', 'Camera03', 'Camera04'],
                            brand: '@string(2,10)',
                            ip: '@ip',
                            port: '@natural(0, 9999)',
                            username: '@string(3,8)',
                            pwd: '@string(5,10)',
                            'stream|1': ['mpeg4', 'H264', 'h264', 'cam', 'VP8'],
                            timeout: '@natural(50, 2000)',
                            'state|1': ['空闲', '工作', '离线']
                        }
                    ]
                }
            ]
        }
    ]
});

let hit_id = 99;

let hitRecords = Mock.mock({
    name: 'OK',
    'children|111': [
        {
            'id|+1': 0,
            createTime: '@datetime',
            place: '@county(true) @pick(["Camera01","Camera02","Camera03","Camera04"])',
            queryImage: '@image("288x400",@color)',
            cameraId: '@natural(1,1000)',
            user: {
                id: '@natural(1,9999)',
                name: '@cname',
                nationality: '中国',
                gender: '@pick(["男","男","男","男","女"])',
                thumbnailName: '',
                fullImage: '@image("288x400",@color)',
                thumbnailImage: '@image("123x160","@color")',
                comments: '@string(10,30)',
                'label|1': ['白名单', '黑名单', '白名单'],
                passportNumber: Mock.mock('@id')
            }
        }
    ]
});

let regFace = Mock.mock({
    name: 'REG',
    'children|111': [
        {
            id: '@natural(1,9999)',
            name: '@cname',
            nationality: '中国',
            gender: '@pick(["男","男","男","男","女"])',
            thumbnailName: '',
            fullImage: '@image("288x400",@color)',
            thumbnailImage: '@image("123x160","@color")',
            comments: '@string(10,30)',
            'label|1': ['白名单', '黑名单', '白名单'],
            passportNumber: Mock.mock('@id'),
            createTime: '@datetime',
            place: '@county(true) @pick(["设备01","设备02","设备03","设备04"])'
        }
    ]
});
/*
 setInterval(function () {
 setTimeout(function () {
 io.emit('nohit-record',
 Mock.mock({
 name: 'NOHIT',
 children: {
 id: '@increment',
 createTime: '@dateTime',
 place: '@county(true) @pick(["Camera01","Camera02","Camera03","Camera04"])',
 queryImage: '@image("123x160",@color)'
 }
 }))
 },Mock.mock('@natural(2000,20000)'));
 },3000);
 setInterval(()=>{
 setTimeout(()=>{
 io.emit('hit-record',
 Mock.mock({
 name: 'HIT',
 children: {
 'id': ++hit_id,
 createTime:'@datetime',
 place:'@county(true) @pick(["Camera01","Camera02","Camera03","Camera04"])',
 queryImage: '@image("288x400",@color)',
 cameraId:'@natural(1,1000)',
 user:{
 id:'@natural(1,9999)',
 name:'@cname',
 nationality:'中国',
 gender:'@pick(["男","男","男","男","女"])',
 thumbnailName:'',
 fullImage: '@image("288x400",@color)',
 thumbnailImage:'@image("123x160","@color")',
 comments:'@string(10,30)',
 'label|1':['白名单','黑名单','白名单'],
 passportNumber: Mock.mock('@id')
 }
 }
 }),Mock.mock('@natural(5000,30000)'))
 })},20000);


 app.set('trust proxy', function (ip) {
 if (ip === '127.0.0.1' || ip === app.ip()) return true;// trusted IPs
 else return false;
 })*/

pug.filters.babel = babel({});
//const index = pug.compileFile('index.pug');


app.use(express.static('public'));
app.get('/pug', ({req, res}) => {
    res.render('index', {name: 'Hey'})
});
app.get('/get_device_list', ({req, res}) => {
    res.json(deviceList);
    res.end();
});
app.get('/get_hit_list', function (req, res) {
    let n = req.params.n;
    res.json(hitRecords);
    res.end();
});

let back = {
    name:'OK',
    children :{
        id:'222'
    }
};

app.post('/add_user_to_platform', function (req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log(fields.label);
        console.log(files.fullImage);
    });
    res.json(back);
    res.end();
});

app.post('/search_face', function (req, res) {
    res.json(regFace);
    res.end();
});

app.post('/search_hit', function (req, res) {
    res.json(hitRecords);
    res.end();
});

http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
