/**
 * Created by Tuffy on 2018/11/12.
 */
'use strict';

import mousewheel from './mousewheel'

const install = function(Vue) {
    Vue.directive('pt-mousewheel', mousewheel)
}

if (window.Vue) {
    window.mousewheel = mousewheel
    Vue.use(install) // eslint-disable-line
}

mousewheel.install = install
export default mousewheel
