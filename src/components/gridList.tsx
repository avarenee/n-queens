const gridList = Array.from({ length: 8 }, (_, idx) => {
  return {
    gridRows: "grid-rows-" + (idx + 1).toString(),
    gridCols: "grid-cols-" + (idx + 1).toString(),
  }
})

export default gridList