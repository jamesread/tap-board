<template>
	<div
		class="dice-panel component"
		:class="panelClass"
		:style="color ? { color } : undefined"
		@click="doRoll"
	>
		<Dice v-for="index in count" :key="index" ref="diceRefs" :sides="sides" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Dice from './Dice.vue'

defineProps({
  count: {
    type: Number,
    default: 1,
  },
  panelClass: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  sides: {
    type: Number,
    default: 6,
  },
})

const diceRefs = ref([])

async function doRoll () {
  const dice = Array.isArray(diceRefs.value) ? diceRefs.value : [diceRefs.value]
  await Promise.all(dice.filter(Boolean).map((die) => die.roll()))
}
</script>
