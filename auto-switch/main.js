let n
init()
let second = 1000
let timer = playBack()
autoSwitch()
// 封装函数
function autoSwitch(){
    document.addEventListener('visibilitychange', function(){
        if(document.hidden) {
            window.clearInterval(timer)
        }else {
            timer = playBack()
        }
    })
}
function playBack(){
    return setInterval(()=>{
        makeLeave(getImage(n))
        .one('transitionend', (e)=>{
            makeEnter($(e.currentTarget))
        })
        makeCurrent(getImage(n+1))
        n += 1
    },second)
}

function getImage(n){
    return $(`.images > img:nth-child(${x(n)})`)
}

function x(n){
    let t = $('.images > img').length
    if(n>t){ 
        n = n%t 
        if(n === 0){
            n = t
        }
    }  // n的值永远是 1 2 3... t
    return n
}
function init(){
    n = 1;
    $(`.images > img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}
function makeCurrent($node){
    return $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node){
    return $node.removeClass('enter current').addClass('leave')
}
function makeEnter($node){
    return $node.removeClass('leave current').addClass('enter')
}

console.log($(".images").children())
console.log($('.images').find('img'))