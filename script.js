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
    length_x = 1400,
    length_y = 600,
    f_x = 50,
    f_y = 50,
    angle_start = 0,
    angle_end = Math.PI * 2,
    radius = 30,
    add_in_row = 100,
    ctx.font = "20px Georgia",
    headlen = 20,
    corners = [
        [f_x, f_y],
        [f_x+length_x, f_y],
        [f_x+length_x, f_y+length_y],
        [f_x, f_y+length_y],
    ]
    colors = ['#ff0000', '#ff8000', '#00ff00', '#00ff80', '#00bfff', '#0000ff', '#8000ff', '#ff00ff', '#ff0040', '000000'],

    graphs = [
        [1, 7],
        [2, 11],
        [1, 6],
        [1, 2],
        [1, 3],
        [1, 4],
    ],

    coords = {
        // 1: [1231,12312]
    },

    circles_in_row = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    },

    used_coord = {
        // [i], 0
    };

// Random color
function randomColor(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Calculating rows
function calcRows(n) {
    let i = 0;
    while (n !== 0) {
        i++;
        circles_in_row[i]++;
        n--;
        if (i === 4) {
            i = 0;  
        };
    };
}

// Drawning corners
function setCorners(x, y, add_x, add_y) {
    coords[0] = [x, y];
    coords[1] = [x + add_x, y];
    coords[2] = [x + add_x, y + add_y];
    coords[3] = [x, y + add_y];
    for (let i = 0; i < 4; i++)
        used_coord[i] = 0;
}

// Set points
function setPoints(n) {
    calcRows(n-4);
    setCorners(f_x, f_y, length_x, length_y);
        // coords[i] = [];
        // used_coord[i] = 0;
        // here_x += here_space;
    let left_n = n-4, i = 1;
    while (left_n > 0) {
        coords[n-left_n] = [f_x + add_in_row * i, f_y];
        used_coord[n-left_n] = 0;
        left_n--;
        coords[n-left_n] = [f_x + length_x, f_y + add_in_row * i];
        used_coord[n-left_n] = 0;
        left_n--;
        coords[n-left_n] = [f_x + length_x - add_in_row * i, f_y + length_y];
        used_coord[n-left_n] = 0;
        left_n--;
        coords[n-left_n] = [f_x, f_y + add_in_row * i];
        used_coord[n-left_n] = 0;
        left_n--;
        i++;
    };
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
setPoints(n);
drawCircles(n, coords);
coords[n] = calcCenter(coords[0][0], coords[0][1], coords[2][0], coords[2][1]);
// ctx.beginPath();
// ctx.arc(coords[n][0], coords[n][1], radius, angle_start, angle_end);
// ctx.fill();
for (const el of graphs) {
    drawEdge(coords[el[0]-1][0], coords[el[0]-1][1], coords[el[1]-1][0], coords[el[1]-1][1], coords, el[0]-1, el[1]-1); 
};
// drawCircles(n, coords);




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
