/**
 * 工具类
 */

import Vue from 'vue'
const vue = new Vue()

class ToolsUtils {

    /**
     * 全局事件总线
     * @returns 
     */
    static getGlobalVue() {
        return vue
    }

    /**
     * get w&h 4 assign scale
     * @param width  canvas wid
     * @param height canvas hei
     * @param scaleX assign scaleX
     * @param scaleY assign scaleX
     * @return {{width: number, height: number}} assign w&h
     */
     static getAssignSize4Scale(width, height, scaleX, scaleY) {
        const size = Math.min(width / scaleX, height / scaleY)
        return {
            width: size * scaleX,
            height: size * scaleY
        }
    }
}

export default ToolsUtils