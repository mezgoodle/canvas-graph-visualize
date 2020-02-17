const
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 11;
    canv.width = self.innerWidth,
    canv.height = self.innerHeight;
    ctx.lineWidth = 1.5;
    arc_color = 'yellow',
    text_color = 'red',
    arrow_color = 'black',
    add_x = 150,
    space = 200,
    add_y = 250,
    angle_start = 0,
    angle_end = Math.PI * 2,
    radius = 30,
    add1_x = radius,
    ctx.font = "20px Georgia",
    curr_x = canv.width / 8,
    curr_y = canv.height / 8,
    headlen = 20,
    colors = ['#ff0000', '#ff8000', '#00ff00', '#00ff80', '#00bfff', '#0000ff', '#8000ff', '#ff00ff', '#ff0040', '000000'],

    graphs = [
        [1, 7],
        [3, 10],
        [1, 6],
        [2, 6],
        [2, 11],
        [4, 6],
        [1, 11],
        [2, 1],
    ],

    coords = {
        // 1: [1231,12312]
    },

    used_coord = {
        // [i], 0
    };

// Random color
function randomColor(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Set points
function setPoints(n, x, y, space) {
    let
        first_row = Math.ceil(n / 2),
        length = space * (first_row - 1)
        // alert(length);
        new_space = length / (n - first_row - 1)
        here_x = x,
        here_y = y,
        here_space = space;
        // alert(new_space);
        // alert(length == (new_space * (n - first_row - 1) + (n - first_row) * radius));
        // alert(space > new_space);
    for (let i = 0; i < n; i++) {     
        // console.log(here_space);
        
        if (i === first_row) {
            here_x = x;
            here_y += add_y;
            here_space = new_space;
        }
        coords[i] = [here_x, here_y];
        used_coord[i] = 0;
        here_x += here_space;
    }

};

// Draw nodes
function drawCircles(n, coords) {
    for (let i = 0; i < n; i++) {
        ctx.fillStyle = arc_color;
        ctx.beginPath();
        ctx.arc(coords[i][0], coords[i][1], radius, angle_start, angle_end);
        ctx.fill();
        // Fill text
        ctx.fillStyle = text_color;
        ctx.fillText(i+1, coords[i][0], coords[i][1]);
    }    
};

// Calculate the center for drawning edges
function calcCenter(x1, y1, x2, y2) {
    const
        x = (x1 + x2) / 2,
        y = (y1 + y2) / 2;
    return [x, y];
};

// Draw edges
function drawEdge(from_x, from_y, to_x, to_y, coords, from_n, to_n) {
    const
        center_x = coords[n][0],
        center_y = coords[n][1];

    ctx.strokeStyle = randomColor(colors);
    ctx.beginPath();
    if (used_coord[from_n] === 0) {
        if (used_coord[to_n] === 0) {
            ctx.moveTo(from_x, from_y);
            used_coord[from_n]++;
            used_coord[to_n]++;
            console.log(from_n+1, to_n+1);
            console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);
            ctx.lineTo(center_x, center_y);
            ctx.lineTo(to_x, to_y);    
        } else {
            let d_y = 4;
            let temp = used_coord[to_n];
            while (temp !== 0) {
                to_y = from_y - d_y;
                d_y += 4.5;
                // used_coord[to_n]--;
                temp--;
            }

            ctx.moveTo(from_x, from_y);
            used_coord[from_n]++;
            used_coord[to_n]++;
            console.log(from_n+1, to_n+1);
            console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);
            ctx.lineTo(center_x, center_y);
            ctx.lineTo(to_x, to_y);    

        }
    } else {
        let d_y = 4;
        let temp = used_coord[from_n];
        while (temp !== 0) {
            from_y = from_y - d_y;
            d_y += 4.5;
            // used_coord[from_n]--;
            temp--;
        }

        if (used_coord[to_n] == 0) {
            ctx.moveTo(from_x, from_y);
            used_coord[from_n]++;
            used_coord[to_n]++;
            console.log(from_n+1, to_n+1);
            console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);
            ctx.lineTo(center_x, center_y);
            ctx.lineTo(to_x, to_y);    
        } else {
            let d_y = 4;
            let temp = used_coord[to_n];
            while (temp !== 0) {
                to_y = from_y - d_y;
                d_y += 4.5;
                // used_coord[to_n]--;
                temp--;
            }

            ctx.moveTo(from_x, from_y);
            used_coord[from_n]++;
            used_coord[to_n]++;
            console.log(from_n+1, to_n+1);
            console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);
            ctx.lineTo(center_x, center_y);
            ctx.lineTo(to_x, to_y);    
        }
    };
    ctx.stroke();
};

