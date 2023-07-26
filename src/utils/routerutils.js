export const getRoutes = dataArr => {
  const arr = []
  for (let i = 0; i < dataArr.length; i++) {
    const item = JSON.parse(JSON.stringify(dataArr[i]))
    if (!item.hidden) {
      const obj = { ...item }
      item.children && (obj['children'] = getRoutes(item.children))
      arr.push(obj)
    }
  }
  return arr
}
