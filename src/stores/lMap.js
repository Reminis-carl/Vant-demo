import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import { PolygonLayer, LineLayer, PointLayer } from '@antv/l7'
import { defineStore } from 'pinia'
import request from '@/request/request'

export const useMapStore = defineStore('map', {
  state: () => {
    return {
      scene: null,
      chinaMapData: {},
      provinceLabelData: [],
      //图层
      layers: []
    }
  },
  actions: {
    // 初始化Scene
    initScene() {
      this.scene = new Scene({
        id: 'mapContainer',
        logoVisible: false,
        antialias: true,  // 是否开启抗锯齿
        map: new Mapbox({
          pitch: 0,
          //   style: 'blank',
          style: 'dark',
          center: [116.368652, 39.93866],
          zoom: 6
        })
      })
    },
    // 获取地图数据
    async initMapData() {
      try {
        this.chinaMapData = await request.get({
          url: '/data/map.json'
        })
      } catch (e) {
        console.error(e)
      }
    },
    // 获取省份标注数据
    async initProvinceLabelData() {
      try {
        this.provinceLabelData = await request.get({
          url: '/data/label.json'
        })
      } catch (e) {
        console.error(e)
      }
    },
    // 绘制底图
    drawBaseMap(data) {
      // 绘制中国区域区域图层
      const chinaPolygonLayer = new PolygonLayer({
        name: '省区域',
        autoFit: true
      }).source(data)

      chinaPolygonLayer.shape('fill').style({
        opacity: 1
      })
      this.layers.push(chinaPolygonLayer)
      // 绘制中国区域边界图层
      const chinaLineLayer = new LineLayer({
        name: '省边界',
        zIndex: 2
      })
        .source(data)
        .color('rgb(93,112,146)')
        .size(0.2)
        .style({
          opacity: 1
        })
      this.layers.push(chinaLineLayer)
    },
    // 绘制中国各省份标注
    drawProvinceLabel(data) {
      const labelLayer = new PointLayer({
        name: '省份名称',
        zIndex: 5
      })
        .source(data, {
          parser: {
            type: 'json',
            coordinates: 'center'
          }
        })
        .color('#000')
        .shape('name', 'text')
        .size(12)
        .style({
          opacity: 1,
          stroke: '#000',
          strokeWidth: 0,
          padding: [5, 5],
          textAllowOverlap: false
        })
      this.layers.push(labelLayer)
    }
  },
  getters: {
    getScene: state => {
      return state.scene
    },
    getLayers: state => {
      return state.layers
    }
  }
})
