<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Visuation des actes</h3>
		</v-subheader>
		<v-alert dense type="success" color="#757575">
			Cette partie contient les informations sur le nombre d'actes enregistrés par le declarant
		</v-alert>


		<v-row>
			<v-col lg="6" cols="12">
			
				<v-row>
					<v-card-title>Liste des actes de naissance</v-card-title>

					<v-data-table :headers="headerActes" :items="itemsActes" :items-per-page="5" class="elevation-1">

					</v-data-table>

				</v-row>
			</v-col>
			<v-col lg="6" cols="12">
				<v-card>
					<msg></msg>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
  
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import msg from "@/views/messages/listemessage.vue"
export default {
	name: 'Messages',
	components: {
		msg
	},
	computed: {
		...mapState([
			'userInfo'
		]),
	},

	data: () => ({
		itemsActes: [],
		headerActes: [
			{
				text: 'id',
				align: 'start',
				sortable: true,
				value: 'idActe',
			},
			{ text: 'Nom', value: 'nom' },
			{ text: 'Prénom', value: 'postnom' },
			{ text: 'email', value: 'sexe' },
			{ text: 'Lieu de naissance', value: 'lieuNaissance' },
			{ text: 'Date naissance', value: 'dateNaissance' },
			{ text: 'Nom du pere', value: 'nomPere' },
			{ text: 'Nom de la mere', value: 'nomMere' },
		],
	}),
	methods: {
		async getlistOfActes() {
			try {
				const response = await axios.post('resultController/getlistOfActes/' + userInfo.id)
				itemsActes = response.data
			} catch (error) {
				console.log(error)
			}
		},

	},
	beforeMount() {
		this.getlistOfActes()

	}
}

</script>