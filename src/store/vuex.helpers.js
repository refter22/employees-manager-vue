import store from './store'

export function createNamespacedHelpers (namespace) {
  return {
    dispatch: (actionType, payload) => store.dispatch(`${namespace}/${actionType}`, payload),
    commit: (mutationType, payload) => store.commit(`${namespace}/${mutationType}`, payload),
    getters: (getterType) => store.getters[`${namespace}/${getterType}`],
    state: () => store.state[namespace]
  }
}

export function createActionCreators (namespace, actions) {
  const helpers = createNamespacedHelpers(namespace)
  return Object.keys(actions).reduce((acc, actionType) => {
    acc[actionType] = (payload) => helpers.dispatch(actionType, payload)
    return acc
  }, {})
}
