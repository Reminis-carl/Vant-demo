<template>
  <div id="sidebar">
    <h1>leaflet-sidebar</h1>

    <p>
      A responsive sidebar plugin for for
      <a href="http://leafletjs.com/">Leaflet</a>, a JS library for interactive
      maps.
    </p>

    <p>
      <b
        >Click on the marker to show the sidebar again when you've closed it.</b
      >
    </p>

    <p>Other examples:</p>

    <ul>
      <li><a href="listing-markers.html">listing-markers example</a></li>
      <li><a href="two-sidebars.html">two-sidebars example</a></li>
    </ul>

    <p class="lorem">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>

    <p class="lorem">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>

    <p class="lorem">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>

    <p class="lorem">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
  </div>
  <div id="mapContainer" :style="{ height: '100%', width: '100%' }"></div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useGeoJsonStore } from '@/stores/geoJson'
import '@/plugins/sidebar/L.Control.Sidebar.css'
import '@/plugins/Sidebar/L.Control.Sidebar'
const store = useGeoJsonStore()
await store.getChinaData()
let map = null
let sidebar = null
const baseLayers = []
const overLayers = []
let layers = []
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
    onEachFeature: (feature, layer) => {
      let center = {}
      if (feature.properties.name) {
        center = {
          lat: feature.properties.center[1],
          lng: feature.properties.center[0]
        }
      } else {
        center = layer.getBounds().getCenter()
      }
      L.marker(center)
        .addTo(map)
        .on('click', function () {
          sidebar.toggle()
        })
    }
    // onEachFeature: (feature, layer) => {
    // layer.bindTooltip(feature.properties.name);

    // layer.bindPopup(feature.properties.address);
    //   let center = {}
    //   if (feature.properties.name) {
    //     center = {
    //       lat: feature.properties.center[1],
    //       lng: feature.properties.center[0]
    //     }
    //   } else {
    //     center = layer.getBounds().getCenter()
    //   }
    //   L.marker(center, {
    //     icon: L.divIcon({
    //       html: `<label style="color: black"> ${feature.properties.name}</label>`,
    //       iconSize: 50,
    //       className: 'my-title'
    //     })
    //   }).addTo(map)
    // }
  })
  //   .bindTooltip(function (layer) {
  //     // 只要使用这个bindTooltip方法，就会使得鼠标摆上要素的时候显示一个提示框，里面的内容可以自定义。不用去监听鼠标hover事件哦！
  //     return layer.feature.properties.name
  //   })

  baseLayers.push({ id: 'chinaMap', label: '中国区域底图', layer: geoMap })
  overLayers.push({ id: 'airspace', label: '空域', layer: L.layerGroup([]) })
  overLayers.push({ id: 'airLine', label: '航线', layer: L.layerGroup([]) })
  overLayers.push({
    id: 'shippingRoute',
    label: '航路',
    layer: L.layerGroup([])
  })
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
const initSidebar = () => {
  sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
  })
  map.addControl(sidebar)
  map.on('click', function () {
    sidebar.hide()
  })

  sidebar.on('show', function () {
    console.log('Sidebar will be visible.')
  })

  sidebar.on('shown', function () {
    console.log('Sidebar is visible.')
  })

  sidebar.on('hide', function () {
    console.log('Sidebar will be hidden.')
  })

  sidebar.on('hidden', function () {
    console.log('Sidebar is hidden.')
  })

  L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
    console.log('Close button clicked.')
  })
}
// 初始化地图
const initMap = () => {
  map = L.map('mapContainer', {
    minZoom: 3,
    zoom: 6,
    maxZoom: 10,
    attributionControl: false, // 隐藏logo
    // zoomControl: false,
    detectRetina: true
  }).setView([28.44896095499, 103.909632196358], 4)
  initSidebar()
  const layer = handleInitializeLayer()
  layer.addTo(map)
  handleCreateLayerControl()
}

// 折线
const polyline = (latlngs, options) => {
  const polyline = L.polyline(latlngs, options).addTo(map)
  if (options && options.popup) {
    polyline.bindPopup(options.popup)
  }
  layers.push(polyline)
  return polyline
}
// 多边形
const polygon = (latlngs, options) => {
  const polygon = L.polygon(latlngs, options).addTo(map)
  layers.push(polygon)
  return polygon
}
// 长方形
const rectangle = (latLngBounds, options) => {
  const rectangle = L.rectangle(latLngBounds, options).addTo(map)
  layers.push(rectangle)
  return rectangle
}
// 圆
const circle = (latlng, options) => {
  const circle = L.circle(latlng, options)
  layers.push(circle)
  return circle
}
// 圆标记
const circleMarker = (latlng, options) => {
  const circleMarker = L.circleMarker(latlng, options)
  layers.push(circleMarker)
  return circleMarker
}
// 加载geoJson数据
const geoJson = (geoJson, optiosn) => {
  const json = geoJson
  const layer = L.geoJSON(json, optiosn)
  layers.push(layer)
  return layer
}

const panTo = (latlng, options) => {
  map.panTo(latlng, options)
}
const flyTo = (latlng, options) => {
  map.flyTo(latlng, options)
}
const fitBounds = (bounds, options) => {
  map.fitBounds(bounds, options)
}
const flyBounds = (bounds, options) => {
  map.flyBounds(bounds, options)
}
const setZoom = (zoom, options) => {
  map.setZoom(zoom, options)
}
const removeAll = () => {
  for (const i = 0; i < layers.length; i++) {
    const item = layers[i]
    item.remove()
  }
  layers = new Array()
}
onMounted(() => {
  initMap()
})
</script>
<style lang="less" scoped>
// #sidebar {
//   display: none;
// }
.lorem {
  font-style: italic;
  color: #aaa;
}
</style>
