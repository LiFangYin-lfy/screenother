/**
 * 接口管理
 */

// const host = 'http://121.199.37.147:8888/ptserver'
const host = 'http://localhost:8082'
export default {

    /**
     * 获取浮标数据
     * @param {*} name 
     */
    buoyData(name) {
        return new Promise((resolve, reject) => {
            $.ajax({
				async:false,
                url: `${host}/a/jeeplusapi/buoy/getData?stationName=${encodeURIComponent(name)}`,
                success(result) {
                    resolve(result)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },

    /**
     * 潮汐接口数据
     * @param {*} name 
     */
    tideData(name) {
        return new Promise((resolve, reject) => {
            $.ajax({
				async:false,
                url: `${host}/a/jeeplusapi/tide/getData?regionName=${encodeURIComponent(name)}`,
                success(result) {
                    resolve(result)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },

    /**
     * 水质数据
     * @returns 
     */
    sjData() {
        return new Promise(resolve => {
            $.get('data/sj.json', result => resolve(result))
        })
    },

    /**
     * 监控数据
     * @returns 
     */
     jkData2() {
        return new Promise(resolve => {
            $.get('data/jk.json', result => resolve(result))
        })
    },
	/**
	 * 空气监测数据接口数据
	 * @param {*} name 
	 */
	jkData(name,time) {
		return new Promise((resolve, reject) => {
			$.ajax({
				async:false,
				url: `${host}/a/jeeplusapi/air/getData?stationName=${encodeURIComponent(name)}&monitorTime=${encodeURIComponent(time)}`,
				success(result) {
					resolve(result)
				},
				error(err) {
					reject(err)
				}
			})
		})
	},
		
	/**
	 * 天气监测数据接口数据
	 */
	tqData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				async:false,
				url: `${host}/a/jeeplusapi/weather/getData`,
				success(result) {
					resolve(result);
					console.log("天气返回结果：" + result);
				},
				error(err) {
					reject(err)
				}
			})
		})
	},
	/**
	 * 环境监测-采集次数
	 */
	hjjcCjData(wqStationNames,buoyStationNames,airStationNames,weatherStationNames,acquisitionDate) {
		return new Promise((resolve, reject) => {
			$.ajax({
				async:false,
				url: `${host}/a/jeeplusapi/monitor/getAcquisitionTimes`,
				data:{"wqStationNames":wqStationNames,"buoyStationNames":buoyStationNames,
				"airStationNames":airStationNames,"weatherStationNames":weatherStationNames,
				"acquisitionDate":acquisitionDate},
				success(result) {
					resolve(result);
					console.log("采集次数返回结果" + result);
				},
				error(err) {
					reject(err)
				}
			})
		})
	},
	
	
	/**
	 * 空气监测数据接口数据，时间范围数据
	 * @param {*} name 
	 * @param {*} startTime 
	 * @param {*} endTime 
	 */
	kqData(name,startTime,endTime) {
		// alert("调用空气接口")
		return new Promise((resolve, reject) => {
			$.ajax({
				type:'POST',
				async:false,
				url: `${host}/a/jeeplusapi/air/getData`,
				data:{"stationName":name,"beginMonitorTime":startTime,"endMonitorTime":endTime},
				success(result) {
					resolve(result)
					// console.log("空气数据返回结果" + JSON.toString(result));
				},
				error(err) {
					reject(err)
				}
			})
		})
	},
	
	/**
	 * 浮标最新24小时数据
	 * @param {*} name 
	 */
	fb24hData(name) {
		// alert("浮标最新24小时数据")
		return new Promise((resolve, reject) => {
			$.ajax({
				// type:'POST',
				async:false,
				url: `${host}/a/jeeplusapi/buoy/getLast24hData?stationName=${encodeURIComponent(name)}`,
				// data:{"stationName":name},
				success(result) {
					resolve(result)
					console.log("浮标最新24小时数据返回成功");
				},
				error(err) {
					reject(err)
				}
			})
		})
	},

}