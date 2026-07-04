<template>
	<button type="button" class="coin-board touch-panel" @click="flip">
		<span class="coin-result">{{ displayText }}</span>
	</button>
</template>

<script setup>
import { ref } from 'vue'

const result = ref(null)
const flipping = ref(false)

const displayText = ref('Tap to flip')

async function flip () {
  if (flipping.value) {
    return
  }

  flipping.value = true
  let ticks = 12

  while (ticks > 0) {
    displayText.value = Math.random() < 0.5 ? 'Heads' : 'Tails'
    ticks--
    await new Promise((resolve) => setTimeout(resolve, 80))
  }

  result.value = Math.random() < 0.5 ? 'Heads' : 'Tails'
  displayText.value = result.value
  flipping.value = false
}
</script>
