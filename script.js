let
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 26;
    canv.width = self.innerWidth,
    canv.height = self.innerHeight;
    ctx.lineWidth = 3;
    arc_color = 'yellow';
    text_color = 'red';
    arrow_color = 'black';
    curve_ordered_color = '#660000'; // ordered
    curve_unordered_color = 'green'; // unordered
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
    coords[index] = [curr_x + radius, curr_y];
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = text_color;
    ctx.fillText(index, curr_x, curr_y + 15);
    ctx.fill();
    curr_x += add_x;
};
console.log(graphs);

for (const element of graphs) {
    if (element[2]) {
        ctx.strokeStyle = curve_ordered_color;
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
        ctx.strokeStyle = curve_unordered_color;
        ctx.beginPath();
        ctx.moveTo(coords[element[0]][0], coords[element[0]][1]);
        ctx.quadraticCurveTo((coords[element[0]][0] + coords[element[1]][0]) / 2, (coords[element[0]][1] + coords[element[1]][1]) / 2 - 100, coords[element[1]][0], coords[element[1]][1]);
        ctx.stroke();
    }
}