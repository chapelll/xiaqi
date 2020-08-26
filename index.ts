// 1.获取所有单元格并添加点击事件(添加类名 x)
enum Player {
    X = "x",
    O = "o"
}
let currentPlayer: Player = Player.X
let cells = document.querySelectorAll(".cell")
let gameBord = document.querySelector("#bord")
let message = document.querySelector('#message') as HTMLDivElement
let winner = document.querySelector('#winner') as HTMLParagraphElement
let restart = document.querySelector('#restart') as HTMLButtonElement
let winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //横
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //竖
    [0, 4, 8], [2, 4, 6]             //斜
]   //判赢数组
let steps = 0 // 下棋步数

cells.forEach(function (item) {
    let cell = item as HTMLDivElement
    cell.addEventListener('click', clickCell, { once: true })
    //  {once: true} 点击事件只能触发一次
})

restart.addEventListener('click',function() {
    location.reload()
})

function clickCell(event: MouseEvent) {
    let target = event.target as HTMLDivElement
    target.classList.add(currentPlayer)
    steps = steps + 1

    // 判赢
    let isWin = checkWin(currentPlayer)
    if (isWin) {
        message.style.display = 'block'
        winner.innerText = currentPlayer + ' 获胜'
        return
    } 

    // 判断平局
    if (steps === 9) {
        message.style.display = 'block'
        winner.innerText = '平局！'
        return 
    } 

    if (currentPlayer === Player.X) {
        currentPlayer = Player.O
    } else {
        currentPlayer = Player.X
    }
    gameBord.classList.remove('x', 'o')
    gameBord.classList.add(currentPlayer)
    // 移除所有类名(O 和 x)后再添加当前类名
}

// 封装判赢函数
function checkWin(player: Player): boolean {
    return winArr.some(function (item) {
        // console.log(item);
        let index1 = item[0]
        let index2 = item[1]
        let index3 = item[2]
        if (cells[index1].classList.contains(player) && cells[index2].classList.contains(player) && cells[index3].classList.contains(player)) {
            return true
        } 
            return false
    })
}
