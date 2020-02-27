const
    canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    n = 11;
    canv.width = self.innerWidth,
    canv.height = self.innerHeight;
    ctx.lineWidth = 0.8;
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
    oriented = true, //false
    corners = [
        [f_x, f_y],
        [f_x+length_x, f_y],
        [f_x+length_x, f_y+length_y],
        [f_x, f_y+length_y],
    ]
    colors = ['#ff0000', '#ff8000', '#00ff00', '#00ff80', '#00bfff', '#0000ff', '#8000ff', '#ff00ff', '#ff0040', '000000'],

    graphs = [],


    array_from_cs_non_oriented = [
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
        [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0],	
    ],

    array_from_cs_oriented = [
        [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
        [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    ]

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
        ctx.stroke();
    } else if (from_y === f_y) {
        ctx.moveTo(from_x, from_y-radius);
        ctx.lineTo(from_x+radius, from_y-radius-10);
        ctx.lineTo(from_x+-radius, from_y-radius-10);
        ctx.lineTo(from_x, from_y-radius);
        ctx.stroke();
    } else if (from_x === f_x+length_x) {
        ctx.moveTo(from_x+radius, from_y);
        ctx.lineTo(from_x+radius+10, from_y-radius);
        ctx.lineTo(from_x+radius+10, from_y+radius);
        ctx.lineTo(from_x+radius, from_y);
        ctx.stroke();
    } else if (from_y === f_y+length_y) {
        ctx.moveTo(from_x, from_y+radius);
        ctx.lineTo(from_x-radius, from_y+radius+10);
        ctx.lineTo(from_x+radius, from_y+radius+10);
        ctx.lineTo(from_x, from_y+radius);
        ctx.stroke();
    }
    console.log(from_n+1, from_n+1);
    console.log('%c Color', `background: ${ctx.strokeStyle}; color: white`);    
};

function findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    var a = 1 + m*m;
    var b = -h * 2 + (m * (n - k)) * 2;
    var c = h*h + (n - k)*(n - k) - r*r;

    // get discriminant
    var d = b*b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        var intersections = [
            (-b + Math.sqrt(b*b - 4 * a * c)) / (2 * a),
            (-b - Math.sqrt(b*b - 4 * a * c)) / (2 * a)
        ];
        if (d == 0) {
            // only 1 intersection
            return [intersections[0]];
        }
        return intersections;
    }
    // no intersection
    return [];
};

function drawArrow(to_x, to_y, from_x, from_y, radius=10) {
    ctx.fillStyle = 'red';
    const x_center = to_x;
    const y_center = to_y;
    let angle, x, y;
    ctx.beginPath();
    angle = Math.atan2(to_y - from_y, to_x - from_x);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    ctx.moveTo(x, y);
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
  
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
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
        center_y = coords[n][1],
        circle_x = t_x,
        circle_y = t_y;

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
    if (oriented) {
        let
            k = (t_y - center_y) / (t_x - center_x),
            b = -center_x * k + center_y,
            x_ar = findCircleLineIntersections(radius, circle_x, circle_y, k, b),
            x,
            y;
        if (x_ar.length === 0) {
            x = center_x;
            if (circle_y > center_y) {
                y = circle_y - radius - 10;       
            } else y = circle_y + radius + 10;
        } else {
            // x = x_ar[1];
            if (Math.abs(x_ar[0] - center_x) < Math.abs(x_ar[1] - center_x)) {
                x = x_ar[0];
            } else x = x_ar[1];
            y = k * (x - center_x) + center_y;
        }
        drawArrow(x, y, center_x, center_y);
    };
};

function setMatrix(array) {
    if (oriented) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i][j] === 1) {
                    graphs.push([j+1, i+1]);
                };
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (j < i) {
                    continue;
                } else
                    if (array[i][j] === 1) {
                        graphs.push([i+1, j+1]);
                    };
            }
        }
    }
};

// Main part
setPoints(n);
if (oriented) {
    setMatrix(array_from_cs_oriented);  
} else setMatrix(array_from_cs_non_oriented);
calcUsedCoords(graphs);
for (let i = 0; i < n; i++) {
    spaceInCircle[i] = calcCircleInSpace(i);
};
coords[n] = calcCenter(coords[0][0], coords[0][1], coords[2][0], coords[2][1]);
// ctx.beginPath();
// ctx.arc(coords[n][0], coords[n][1], radius, angle_start, angle_end);
// ctx.fill();
for (const el of graphs) {
    if (el[0] === el[1]) {
        drawNoose(coords[el[0]-1][0], coords[el[0]-1][1], el[0]-1);
    } else drawEdge(coords[el[0]-1][0], coords[el[0]-1][1], coords[el[1]-1][0], coords[el[1]-1][1], el[0]-1, el[1]-1, coords); 
};
drawCircles(n, coords);