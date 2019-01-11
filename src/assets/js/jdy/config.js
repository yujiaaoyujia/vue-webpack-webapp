import { getRootPath } from './location'

export default {
  devStatus: 'release', // 'release',
  devApi: '//' + window.location.host + getRootPath(),
  api: '//' + window.location.host + getRootPath(),
  apiPrefix: {
    default: 'api-prefix',
  },
  version: '1.0.0',
  storageGUID: 'vue-webpack-webapp',
}
