<template>
	<div class="game">
		<div class="upper-part">
			<button class="cancel" @click="cancel">
				<span>&times;</span>ОТМЕНА
			</button>
			<ProgressWithTime
				class="progress"
				:seconds-total="secondsTotal"
				:seconds-left="secondsLeft"
			/>
		</div>
		<div class="task">
			<p>__ * __ * __ = 84240?</p>
		</div>
		<div class="buttons">
			<div class="digits__without-zero">
				<CircleButton
					v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
					:key="num"
					:text="num.toString()"
				></CircleButton>
			</div>
			<div class="digits__zero">
				<CircleButton text="0" />
			</div>
			<div class="symbols">
				<CircleButton
					v-for="sym in ['<', '>', '?', '=']"
					:key="sym"
					:text="sym"
					color="#777777"
				></CircleButton>
			</div>
		</div>
	</div>
</template>

<script>
	import CircleButton from '@/components/CircleButton'
	import ProgressWithTime from '@/components/ProgressWithTime'

	export default {
		name: 'Game',
		components: { ProgressWithTime, CircleButton },
		data() {
			return {
				secondsTotal: 70,
				secondsLeft: 0,
				interval: null,
			}
		},
		methods: {
			cancel() {
				this.$router.push('/')
			},
		},
		mounted() {
			this.secondsLeft = this.secondsTotal
			this.interval = setInterval(() => {
				this.secondsLeft--
				if (this.secondsLeft === 0) {
					clearInterval(this.interval)
					this.interval = null
				}
			}, 1000)
		},
		unmounted() {
			if (this.interval) clearInterval(this.interval)
		},
	}
</script>

<style scoped>
	.upper-part {
		display: flex;
		justify-content: space-between;
		height: 50px;
		width: 520px;
		margin: 0 auto;
		padding: 20px;
	}

	.cancel {
		width: 150px;
		background-color: #fff;
		border: 1px solid #eeeeee;
		box-shadow: 0 2px #ddd;
		cursor: pointer;
		color: #ccc;
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.cancel:active {
		box-shadow: none;
		transform: translateY(2px);
	}

	.cancel span {
		padding-left: 10px;
		font-size: 50px;
		padding-right: 10px;
		display: block;
	}

	.progress {
		width: 150px;
		height: 50px;
	}

	.task {
		width: 220px;
		height: 100px;
		margin: 30px auto;
	}

	.task p {
		font-size: 32px;
		color: #cccccc;
		line-height: 1.6;
	}

	.buttons {
		width: 420px;
		height: 400px;
		margin: 30px auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto;
		grid-template-areas:
			'digits digits digits symbols'
			'digits digits digits symbols'
			'digits digits digits symbols'
			'. zero . symbols';
	}

	.digits__without-zero {
		grid-area: digits;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-items: center;
		align-items: center;
	}

	.digits__zero {
		grid-area: zero;
		justify-self: center;
		align-self: center;
	}

	.symbols {
		display: flex;
		flex-direction: column;
		grid-area: symbols;
		justify-content: space-around;
		align-items: center;
	}
</style>
