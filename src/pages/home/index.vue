<template>
  <div id="mapContainer" :style="{ height: '100%', width: '100%' }"></div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useGeoJsonStore } from '@/stores/geoJson'
import '@/plugins/Leaflet.streetlabels'
import '@/plugins/fullscreen/Control.FullScreen.css'
import '@/plugins/fullscreen/Control.FullScreen'
import '@/plugins/leaflet.latlng-graticule'
const store = useGeoJsonStore()
await store.getChinaData()
let map = null
const baseLayers = []
const overLayers = []
const handleInitializeLayer = () => {
  const geoStyle = {
    color: '#000', // 描边颜色
    weight: 1, // 描边宽度
    fillRule: 'nonzero',
    opacity: 0.4, // Stroke opacity
    fillColor: 'transparent', // 填色
    fillOpacity: 1 // 填充不透明度
  }
  const chinaMapData = store.chinaGeoData
  const geoMap = L.geoJSON(chinaMapData, {
    style: geoStyle,
    onEachFeature: () => {}
  })
  baseLayers.push({ id: 'chinaMap', label: '中国区域底图', layer: geoMap })
  overLayers.push({ id: 'airspace', label: '空域', layer: L.layerGroup([]) })
  overLayers.push({
    id: 'shippingRoute',
    label: '航路',
    layer: L.layerGroup([])
  })
  overLayers.push({ id: 'airLine', label: '航线', layer: L.layerGroup([]) })

  return geoMap
}
// 初始化控制器
const handleCreateLayerControl = () => {
  const obj = {}
  for (let i = 0; i < baseLayers.length; i++) {
    let item = baseLayers[i]
    obj[item.label] = item.layer
  }
  const overObj = {}
  for (let i = 0; i < overLayers.length; i++) {
    let item = overLayers[i]
    overObj[item.label] = item.layer
  }
  const control = L.control.layers(obj, overObj)
  control.addTo(map)
}
// 初始化网格
const initGrid = () => {
  const grid = L.latlngGraticule({
    showLabel: true,
    dashArray: [5, 5],
    zoomInterval: [
      { start: 2, end: 3, interval: 30 },
      { start: 4, end: 4, interval: 10 },
      { start: 5, end: 7, interval: 5 },
      { start: 8, end: 10, interval: 1 }
    ]
  })
  return grid
}

// 初始化地图
const initMap = () => {
  const streetLabelsRenderer = new L.StreetLabels({
    collisionFlg: true,
    propertyName: 'name',
    showLabelIf: function (layer) {
      return Boolean(layer.properties.name)
      //   return true //layer.properties.type == "primary";
    },
    fontStyle: {
      dynamicFontSize: false,
      fontSize: 10,
      fontSizeUnit: 'px',
      lineWidth: 4.0,
      fillStyle: 'black',
      strokeStyle: 'white'
    }
  })
  map = L.map('mapContainer', {
    renderer: streetLabelsRenderer,
    minZoom: 3,
    zoom: 6,
    maxZoom: 10,
    attributionControl: false, // 隐藏logo
    zoomControl: true,
    detectRetina: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
      // optional
      title: 'Show me the fullscreen !',
      titleCancel: 'Exit fullscreen mode'
    }
  }).setView([32.44896095499, 103.909632196358], 4)
  const layer = handleInitializeLayer()
  layer.addTo(map)
  handleCreateLayerControl()
}

// 加载geoJson数据
onMounted(() => {
  initMap()
  // detect fullscreen toggling
  map.on('enterFullscreen', function () {
    if (window.console) window.console.log('enterFullscreen')
  })
  map.on('exitFullscreen', function () {
    if (window.console) window.console.log('exitFullscreen')
  })
  const gridLayer = initGrid()
  gridLayer.addTo(map)
})
</script>
<style lang="less" scoped></style>