// Main part
setPoints(n, curr_x, curr_y, space);
// console.log(coords);
// drawCircles(n, coords);
coords[n] = calcCenter(coords[0][0], coords[0][1], coords[n-1][0], coords[n-1][1]);
// console.log(coords);
// ctx.beginPath();
// ctx.arc(coords[n][0], coords[n][1], radius, angle_start, angle_end);
// ctx.fill();
for (const el of graphs) {
    drawEdge(coords[el[0]-1][0], coords[el[0]-1][1], coords[el[1]-1][0], coords[el[1]-1][1], coords, el[0]-1, el[1]-1); 
};
drawCircles(n, coords);
// drawEdge(coords[0][0], coords[0][1], coords[n][0], coords[n][1]);




// Drawning circles
// for (let index = 0; index < n; index++) {
//     ctx.fillStyle = arc_color;
//     if (index == 2) {
//         // add1_x += 70;
//         curr_x = canv.width / 8;// + add1_x;
//         curr_y += add_y;
//     }
//     ctx.beginPath();
//     ctx.arc(curr_x, curr_y, radius, angle_start, angle_end);
//     coords[index] = [curr_x + radius, curr_y];
//     ctx.fill();
//     ctx.beginPath();
//     ctx.fillStyle = text_color;
//     ctx.fillText(index, curr_x, curr_y + 15);
//     ctx.fill();
//     curr_x += add_x;
// };
// console.log(graphs);

// Drawning arrows
// for (const element of graphs) {
//     if (element[2]) {
//         ctx.strokeStyle = curve_ordered_color;
//         ctx.beginPath();
//         ctx.moveTo(coords[element[0]][0], coords[element[0]][1]);
//         ctx.quadraticCurveTo((coords[element[0]][0] + coords[element[1]][0]) / 2 + 100, (coords[element[0]][1] + coords[element[1]][1]) / 2 - 100, coords[element[1]][0], coords[element[1]][1]);
//         ctx.stroke();

//         ctx.beginPath();
//         const dx = coords[element[1]][0] - coords[element[0]][0], dy = coords[element[1]][1] - coords[element[0]][1];
//         const angle = Math.atan2(dy, dx);
//         ctx.lineTo(coords[element[1]][0], coords[element[1]][1]);
//         ctx.lineTo(coords[element[1]][0] - headlen * Math.cos(angle - Math.PI / 6), coords[element[1]][1] - headlen * Math.sin(angle - Math.PI / 6));
//         ctx.moveTo(coords[element[1]][0], coords[element[1]][1]);
//         ctx.lineTo(coords[element[1]][0] - headlen * Math.cos(angle + Math.PI / 6), coords[element[1]][1] - headlen * Math.sin(angle + Math.PI / 6));
//         ctx.stroke();
//     } else {
//         ctx.strokeStyle = curve_unordered_color;
//         ctx.beginPath();
//         ctx.moveTo(coords[element[0]][0], coords[element[0]][1]);
//         ctx.quadraticCurveTo((coords[element[0]][0] + coords[element[1]][0]) / 2, (coords[element[0]][1] + coords[element[1]][1]) / 2 - 100, coords[element[1]][0], coords[element[1]][1]);
//         ctx.stroke();
//     }
// }
