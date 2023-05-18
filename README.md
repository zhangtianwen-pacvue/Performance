# Performance
Get performance info for vue page

## Start

```
<!-- ./src/Home.vue -->
<script setup>
...
import usePerformance from 'performance/usePerformance'
const { observeAndSubmit } = usePerformance()
onMounted(() => {
  observeAndSubmit({
    ele,
    next,
    duration
  })
})
...
</script>


```