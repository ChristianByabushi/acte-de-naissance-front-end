<template>
	<div>
		<v-card class="mb-2">
			<v-subheader class="d-flex justify-space-between align-center">
				<h3>Gestion des comptes</h3>
			</v-subheader>
		</v-card>

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
import alert from '@/components/alert.vue'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
	name: 'Login',
	passwordEnable: true,
	components: {
		alert
	},
	data() {
		return {
			menus: [
				{ title: "Liste des utilisateurs", icon: 'mdi-account', link: "accounts" },
				{ title: "ajouter", icon: "mdi-delete", link: "addaccount" },
				{ title: "modifier", icon: "mdi-delete", link: "editaccount" },
			],
			items: [
				{ title: 'Click Me' },
				{ title: 'Click Me' },
				{ title: 'Click Me' },
				{ title: 'Click Me 2' },
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
