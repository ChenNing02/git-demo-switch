let $buttons = $('#buttonWrapper>button')
let $img = $('.images').children()
let active = 0

$img.eq(active).addClass('current')
    .siblings().addClass('enter')
    
bindEvents()
function bindEvents(){
    let auto = true
    $buttons.on('click', function(e) {
        if (auto) {
            auto = false
            $me = $(e.currentTarget)
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
        }
    })
}