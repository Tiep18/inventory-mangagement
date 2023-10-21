export const find = (list: any[], key: any, value: any) => {
  return list.find((item) => item[key] === value)
}
