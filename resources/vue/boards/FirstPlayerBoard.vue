<template>
	<div class="first-player-board touch-board">
		<div class="first-player-count">
			<span class="first-player-label">Players</span>
			<button
				type="button"
				class="first-player-btn"
				aria-label="Fewer players"
				:disabled="playerCount <= 2"
				v-repeat-press="decreasePlayers"
			>
				−
			</button>
			<span class="first-player-value">{{ playerCount }}</span>
			<button
				type="button"
				class="first-player-btn"
				aria-label="More players"
				:disabled="playerCount >= 8"
				v-repeat-press="increasePlayers"
			>
				+
			</button>
		</div>

		<button type="button" class="first-player-pick touch-panel" @click="pick">
			Pick first player
		</button>

		<div v-if="picked" class="first-player-result">Player {{ picked }}</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const playerCount = ref(4)
const picked = ref(null)

function decreasePlayers () {
  if (playerCount.value > 2) {
    playerCount.value--
  }
}

function increasePlayers () {
  if (playerCount.value < 8) {
    playerCount.value++
  }
}

function pick () {
  picked.value = Math.floor(Math.random() * playerCount.value) + 1
}
</script>
