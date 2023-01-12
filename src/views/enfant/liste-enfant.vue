<template>
	<div>

		<div id="printListEnfant">
			<div v-if="printData">
				<img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
				<h6>Bureau Centre ZONE GOMA</h6>
				<h6>Listes de mal-nouris</h6>
				<h6>Date {{ dateReport }}</h6>
			</div>
			<div v-else>
				<form>
					<input type="text" v-model="seekname" :on-keyup="onSearchNom" placeholder="Rechercher l'enfant"
						id="textSearch" class="textSearch">
					<v-icon>mdi-account-search</v-icon>
				</form>
			</div>
			<v-simple-table>
				<caption style="text-align:center"> Enfants mal-nouris</caption>
				<thead>
					<tr>
						<th> Enfant </th>
						<th> nom </th>
						<th> postNom </th>
						<th> prenom </th>
						<th> tuteur </th>
						<th> age </th>
						<th> sexe </th>
						<th> quartier </th>
						<th> commune </th>
						<th> dateEnregistrement </th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in onSearchNom" :key="item.idActe">
						<td>{{ item.idEnfant }}</td>
						<td>{{ item.nom }}</td>
						<td>{{ item.postnom }}</td>
						<td>{{ item.prenom }}</td>
						<td>{{ item.tuteur }}</td>
						<td>{{ item.age }}</td>
						<td>{{ item.sexe }}</td>
						<td>{{ item.quartier }}</td>
						<td>{{ item.commune }}</td>
						<td>{{ item.dateEnregistrement }}</td>
						<td>
							<v-btn x-small class="btnAction" color="info" link
								:to="{ name: 'editenfant', params: { id: item.idEnfant } }">
								<v-icon x-small color="purple"> mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction" color="info" @click="deleteEnfant(item.idEnfant)">
								<v-icon x-small color="purple"> mdi-delete
								</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</div>
		<div>
			<v-btn color="dense" @click="enablePrint()">Print <v-icon x-large color="red"> mdi-printer
				</v-icon></v-btn>
			<v-btn color="dense" class="ml-2" @click="unenablePrint()">Listes</v-btn>
		</div>
	</div>
</template> 

<script>
import html2pdf from "html2pdf.js";
import axios from 'axios'
export default {
	name: "listeenfant",
	data: () => ({
		itemsEnfants: [],
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		printData: false,
		seekname: "",
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemsEnfants.filter(item => {
				return item.nom.toLowerCase().indexOf(seek.toLowerCase()) > -1
			})
		},
	},
	methods: {
		enablePrint() {
			this.printData = true
			this.printMethode()
		},
		unenablePrint() {
			this.printData = false
		},
		printMethode() {
			html2pdf(document.getElementById("printListEnfant"), {
				margin: 4,
				filename: "listeEnfantBCZ -" + this.dateEnregistrement,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
		},
		async getEnfants() {
			try {
				const response = await axios.post("enfant/getallenfants")
				this.itemsEnfants = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async deleteEnfant(id) {
			if (confirm("Voulez vous supprimer cet enfant ?"))
				try {
					const response = await axios.post("enfant/deleteEnfant/" + id)
					this.itemsEnfants = response.data
				} catch (e) {
					console.log(e)
				}
		}
	},
	getCurrentTime() {
		const dateObj = new Date();
		const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
		return currentDate
	},
	beforeMount() {
		this.getEnfants()
	},
}
</script>
<style scoped>
input[type=text] {
	margin-left: 10px;
	border-radius: 5px;
	width: 50%;
	box-sizing: border-box;
	border: 1px solid rgb(151, 135, 135);
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
}

input[type=text]:focus {
	border: 3px solid rgb(184, 143, 143);
}

#printLogo {
	margin-right: 0;
	border-radius: 3px;
	width: 70px;
	height: 50px;
}

h5 {
	color: rgb(70, 64, 64);
}
</style>