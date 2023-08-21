<template>
  <div id="mapContainer" :style="{ height: '100%', width: '100%' }"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Fullscreen, MouseLocation, Scale,LayerSwitch } from '@antv/l7'
import { useMapStore } from '@/stores/lMap'
import { DrawControl, ControlEvent } from '@antv/l7-draw'
const store = useMapStore()
// 数据准备
await store.initMapData()
await store.initProvinceLabelData()
store.drawBaseMap(store.chinaMapData)
store.drawProvinceLabel(store.provinceLabelData)
onMounted(() => {
  store.initScene()
  const scene = store.getScene

  scene.on('loaded', () => {
    store.layers.forEach(layer => {
      scene.addLayer(layer)
    })
    // 添加绘制控件
    const drawControl = new DrawControl(scene, {})
    scene.addControl(drawControl)
    drawControl.on(ControlEvent.DrawChange, changeType => {
      console.log(changeType)
    })
    drawControl.on(ControlEvent.DataChange, dataChange => {
      console.log(dataChange)
    })
    //   全屏
    scene.addControl(new Fullscreen())
    //   鼠标经纬度
    scene.addControl(
      new MouseLocation({
        position: 'bottomright'
      })
    )
    //   Scale比例尺
    scene.addControl(new Scale())

    // 突出切换
    const layerSwitch = new LayerSwitch({
      layers: [...store.getLayers]
    })
    scene.addControl(layerSwitch)
  })
})
</script>
<style lang="less" scoped>
#mapContainer {
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
