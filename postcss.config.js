const join = require('path').join
const purgecss = require('@fullhuman/postcss-purgecss')
const tailwindJS = join(__dirname, 'tailwind.js')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g)
  }
}

const isDev = process.env.NODE_ENV == 'development'
 
function noop () {}

const purge = () => purgecss({
  content: [
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './components/**/*.vue'
  ],
  extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['vue']
      }
  ],
    whitelist: ['html', 'body']
  })

  const purgeCssPlugin = isDev ?
    noop
    : purge

module.exports = {
  plugins: [
    require('tailwindcss')(tailwindJS),
    require('autoprefixer'),
    purgeCssPlugin()
  ]
}
