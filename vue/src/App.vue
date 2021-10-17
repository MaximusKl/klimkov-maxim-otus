<template>
	<div class="container">
		<router-view />
	</div>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	body {
		background-color: #eeeeee;
	}

	#app {
		font-family: Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*color: #2c3e50;*/
	}

	.container {
		margin: 70px auto;
		background-color: white;
		width: 560px;
		height: 690px;
	}
</style>
