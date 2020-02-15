let
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 26;
    canv.width = self.innerWidth,
    canv.height = self.innerHeight;
    arc_color = 'yellow';
    text_color = 'red';
    arrow_color = 'black';
    add_x = 150;
    add_y = 100;
    angle_start = 0;
    angle_end = Math.PI * 2;
    radius = 30;
    add1_x = radius;
    ctx.font = "20px Georgia";
    curr_x = canv.width / 8;
    curr_y = canv.height / 8;
    headlen = 20;

    graphs = [
        [1, 2, 0], [1, 3, 1], [1, 4, 1], [6, 10, 0], [2, 16, 1], [9, 22, 0], [9, 24, 1], [9, 19, 1], [9, 14, 1], [9, 7, 1], [23, 0, 1], [24, 9, 1]
    ]

    coords = {
        // [-1]: [1231,12312]
    }

for (let index = 0; index < n; index++) {
    ctx.fillStyle = arc_color;
    if (index % 5 === 0 && index !== 0) {
        add1_x += 70;
        curr_x = canv.width / 8 + add1_x;
        curr_y += add_y;
    }
    ctx.beginPath();
    ctx.arc(curr_x, curr_y, radius, angle_start, angle_end);
    coords[index] = [curr_x, curr_y];
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = text_color;
    ctx.fillText(index, curr_x, curr_y);
    ctx.fill();
    curr_x += add_x;
};
console.log(graphs);

for (const element of graphs) {
    if (element[2]) {
        // ctx.beginPath();
        // canvas_arrow(ctx, coords[element[0]][0], coords[element[0]][1], coords[element[1]][0], coords[element[1]][1]);
        // ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords[element[0]][0], coords[element[0]][1]);
        ctx.quadraticCurveTo((coords[element[0]][0] + coords[element[1]][0]) / 2, (coords[element[0]][1] + coords[element[1]][1]) / 2 - 100, coords[element[1]][0], coords[element[1]][1]);
        ctx.stroke();
        ctx.beginPath();
        const dx = coords[element[1]][0] - coords[element[0]][0], dy = coords[element[1]][1] - coords[element[0]][1];
        const angle = Math.atan2(dy, dx);
        ctx.lineTo(coords[element[1]][0], coords[element[1]][1]);
        ctx.lineTo(coords[element[1]][0] - headlen * Math.cos(angle - Math.PI / 6), coords[element[1]][1] - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(coords[element[1]][0], coords[element[1]][1]);
        ctx.lineTo(coords[element[1]][0] - headlen * Math.cos(angle + Math.PI / 6), coords[element[1]][1] - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(coords[element[0]][0], coords[element[0]][1]);
        ctx.quadraticCurveTo((coords[element[0]][0] + coords[element[1]][0]) / 2, (coords[element[0]][1] + coords[element[1]][1]) / 2 - 100, coords[element[1]][0], coords[element[1]][1]);
        ctx.stroke();
    }
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

