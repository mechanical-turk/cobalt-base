# corrected-names
Given a string, returns an object with its camelCaseName, PascalCaseName, underscored_name, dashed_name and the original input string

```js

  const getCorrectedNames = require('corrected-names');
  
  const myCorrectedNames = getCorrectedNames('my_Corrected-names');
  /* 
    returns: 
    
    {
      camelCaseName: 'myCorrectedNames',
      pascalCaseName: 'MyCorrectedNames',
      underscoredName: 'my_corrected_names',
      dashedName: 'my-corrected-names',
      originalName: 'my_Corrected-names',
    }
  
  */

```
