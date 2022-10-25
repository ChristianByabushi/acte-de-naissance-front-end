<template>
	<v-navigation-drawer :value="getDrawer" app>
		<v-img max-height="82" max-width="150" src="@/assets/atmlogo.jpg" class="ml-7">
		</v-img>
		<v-divider></v-divider>
		<v-list v-for="[icon, text, color, link] in links" :key="icon" link>
			<v-list-item link :to="link">
				<v-list-item-icon>
					<v-icon :color="color">{{ icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content @click=" link == '/login' ? logout() : nothing()">
					<v-list-item-title :color="color">{{ text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Sidebar',
	data: () => ({
		links: [
			['mdi-microsoft-windows', 'Dashboard', '#C51162', '/'],
			['mdi-clipboard-list-outline', 'Achat', '#9C27B0', '/merchandise'],
			['mdi-clipboard-list', 'Vente', '#9C27B0', '/invoice'],
			['mdi-clipboard', 'Analyse', '#4A148C', '/analysis'],
			['mdi-logout', 'Déconnexion', '#66BB6A', '/login'],
		],
	}),
	methods: {
		logout() {
			localStorage.removeItem('token')
		},
		nothing() {

		}
	},
	computed: {
		...mapGetters(['getDrawer'])
	},
}
</script>
<style scoped>

</style>