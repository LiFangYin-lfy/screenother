/**
 * Created by Tuffy on 2018/11/12.
 */
'use strict';

import inertiaDrag from './inertia-drag'

const install = function(Vue) {
    Vue.directive('pt-inertia-drag', inertiaDrag)
}

if (window.Vue) {
    window.inertiaDrag = inertiaDrag
    Vue.use(install) // eslint-disable-line
}

inertiaDrag.install = install
export default inertiaDrag