const formatComponentName = vm => {
  if (vm.$root === vm) {
    return 'root instance'
  }
  const name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name
  return (
    (name ? `component <${name}>` : 'anonymous component') +
    (vm._isVue && vm.$options.__file ? ` at ${vm.$options.__file}` : '')
  )
}

export default {
  install(Vue, options) {
    const { release, token } = options

    Vue.config.errorHandler = async (err, vm, info) => {
      const { NODE_ENV, BASE_URL } = process.env

      try {
        const body = {
          ua: navigator.userAgent,
          environment: NODE_ENV,
          baseUrl: BASE_URL,
          onLine: navigator.onLine, // PWA, service worker, background-sync?
          component: vm ? formatComponentName(vm, true) : undefined,
          props: vm ? vm.$options.propsData : undefined,
          err: {
            msg: err.message,
            stack: err.stack
          },
          info,
          time: new Date(),
          release
        }
        const url = 'https://api.devoops.app/v1/om/errors'
        const options = {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(body)
        }
        await fetch(url, options)
        // console.log(JSON.stringify(body, null, 2))
      } catch (error) { console.error(error) }
    }
  }
}
