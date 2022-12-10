<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Listes des actes</h3>
		</v-subheader>
		<v-alert dense type="info" color="#757575">
			Cette partie contient tous les actes de naissance dejà enregistré par l'agent
		</v-alert>
		<v-data-table :headers="headerActes" :items="headerActesData" :items-per-page="5" class="elevation-1">
			<template v-slot:item.actions="{ item }" class="d-flex justify-space-between align-center">
				<v-btn x-small class="btnAction" color="info" link :to="{ name: 'showacte', params: { id: item.idActe}}">
					<v-icon x-small color="purple"> mdi-pencil
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template> 

<script>
import axios from 'axios'
export default {
	name: "listeacte",
	data: () => ({
		created_at: '',
		scope: '',
		msgAlert: '',
		stateaccount: '',
		headerActes: [
			{
				text: 'id',
				align: 'start',
				sortable: true,
				value: 'idActe',
			},
			{ text: 'Nom', value: 'nom' },
			{ text: 'Prénom', value: 'postnom' },
			{ text: 'Prénom', value: 'prenom' },
			{ text: 'Nom du père', value: 'nomPere' },
			{ text: 'sexe', value: 'sexe' },
			{ text: 'dateNaissance', value: 'dateNaissance' },
			{ text: 'lieuNaissance', value: 'lieuNaissance' },
			{ text: 'actions', value: 'actions' }
		],
		headerActesData: [],
	}),
	methods: {
		async getAllActes() {
			try {
				const response = await axios.post("actenaissance/getAllActes")
				this.headerActesData = response.data
			} catch (e) {
				console.log(e)
			}
		}

	},
	beforeMount() {
		this.getAllActes()
	},
}
</script>
<style scoped>
h5 {
	color: rgb(70, 64, 64);
}
</style>