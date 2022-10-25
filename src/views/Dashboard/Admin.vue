<template >
	<v-app>
		<v-navigation-drawer app v-model="drawer">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title>VirtualApp</v-list-item-title>
					<v-list-item-subtitle>vandu</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense nav>
				<v-list-item link to="/signin">
					<v-list-item-icon>
						<v-icon>dashboard</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title class="text-h6">Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item link to = "/signup">
					<v-list-item-icon>
						<v-icon>tachometer-alt</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title class="text-h6">Achat</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app hide-on-scroll dense class="mx-auto" dark color="primary">
			<v-toolbar-title @click.stop="drawer = !drawer">
				<v-app-bar-nav-icon />
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn link to="achat" text>
					<v-icon>widgets</v-icon>
					Home
				</v-btn>

				<v-btn @click.prevent="logout()" text>
					<v-icon>lock</v-icon>
					Logout
				</v-btn>
				<v-toolbar id="theme">
					<v-switch v-model="$vuetify.theme.dark"></v-switch>
				</v-toolbar>
			</v-toolbar-items>
		</v-app-bar>
		<v-main>
			<operator></operator>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import achat from '@/components/registration.vue'
import operator from '@/views/Dashboard/operator.vue'
export default {
	name: 'App',
	components: {
		achat, 
		operator
	},
	data: () => ({
		drawer: true,
		nameapp: process.env.VUE_APP_APPNAME
	}),
	computed:
	{
		...mapState(['loggin'])
	},
	methods: {
		logout() {

		}
	}


};
</script>

<style>
#theme {
	max-height: 40px;
	background-color: inherit;
	box-shadow: none;
	margin: auto;
}
</style>
