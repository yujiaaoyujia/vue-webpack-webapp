const handler = require('serve-handler')
const http = require('http')

// 配置
const config = {
  port: 5000,
  path: './dist',
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
  console.log(`Server has started. Port: ${config.port}`)
})
