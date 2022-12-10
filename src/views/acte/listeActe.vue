<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Listes des actes</h3>
		</v-subheader>
		<v-text-field style="width:45%" v-model="seekname" :on-keyup="onSearchNom" rounded outlined
			placeholder="Rechercher ici" append-icon="mdi-magnify" dense>
		</v-text-field>
		<v-simple-table>
			<thead>
				<tr>
					<th> idActe </th>
					<th> nom </th>
					<th> prenom </th>
					<th> sexe </th>
					<th> dateNaissance </th>
					<th> lieuNaissance </th>
					<th> nationalite </th>
					<th> nomPere </th>
					<th> nomMere </th>
					<th> dateEnregistrement </th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in onSearchNom" :key="item.idActe">
					<td>{{ item.idActe }}</td>
					<td>{{ item.nom }}</td>
					<td>{{ item.prenom }}</td>
					<td>{{ item.sexe }}</td>
					<td>{{ item.dateNaissance }}</td>
					<td>{{ item.lieuNaissance }}</td>
					<td>{{ item.nationalite }}</td>
					<td>{{ item.nomPere }}</td>
					<td>{{ item.nomMere }}</td>
					<td>{{ item.dateEnregistrement }}</td>
					<td>
						<v-btn x-small class="btnAction" color="info" link
							:to="{ name: 'editActe', params: { id: item.idActe } }">
							<v-icon x-small color="purple"> mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn x-small class="btnAction" color="info" link
							:to="{ name: 'visualize', params: { id: item.idActe } }">
							<v-icon x-small color="purple"> mdi-printer
							</v-icon>
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
	</div>
</template> 

<script>
import axios from 'axios'
export default {
	name: "listeacte",
	data: () => ({
		seekname: '',
		scope: '',
		msgAlert: '',
		itemActesData: [],
		idActe: "",
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		dateNaissance: "",
		lieuNaissance: "",
		nationalite: "",
		nomPere: "",
		nomMere: "",
		province: "",
		ville: "",
		origine: "",
		commune: "",
		territoire: "",
		quartier: "",
		avenue: "",
		numero: "",
		dateEnregistrement: "",
		idDeclarant: "",
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemActesData.filter(item => {
				return item.nom.toLowerCase().indexOf(seek.toLowerCase()) > -1
			})
		},
	},
	methods: {
		async getAllActes() {
			try {
				const response = await axios.post("actenaissance/getAllActes")
				this.itemActesData = response.data
			} catch (e) {
				console.log(e)
			}
		}, 
		async getAllDeclarant() {
			try {
				const response = await axios.post("user/getDeclarant")
				this.itemsDeclarant = response.data
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