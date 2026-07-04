<template>
	<div class="timer-board touch-board">
		<div class="timer-display" :class="{ running }">{{ formattedTime }}</div>

		<div class="timer-presets">
			<button
				v-for="preset in presets"
				:key="preset.seconds"
				type="button"
				class="timer-preset-btn"
				:class="{ active: selectedSeconds === preset.seconds && !running && remaining === 0 }"
				@click="selectPreset(preset.seconds)"
			>
				{{ preset.label }}
			</button>
		</div>

		<div class="timer-controls">
			<button type="button" class="timer-control-btn" @click="toggle">
				{{ running ? 'Pause' : 'Start' }}
			</button>
			<button type="button" class="timer-control-btn" @click="reset">Reset</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const presets = [
  { label: '30s', seconds: 30 },
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '5 min', seconds: 300 },
]

const selectedSeconds = ref(60)
const remaining = ref(0)
const running = ref(false)
let intervalId = null

const displaySeconds = computed(() => {
  if (running.value || remaining.value > 0) {
    return remaining.value
  }
  return selectedSeconds.value
})

const formattedTime = computed(() => {
  const total = displaySeconds.value
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }
  return String(seconds)
})

function selectPreset (seconds) {
  stop()
  selectedSeconds.value = seconds
  remaining.value = 0
}

function toggle () {
  if (running.value) {
    stop()
    return
  }

  if (remaining.value <= 0) {
    remaining.value = selectedSeconds.value
  }

  running.value = true
  intervalId = setInterval(() => {
    if (remaining.value <= 1) {
      remaining.value = 0
      stop()
      return
    }
    remaining.value--
  }, 1000)
}

function stop () {
  running.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function reset () {
  stop()
  remaining.value = 0
}

onUnmounted(() => {
  stop()
})
</script>
