var
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d');
canv.width = self.innerWidth;
canv.height = self.innerHeight;
		
ctx.fillStyle = 'magenta';
ctx.arc(canv.width / 8 , canv.height / 8, 20, 0, Math.PI * 2);
ctx.arc(canv.width / 8 + 100, canv.height / 8, 20, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
canvas_arrow(ctx, canv.width / 8 + 20, canv.height / 8, canv.width / 8 + 80,canv.height / 8)
ctx.stroke();
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    // context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    // context.moveTo(tox, toy);
    // context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }


