const
    btn = document.getElementById("btn"),
    canv = document.getElementById('canvas'),
    ctx = canv.getContext('2d'),
    n = 11;
canv.width = self.innerWidth,
    canv.height = self.innerHeight;
ctx.lineWidth = 1,
    arrow_color = 'black',
    length_x = 1300,
    length_y = 500,
    f_x = 100,
    f_y = 100,
    angle_start = 0,
    angle_end = Math.PI * 2,
    radius = 30,
    add_in_row = 100,
    ctx.font = "20px Georgia",
    oriented = false, //false
    colors = ['black', 'teal', 'brown', 'red', 'coral', 'chocolate', 'goldenrod', 'olive', 'yellow', 'dodgerblue', 'darkgreen', 'grey', 'lawngreen', 'navy', 'indigo', 'purple', 'crimson'],

    graphs = [
        [1, 1],
        [1, 3],
        [1, 11],
        [2, 11],
        [4, 3],
        [4, 4],
        [4, 10],
        [5, 2],
        [5, 5],
        [5, 7],
        [6, 3],
        [6, 4],
        [6, 5],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 6],
        [7, 9],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 5],
        [8, 6],
        [8, 7],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 8],
        [9, 11],
        [10, 2],
        [10, 3],
        [10, 5],
        [10, 9],
        [10, 10],
        [11, 3],
        [11, 4],
        [11, 5],
        [11, 8],
        [11, 10],
    ],

    matrix = [
        [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]
    ],

    matrix_weight = [
        [64, 0, 136, 0, 0, 0, 214, 190, 171, 0, 172],
        [0, 0, 0, 0, 204, 0, 208, 223, 93, 88, 222],
        [136, 0, 0, 146, 0, 103, 242, 124, 246, 187, 151],
        [0, 0, 146, 122, 0, 113, 224, 0, 86, 191, 66],
        [0, 204, 0, 0, 120, 202, 191, 99, 174, 212, 167],
        [0, 0, 103, 113, 202, 0, 128, 191, 0, 0, 0],
        [214, 208, 242, 224, 191, 128, 0, 108, 134, 0, 0],
        [190, 223, 124, 0, 99, 191, 108, 0, 146, 0, 106],
        [171, 93, 246, 86, 174, 0, 134, 146, 0, 208, 170],
        [0, 88, 187, 191, 212, 0, 0, 0, 208, 188, 41],
        [172, 222, 151, 66, 167, 0, 0, 106, 170, 41, 0]
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
    };

btn.addEventListener("click", dijkstra);

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
    let space = length_x / (f_row + 1);
    for (let index = 1; index <= f_row; index++) {
        coords[indexes_in_row[0][index - 1]][0] = f_x + space * index;
    };
    space = length_y / (s_row + 1);
    for (let index = 1; index <= s_row; index++) {
        coords[indexes_in_row[1][index - 1]][1] = f_y + space * index;
    };
    space = length_x / (t_row + 1);
    for (let index = 1; index <= t_row; index++) {
        coords[indexes_in_row[2][index - 1]][0] = f_x + space * index;
    };
    space = length_y / (fo_row + 1);
    for (let index = 1; index <= fo_row; index++) {
        coords[indexes_in_row[3][index - 1]][1] = f_y + space * index;
    };
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
    calcRows(n - 4);
    setCorners(f_x, f_y, length_x, length_y);
    let left_n = n - 4,
        i = 1;
    while (left_n > 0) {
        coords[n - left_n] = [f_x + add_in_row * i, f_y];
        used_coord[n - left_n] = 0;
        left_n--;
        coords[n - left_n] = [f_x + length_x, f_y + add_in_row * i];
        used_coord[n - left_n] = 0;
        left_n--;
        coords[n - left_n] = [f_x + length_x - add_in_row * i, f_y + length_y];
        used_coord[n - left_n] = 0;
        left_n--;
        coords[n - left_n] = [f_x, f_y + add_in_row * i];
        used_coord[n - left_n] = 0;
        left_n--;
        i++;
    };
    normalize(n);
};

// Draw nodes
function drawCircles(n, coords, black = false) {
    for (let i = 0; i < n; i++) {
        if (black) ctx.fillStyle = "black";
        else ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(coords[i][0], coords[i][1], radius, angle_start, angle_end);
        ctx.fill();
        // Fill text
        ctx.fillStyle = 'white';
        ctx.fillText(i + 1, coords[i][0], coords[i][1]);
    }
};

