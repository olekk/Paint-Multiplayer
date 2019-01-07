var socket = io.connect('http://localhost:4444');

document.getElementById('plotno').innerHTML = '<canvas id="canvas" width="'+(document.body.clientWidth - 110)+'px" height="'+(document.body.clientHeight - 54)+'px">';

//500x500
//500*x=doc
/*function resp()
{
    document.getElementById("ceses").innerHTML += 'canvas { transform: scale('+((document.body.clientWidth-110)/500)+','+((document.body.clientHeight-54)/500)+'); position: fixed; left: 210; top: 154; }';
}
resp();     */   

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 3;
var down = false;

var tekst = false;
var xPos, yPos;

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', function() 
{
    if(tekst) 
    {
        pisz(xPos, yPos);
        tekst = false;
    }
    else{
       
    down = true;
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    canvas.addEventListener("mousemove", draw); 
        
    }
});

canvas.addEventListener('mouseup', function() { down=false; })

function draw(e)
{
    xPos = (e.clientX - canvas.offsetLeft);//(document.body.clientWidth-110)*500;
    yPos = (e.clientY - canvas.offsetTop);//(document.body.clientHeight-54)*500;
    
    if(down == true)
        {
            ctx.lineTo(xPos, yPos);
            ctx.stroke();
        }
}

function changeColor(color)
{
    if(color == 'white') ctx.lineWidth = 20;
    else ctx.lineWidth = 3;
    ctx.strokeStyle = color;
}

function pisz(xx, yy)
{
    
    var tex = prompt('Co chcesz napisać')
    ctx.font = "40px K2D";
    ctx.lineWidth = 2;
    ctx.strokeText(tex, xx, yy);
    ctx.lineWidth = 3;
    document.getElementById('ceses').innerHTML='body {cursor: default;}';
}

syncCanvas();
function syncCanvas()
{
    var png=canvas.toDataURL("image/png");
    
    socket.emit('canvass', {obraz: png});
    window.setTimeout(syncCanvas, 600);
}

socket.on('canvass', function(data){
    
    //document.getElementById('plotno').innerHTML = '<img src="'+data.obraz+'" style="float:left;"/>';
    var obraz = new Image;
    obraz.src = data.obraz;
    ctx.drawImage(obraz, 0, 0, obraz.width, obraz.height, 0, 0, canvas.width, canvas.height);
    
});

function czyscCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

