<template>
	<div>
		<div id="printListabsence">
			<div v-if="printData">
				<img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
				<h6>Kamanunga Hotel</h6>
				<h6>Salaire</h6>
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
				<caption style="text-align:center"> Salaire mensuel</caption>
				<thead>
					<tr>
						<th>idSalaire</th>
						<th>nom</th>
						<th>fonction</th>
						<th>baremeSalaire</th>
						<th>indemnites</th>
						<th>AutresRed</th>
						<th>coutDette</th>
						<th>coutAbsence</th>
						<th>SalaireNet</th>
						<th>date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in onSearchNom" :key="item.idSalaire">
						<td>{{ item.idSalaire }}</td>
						<td>{{ item.nom }}</td>
						<td>{{ item.nomFonction }}</td>
						<td>{{ item.baremeSalaire }}$</td>
						<td>{{ item.indemnites }}$</td>
						<td>{{ item.autresReduction }}$</td>
						<td>{{ item.userMontantDette }}$</td>
						<td>{{ item.userCoutAbsence }}$</td>
						<td class="formSalaireNet">{{ convertInfoFloat(item.baremeSalaire)+
						(convertInfoFloat(item.indemnites))
						- convertInfoFloat(item.autresReduction) - convertInfoFloat(item.userMontantDette) -
						convertInfoFloat(item.userCoutAbsence) }} $</td>
						<td>{{ item.datePayement }}</td>
						<td>
							<v-btn x-small class="btnAction" color="info" link
								:to="{ name: 'editsalaire', params: { id: item.idSalaire } }">
								<v-icon x-small color="indingo"> mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction " color="danger" @click="deleteabsence(item.idSalaire)">
								<v-icon x-small color="red"> mdi-delete
								</v-icon>
							</v-btn>
							<v-btn x-small class="btnAction" color="success" link
								:to="{ name: 'printsalaire', params: { id: item.idSalaire } }">
								<v-icon x-small color="indingo"> mdi-eye
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
		itemsSalaire: [],
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
		printData: false,
		seekname: "",
		firstname: "",
		dateabsence: "",
		nbAbscences: ""
	}),
	computed: {
		onSearchNom() {
			let seek = this.seekname
			return this.itemsSalaire.filter(item => {
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
		convertInfoFloat(value) {

			return  parseFloat(value)
		},
		printMethode() {
			html2pdf(document.getElementById("printListabsence"), {
				margin: 4,
				filename: "listeSalaire-" + this.dateReport,
				jsPDF: {
					format: 'a3',
					orientation: 'portrait'
				},
			});
		},
		async getSalaire() {
			try {
				const response = await axios.post("salaire/getAllsalaires/" + this.dateReport)
				this.itemsSalaire = response.data
				console.log(this.itemsSalaire)
			} catch (e) {
				console.log(e)
			}
		},
		async deleteabsence(id) {
			if (confirm("Voulez vous supprimer cet absence ?"))
				try {
					const response = await axios.post("salaire/deletesalaire/" + id)
					this.itemsSalaire = response.data
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
		this.getSalaire()
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

.formSalaireNet {
	color: rgb(255, 255, 255);
	font-size: x-large;
	background-color: rgb(91, 87, 96);
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