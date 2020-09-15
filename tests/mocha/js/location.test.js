import { getParam, setParam, delParam, getObj, setObj, getRootPath } from '@/assets/js/jdy/location'

describe('getParam', () => {
  it('Gets the name parameter from the url', () => {
    expect(getParam('name', 'https://www.baidu.com/?name=yueaoao')).toBe('yueaoao')
  })

  it('Gets undefined parameter from the url', () => {
    expect(getParam('unknown', 'https://www.baidu.com')).toBe('')
  })
})

describe('setParam', () => {
  it('Sets the name parameter from the url', () => {
    expect(setParam('name', 'yueaoao', 'https://www.baidu.com')).toBe('https://www.baidu.com?name=yueaoao')
  })
})

describe('delParam', () => {
  it('Delete the name parameter from the url', () => {
    expect(delParam('name', 'https://www.baidu.com/?name=yueaoao&value=1')).toBe('https://www.baidu.com/?value=1')
  })
})

describe('getObj', () => {
  it('Get object from the url', () => {
    const urlWithParam = 'https://localhost:2333/index.html?jump=weapp&appid=10990&corpid=wx86f9eb82af991f64&suiteid=wx86f9eb82af991f64&code=021Qnsll2qdLr54yTvml2kCwIf2Qnslg'
    expect(getObj(urlWithParam)).toStrictEqual({
      appid: '10990',
      code: '021Qnsll2qdLr54yTvml2kCwIf2Qnslg',
      corpid: 'wx86f9eb82af991f64',
      jump: 'weapp',
      suiteid: 'wx86f9eb82af991f64',
    })
  })
})

describe('setObj', () => {
  it('Set object from the url', () => {
    expect(setObj('https://localhost:2333/index.html', {
      appid: '10990',
      jump: 'weapp',
    })).toBe('https://localhost:2333/index.html?appid=10990&jump=weapp')
  })
})

describe('getRootPath', () => {
  it('Get root path from the url', () => {
    expect(getRootPath()).toBe('')
  })
})
