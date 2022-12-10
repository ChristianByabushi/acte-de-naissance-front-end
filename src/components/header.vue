<template>
	<v-app-bar absolute app elevation="4" color="#EEEEEE">
		<v-app-bar-nav-icon @click="handDrawer()"></v-app-bar-nav-icon>
		<v-toolbar-title dense>BagiraActo</v-toolbar-title>
		<v-col lg="6" cols="5">
			<v-spacer></v-spacer>
			<v-form class="ml-14 mt-8">
				<v-text-field rounded outlined placeholder="Rechercher ici" append-icon="mdi-magnify" dense>
				</v-text-field>
			</v-form>
		</v-col>
		<v-spacer></v-spacer>
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<span v-bind="attrs" v-on="on" style="cursor:pointer" class="">
					<v-chip link>
						<v-badge dot bottom offset-y-x="10" color="inherit">
							<v-avatar size="50">
								<img src="@/assets/logosidebar.png" alt="error" />
							</v-avatar>
						</v-badge>
						<div>
							<span> {{ userInfo.scope}}</span>
						</div>

					</v-chip>
				</span>
			</template>
			<v-list width="250" class="py-0">
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="@/assets/logo.png" alt="error" />
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ userInfo.firstname }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item> 
				<v-list-item v-for="(menu, index) in menus" :key="index" link :to="{name : menu.link}">
					<v-list-item-icon>
						<v-icon>{{ menu.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content @click="menu.link == 'login' ? logout() : donothing()">
						<v-list-item-title>
							{{ menu.title }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

			</v-list>
		</v-menu>
	</v-app-bar>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'Header',
	data() {
		return {
			menus: [
				{ title: "Compte", icon: 'mdi-account', link: "infoadmin" },
				{ title: "Déconnexion", icon: "mdi-logout", link: "login" },
			],
			items: [
				{ title: 'Click Me' },
				{ title: 'Click Me' },
				{ title: 'Click Me' },
				{ title: 'Click Me 2' },
			],
		}
	},
	mounted() {
		this.$store.dispatch('getInfoUser')
	},
	computed: mapState([
		'userInfo'
	]),
	methods: {
		logout() {
			localStorage.removeItem('token')
		},
		toUpperCase() {
			return 0
		},
		try() {
			console.log(this.getDrawer.username)
		},
		donothing() {

		},
		handDrawer() {
			this.$store.commit('setDrawer')
		},
		getUser() {
			this.username = localStorage.getItem('username')
		}
	},
	beforecreated() {
		getUser()
	},
	beforeMount() {
		if (!localStorage.getItem('token'))
			if (this.$route.path !== '/login')
				this.$router.push('/login')
	}

}
</script>
<style scoped>

</style>