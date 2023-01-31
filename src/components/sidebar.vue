<template>
	<v-navigation-drawer :value="getDrawer" app>
		<v-img max-height="120" max-width="240" src="@/assets/logo.png" class="ml-2 mt-1">
		</v-img>
		<v-divider></v-divider>
		<div color="dense">
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
			['mdi-microsoft-windows', 'Accueil', '#C51162', 'dashboard'],
			['mdi-currency-eur', 'Salaire', '#53C7BF', 'indexsalaire'],
			['mdi-bank', 'Fonction', '#9C27B0', 'indexfonction'],
			['mdi-gift', 'Dettes', '#60722B', 'indexdette'],
			['mdi-alert', 'Absences', 'red', 'indexabsence'],
			['mdi-format-align-center', 'Agents', '#9C27B0', 'accounts'],
		],

		linksNutritionniste: [
			['mdi-chart-bar', 'Nutrition', '#9C27B0', 'indexnutrition'],
			['mdi-clipboard-list-outline', 'Enfants', '#9C27B0', 'indexenfant'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
		],

		linksReceptioniste: [
			['mdi-clipboard-list-outline', 'Enfants', '#9C27B0', 'indexenfant'],
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