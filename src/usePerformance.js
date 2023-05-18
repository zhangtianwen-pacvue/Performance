import { onMounted, onUnmounted } from 'vue'
export default function usePerformance() {
  let navigationTiming = null
  let mutationTiming = null
  let excutor = null
  let timer = null
  let called = false
  const defaultExcutor = (data) => { console.log(data) }
  const start = performance.now()
  const submit = function(duration) {
    timer = setTimeout(() => {
      called = true
      excutor({
        mutationTiming,
        navigationTiming
      })
    }, duration)
  }
  const observeAndSubmit = function({ ele, next = defaultExcutor, duration = 10000 }) {
    if (!ele) {
      throw new Error('Missing Required Element')
    }
    excutor = next
    const eleObserver = new MutationObserver((list) => {
      mutationTiming = {
        time: performance.now() - start
      }
    })
    eleObserver.observe(ele, { subtree: true, childList: true })
    submit(duration)
  }
  const observeNavigation = function() {
    const observer = new PerformanceObserver((list) => {
      [navigationTiming] = list.getEntries()
    })
    observer.observe({ type: 'navigation', buffered: true })
  }
  onMounted(() => {
    observeNavigation()
  })
  onUnmounted(() => {
    if (!called) {
      excutor({
        mutationTiming,
        navigationTiming
      })
    }
    clearTimeout(timer)
  })
  return { observeAndSubmit }
}
