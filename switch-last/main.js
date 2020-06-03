let $buttons = $('#buttonWrapper').children()
let $img = $('#slides').children()

let $switchLeft = $('.switch > .switch-left')
let $switchRight = $('.switch > .switch-right')
let active = 0
let auto = true
let timer

$buttons.eq(0).addClass('blue')
$img.eq(active).addClass('current')
    .siblings().addClass('enter')
    
bindEvents()

timer = playBack()

autoWindow()

autoTimer($buttons)
autoTimer($img)
autoTimer($switchLeft)
autoTimer($switchRight)
function autoTimer(element){
    element.on('mouseenter', function () {
        window.clearInterval(timer)
    }).on('mouseleave', function () {
        timer = playBack()
    })
}

function bindEvents(){
    $buttons.on('click', function(e) {
        let $me = $(e.currentTarget)
        if (auto) {
            auto = false
            
            let index = $me.index()
            if (active > index) {
                $img.eq(index).hide()
                $img.eq(index).offset()
                $img.eq(index).removeClass('leave enter current out now').addClass('back')
                    .show()
                $img.eq(active).removeClass('leave enter current now').addClass('out')
                $img.eq(index).removeClass('leave enter current out back').addClass('now')
            } else if (active < index) {
                $img.eq(active).removeClass('out now back enter current').addClass('leave')
                    .one('transitionend', (e) => {
                        $(e.currentTarget).removeClass('out now back leave').addClass('enter')
                    })
                $img.eq(index).removeClass('out now back enter leave').addClass('current')
            }
            active = index
            setTimeout(function () {
                auto = true
                console.log(auto)
            }, 300)
            $buttons.removeClass('blue')
            $me.addClass('blue')
        }
    })
}
function playBack(){
    return setInterval(function () {
        rightSlides(active + 1)
    }, 1000)
}
function rightSlides(index){
    if(auto){
        auto = false
        if (index > $img.length - 1) {
            index = 0
        }
        console.log(index)
        $img.eq(active).removeClass('out now back enter current').addClass('leave')
            .one('transitionend', (e) => {
                $(e.currentTarget).removeClass('out now back leave').addClass('enter')
            })
        $img.eq(index).removeClass('out now back enter leave').addClass('current')
        active = index
        setTimeout(function () {
            auto = true
            console.log(auto)
        }, 300)
        $buttons.removeClass('blue')
        $buttons.eq(index).addClass('blue')

    }
    

}
function leftSlides(index){
    if(auto){
        auto = false
        if(index < 0){
            index = $img.length - 1
        }
        console.log(index)
        $img.eq(index).hide()
        $img.eq(index).offset()
        $img.eq(index).removeClass('leave enter current out now').addClass('back')
            .show()
        $img.eq(active).removeClass('leave enter current now').addClass('out')
        $img.eq(index).removeClass('leave enter current out back').addClass('now')
        active = index
        setTimeout(function () {
            auto = true
            console.log(auto)
        }, 300)
        $buttons.removeClass('blue')
        $buttons.eq(index).addClass('blue')
    }
}
function autoWindow(){
    document.addEventListener('visibilitychange', function(){
        if(document.hidden) {
            window.clearInterval(timer)
        }else {
            timer = playBack()
        }
    })
}
autoSwitch()
function autoSwitch(){
    $switchLeft.on('click',function(){
        leftSlides(active - 1)
    })
    $switchRight.on('click', function(){
        rightSlides(active + 1)
    })
}

