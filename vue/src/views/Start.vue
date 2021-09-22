<template>
	<div class="start">
		<h1>Привет!</h1>
		<div class="summary">
			<p>Добро пожаловать на {{ trainingDay }} тренировачный день,</p>
			<p>Ваш последний результат - решено {{ solved }} из {{ total }}.</p>
			<p>Общая точность {{ precision }}%.</p>
		</div>
		<b-form-input type="range" max="15"></b-form-input>
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
			}
		},
	}
</script>

<style scoped>
	.start {
		width: 400px;
		margin: 0 auto;
		padding-top: 50px;
		text-align: left;
	}

	h1 {
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
	}

	.summary {
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		margin-top: 40px;
		line-height: 1.3;
	}
</style>
