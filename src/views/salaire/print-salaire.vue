<template>
	<div>
		<v-card class="p-2">
			<div id="printListSalaire">
				<div class="d-flex">
					<div><img id="backgroundlogo" src="@/assets/logosidebar.png" alt="error" /> </div>

					<div><img id="printLogo" src="@/assets/logosidebar.png" alt="error" />
						<h6>Kamanunga Hotel</h6>
						<h6>Salaire mensuel</h6>
						<h6>Date : {{ dateReport }}</h6>
					</div>
				</div>
				<div class="mt-5 ">
					<h5 class="pb-5 elementSalaire">Element salaire</h5>
					<div class="d-flex">
						<div>
							<h6 class="mt-30 ml-2"> Agent : {{ convertUppercase(itemsSalaire.firstname) }}- {{
								convertUppercase(itemsSalaire.lastname)
							}}</h6>
						</div>
						<div>
							<h6 class="mt-30 ml-2"> Fonction : {{ itemsSalaire.nomFonction }}
							</h6>
						</div>
						<div>
							<h6 class="mt-30 ml-2"> BaremeSalaire : {{ convertUppercase(itemsSalaire.baremeSalaire) }}
							$</h6>
						</div>
					</div>
					<div class="mt-5">
						<div>
							<h6 class="mt-30"> Idemnités : {{ convertUppercase(itemsSalaire.indemnites) }}
							$</h6>
						</div>
						<div>
							<h6 class="mt-30"> autresReduction : {{ convertUppercase(itemsSalaire.autresReduction) }}
							$</h6>
						</div>
						<div>
							<h6 class="mt-30"> Déduction pour dette : {{
								convertUppercase(itemsSalaire.userMontantDette)
							}}$
							</h6>
						</div>
						<div>
							<h6 class="mt-30"> Cout Absence : {{ convertUppercase(itemsSalaire.userCoutAbsence) }}
							$</h6>
						</div>
						<div>
							<h6 class="formSalaireNet">Salaire net à toucher : {{ convertInfoFloat(itemsSalaire.baremeSalaire)+
							(convertInfoFloat(itemsSalaire.indemnites))
							- convertInfoFloat(itemsSalaire.autresReduction) - convertInfoFloat(itemsSalaire.userMontantDette) -
							convertInfoFloat(itemsSalaire.userCoutAbsence) }} $</h6>
						</div>
					</div>
				</div>
			</div>
		</v-card>

		<div>
			<v-btn class="mt-2" color="dense" @click="enablePrint()">Imprimer <v-icon x-large color="red"> mdi-printer
				</v-icon></v-btn>
		</div>
	</div>
</template> 

<script>
import html2pdf from "html2pdf.js";
import router from '@/router';
import axios from 'axios'
export default {
	name: "listesalaire",
	data: () => ({
		itemsSalaire: [],
		dateReport: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
		printData: false,
		seekname: "",

		firstname: "",
		lastname: "",
		dateabsence: "",
		nbAbscences: ""
	}),
	computed: {

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
			return Number(value)
		},
		convertUppercase(s) {
			return s.toUpperCase()
		},
		printMethode() {
			html2pdf(document.getElementById("printListSalaire"), {
				margin: 4,
				filename: "listeSalaire-" + this.itemsSalaire.firstname + this.dateReport,
				jsPDF: {
					format: 'a6',
					orientation: 'portrait'
				},
			});
		},
		async getSalaire() {
			try {
				const response = await axios.post("salaire/getAllsalaires/" + this.dateReport)
				this.itemsSalaire = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async getinfosalaire() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('salaire/getsalaireinfo/' + paramId + "/" + this.dateReport)
				this.itemsSalaire = response.data
				console.log(this.itemsSalaire)
				this.autresReduction = response.data.autresReduction;
				this.indemnites = response.data.indemnites;
				this.datePayement = response.data.datePayement;
				this.idSalaire = paramId
			}
		}
	},

	getCurrentTime() {
		const dateObj = new Date();
		const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
		return currentDate
	},
	beforeMount() {
		this.getinfosalaire()
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

.elementSalaire {
	margin-left: 30%;
	text-decoration: underline;
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

#backgroundlogo {
	position: absolute;
	width: 200px;
	height: 200px;
	top: 10px;
	left: 100px;
	opacity: 0.3;
}

h5 {
	color: rgb(70, 64, 64);
}
</style>