// Draw single edge
function drawNoose(from_x, from_y, from_n) {
    ctx.beginPath();
    ctx.strokeStyle = arrow_color;

    if (from_x === f_x) {
        ctx.moveTo(from_x - radius, from_y);
        ctx.lineTo(from_x - radius - 10, from_y - radius);
        ctx.lineTo(from_x - radius - 10, from_y + radius);
        ctx.lineTo(from_x - radius, from_y);
        ctx.stroke();
    } else if (from_y === f_y) {
        ctx.moveTo(from_x, from_y - radius);
        ctx.lineTo(from_x + radius, from_y - radius - 10);
        ctx.lineTo(from_x + -radius, from_y - radius - 10);
        ctx.lineTo(from_x, from_y - radius);
        ctx.stroke();
    } else if (from_x === f_x + length_x) {
        ctx.moveTo(from_x + radius, from_y);
        ctx.lineTo(from_x + radius + 10, from_y - radius);
        ctx.lineTo(from_x + radius + 10, from_y + radius);
        ctx.lineTo(from_x + radius, from_y);
        ctx.stroke();
    } else if (from_y === f_y + length_y) {
        ctx.moveTo(from_x, from_y + radius);
        ctx.lineTo(from_x - radius, from_y + radius + 10);
        ctx.lineTo(from_x + radius, from_y + radius + 10);
        ctx.lineTo(from_x, from_y + radius);
        ctx.stroke();
    }
};

// Find intersection of edge and node
function findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    let a = 1 + m * m;
    let b = -h * 2 + (m * (n - k)) * 2;
    let c = h * h + (n - k) * (n - k) - r * r;

    // get discriminant
    let d = b * b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        let intersections = [
            (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
            (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        ];
        if (d == 0)
        // only 1 intersection
            return [intersections[0]];
        return intersections;
    }
    // no intersection
    return [];
};

