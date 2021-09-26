<template>
	<div class="box">
		<div class="progress-outer">
			<div class="progress" :style="{ width: calcWidth() }"></div>
		</div>
		<div class="text">{{ makeTextForTimer() }}</div>
	</div>
</template>

<script>
	export default {
		name: 'ProgressWithTime',
		props: {
			secondsTotal: {
				type: Number,
				default: 100,
				required: true,
				validator(value) {
					return value > 0
				},
			},
			secondsLeft: {
				type: Number,
				default: 0,
				required: true,
			},
		},
		methods: {
			makeTextForTimer() {
				const minutes = Math.floor(this.secondsLeft / 60)
				const seconds = (
					this.secondsLeft -
					minutes * 60
				).toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})
				return `${minutes}:${seconds}`
			},
			calcWidth() {
				let percent = (this.secondsLeft / this.secondsTotal) * 100
				percent = 100 - percent
				return `${percent}%`
			},
		},
	}
</script>

<style scoped>
	.box {
		position: relative;
		background-color: #d7eafcff !important;
	}

	.progress-outer {
		position: relative;
		height: calc(100% - 4px);
		width: calc(100% - 4px);
		top: 2px;
		left: 2px;
		background-color: #d7eafcff;
	}

	.progress {
		position: relative;
		background-color: #f3f3f3;
		height: 100%;
	}

	.text {
		position: absolute;
		color: #cccccc;
		font-size: 24px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
