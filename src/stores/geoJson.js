import { defineStore } from 'pinia'
import { getChinaMapGeoJson } from '@/apis/index'
export const useGeoJsonStore = defineStore({
  id: 'geoJson',
  state: () => ({
    chinaData: null,
    testData: {
      key: 123,
      value: 'geo'
    }
  }),
  actions: {
    async getChinaData() {
      try {
        this.chinaData = await getChinaMapGeoJson()
      } catch (error) {
        console.error(error)
        return error
      }
    }
  },
  getters: {
    chinaGeoData: state => {
      return state.chinaData
    }
  }
})
