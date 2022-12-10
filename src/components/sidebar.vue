<template>
	<v-navigation-drawer :value="getDrawer" app>
		<v-img max-height="82" max-width="150" src="@/assets/logo.png" class="ml-7">
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

			<div v-if="userInfo.scope == 'agent'">
				<v-list v-for="[icon, text, color, link] in linksAgent" :key="icon" link>
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
			<div v-if="userInfo.scope == 'decl'">
				<v-list v-for="[icon, text, color, link] in linksDeclarant" :key="icon" link>
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
			['mdi-chart-bar', 'Listes des actes', '#60722B', 'indexacte'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
		],
		linksAgent: [
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
			['mdi-chart-bar', 'Acte de naissance', '#9C27B0', 'indexacteborning'],
			['mdi-account-cog', 'Déclarant', '#9C27B0', 'indexdeclarant'],
		],
		linksReceptioniste: [
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
			['mdi-clipboard-list-outline', 'Déclarant', '#9C27B0', 'indexdeclarant'],
		],
		linksDeclarant: [
			['mdi-microsoft-windows', 'Accueil', '#C51162', 'externaldeclarant'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
		]
	}),
	methods: {
		logout() {
			console.log(1)
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