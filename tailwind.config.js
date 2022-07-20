module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    module: {
      rules: [
        {test: /\.css$/, loader: 'css-loader'},
        {test: /\.svg$/, loader: 'file-loader'}
      ]
    },
    plugins: [],
  }