// Draw edge
function drawArrow(to_x, to_y, from_x, from_y, radius = 10) {
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

// XY of intersection of node and edge
function returnXY(center_x, center_y, t_x, t_y, circle_x, circle_y) {
    let tmp = 0;
    if (oriented)
        tmp = 8.5;
    let
        k = (t_y - center_y) / (t_x - center_x),
        b = -center_x * k + center_y,
        x_ar = findCircleLineIntersections(radius + tmp, circle_x, circle_y, k, b),
        x,
        y;
    if (x_ar.length === 0) {
        x = center_x;
        if (circle_y > center_y)
            y = circle_y - radius - 10;
        else y = circle_y + radius + 10;
    } else
    if (Math.abs(x_ar[0] - center_x) < Math.abs(x_ar[1] - center_x))
        x = x_ar[0];
    else x = x_ar[1];
    y = k * (x - center_x) + center_y;
    return [x, y];
};

// Check if nodes have another node between
function checking(coords, f_x, f_y, t_x, t_y) {
    for (let i = 0; i < n; i++)
        if ((coords[i][0] != f_x && coords[i][1] == f_y && coords[i][0] != t_x && coords[i][1] == t_y) || (coords[i][0] == f_x && coords[i][1] != f_y && coords[i][0] == t_x && coords[i][1] != t_y))
            return true;
    return false;
};

// Draw edges
function drawEdge(f_x, f_y, t_x, t_y, f_n, t_n, coords, matrix_weight = []) {
    const
        circle_x = t_x,
        circle_y = t_y;
    if (t_n === 8 && f_n === 0)
        f_n = [t_n, t_n = f_n][0]; // swap
    if (t_n === 3 && f_n === 2)
        f_n = [t_n, t_n = f_n][0]; // swap
    let str = matrix_weight[f_n][t_n];
    ctx.fillStyle = colors[f_n];
    ctx.beginPath();
    ctx.strokeStyle = colors[f_n];
    ctx.moveTo(f_x, f_y);
    if (checking(coords, f_x, f_y, t_x, t_y)) {
        if (f_x == t_x) {
            if (f_n < t_n) {
                ctx.lineTo(f_x + radius * 2, (f_y + t_y) / 2);
                ctx.fillText(str, f_x + radius * 2, (f_y + t_y) / 2);
                x = returnXY(f_x + radius * 2, (f_y + t_y) / 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY(f_x + radius * 2, (f_y + t_y) / 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, f_x + radius * 2, (f_y + t_y) / 2);
            } else {
                ctx.lineTo(f_x - radius * 2, (f_y + t_y) / 2);
                ctx.fillText(str, f_x - radius * 2, (f_y + t_y) / 2);
                x = returnXY(f_x - radius * 2, (f_y + t_y) / 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY(f_x - radius * 2, (f_y + t_y) / 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, f_x - radius * 2, (f_y + t_y) / 2);
            }
        } else if (f_y == t_y) {
            if (f_n < t_n) {
                ctx.lineTo((f_x + t_x) / 2, f_y + radius * 2);
                ctx.fillText(str, (f_x + t_x) * 2, f_y + 10 + radius * 2);
                x = returnXY((f_x + t_x) / 2, f_y + radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2, f_y + radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2, f_y + radius * 2);

            } else {
                ctx.lineTo((f_x + t_x) / 2, f_y - radius * 2);
                ctx.fillText(str, (f_x + t_x) / 2, f_y - 10 - radius * 2);
                x = returnXY((f_x + t_x) / 2, f_y - radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2, f_y - radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2, f_y - radius * 2);
            }
        }
    } else {
        if (f_n < t_n) {
            if (f_y - radius < (f_y + t_y) / 2 + radius * 2 < f_y + radius) {
                ctx.lineTo((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2);
                ctx.fillText(str, (f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2);
                x = returnXY((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2);
            } else {
                ctx.lineTo((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2);
                ctx.fillText(str, (f_x + t_x + 10) / 2 + radius * 2, (f_y + t_y + 10) / 2 + radius * 2);
                x = returnXY((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2);
            }
        } else {
            if (f_y - radius < (f_y + t_y) / 2 - radius * 2 < f_y + radius) {
                ctx.lineTo((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2);
                ctx.fillText(str, (f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2);
                x = returnXY((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2 + radius * 2, (f_y + t_y) / 2 + radius * 2);
            } else {
                ctx.lineTo((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2);
                ctx.fillText(str, (f_x + t_x + 10) / 2 - radius * 2, (f_y + t_y + 10) / 2 - radius * 2);
                x = returnXY((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2, t_x, t_y, circle_x, circle_y)[0];
                y = returnXY((f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2, t_x, t_y, circle_x, circle_y)[1];
                ctx.lineTo(x, y);
                ctx.stroke();
                if (oriented)
                    drawArrow(x, y, (f_x + t_x) / 2 - radius * 2, (f_y + t_y) / 2 - radius * 2);
            }
        }
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function clear() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    drawCircles(n, coords, true);
};

function drawSingleCircle(number, coords, text) {
    ctx.fillStyle = text;
    ctx.beginPath();
    ctx.arc(coords[number][0], coords[number][1], radius, angle_start, angle_end);
    ctx.fill();
    // Fill text
    ctx.fillStyle = 'white';
    ctx.fillText(number + 1, coords[number][0], coords[number][1]);
}

async function dijkstra_worker(n, matrix_weight, coords) {
    clear();
    let array = new Array(n),
        been = [],
        number = 0,
        add_array = [];

    // Create table
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(3);
        array[i].length_ = Infinity;
        array[i].status = "temporary";
        array[i].parent = undefined;
    };
    array[0].length_ = 0;
    // Main function
    while (been.length < n - 1) {
        drawSingleCircle(number, coords, "green");
        // Search all edges
        for (let i = 0; i < matrix_weight.length; i++)
            if (matrix_weight[number][i] !== 0)
                if (array[i].length_ > array[number].length_ + matrix_weight[number][i]) {
                    array[i].length_ = array[number].length_ + matrix_weight[number][i];
                    array[i].parent = number;
                    drawEdge(coords[number][0], coords[number][1], coords[i][0], coords[i][1], number, i, coords, matrix_weight);
                };
        array[number].status = "active";
        console.table(array);
        await sleep(10000);
        drawSingleCircle(number, coords, "black");
        console.clear();
        add_array = [];
        // Search minimal length
        for (let i = 0; i < array.length; i++) {
            if (array[i].status === "temporary")
                add_array.push(array[i].length_);
            let min = Math.min.apply(null, add_array);
            if (min === array[i].length_)
                number = i;
        };
        been.push(number);
    };
    console.log("Weight matrix");
    console.log(matrix_weight);
    console.log("Final table");
    console.table(array);
};

// All alert for the fifth lab 
function doAlert() {
    let str = "Press the button under the graph to see the work of Dijkstra algorithm. Press F12 to see the table of results. There is 10 seconds break between each active point";
    swal(str);
};

// Main part
setPoints(n);
for (const el of graphs)
    if (el[0] === el[1])
        drawNoose(coords[el[0] - 1][0], coords[el[0] - 1][1], el[0] - 1);
    else drawEdge(coords[el[0] - 1][0], coords[el[0] - 1][1], coords[el[1] - 1][0], coords[el[1] - 1][1], el[0] - 1, el[1] - 1, coords, matrix_weight);
drawCircles(n, coords);

doAlert();

// Lab sixth
function dijkstra() {
    dijkstra_worker(n, matrix_weight, coords, graphs);
};