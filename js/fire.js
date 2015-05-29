fires = {};

// 参考: http://jsdo.it/sapphire_al2o3/t4X7
(function() {

// ここはコピペ

function Xor128() {
    if(arguments.length > 0) {
        var a = [],
            s = arguments[0];
        for(var i = 1; i <= 4; i++) {
            a[i - 1] = s = 1812433253 * (s ^ (s >> 30)) + i;
        }
        this.x = a[0];
        this.y = a[1];
        this.z = a[2];
        this.w = a[3];
    } else {
        this.x = 1812433254;
        this.y = 3713160357;
        this.z = 3109174145;
        this.w = 64984499;
    }
}

Xor128.prototype.random = function() {
    var t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.x >> 19) ^ (t ^ (t >> 8));
    return this.w / 0xFFFFFFFF + 0.5;
};

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    tex = document.getElementById('tex'),
    tex2 = document.getElementById('tex2'),
    tex3 = document.getElementById('tex3'),
    particles = [],
    cx = width / 2,
    cy = height / 2;

var emitter = {
    // 放出量
    emitmax: 4,
    emitmin: 2,
    // 放出間隔
    interval: 0,
    // 座標
    xmax: cx + 2,
    xmin: cx - 2,
    ymax: cy + 2,
    ymin: cy - 2,
    // 範囲
    r: 8
};

fires.setup = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = $("#canvas").width();
    canvas.height = $("#canvas").height();

    width = canvas.width;
    height = canvas.height;
    tex = document.getElementById('tex');
    tex2 = document.getElementById('tex2');
    tex3 = document.getElementById('tex3');
    particles = [];
    cx = width / 2;
    cy = height / 2;

    emitter = {
        // 放出量
        emitmax: 4,
        emitmin: 2,
        // 放出間隔
        interval: 0,
        // 座標
        xmax: cx + 2,
        xmin: cx - 2,
        ymax: cy + 2,
        ymin: cy - 2,
        // 範囲
        r: 8
    };

    this.put()
}

var particleProp = {
    // 大きさ
    sizexmax: 1.0,
    sizexmin: 1.0,
    sizeymax: 1.0,
    sizeymin: 1.0,
    // 寿命
    lifemax: 40,
    lifemin: 20,
    // 速度
    vxmin: -0.8,
    vxmax: 0.8,
    vymin: -3.0,
    vymax: -2.2,
    // α減衰
    amin: 0.01,
    amax: 0.01,
    // 回転
    //rmax: 0.1,
    //rmin: 0.1,
    // スケール
    smax: -0.4,
    smin: -0.1,
    // ブレンド
    blend: 'lighter'
};

ctx.fillRect(0, 0, width, height);
ctx.globalCompositeOperation = 'lighter';

var rg = new Xor128(123456),
    play = true;

function Particle(x, y, emitterProp, particleProp) {
    this.x = x;
    this.y = y;
    this.vx = rangep(particleProp, 'vx');
    this.vy = rangep(particleProp, 'vy');
    this.s = range(particleProp.smin, particleProp.smax);
    this.life = rangep(particleProp, 'life');
    this.a = 1.0;
    this.sw = tex.height;
    this.sh = tex.width;
    var sizex = rangep(particleProp, 'sizex'),
        sizey = rangep(particleProp, 'sizey');
    this.dw = this.sw * sizex;
    this.dh = this.sh * sizey;
    this.t = tex;
    this.blend = particleProp.blend;
}

Particle.prototype.draw = function() {
    ctx.globalCompositeOperation = this.blend;
    ctx.drawImage(this.t, 0, 0, this.sw, this.sh, this.x - this.dw / 2, this.y - this.dh / 2, this.dw, this.dh);
};

function clamp(x) {
    return x > 1 ? 1 : x < 0 ? 0 : x;
}

function range(min, max) {
    var d = max - min;
    return min + d * rg.random();
}

function rangep(p, v) {
    var d = p[v + 'max'] - p[v + 'min'];
    return p[v + 'min'] + d * rg.random();
}

Particle.prototype.update = function(t) {
    this.x += this.vx;
    this.y += this.vy;
    this.vx += wind;
    this.a = clamp(this.life / 60);
    this.dw += this.s;
    this.dh += this.s;
    if(this.dw < 1) this.dw = 1;
    if(this.dh < 1) this.dh = 1;
    this.life -= t;
};

