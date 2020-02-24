const
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 14;
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
        [13, 13],
        [1, 3],
        [3, 3],
        [1, 4],
        [1, 10],
        [8, 2],
        [1, 1],
        [4, 9],
        [10, 9],
        [13, 10],
        [12, 8],
        [7, 9],
        [7, 13],
        [12, 12],
        [9, 9],
        [11, 11],
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

    indexes_in_row = [
        [],
        [],
        [],
        [],
    ],

    used_coord = {
        // [i]: 0
    },

    spaceInCircle = {
        // [i]: 0
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
};

// Normalize coords in row
function normalizeCoords(f_row, s_row, t_row, fo_row) {
    let space = length_x / (f_row+1);
    for (let index = 1; index <= f_row; index++) {
        coords[indexes_in_row[0][index-1]][0] = f_x + space * index;
    };
    space = length_y / (s_row+1);
    for (let index = 1; index <= s_row; index++) {
        coords[indexes_in_row[1][index-1]][1] = f_y + space * index;
    };
    space = length_x / (t_row+1);
    for (let index = 1; index <= t_row; index++) {
        coords[indexes_in_row[2][index-1]][0] = f_x + space * index;
    };
    space = length_y / (fo_row+1);
    for (let index = 1; index <= fo_row; index++) {
        coords[indexes_in_row[3][index-1]][1] = f_y + space * index;
    };
};

function calcUsedCoords(arr) {
  arr.forEach(el => {
      if (el[0] != el[1]) {
        used_coord[el[0]-1]++;
        used_coord[el[1]-1]++;  
      };
  });  
};

// Set index
function setIndex(i, j) {
    let tmp = [...indexes_in_row[j]];
    tmp.push(i);
    indexes_in_row[j] = tmp;
};

// Normalize circles in rows
function normalize(n) {
    let 
        first_row = second_row = third_row = fourth_row = 0;

    for (let i = 4; i < n; i++) {
        if ((f_x < coords[i][0] < (f_x + length_x)) && (coords[i][1] === f_y)) {
            first_row++;
            setIndex(i, 0);
        };
        if ((coords[i][0] === (f_x + length_x)) && (f_y < coords[i][1] < (f_y + length_y))) {
            second_row++;
            setIndex(i, 1);
        };
        if ((f_x < coords[i][0] < (f_x + length_x)) && (coords[i][1] === (f_y + length_y))) {
            third_row++;
            setIndex(i, 2);
        };
        if ((coords[i][0] === f_x) && (f_y < coords[i][1] < (f_y + length_y))) {
            fourth_row++;
            setIndex(i, 3);
        };
    };
    normalizeCoords(first_row, second_row, third_row, fourth_row);
};

// Set points
function setPoints(n) {
    calcRows(n-4);
    setCorners(f_x, f_y, length_x, length_y);
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

    normalize(n);
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

function calcArrowPosition(x_r, y_r, x1, y1, x2, y2) {
    
}

function calcCircleInSpace(i) {
    if ((radius * 2 / (used_coord[i] - 1)) < 0) {
        return undefined;
    } else if ((radius * 2 / (used_coord[i] - 1)) === Infinity) {
        return 0;
    } else return (radius * 2 / (used_coord[i] - 1));
};


function drawNoose(from_x, from_y, from_n) {
    ctx.beginPath();
    ctx.strokeStyle = arrow_color;

    if (from_x === f_x) {
        ctx.moveTo(from_x-radius, from_y);
        ctx.lineTo(from_x-radius-10, from_y-radius);
        ctx.lineTo(from_x-radius-10, from_y+radius);
        ctx.lineTo(from_x-radius, from_y);    
    } else if (from_y === f_y) {
        ctx.moveTo(from_x, from_y-radius);
        ctx.lineTo(from_x+radius, from_y-radius-10);
        ctx.lineTo(from_x+-radius, from_y-radius-10);
        ctx.lineTo(from_x, from_y-radius);
    } else if (from_x === f_x+length_x) {
        ctx.moveTo(from_x+radius, from_y);
        ctx.lineTo(from_x+radius+10, from_y-radius);
        ctx.lineTo(from_x+radius+10, from_y+radius);
        ctx.lineTo(from_x+radius, from_y);
    } else if (from_y === f_y+length_y) {
        ctx.moveTo(from_x, from_y+radius);
        ctx.lineTo(from_x-radius, from_y+radius+10);
        ctx.lineTo(from_x+radius, from_y+radius+10);
        ctx.lineTo(from_x, from_y+radius);
    }
    console.log(from_n+1, from_n+1);
    console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);    
    ctx.stroke();
};

function calc(n) {
    if (used_coord[n] === 0) {
        return -radius;
    } else {
        let y = -radius + spaceInCircle[n] * (used_coord[n] - 1)
        used_coord[n]--;
        return y;
    };
};

// Draw edges
function drawEdge(f_x, f_y, t_x, t_y, f_n, t_n, coords) {
    const
        center_x = coords[n][0],
        center_y = coords[n][1];

    if (f_x !== center_x && t_x !== center_x) {
        f_y += calc(f_n);
        t_y += calc(t_n);
    } else {
        f_x += calc(f_n),
        t_x += calc(t_n);
    }
    ctx.beginPath();
    ctx.strokeStyle = randomColor(colors);  
    ctx.moveTo(f_x, f_y);
    ctx.lineTo(center_x, center_y);
    ctx.lineTo(t_x, t_y);
    console.log(f_n+1, t_n+1);
    console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);


    ctx.stroke();
};

// Main part
setPoints(n);
calcUsedCoords(graphs);
for (let i = 0; i < n; i++) {
    spaceInCircle[i] = calcCircleInSpace(i);
};
// drawCircles(n, coords);
coords[n] = calcCenter(coords[0][0], coords[0][1], coords[2][0], coords[2][1]);
ctx.beginPath();
ctx.arc(coords[n][0], coords[n][1], radius, angle_start, angle_end);
ctx.fill();
for (const el of graphs) {
    if (el[0] === el[1]) {
        drawNoose(coords[el[0]-1][0], coords[el[0]-1][1], el[0]-1);
    } else drawEdge(coords[el[0]-1][0], coords[el[0]-1][1], coords[el[1]-1][0], coords[el[1]-1][1], el[0]-1, el[1]-1, coords); 
};
drawCircles(n, coords);

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