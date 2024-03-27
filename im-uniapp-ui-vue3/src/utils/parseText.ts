import { emojiRegExp } from './emoji'

export interface Match {
  type: 'link' | 'emoji' | 'text' | 'Ait'
  value: string
  index: number
}
/**
 * 
 * @param text 
 * @returns Match[]
 * @description 解析文本，将文本中的链接、表情、普通文本分离，便于渲染
 * @example
 * parseText('hello [大笑] world https://www.baidu.com') => [
    {
        "type": "text",
        "value": "hello ",
        "index": 0
    },
    {
        "type": "emoji",
        "value": "[大笑]",
        "index": 6
    },
    {
        "type": "text",
        "value": " world ",
        "index": 10
    },
    {
        "type": "link",
        "value": "https://www.baidu.com",
        "index": 17
    },
    {
        "type": "Ait",
        "value": "xxx",
        "index": 17
    }
]
 */
export function parseText(text: string, ext?: string): Match[] {
  if (!text) return []
  const regexLink = /https?:\/\/\S+/gi
  const regexEmoji = emojiRegExp
  const matches: Match[] = []
  let match
  const yxAitMsg = ext ? JSON.parse(ext).yxAitMsg : null
  while ((match = regexLink.exec(text)) !== null) {
    matches.push({
      type: 'link',
      value: match[0],
      index: match.index,
    })
    const fillText = ' '.repeat(match[0].length)
    text = text.replace(match[0], fillText)
  }

  while ((match = regexEmoji.exec(text)) !== null) {
    matches.push({
      type: 'emoji',
      value: match[0],
      index: match.index,
    })
    const fillText = ' '.repeat(match[0].length)
    text = text.replace(match[0], fillText)
  }
  if (yxAitMsg) {
    Object.keys(yxAitMsg)?.forEach((key) => {
      const item = yxAitMsg[key]
      const regex = new RegExp(item.text, 'g')
      while ((match = regex.exec(text))) {
        matches.push({
          type: 'Ait',
          value: match[0],
          index: match.index,
        })
      }
      const fillText = ' '.repeat(item.text.length)
      text = text.replace(regex, fillText)
    })
  }

  if (text) {
    text
      .split(' ')
      .filter((item) => item.trim())
      .map((item) => {
        const index = text?.indexOf(item)
        matches.push({
          type: 'text',
          value: item,
          index,
        })
        const fillText = ' '.repeat(item.length)
        text = text.replace(item, fillText)
      })
  }

  return matches.filter((item) => item.value).sort((a, b) => a.index - b.index)
}
