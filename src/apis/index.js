import _axios from '@/request/request'

export function getChinaMapGeoJson() {
  return _axios.get({
    url: '/data/chinaMap.json'
  })
}
