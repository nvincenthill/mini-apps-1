Installing and Running Webpack
First, make sure to have your project's file structure set up as follows:

1│
2│
3│
4│
5│
6│
7│
8│
9│
10│ your-project
-> client
-> dist
-> index.html
-> src
-> components
-> Component1.jsx
-> Component2.jsx
-> Component3.jsx
-> index.jsx
Next, you'll need to install Webpack into your project:

1│ npm install webpack --save-dev
You're also going to need to install Webpack-CLI (Webpack's Command Line Interface):

1│ npm install webpack-cli --save-dev
Next, you'll need a script to easily run your Webpack development server from the command line. Let's add one to our package.json:

1│
2│
3│ "scripts": {
"react-dev": "webpack -d --watch"
}
React components are mostly written in ES6. Since the browser can't understand these files in their raw form, you need to transpile their code back down to ES5. Webpack actually can't do this by itself, however, you can configure Webpack with some 'loaders' to do some of the heavy lifting for you. Webpack loaders are essesentially tools that take some code as input, conduct a transformation, and produce the transformed result as ouput.

The loader you'll need to use is called babel-loader, which uses our good friend Babel to do it's job. To use Babel, it must be configured with some presets. First, install babel-loader and its dependencies:

1│ npm install babel-loader babel-preset-env babel-preset-react --save-dev
Next, to configure Webpack, create a configuration file (also in your project's root directory) called webpack.config.js with the following contents:

1│
2│
3│
4│
5│
6│
7│
8│
9│
10│
11│
12│
13│ module.exports = {
module: {
rules: [
{
test: /\.jsx$/,
exclude: /node_modules/,
use: {
loader: "babel-loader"
}
}
]
}
};
The above is the simplest form of a webpack.config.js file. For every file with the .jsx extension, Webpack will run each file's code through babel-loader to transpile ES6 down to ES5.

Though you now have your base configuration set up, there are a few finishing touches to add. You'll need to specify an entry point for Webpack to begin looking for files to transpile, and an output path for Webpack to save the bundled up transpiled code. Simply add two properties, entry and output, to your webpack.config.js file as follows:

1│
2│
3│
4│
5│
6│
7│
8│
9│
10│
11│
12│
13│
14│
15│
16│
17│
18│
19│ module.exports = {
entry: **dirname + '/client/src/index.jsx',
module: {
rules: [
{
test: [/\.jsx$/],
exclude: /node_modules/,
loader: 'babel-loader',
query: {
presets: ['env', 'react'],
}
}
]
},
output: {
filename: 'bundle.js',
path: **dirname + '/client/dist'
}
};
Finally, start your React development server by running the following command on the command line:

1│ npm run react-dev
and you should see the transpiled version of your code, bundle.js appear in the /dist directory!
