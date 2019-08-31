# @devoops/vue

> A Vue.js plugin.

### Usage

```javascript
// main.js
import Vue from 'vue'
import om from '@devoopshq/vue'

Vue.use(om, {
  // Git SHA or a custom version number. 
  release: 'project-name@2.3.12',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
```
