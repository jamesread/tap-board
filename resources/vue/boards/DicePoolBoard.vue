<template>
	<div class="dice-pool-board touch-board" @click="roll">
		<div class="dice-pool-grid">
			<Dice v-for="index in 6" :key="index" ref="diceRefs" />
		</div>
		<div class="dice-sum-label">Total: {{ total }}</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Dice from '../components/Dice.vue'

const diceRefs = ref([])
const total = ref(6)

async function roll () {
  const dice = Array.isArray(diceRefs.value) ? diceRefs.value : [diceRefs.value]
  await Promise.all(dice.filter(Boolean).map((die) => die.roll()))
  total.value = dice.filter(Boolean).reduce((sum, die) => sum + readDie(die), 0)
}

function readDie (die) {
  const exposed = die.value
  return typeof exposed === 'number' ? exposed : (exposed?.value ?? 1)
}
</script>
