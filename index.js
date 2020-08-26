// 1.获取所有单元格并添加点击事件(添加类名 x)
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var currentPlayer = Player.X;
var cells = document.querySelectorAll(".cell");
var gameBord = document.querySelector("#bord");
var message = document.querySelector('#message');
var winner = document.querySelector('#winner');
var restart = document.querySelector('#restart');
var winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] //斜
]; //判赢数组
var steps = 0; // 下棋步数
cells.forEach(function (item) {
    var cell = item;
    cell.addEventListener('click', clickCell, { once: true });
    //  {once: true} 点击事件只能触发一次
});
restart.addEventListener('click', function () {
    location.reload();
});
function clickCell(event) {
    var target = event.target;
    target.classList.add(currentPlayer);
    steps = steps + 1;
    // 判赢
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerText = currentPlayer + ' 获胜';
        return;
    }
    // 判断平局
    if (steps === 9) {
        message.style.display = 'block';
        winner.innerText = '平局！';
        return;
    }
    if (currentPlayer === Player.X) {
        currentPlayer = Player.O;
    }
    else {
        currentPlayer = Player.X;
    }
    gameBord.classList.remove('x', 'o');
    gameBord.classList.add(currentPlayer);
    // 移除所有类名(O 和 x)后再添加当前类名
}
// 封装判赢函数
function checkWin(player) {
    return winArr.some(function (item) {
        // console.log(item);
        var index1 = item[0];
        var index2 = item[1];
        var index3 = item[2];
        if (cells[index1].classList.contains(player) && cells[index2].classList.contains(player) && cells[index3].classList.contains(player)) {
            return true;
        }
        return false;
    });
}
