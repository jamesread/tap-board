<template>
	<div class="score-pad-board touch-board">
		<div v-for="(player, index) in players" :key="player.id" class="score-pad-row">
			<button
				type="button"
				class="score-pad-remove-btn"
				:aria-label="`Remove ${player.name}`"
				:disabled="players.length <= minPlayers"
				@click="removePlayer(index)"
			>
				×
			</button>

			<input
				v-if="editingId === player.id"
				ref="nameInput"
				v-model="player.name"
				type="text"
				class="score-pad-name-input"
				:aria-label="`Rename ${player.name}`"
				@blur="finishEdit(player)"
				@keydown.enter.prevent="finishEdit(player)"
				@keydown.escape.prevent="cancelEdit(player)"
			>
			<button
				v-else
				type="button"
				class="score-pad-name"
				:aria-label="`Rename ${player.name}`"
				@click="startEdit(player)"
			>
				{{ player.name }}
			</button>

			<button
				type="button"
				class="score-pad-btn"
				:aria-label="`Decrease score for ${player.name}`"
				v-repeat-press="() => adjust(player, -1)"
			>
				−
			</button>
			<span class="score-pad-score">{{ player.score }}</span>
			<button
				type="button"
				class="score-pad-btn"
				:aria-label="`Increase score for ${player.name}`"
				v-repeat-press="() => adjust(player, 1)"
			>
				+
			</button>
		</div>

		<button
			type="button"
			class="score-pad-add-btn"
			:disabled="players.length >= maxPlayers"
			@click="addPlayer"
		>
			Add player
		</button>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const minPlayers = 2
const maxPlayers = 8

let nextId = 3

const players = ref([
  { id: 1, name: 'Player 1', score: 0 },
  { id: 2, name: 'Player 2', score: 0 },
])

const editingId = ref(null)
const editBackup = ref('')
const nameInput = ref(null)

function defaultName (index) {
  return `Player ${index + 1}`
}

function startEdit (player) {
  editBackup.value = player.name
  editingId.value = player.id
  nextTick(() => {
    const input = Array.isArray(nameInput.value) ? nameInput.value[0] : nameInput.value
    input?.focus()
    input?.select()
  })
}

function finishEdit (player) {
  const trimmed = player.name.trim()
  player.name = trimmed || defaultName(players.value.indexOf(player))
  editingId.value = null
}

function cancelEdit (player) {
  player.name = editBackup.value
  editingId.value = null
}

function adjust (player, delta) {
  player.score += delta
}

function addPlayer () {
  if (players.value.length >= maxPlayers) {
    return
  }

  players.value.push({
    id: nextId++,
    name: defaultName(players.value.length),
    score: 0,
  })
}

function removePlayer (index) {
  if (players.value.length <= minPlayers) {
    return
  }

  const removed = players.value[index]

  if (removed.score !== 0) {
    const confirmed = confirm(`Remove ${removed.name} with score ${removed.score}?`)
    if (!confirmed) {
      return
    }
  }

  if (editingId.value === removed.id) {
    editingId.value = null
  }

  players.value.splice(index, 1)
}
</script>
