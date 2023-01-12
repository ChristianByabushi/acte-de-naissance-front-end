<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Gestion de suivi des cas</h3>
		</v-subheader>

		<v-card>
			<div v-for="(menu, index) in menus" :key="index" class="menu">
				<v-btn class="mb-2 ml-4 mt-2" link :to="{ name: menu.link }">{{ menu.title }}
				</v-btn>
			</div>
		</v-card>
		<v-card class="mt-4 py-8 px-6" fluid>
			<router-view></router-view> 
		</v-card>
	</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'
export default {
	name: 'indexnutrition',
	
	data() {
		return {
			menus: [
				{ title: "Liste des cas", icon: 'mdi-account', link: "indexnutrition" },
				{ title: "Ajouter", icon: "mdi-delete", link: "newnutrition" },
				{ title: "Editer", icon: "mdi-pencil", link: "editnutrition" },
			],
		}
	},
	props: {
		source: String,
	},

};
</script>
<style scoped>
.lockIcon {
	width: 20px;
	padding-bottom: 10px;
	cursor: pointer;
}

.menu {
	display: inline-block;

}

#logoHuman {
	position: absolute;
	height: 120px;
	width: 220px;
	margin-left: 5rem;
	margin-top: 2rem;
	opacity: 0.2;

}

p.userinfo {
	size: 20px;
	font-size: large
}
</style>
