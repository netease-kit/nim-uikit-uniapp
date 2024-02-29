import { t } from './i18n'

interface IKeyMap {
  [key: string]: string
}

export const emojiMap: IKeyMap = {
  [t('Laugh')]: 'icon-a-1',
  [t('Happy')]: 'icon-a-2',
  [t('Sexy')]: 'icon-a-3',
  [t('Cool')]: 'icon-a-4',
  [t('Mischievous')]: 'icon-a-5',
  [t('Kiss')]: 'icon-a-6',
  [t('Spit')]: 'icon-a-7',
  [t('Squint')]: 'icon-a-8',
  [t('Cute')]: 'icon-a-9',
  [t('Grimace')]: 'icon-a-10',
  [t('Snicker')]: 'icon-a-11',
  [t('Joy')]: 'icon-a-12',
  [t('Ecstasy')]: 'icon-a-13',
  [t('Surprise')]: 'icon-a-14',
  [t('Tears')]: 'icon-a-15',
  [t('Sweat')]: 'icon-a-16',
  [t('Angle')]: 'icon-a-17',
  [t('Funny')]: 'icon-a-18',
  [t('Awkward')]: 'icon-a-19',
  [t('Thrill')]: 'icon-a-20',
  [t('Cry')]: 'icon-a-21',
  [t('Fretting')]: 'icon-a-22',
  [t('Terrorist')]: 'icon-a-23',
  [t('Halo')]: 'icon-a-24',
  [t('Shame')]: 'icon-a-25',
  [t('Sleep')]: 'icon-a-26',
  [t('Tired')]: 'icon-a-27',
  [t('Mask')]: 'icon-a-28',
  [t('ok')]: 'icon-a-29',
  [t('AllRight')]: 'icon-a-30',
  [t('Despise')]: 'icon-a-31',
  [t('Uncomfortable')]: 'icon-a-32',
  [t('Disdain')]: 'icon-a-33',
  [t('ill')]: 'icon-a-34',
  [t('Mad')]: 'icon-a-35',
  [t('Ghost')]: 'icon-a-36',
  [t('Angry')]: 'icon-a-37',
  [t('Angry')]: 'icon-a-38',
  [t('Unhappy')]: 'icon-a-39',
  [t('Frown')]: 'icon-a-40',
  [t('Broken')]: 'icon-a-41',
  [t('Beckoning')]: 'icon-a-42',
  [t('Ok')]: 'icon-a-43',
  [t('Low')]: 'icon-a-44',
  [t('Nice')]: 'icon-a-45',
  [t('Applause')]: 'icon-a-46',
  [t('GoodJob')]: 'icon-a-47',
  [t('Hit')]: 'icon-a-48',
  [t('Please')]: 'icon-a-49',
  [t('Bye')]: 'icon-a-50',
  [t('First')]: 'icon-a-51',
  [t('Fist')]: 'icon-a-52',
  [t('GiveMeFive')]: 'icon-a-53',
  [t('Knife')]: 'icon-a-54',
  [t('Hi')]: 'icon-a-55',
  [t('No')]: 'icon-a-56',
  [t('Hold')]: 'icon-a-57',
  [t('Think')]: 'icon-a-58',
  [t('Pig')]: 'icon-a-59',
  [t('NoListen')]: 'icon-a-60',
  [t('NoLook')]: 'icon-a-61',
  [t('NoWords')]: 'icon-a-62',
  [t('Monkey')]: 'icon-a-63',
  [t('Bomb')]: 'icon-a-64',
  [t('Sleep')]: 'icon-a-65',
  [t('Cloud')]: 'icon-a-66',
  [t('Rocket')]: 'icon-a-67',
  [t('Ambulance')]: 'icon-a-68',
  [t('Poop')]: 'icon-a-70',
}

export const emojiRegExp = new RegExp(
  Object.keys(emojiMap)
    .map((item) => {
      const left = `\\${item.slice(0, 1)}`
      const right = `\\${item.slice(-1)}`
      const mid = item.slice(1, -1)
      return `${left}${mid}${right}`
    })
    .join('|'),
  'g'
)