// ここから自作

var Fire = function(x, y) {
    this.particles = new Array();
    this.emitter = {};
    for(var key in emitter) {
        this.emitter[key] = emitter[key];
    }
    this.emitter.xmax = x + 2;
    this.emitter.xmin = x - 2;
    this.emitter.ymax = y + 2;
    this.emitter.ymin = y - 2;

    this.frame = 0;
};

Fire.prototype.emit = function(e){
    var n = rangep(this.emitter, 'emit');

    for(var i = 0; i < n; i++) {
        var x = range(this.emitter.xmin, this.emitter.xmax),
            y = range(this.emitter.ymin, this.emitter.ymax);
        this.particles.push(new Particle(x, y, this.emitter, particleProp));
    }
};

Fire.prototype.update = function(){
    for(var i = this.particles.length; i--;) {
        p = this.particles[i];
        p.update(1);

        if(p.life < 0) {
            var x = range(emitter.xmin, emitter.xmax),
                y = range(emitter.ymin, emitter.ymax);
            this.particles[i] = this.particles.pop();// = new Particle(x, y, emitter, particleProp);
        }
    }

    if(this.emitter.interval < this.frame) {
        this.emit(this.emitter);
        this.frame = 0;
    }
    this.frame++;

};

Fire.prototype.draw = function(){
    for(var i = this.particles.length; i--;) {
        p = this.particles[i];
        p.draw();
    }
};

var firesArray = Array();

fires.put = function(){
    firesArray = Array();

    var positions = [
        [0.2654424040066778, 0.2190923317683881],
        [0.340228714524207, 0.18779342723004694],
        [0.4100150250417362, 0.12206572769953052],
        [0.48580133555926546, 0.11267605633802817],
        [0.5609265442404007, 0.1189358372456964],
        [0.6607545909849749, 0.14710485133020346],
        [0.7181936560934892, 0.2112676056338028],
    ];

    var width = $("#canvas").width();
    var height = $("#canvas").height();

    var size;
    var top = 0;
    var left = 0;
    if(width > height) {
        size = height;
        left = (width - size) / 2;
    } else {
        size = width;
        top = (height - size) / 2;
    }

    for (var i = 0; i < positions.length; i++) {
        var pos = positions[i];

        var x = pos[0];
        var y = pos[1];

        firesArray.push(new Fire(left + x * size, top + y * size));
    }
};

// 背景
var Background = function(){
}

Background.prototype.draw = function () {
};

var background = new Background();

// 明るさ
var light = 0.2;
// 風
var wind  = 0;

// // クリック
// canvas.addEventListener('mousedown', function(e){
//     wind = 0.5;
// });

// //
// canvas.addEventListener('touchstart', function(e){
//     wind = 0.5;
// });

// canvas.addEventListener('mouseup', function(e){
//     wind = 0.0;
// });

// canvas.addEventListener('touchend', function(e){
//     wind = 0.0;
// });

$("#fire-button").mousedown(function(){
    wind = 0.5;
    $(this).attr("src", "./img/fire-button-pushed.png");
});

$("#fire-button").bind("touchstart", function(e){
    e.preventDefault();
    wind = 0.5;
    $(this).attr("src", "./img/fire-button-pushed.png");
});

$("#fire-button").mouseup(function(){
    wind = 0.0;
    $(this).attr("src", "./img/fire-button.png");
});

$("#fire-button").bind("touchend", function(e){
    e.preventDefault();
    wind = 0.0;
    $(this).attr("src", "./img/fire-button.png");
});

var render = function() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = light;
    // background.draw();

    $("#fires-dark").css("opacity", 1 - light);

    // 電気がついていないとき
    if (light < 1.0){
        // 吹き消す
        if(wind > 0){
            light -= 0.005
            if(light < -0.05){
                // 電気をつける
                light = 1.0;
                play  = false;
                $("#fires").css("display", "none");
                main.start()
            }
        }else{
            if (light < 0.2){
                light += 0.005;
            }
        }

        for(var i = 0, l = firesArray.length; i < l; i++){
            var fire = firesArray[i];
            fire.update();
            fire.draw();
        }
    }

    if(play) {
        setTimeout(arguments.callee, 33);
    }

};


render();

})();
