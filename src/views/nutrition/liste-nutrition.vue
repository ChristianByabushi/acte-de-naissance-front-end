<template>
	<div>
		<h5 style="text-align:center; text-decoration: underline;"> Suivi des enfants mal-nouris</h5>

		<div id="printDataNutrition"> 

			<div v-if="printDataNutrition">
				<img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
				<h6>Bureau Centre Santé ZONE GOMA</h6>
				<h6>Suivi des cas des enfants mal-nouris</h6>
				<h6>Date {{ dateReport }}</h6>
			</div>
			<div v-else>
				<form>
					<input type="text" v-model="seekname" :on-keyup="onSearchNom" placeholder="Rechercher l'enfant"
						id="textSearch">
					<v-icon>mdi-account-search</v-icon>
				</form>
			</div>
			<v-simple-table>
				<thead>
					<tr>
						<th> nom </th>
						<th> postNom </th>
						<th> Tuteur </th>
						<th> poids </th>
						<th> taille </th>
						<th> NbreFoisManger </th>
						<th> age </th>
						<th> sexe </th>
						<th> MedicamentSuivi </th>
						<th> dateEnregistrement </th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in onSearchNom" :key="item.idActe">
						<td>{{ item.nom }}</td>
						<td>{{ item.postnom }}</td>
						<td>{{ item.tuteur }}</td>
						<td>{{ item.poids }}</td>
						<td>{{ item.taille }}</td>
						<td>{{ item.nbreFoisManger }}</td>
						<td>{{ item.age }}</td>
						<td>{{ item.sexe }}</td>
						<td>{{ item.medicament }}</td>
						<td>{{ item.dateEnregistrement }}</td>
						<td>
							<v-btn x-small class="btnAction" color="info" link
								:to="{ name: 'editnutrition', params: { id: item.idCas } }">
								<v-icon x-small color="purple"> mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction" color="info" @click="deleteCas(item.idCas)">
								<v-icon x-small color="purple"> mdi-delete
								</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</div>
		<div class="mt-2">
			<v-btn color="dense" @click="enablePrint()">Print <v-icon x-large color="red"> mdi-printer
				</v-icon></v-btn>
			<v-btn color="dense" class="ml-2" @click="unenablePrint()">Suivi</v-btn>
		</div>
	</div>
</template> 

<script>
import html2pdf from "html2pdf.js";
import axios from 'axios'
export default {
	name: "listnutrition",
	data: () => ({
		itemsCaracteristics: [],
		seekname: "",
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		printDataNutrition: false
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemsCaracteristics.filter(item => {
				return item.nom.toLowerCase().indexOf(seek.toLowerCase()) > -1
			})
		},
	},

	methods: {
		enablePrint() {
			this.printDataNutrition = true
			this.printMethode()
		},
		unenablePrint() {
			this.printDataNutrition = false
		},
		printMethode() {
			html2pdf(document.getElementById("printDataNutrition"), {
				margin: 4,
				filename: "SuiviEnfantBCZ -" + this.dateEnregistrement,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
		},
		async getCas() {
			try {
				const response = await axios.post("nutrition/getAllCaracteristics")
				this.itemsCaracteristics = response.data
			} catch (e) {
				console.log(e)
			}
		},

		async deleteCas(id) {
			if (confirm("Voulez vous supprimer cet enfant ?"))
				try {
					const response = await axios.post("enfant/deleteEnfant/" + id)
					this.itemsEnfants = response.data
				} catch (e) {
					console.log(e)
				}
		}
	},
	beforeMount() {
		this.getCas()
	},
}
</script>
<style scoped>
input[type=text] {
	margin-left: 10px;
	border-radius: 5px;
	width: 35%;
	box-sizing: border-box;
	border: 1px solid rgb(80, 35, 35);
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
}

input[type=text]:focus {
	border: 3px solid rgba(40, 50, 92, 0.05);
}

h5 {
	color: rgb(70, 64, 64);
}

#printLogo {
	margin-right: 0;
	border-radius: 3px;
	width: 70px;
	height: 50px;
}
</style>