import { getRootPath } from './location'

export default {
  devStatus: 'release', // dev | release,
  devApi: '//' + window.location.host + getRootPath(),
  api: '//' + window.location.host + getRootPath(),
  apiPrefix: { default: 'api-prefix' },
  apiSuffix: { default: '.aspx' },
  version: '1.0.0',
  storageGUID: 'vue-webpack-webapp',
}
