<template>
	<div class="start">
		<h1>Привет!</h1>
		<div class="summary">
			<p>Добро пожаловать на {{ trainingDay }} тренировачный день,</p>
			<p>Ваш последний результат - решено {{ solved }} из {{ total }}.</p>
			<p>Общая точность {{ precision }}%.</p>
		</div>
		<div class="settings">
			<h2>Настройки</h2>
			<div class="settings__input">
				<div class="settings__input-range">
					<span>{{ minDuration }}</span>
					<span>{{ maxDuration }}</span>
				</div>
				<input
					type="range"
					:max="maxDuration"
					:min="minDuration"
					v-model="duration"
				/>
				<small>Длительность {{ duration }} минут</small>
			</div>
			<div class="settings__input">
				<div class="settings__input-range">
					<span>{{ minDifficulty }}</span>
					<span>{{ maxDifficulty }}</span>
				</div>
				<input
					type="range"
					:max="maxDifficulty"
					:min="minDifficulty"
					v-model="difficulty"
				/>
				<small>Сложность {{ difficulty }}</small>
			</div>
			<div class="settings__checkbox-group">
				<label class="settings__checkbox">
					<input type="checkbox" v-model="adding" />
					Суммирование
				</label>
				<label class="settings__checkbox">
					<input type="checkbox" v-model="subtraction" />
					Разность
				</label>
				<label class="settings__checkbox">
					<input type="checkbox" v-model="multiplying" />
					Умножение
				</label>
				<label class="settings__checkbox">
					<input type="checkbox" v-model="division" />
					Деление
				</label>
				<label class="settings__checkbox">
					<input type="checkbox" v-model="exponentiation" />
					Возведение в степень
				</label>
			</div>
		</div>
		<div class="btn-group">
			<button class="btn-group__play-btn" @click="start">Play!</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Start',
		data: () => {
			return {
				trainingDay: 24,
				solved: 10,
				total: 25,
				precision: 80,
				duration: 7,
				minDuration: 0,
				maxDuration: 15,
				difficulty: 5,
				minDifficulty: 0,
				maxDifficulty: 10,
				adding: 'true',
				subtraction: 'false',
				multiplying: 'false',
				division: 'true',
				exponentiation: 'true',
			}
		},
		methods: {
			start() {
				this.$router.push('/game')
			},
		},
		watch: {
			duration() {
				this.$root.duration = this.duration
			},
			difficulty() {
				this.$root.difficulty = this.difficulty
			},
			adding() {
				this.$root.adding = '' + this.adding
			},
			subtraction() {
				this.$root.subtraction = '' + this.subtraction
			},
			multiplying() {
				this.$root.multiplying = '' + this.multiplying
			},
			division() {
				this.$root.division = '' + this.division
			},
			exponentiation() {
				this.$root.exponentiation = '' + this.exponentiation
			},
		},
		mounted() {
			this.duration = this.$root.duration || this.duration
			this.difficulty = this.$root.difficulty || this.difficulty
			this.adding = this.$root.adding || '' + this.adding
			this.subtraction = this.$root.subtraction || '' + this.subtraction
			this.multiplying = this.$root.multiplying || '' + this.multiplying
			this.division = this.$root.division || '' + this.division
			this.exponentiation =
				this.$root.exponentiation || '' + this.exponentiation

			this.$root.duration = this.duration
			this.$root.difficulty = this.difficulty
			this.$root.adding = '' + this.adding
			this.$root.subtraction = '' + this.subtraction
			this.$root.multiplying = '' + this.multiplying
			this.$root.division = '' + this.division
			this.$root.exponentiation = '' + this.exponentiation
		},
	}
</script>

<style scoped>
	.start {
		width: 400px;
		margin: 0 auto;
		padding-top: 50px;
		text-align: left;
		font-style: normal;
		font-weight: 400;
	}

	h1 {
		font-size: 26px;
		font-style: inherit;
		font-weight: inherit;
	}

	h2 {
		font-size: 18px;
		font-style: inherit;
		font-weight: inherit;
	}

	.summary {
		font-size: 14px;
		margin-top: 40px;
		line-height: 1.3;
	}

	.settings {
		margin-top: 60px;
	}

	.settings__input {
		margin: 20px 0;
		width: 200px;
	}

	.settings__input > input {
		display: block;
		width: 100%;
		/*margin: 10px 0 5px;*/
		margin-bottom: 5px;
	}

	.settings__input-range {
		width: inherit;
		display: flex;
		justify-content: space-between;
	}

	.settings__input-range span {
		font-size: 14px;
		font-style: inherit;
		font-weight: inherit;
	}

	.settings__checkbox-group {
		margin-top: 30px;
	}

	.settings__checkbox {
		display: block;
		height: 30px;
		font-size: 14px;
		font-style: inherit;
		font-weight: inherit;
	}

	.btn-group {
		display: flex;
		justify-content: flex-end;
		margin-top: 40px;
	}

	.btn-group__play-btn {
		width: 80px;
		height: 40px;
		background-color: #fff;
		border: 1px solid #eeeeee;
		box-shadow: 0 2px #ddd;
		cursor: pointer;
	}

	.btn-group__play-btn:active {
		box-shadow: none;
		transform: translateY(2px);
	}
</style>
