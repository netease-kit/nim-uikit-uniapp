import { getPinyinInitial, OTHER_TAG } from './index'

export const friendGroupByPy = <
  T extends {
    [key: string]: any
  }
>(
  arr: T[],
  keys: {
    firstKey: string
    secondKey?: string
    thirdKey?: string
  },
  isLowerCase = true
): { key: string; data: T[] }[] => {
  const res: { [key: string]: T[] } = {}

  const add = (k: string, v: T) => {
    const _k = isLowerCase ? k.toLowerCase() : k.toUpperCase()
    if (!res[_k]) {
      res[_k] = [v]
    } else {
      res[_k].push(v)
    }
  }

  arr.forEach((item) => {
    const v =
      item[keys.firstKey] ||
      item[keys.secondKey || ''] ||
      item[keys.thirdKey || '']

    const initial = getPinyinInitial(v)
    add(initial, item)
  })

  const data = Object.keys(res).map((k) => ({ key: k, data: res[k] }))
  const sortData = data
    .filter((item) => item.key !== OTHER_TAG)
    .sort((a, b) => a.key.localeCompare(b.key, 'en'))
  const otherData = data.filter((item) => item.key === OTHER_TAG)

  return sortData.concat(otherData)
}
