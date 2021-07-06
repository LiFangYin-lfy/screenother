/**
 * Created by Tuffy on 2018/12/11.
 */
'use strict';

import drag from './drag'

const install = function(Vue) {
    Vue.directive('pt-drag', drag)
}

if (window.Vue) {
    window.drag = drag
    Vue.use(install) // eslint-disable-line
}

drag.install = install
export default drag