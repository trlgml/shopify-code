export const formatData = (data: Record<string, any>[]): any[] => {
  const optionKey: Record<string, number> = { 'Option1 Value': 1, 'Option2 Value': 2, 'Option3 Value': 3 }
  const result: Record<string, any> = {}
  data.forEach((item) => {
    const keys = Object.keys(item);
    if (!result[item.Handle]) {
      result[item.Handle] = {
        title: item.Title,
        body_html: item['Body (HTML)'],
        tags: item.Tags?.split(', '),
        option: [],
        variants: [],
        images: []
      }
    }
    result[item.Handle].images.push({
      src: item['Image Src'],
      position: item['Image Position']
    })
    const price = item['Variant Price']
    if (price) {
      result[item.Handle].variants.push({
        price,
        title: "Default Title",
        option1: result[item.Handle].variants.length
      })
    }
    keys.forEach((key) => {
      if (optionKey[key]) {
        if (result[item.Handle].option[optionKey[key] - 1]) {
          result[item.Handle].option[optionKey[key] - 1].value.push(item[key])
        } else {
          result[item.Handle].option[optionKey[key] - 1] = {
            name: item[key.replace('Value', 'Name')],
            value: [item[key]]
          }
        }

      }
    })
  })
  return Object.values(result)
}