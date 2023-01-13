<template>
	<v-navigation-drawer :value="getDrawer" app>
		<v-img max-height="90" max-width="200" src="@/assets/logosidebar.png" class="ml-7 mt-1">
		</v-img>
		<v-divider></v-divider>
		<div>
			<div v-if="userInfo.scope == 'admin'">
				<v-list v-for="[icon, text, color, link] in linksAdmin" :key="icon" link>
					<v-list-item :to="{ name: link }">
						<v-list-item-icon>
							<v-icon :color="color">{{ icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="link == '/login' ? logout() : donothing()">
							<v-list-item-title :color="color">{{ text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</div>

			<div v-if="userInfo.scope == 'nutritionniste'">
				<v-list v-for="[icon, text, color, link] in linksMedecin" :key="icon" link>
					<v-list-item :to="{ name: link }">
						<v-list-item-icon>
							<v-icon :color="color">{{ icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="link == '/login' ? logout() : donothing()">
							<v-list-item-title :color="color">{{ text }}</v-list-item-title>
						</v-list-item-content>

					</v-list-item>
				</v-list>
			</div>

			<div v-if="userInfo.scope == 'receptionniste'">
				<v-list v-for="[icon, text, color, link] in linksReceptioniste" :key="icon" link>
					<v-list-item :to="{ name: link }">
						<v-list-item-icon>
							<v-icon :color="color">{{ icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="link == '/login' ? logout() : donothing()">
							<v-list-item-title :color="color">{{ text }}</v-list-item-title>
						</v-list-item-content>

					</v-list-item>
				</v-list>
			</div>
		</div>
	</v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	name: 'Sidebar',
	data: () => ({
		linksAdmin: [
			['mdi-microsoft-windows', 'Dashboard', '#C51162', 'dashboard'],
			['mdi-account-cog', 'GestionCompte', '#9C27B0', 'accounts'],
			['mdi-chart-bar', 'Malades', '#60722B', 'indexmalade'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
		],

		linksReceptioniste: [
			['mdi-clipboard-list-outline', 'Malades', '#9C27B0', 'indexmalade'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
		],


	}),
	methods: {
		logout() {
			localStorage.removeItem('token')
		},
		donothing() {

		}
	},
	computed: {
		...mapGetters(['getDrawer']),
		...mapState(['userInfo'])
	}
}
</script>
<style scoped>

</style>