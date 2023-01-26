<template>
	<div>
		<h3 dense>Gestion des fonctions </h3>
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
	name: 'fonctionhotel',

	data() {
		return {
			menus: [
				{ title: "Liste des fonctions", icon: 'mdi-account', link: "indexfonction" },
				{ title: "Ajouter", icon: "mdi-delete", link: "newfonction" },
				{ title: "Editer", icon: "mdi-pencil", link: "editfonction" },
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
