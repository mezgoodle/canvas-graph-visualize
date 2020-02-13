let
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 26;
    canv.width = self.innerWidth,
    canv.height = self.innerHeight;
    arc_color = 'yellow';
    text_color = 'red';
    add_x = 150;
    add_y = 100;
    angle_start = 0;
    angle_end = Math.PI * 2;
    radius = 30;
    ctx.font = "20px Georgia";
    curr_x = canv.width / 8;
    curr_y = canv.height / 8;

for (let index = 0; index < n; index++) {
    ctx.fillStyle = arc_color;
    if (index % 5 === 0 && index !== 0) {
        curr_x = canv.width / 8;
        curr_y += add_y;
    }
    ctx.beginPath();
    ctx.arc(curr_x, curr_y, radius, angle_start, angle_end);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = text_color;
    ctx.fillText(index+1, curr_x, curr_y);
    ctx.fill();
    curr_x += add_x;
};

/*
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
*/

