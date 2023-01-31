<template>
	<div>
		<v-col lg="6" cols="5">
			<v-row>
				<v-select @change="get_users()" v-model="scope" :items="items_scope" item-text="title"
					label="Type d'utilisateur" item-value="scope" class="userSelect">
				</v-select>
			</v-row>
			<v-row>
				<v-text-field rounded outlined placeholder="Rechercher ici" append-icon="mdi-magnify" dense>
				</v-text-field>
			</v-row>
		</v-col>
		<v-data-table :headers="headerUsers" :items="header_usersData" :items-per-page="5" class="elevation-1">
			<template v-slot:item.actions="{ item }" class="d-flex justify-space-between align-center">
				<v-btn x-small class="btnAction" color="info" link
					:to="{ name: 'editaccount', params: { id: item.id } }">
					<v-icon x-small color="purple"> mdi-pencil
					</v-icon>
				</v-btn>
				<v-btn x-small color @click="deleteUser(item);">
					<v-icon x-small color="error"> mdi-delete
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: "listaccount",
	data: () => ({
		headerUsers: [
			{
				text: 'id',
				align: 'start',
				sortable: true,
				value: 'id',
			},
			{ text: 'Nom', value: 'firstname' },
			{ text: 'Prénom', value: 'lastname' },
			{ text: 'email', value: 'email' },
			{ text: 'Scope', value: 'scope' },
			{ text: 'Date de creattion', value: 'created_at' },
			{ text: 'actions', value: 'actions' },
		],
		header_usersData: [],
		scope: "tous",
		items_scope: [
			{
				scope: "tous",
				title: 'Tous'
			},
			{
				scope: 'gestionnaire',
				title: 'Gestionnaire'
			},
			{
				scope: 'caissier',
				title: 'Caissier'
			},
			{
				scope: 'receptionniste',
				title: 'Réceptionniste'
			},
			{
				scope: 'ouvrier',
				title: 'Ouvrier'
			},
			{
				scope: 'informaticien',
				title: 'Informaticien'
			},
		]

	}),
	methods: {
		async get_users() {
			let scope = String(this.scope)
			if (scope == null)
				scope = ""
			try {
				const response = await axios.post(`user/getAllUsers/${this.scope}`)
				this.header_usersData = response.data
				console(response.data)
			} catch (e) {
				console.log(e)
			}
		},
		async getFonctions() {
			try {
				const response = await axios.post('fonction/getAllfonctions')
				this.itemsFonctions = response.data;
			} catch (e) {
				console.log(e)
			}
		},
		async deleteUser(item) {
			let id = item.id
			if (confirm("voulez-vous vraiment supprimer ce compte")) {
				try {
					const response = await axios.post("user/delete/" + id)
					this.header_usersData = response.data
					this.get_users()
				} catch (e) {
					console.log(e)
				}
			}
		}
	},
	beforeMount() {
		this.get_users()
	}
}
</script>
<style>
.userSelect {
	width: 35%;
}
</style>