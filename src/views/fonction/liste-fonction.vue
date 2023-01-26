<template>
	<div>

		<div id="printListfonction">
			<div v-if="printData">
				<img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
				<h6>Kamanunga Hotel</h6>
				<h6>Liste des fonctions</h6>
				<h6>Date {{ dateReport }}</h6>
			</div>
			<div v-else>
				<form>
					<input type="text" v-model="seekname" :on-keyup="onSearchNom" placeholder="Rechercher fonction"
						id="textSearch" class="textSearch">
					<v-icon>mdi-account-search</v-icon>
				</form>
			</div>
			<v-simple-table>
				<caption style="text-align:center"> Liste des fonctions</caption>
				<thead>
					<tr>
						<th>idFonction</th>
						<th>nomFonction</th>
						<th>baremeSalaire</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in onSearchNom" :key="item.idFonction">
						<td>{{ item.idFonction }}</td>
						<td>{{ item.nomFonction }}</td>
						<td>{{ item.baremeSalaire }}</td>
						<td>
							<v-btn x-small class="btnAction" color="info" link
								:to="{ name: 'editfonction', params: { id: item.idFonction } }">
								<v-icon x-small color="purple"> mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction" color="info" @click="deletefonction(item.idFonction)">
								<v-icon x-small color="purple"> mdi-delete
								</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</div>
		<div>
			<v-btn color="dense" @click="enablePrint()">Imprimer <v-icon x-large color="red"> mdi-printer
				</v-icon></v-btn>
			<v-btn color="dense" class="ml-2" @click="unenablePrint()">Listes</v-btn>
		</div>
	</div>
</template> 


<script>
import html2pdf from "html2pdf.js";
import axios from 'axios'
export default {
	name: "listefonction",
	data: () => ({
		itemsfonctions: [],
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		printData: false,
		seekname: "",
		nomFonction:"",
		BaremeSalaire: ""		
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemsfonctions.filter(item => {
				return item.nomFonction.toLowerCase().indexOf(seek.toLowerCase()) > -1
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
			html2pdf(document.getElementById("printListfonction"), {
				margin: 4,
				filename: "listefonction-" + this.dateEnregistrement,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
		},
		async getfonctions() {
			try {
				const response = await axios.post("fonction/getAllfonctions")
				this.itemsfonctions = response.data 
			} catch (e) {
				console.log(e)
			}
		},
		async deletefonction(id) {
			if (confirm("Voulez vous supprimer cet fonction ?"))
				try {
					const response = await axios.post("fonction/deletefonction/" + id)
					this.itemsfonctions = response.data
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
		this.getfonctions()
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