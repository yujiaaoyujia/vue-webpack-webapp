const handler = require('serve-handler')
const http = require('http')
const os = require('os')

// 配置
const config = {
  port: 5000,
  path: './dist',
}

// 获取本机IPv4地址
function getIpAddress() {
  const interfaces = os.networkInterfaces()
  const networks = Object.values(interfaces)
  let ipAddress = ''
  networks.forEach((net) => {
    const network = (net || []).find(alias => alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
    if (network) {
      ipAddress = network.address
    }
  })
  return ipAddress
}

const server = http.createServer((request, response) => (
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  handler(request, response, {
    public: config.path, // Set a sub directory to be served
    // cleanUrls: Have the .html extension stripped from paths
    // rewrites: Rewrite paths to different paths
    // redirects: Forward paths to different paths or external URLs
    // headers: Set custom headers for specific paths
    // directoryListing: Disable directory listing or restrict it to certain paths
    // unlisted: Exclude paths from the directory listing
    // trailingSlash: Remove or add trailing slashes to all paths
    // renderSingle: If a directory only contains one file, render it
  })
))

// 开始 http 服务器
// More details here: https://nodejs.org/api/net.html#net_server_listen
server.listen(config.port, () => {
  const ipAddress = getIpAddress()
  console.log(`Server has started. Running on http://${ipAddress}:${config.port}`)
})
