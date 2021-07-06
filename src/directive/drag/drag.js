/**
 * Created by Tuffy on 2018/12/11.
 */
'use strict';

export default {
    bind: function (el, binding) {
        const cb = binding.value
        el.onmousedown = function(e) {
            const ev = e || window.event
            el.style.cursor = 'move'
            const relaX = ev.clientX - el.offsetLeft
            const relaY = ev.clientY - el.offsetTop
            // 获取当前鼠标位置，减去与div的相对位置得到当前div应该被拖拽的位置
            document.onmousemove = function(e) {
                const ev = e || window.event
                el.style.left = `${ev.clientX - relaX}px`
                el.style.top =  `${ev.clientY - relaY}px`
                cb && cb(el.style.left, el.style.top)
            };
            document.onmouseup = function() {
                document.onmousemove = null
                document.onmouseup = null
                el.style.cursor = 'default'
            }
        }
    }
}