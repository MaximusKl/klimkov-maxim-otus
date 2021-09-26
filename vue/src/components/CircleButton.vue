<template>
	<button class="circle-button" :style="{ 'background-color': color }">
		{{ text }}
	</button>
</template>

<script>
	export default {
		name: 'CircleButton',
		props: {
			color: {
				type: String,
				default: '#FD7C3EFF',
			},
			text: {
				type: String,
				default: 'X',
				required: true,
			},
		},
	}
</script>

<style scoped>
	.circle-button {
		height: 58px;
		width: 58px;
		border: none;
		border-radius: 50%;
		box-shadow: 0 5px 5px 0 #777777;
		cursor: pointer;
		font-size: 24px;
		font-weight: bold;
	}

	.circle-button:active {
		box-shadow: none;
		transform: translateY(4px);
	}
</style>
