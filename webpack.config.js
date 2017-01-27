module.exports = {  
  entry: {
    mainScript: "./src/mainScript.ts"
  },
  output: {
    path: './build/javascript',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
       { test: /\.tsx?$/, loader: 'ts-loader?compiler=typescript' }
    ]
  }
}