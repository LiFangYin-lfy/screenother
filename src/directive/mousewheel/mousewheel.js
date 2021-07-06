/**
 * Created by Tuffy on 2018/11/12.
 */
'use strict';

export default {
    inserted: function (el, binding) {
        const cb = binding.value
        el.addEventListener('mousewheel', function (e) {
            const direction = e.deltaY > 0 ? 'down' : 'up'
            cb(direction)
        })
    }
}
