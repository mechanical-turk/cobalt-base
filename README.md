# cobalt-base

You are a programmer who wastes a lot of time on coding repetitive, boilerplate stuff. For example, you want all your React components to be saved in a specific way:
- You want them to be saved under `imports/ui/Components`
- You want them to have camelCased filenames.
- You also want each component to have its associated css file saved under `client/stylesheets/`
- And you want the stylesheets to have underscored_names.

So, something like this:

```
.
+-- imports
|   +-- ui
|   |   +-- Components
|   |   |   +-- myFirstComponent.jsx
|   |   |   +-- mySecondComponent.jsx
+-- client
|   +-- stylesheets
|   |   +-- my_first_component.css
|   |   +-- my_second_component.css
```

What's more, you realize that you always have to code the same following lines for your components:

```
import React, { Component, PropTypes } from 'react';

class MyFirstComponent extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="my-first-component">
        Find me at imports/ui/Components/MyFirstComponent.jsx
      </div>
    );
  }
}
```

What if you could type something like `generate component my-first-component` in your cli, and the rest was done automatically for you?

#enter cobalt

cobalt framework is a tool for creating cli scaffolding tools. (It's a tool that creates tools - so meta)


cobalt-base is where all the modules that are part of the cobalt framework are bundled up together into a single useful module. Import cobalt-base into your project, and with a few really easy steps, start coding your own scaffolding tool.

Step 1: Setup

- `npm i cobalt-base --save`
- require path: `const path = require('path')`
- require cobalt-base: `const { run, config } = require('cobalt-base');`
- create two folders to store the templates and generator logic: `mkdir templates generators`
- tell cobalt where your /templates and /generators folders are: 
```
config.ROOT_TEMPLATES_DIR = path.join(__dirname, 'templates');
config.GENERATORS_DIR = path.join(__dirname, 'generators');
```
- tell cobalt that you're done with the setup: `run();`

Example file after Setup:

```
const path = require('path');
const { run, config } = require('cobalt-base');

config.TEMPLATES_DIR = path.join(__dirname, 'templates');
config.GENERATORS_DIR = path.join(__dirname, 'generators');

run();
```
