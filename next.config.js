const path = require('path')
const glob = require('glob')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  assetPrefix: isProd ? 'https://chl-blog-1251008148.file.myqcloud.com' : '',
  webpack: function (config, { dev }) {
    // For the development version, we'll use React.
    // Because, it support react hot loading and so on.
    config.module.rules.push(
      {
        test: /\.(css|scss|md)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.md$/,
        use: ['raw-loader']
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['components', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  }
}
