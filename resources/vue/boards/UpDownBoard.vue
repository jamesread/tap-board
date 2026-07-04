<template>
	<div class="counter-board">
		<button
			type="button"
			class="counter-btn"
			aria-label="Decrease"
			v-repeat-press="() => count--"
		>
			−
		</button>

		<div class="counter-display" aria-live="polite">{{ count }}</div>

		<button
			type="button"
			class="counter-btn"
			aria-label="Increase"
			v-repeat-press="() => count++"
		>
			+
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(50)
</script>
