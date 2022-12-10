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
			{ text: 'Date de creattion', value: 'created_at' },
			{ text: 'actions', value: 'actions' },
		],
		header_usersData: [],
		scope: "decl",
		items_scope: [
			{
				scope: 'agent',
				title: 'Agent'
			},
			{
				scope: 'decl',
				title: 'Déclarant'
			},
			{
				scope: 'receptionniste',
				title: 'Réceptionniste'
			},
		]

	}),
	methods: {
		async get_users() {
			let id = String(this.scope)
			if (id == null)
				id = "decl"
			try {
				const response = await axios.post("user/getAllUsers/" + id)
				this.header_usersData = response.data
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