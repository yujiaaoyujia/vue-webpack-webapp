import Mock from 'mockjs'
import GetJson from './GetJson.json'

Mock.setup({
  timeout: '0-1500',
})

Mock.mock(/GetJson/, GetJson)
