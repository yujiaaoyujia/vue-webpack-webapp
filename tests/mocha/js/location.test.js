import { getParam } from '@/assets/js/jdy/location'

describe('getParam', () => {
  it('Gets the name parameter from the url', () => {
    expect(getParam('name', 'https://www.baidu.com/?name=sunding')).toBe('sunding')
  })
})
