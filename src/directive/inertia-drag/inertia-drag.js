/**
 * Created by Tuffy on 2018/11/12.
 */
'use strict';

export default {
    bind: function (el) {
        let timer = null
        el.onmousedown = function (e) {
            el.style.cursor = 'move'
            let speedX = 0
            let speedY = 0  //要求的速度
            let lastX = 0
            let lastY = 0    //最后一次的距离
            let disX = e.clientX - el.offsetLeft
            let disY = e.clientY - el.offsetTop
            document.onmousemove = function (e) {
                el.style.left = e.clientX - disX + 'px'
                el.style.top = e.clientY - disY + 'px'

                speedX = el.offsetLeft - lastX
                speedY = el.offsetTop - lastY

                lastX = el.offsetLeft
                lastY = el.offsetTop
            }
            document.onmouseup = function () {
                el.style.cursor = ''
                document.onmousemove = document.onmouseup = null
                move(el, speedX, speedY)
            };
        }

        function move(obj, speedX, speedY) {
            clearInterval(timer);
            timer = setInterval(function () {
                speedX *= 0.95    //摩擦
                speedY *= 0.95    //摩擦
                obj.style.left = obj.offsetLeft + speedX + 'px'
                obj.style.top = obj.offsetTop + speedY + 'px'
                if (Math.abs(speedX) < 1) speedX = 0
                if (Math.abs(speedY) < 1) speedY = 0
                if (speedX === 0 && speedY === 0) {
                    clearInterval(timer)
                }
            }, 30)
        }
    }
}