# cobalt-base

You are a programmer who wastes a lot of time on coding repetitive, boilerplate stuff. For example, you want all your React components to be saved in a specific way:
- You want them to be saved under `ui/Components`
- You want them to have PascalCased filenames.
- You also want each component to have its associated css file saved under `client/stylesheets/`
- And you want the stylesheets to have underscored_names.

So, something like this:

```
project
└───ui
│   └───Components
│       │   MyFirstComponent.jsx
│       │   MySecondComponent.jsx
│   
└───client
    │   my_first_component.css
    │   my_second_component.css
```

What's more, you realize that you always have to code the same following lines for your react components:

```js
import React, { Component, PropTypes } from 'react';

export default class MyFirstComponent extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="my-first-component">
      </div>
    );
  }
}

MyFirstComponent.propTypes = {

};

MyFirstComponent.defaultProps = {

};
```

What if you could type something like `generate component my-first-component` in your terminal, and the rest was done automatically for you?

# Enter cobalt

`cobalt-base` is a tool for creating cli scaffolding tools. (It's a tool that creates tools - so meta)

Cobalt handles:
- Generating files: `... generate something somename`
- Deleting files: `... remove something somename`
- Overwriting: If the command you run might overwrite a file, cobalt asks if you're sure.
- Commandline option parsing

# Tutorial

Note: For the sake of brevity, this tutorial has the following command `node projectName/index.js generate something`, shortened to `... generate something`

In this tutorial, we will automate React Component generation (described above).

- Follow the instructions at https://github.com/keremkazan/cobalt-starter to get the boilerplate code.
- Create a file for the generator logic: `generators/component.js`
- The filename **is** really important. It's how cobalt understands where to look. When you run `... generate something` on the cli, cobalt will look for `generators/something.js`. Therefore when you run `... generate component`, cobalt will look for `generators/component.js`.
- As described in the intro, we want a template for our React component, and another one for its corresponding css file. There are two types of React components: stateful and stateless. So let's actually create the following 3 templates: 
  - `templates/Component/stateful_component.ejs`
  - `templates/Component/stateless_component.ejs` 
  - `templates/Stylesheet/component.ejs`

Our project directory should now look like this:

```
myScaffold
│   index.js
│   package.json
└───node_modules
│   └───cobalt-base
│   └───...
└───generators
│       │   component.js
└───templates
│   └───Component
│       │   stateful_component.ejs
│       │   stateless_component.ejs
│   └───Stylesheet
│       │   component.ejs
```
- The way we name templates is not as strictly enforced as we name generators. However, there is some logic behind it as we'll see later.
- Let's populate these templates:

```js
// templates/Component/stateful_component.ejs

import React, { Component, PropTypes } from 'react';

export default class <%= pascalCaseName %> extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="<%= dashedName %>">
      </div>
    );
  }
}

<%= pascalCaseName %>.propTypes = {

};

<%= pascalCaseName %>.defaultProps = {

};

```

```js
//templates/Component/stateless_component.ejs

export const <%= pascalCaseName %> = (props) => {

};
```


```js
//templates/Stylesheet/component.ejs

.<%= dashedName %> {

}
```
- Now let's code our generator logic. Every generator file has one responsibility: Exporting a function that tells cobalt what files to create, where to save them and what to put inside them.
- This function takes in one param: `options`. This param will give us access to the variables we have typed on the cli. For example, `generate component my-First-component --stateless` will set the options variable to: 


- With that in mind, let's create the generator logic for the stateful component:

```js
//generators/component.js

module.exports = (options) => {
  return {
    filename: `${options.name.pascalCaseName}.js`,
    parent: 'imports/ui/Components',
    templateName: 'Component.stateful_component',
    templateData: options.name,
  };
}
```
- `filename` is the the name we want to give to the file. In our case, this will resolve to: `MyFirstComponent.js`
- `parent` is where we want to save this file. Since we want to keep all of our react components in one place, we can hardcode that.
- `templateName` is the name of the ejs template that cobalt uses. In our case, that is `'Component.stateful_component'`. Cobalt will automatically resolve this and understand that it will need to look for `templates/Component/stateful_component.ejs`.
- `templateData` is the data we want to pass to the template. If we look back at our template for `stateful_component`, we'll see that it uses two variables: `pascalCaseName` and `dashedName`. Since these are already present in `options.name`, it's enough to pass that to `templateData`.

Now, when we execute `generate component my-First-component` on the cli, cobalt will generate the React component, put it under `imports/ui/Components` and give it the correct content. However, we also want to add stylesheets. This means that instead of a single object, our function should return an array of objects:

```js
//generators/component.js

module.exports = (options) => {
  return [
    {
      filename: `${options.name.pascalCaseName}.js`,
      parent: 'imports/ui/Components',
      templateName: 'Component.stateful_component',
      templateData: options.name,
    },
    {
      filename: `${options.name.underscoredName}.css`,
      parent: 'client',
      templateName: 'Stylesheet.component',
      templateData: options.name,
    },
  ];
}
```

Now, we also need to consider stateless components. In order to keep our code manageable, let's modularize it a little bit, and let's code the option to have stateless components:

```js
//generators/component.js

function getComponent(options) {
  const templateName = options.stateless ?
    'Component.stateless_component' :
    'Component.stateful_component';
  return {
    filename: `${options.name.pascalCaseName}.js`,
    parent: 'ui/Components',
    templateName: 'Component.stateful_component',
    templateData: options.name,
  };
}

function getStylesheet(options) {
  return {
    filename: `${options.name.underscoredName}.css`,
    parent: 'client',
    templateName: 'Stylesheet.component',
    templateData: options.name,
  };
}

module.exports = (options) => {
  return [
    getComponent(options),
    getStylesheet(options),
  ];
}
```

- Finally, we need to tell cobalt that `--stateless` is a boolean option. Otherwise, cobalt won't be able to understand the cli options. In order to parse the cli options, cobalt uses this wonderful library: [command-line-args](https://www.npmjs.com/package/command-line-args) 
- Once we update the `index.js` page, it should look the following:

```js
const path = require('path');
const { run, config } = require('cobalt-base');

config.TEMPLATES_DIR = path.join(__dirname, 'templates');
config.GENERATORS_DIR = path.join(__dirname, 'generators');

config.OPTION_DEFINITIONS.push(
  { name: 'stateless', type: Boolean }
);

run();
```

And that's it. Now we can execute `generate component my-first-component` and `generate component my-second-component --stateless`. This will create the files exactly the way we want them to be.

#Bin Executable

If you want to run your scaffolding tool as bin executable from the terminal, do the following:
- give your tool a command name, and assign it in your packages.json file. For example, if you want your scaffolder to run when you execute `myscaffolder generate component my-first-component`, replace `starter` with `myscaffolder`, so that you have the following in your `packages.json` file:
```json
"bin": {
    "myscaffolder": "./index.js"
}
```
- Finally, you need to make your module globally accessible. There are two ways of doing this.
 - While in the project directory, run `npm link`. This will create a global sym-link.
 - Publish your package on npm and install it globally
 
So now, instead of running `node ~/.../my-scaffolder/index.js generate component my-first-component`, you can just run `myscaffolder generate component my-first component`.
