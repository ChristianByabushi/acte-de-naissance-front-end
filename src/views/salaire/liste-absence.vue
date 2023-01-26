<template>
	<div>
		<div id="printListabsence">
			<div v-if="printData">
				<img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
				<h6>Kamanunga Hotel</h6>
				<h6>Absences</h6>
				<h6>Date {{ dateReport }}</h6>
			</div> 
			<div v-else>
				<form>
					<div class="d-flex">
						<input type="text" v-model="seekname" :on-keyup="onSearchNom" placeholder="Rechercher nom agent"
							id="textSearch" class="textSearch">
						<v-icon>mdi-account-search</v-icon>
						<label class="ml-5" for="dateSearch">Choisir le mois :</label>
						<input type="date" v-model="dateabsence" id="dateSearch" class="textSearch ml-2 ">
					</div>
				</form>
			</div>
			<v-simple-table>
				<caption style="text-align:center"> Liste des Absences</caption>
				<thead>
					<tr>
						<th>idabsence</th>
						<th>nom</th>
						<th>post-nom</th>
						<th>coutAbsence</th> 
						<th>NbreAbsences</th> 
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in onSearchNom" :key="item.idAbsence">
						<td>{{ item.idAbsence }}</td>
						<td>{{ item.firstname }}</td>
						<td>{{ item.lastname }}</td>
						<td>{{ item.coutTotalCoutAbsence }}</td>
						<td>{{ item.nbAbscences }}</td>
						<td>
							<v-btn x-small class="btnAction" color="info" link
								:to="{ name: 'editabsence', params: { id: item.idAbsence } }">
								<v-icon x-small color="purple"> mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction" color="info" @click="deleteabsence(item.idAbsence)">
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
	name: "listeabsence",
	data: () => ({
		itemsAbsences: [],
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
		printData: false,
		seekname: "",
		firstname: "",
		dateabsence: "", 
		nbAbscences :""
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemsAbsences.filter(item => {
				return item.firstname.toLowerCase().indexOf(seek.toLowerCase()) > -1
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
			html2pdf(document.getElementById("printListabsence"), {
				margin: 4,
				filename: "listeabsence-" + this.dateReport,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
		},
		async getAbsences() {
			try {
				const response = await axios.post("absence/getAllAbsences/"+ this.dateReport)
				this.itemsAbsences = response.data 
			} catch (e) {
				console.log(e)
			}
		},
		async deleteabsence(id) {
			if (confirm("Voulez vous supprimer cet absence ?"))
				try {
					const response = await axios.post("absence/deleteabsence/" + id)
					this.itemsAbsences = response.data
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
		this.getAbsences()
	},
}
</script>
<style scoped>
input[type=text] {
	margin-left: 10px;
	border-radius: 5px;
	width: 40%;
	box-sizing: border-box;
	border: 1px solid rgb(151, 135, 135);
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
}

input[type=text]:focus {
	border: 3px solid rgb(184, 143, 143);
}

#div {
	display: flex;
	margin-left: 2cm;
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