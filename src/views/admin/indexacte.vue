<template>
	<div>		
		<v-btn color="#ffff" link :to="{ name: 'listeacte' }">
			Tous les actes
		</v-btn>
		<v-btn class="ml-3" color="#ffff" link :to="{ name: 'showacte'}">
			Voir details
		</v-btn>
		<router-view></router-view>
	</div>
</template>