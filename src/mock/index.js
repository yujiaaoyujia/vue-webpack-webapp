import Mock from 'mockjs'
import GetJson from './GetJson.json'

Mock.setup({
  timeout: '0-800'
})

Mock.mock(/GetJson/, GetJson)
