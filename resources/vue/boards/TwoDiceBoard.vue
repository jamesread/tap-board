<template>
	<div class="two-dice-board touch-board" @click="roll">
		<div class="two-dice-row">
			<Dice ref="die1" />
			<Dice ref="die2" />
		</div>
		<div class="dice-sum-label">{{ sum }}</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Dice from '../components/Dice.vue'

const die1 = ref(null)
const die2 = ref(null)
const sum = ref(2)

async function roll () {
  await Promise.all([die1.value?.roll(), die2.value?.roll()])
  sum.value = readDie(die1) + readDie(die2)
}

function readDie (dieRef) {
  const exposed = dieRef.value?.value
  return typeof exposed === 'number' ? exposed : (exposed?.value ?? 1)
}
</script>
