<template>
	<div class="life-board touch-board">
		<div class="life-panels">
			<div v-for="(player, index) in players" :key="player.id" class="life-panel">
				<div class="life-panel-header">
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
				</div>

				<button
					type="button"
					class="life-btn"
					:aria-label="`Decrease life for ${player.name}`"
					v-repeat-press="() => adjust(player, -1)"
				>
					−
				</button>
				<span class="life-value" :class="{ low: player.life <= 5 }">{{ player.life }}</span>
				<button
					type="button"
					class="life-btn"
					:aria-label="`Increase life for ${player.name}`"
					v-repeat-press="() => adjust(player, 1)"
				>
					+
				</button>
			</div>
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
const startingLife = 20

let nextId = 3

const players = ref([
  { id: 1, name: 'Player 1', life: startingLife },
  { id: 2, name: 'Player 2', life: startingLife },
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
  player.life = Math.max(0, player.life + delta)
}

function addPlayer () {
  if (players.value.length >= maxPlayers) {
    return
  }

  players.value.push({
    id: nextId++,
    name: defaultName(players.value.length),
    life: startingLife,
  })
}

function removePlayer (index) {
  if (players.value.length <= minPlayers) {
    return
  }

  const removed = players.value[index]

  if (removed.life !== startingLife) {
    const confirmed = confirm(`Remove ${removed.name} with life ${removed.life}?`)
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
