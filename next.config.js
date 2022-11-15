/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
 
  async rewrites(){
    return [
      {
        source:'/menja',
        destination:'/html/menjagame.html'
      },
      {
        source:'/jsPlanet',
        destination:'/html/jsplanetgame.html'
      }
    ]
  }
}

module.exports = nextConfig
