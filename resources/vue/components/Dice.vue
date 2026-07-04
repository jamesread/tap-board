<template>
	<span class="dice" :class="{ numeric: sides !== 6 }">{{ displayText }}</span>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  sides: {
    type: Number,
    default: 6,
  },
})

const value = ref(1)

const displayText = computed(() => {
  if (props.sides === 6) {
    return String.fromCodePoint(9855 + value.value)
  }
  return String(value.value)
})

async function roll () {
  return new Promise((resolve) => {
    let tumblesRemaining = 10

    function tumble () {
      if (tumblesRemaining <= 0) {
        resolve()
        return
      }

      value.value = Math.floor(Math.random() * props.sides) + 1
      tumblesRemaining--
      setTimeout(tumble, 100)
    }

    tumble()
  })
}

defineExpose({ roll, value })
</script>
