<template>
	<div>
		<h2 class="mb-4">Visualisation de l'acte de naissance</h2>
		<form @submit.prevent="editMethod()" method="post">
			<div class="mb p-2" id="actePrint">
				<h2 class="titre">Acte Naissance</h2>
				<div class="fill">
					<img id="logoActe" src="@/assets/logosidebar.png" alt="error" />
				</div>
				<div class="body mt-3">
					<h4>L'an deux mille <span class="infoActe">{{ getDateFormat.year }}</span>
						le <span class="infoActe">{{ getDateFormat.day }}</span> du mois de
						<span class="infoActe">{{
								getDateFormat.month
						}}</span>
					</h4>
					<h4>à <span class="infoActe">{{ lieuNaissance }}</span> heures <span class="infoActe"> {{
							getDateFormat.hours
					}}</span></h4>
					<h4>Par devant nous <span class="infoActe"> {{ firstname.toUpperCase() }} {{ lastname.toUpperCase()
					}} </span> </h4>
					<h4>Officier de l'Etat civil de la commune de <span class="infoActe">{{ commune }} </span> </h4>
					<h4>A comparu <span class="infoActe"> {{ nom.toUpperCase() }} {{ postnom.toUpperCase() }}</span> en
						qualité de </h4>
					<h4>Né(e) à <span class="infoActe">{{ lieuNaissance }}</span>
						Profession <span class="infoActe">{{ userInfo.scope }}</span></h4>
					<h4>Résident à <span class="infoActe"> {{ residence }} Av {{ avenue }} N.{{ numero }}
							{{ quartier }}</span></h4>
					<h4>Lequel (laquelle) nous a declaré ce qui suit : le <span class="infoActe">{{ getDateFormat.day }}
						</span>
						du mois de <span class="infoActe">{{ getDateFormat.month }}</span> de l'année <span
							class="infoActe">20{{ getDateFormat.year
							}}</span>
					</h4>
					<h4> est né <span class="infoActe">{{ nom }} {{ postnom }} {{ prenom }}</span> fils (fille) de {{
							nomPere
					}} né à
						{{ bornin }} le {{ dateString }} Nationalité {{ nationalite }}</h4>
					<h4>Profession <span class="infoActe">{{ professsion }}</span> Résident à {{ residence }}</h4>
					<h4>Lecture de l'acte a été faite ou connaissance de a été donnée ou</h4>
					<h4>traduction de l'acte a été faite en Français typique que nous </h4>
					<h4>connaissons ou par ................ interprete ayant preté serment </h4>
					<h4>En foi de quoi, avons dressé le présent acte.</h4>
					<v-row class="mt-2">
						<v-col cols="4">
							<div class="signDecl">
								<h4>Le declarant</h4>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="signDecl">
								<h4>(*) Préciser le nom et qualité</h4>
								<h4>(*) Buffer les mentions unitiles</h4>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="signDecl">
								<h4>Officier de l'état Civil</h4>
							</div>
						</v-col>
					</v-row>
				</div>
			</div>
			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>

		</form>
		<v-btn @click.stop="printMethode()" type="submit" color="red" class="mr-4 mt-4 center">
			imprimer
		</v-btn>
	</div>
</template>
<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
import router from '@/router';
import { mapState } from 'vuex'

export default {
	name: "showandprintActe",
	data: () => ({
		idActe: "",
		nom: "",
		firstname: '',
		lastname: '',
		postnom: "",
		prenom: "",
		sexe: "",
		dateNaissance: "",
		bornin: "",
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
		professsion: "",
		residence: "",
		dateString: '',
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		idDeclarant: "",
		idUser: '',
		infoDeclarant: [],
		itemsSexe: [
			{
				scope: 'masculin',
				title: 'Masculin'
			},
			{
				scope: 'feminin',
				title: 'Féminin'
			},

		],
		msgAlert: '',
		itemsDeclarant: []
	}),
	computed: {
		...mapState([
			'userInfo'
		]),


		getDateFormat() {
			//compute year
			var dateString = String(this.dateString)
			const year = String(dateString).split("-")[0].substr(2, 2);

			//compute Month
			let mon = String(dateString).slice(5, 7)
			const date = new Date();
			date.setMonth(mon - 1);
			let month = date.toLocaleString('fr', { month: 'long' });

			//compute day
			let day = String(dateString).slice(8, 11)

			//compute hours
			let hours = String(dateString).slice(11)

			const elementsDate = {
				year: year,
				month: month,
				hours: hours,
				day: day,
			};
			//compute month

			//compute day

			//compute hours

			return elementsDate

		},

	},
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();

			return dateObj
		},
		async printMethode() {
			html2pdf(document.getElementById("actePrint"), {
				margin: 5,
				filename: "acte -" + this.idActe + "-" + this.dateEnregistrement,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
		},
		async getAllDeclarant() {
			try {
				const response = await axios.post("user/getDeclarant")
				this.itemsDeclarant = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async getInfoActe() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('actenaissance/getActeInfoWithUserInfo/' + paramId)
				this.nom = response.data.nom;
				this.postnom = response.data.postnom;
				this.prenom = response.data.prenom;
				this.sexe = response.data.sexe;
				this.dateNaissance = response.data.dateNaissance;
				this.lieuNaissance = response.data.lieuNaissance;
				this.nationalite = response.data.nationalite;
				this.nomPere = response.data.nomPere;
				this.nomMere = response.data.nomMere;
				this.province = response.data.province;
				this.ville = response.data.ville;
				this.origine = response.data.origine;
				this.commune = response.data.commune;
				this.territoire = response.data.territoire;
				this.quartier = response.data.quartier;
				this.avenue = response.data.avenue;
				this.numero = response.data.numero;
				this.dateEnregistrement = response.data.dateEnregistrement;
				this.dateString = response.data.dateEnregistrement;
				this.idDeclarant = response.data.idDeclarant
				this.firstname = response.data.firstname
				this.lastname = response.data.lastname
				this.professsion = response.data.professsion
				this.residence = response.data.residence
				this.bornin = response.data.bornin
				this.idActe = paramId

			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getInfoActe()
		this.getAllDeclarant()
	}
}
</script>

<style scoped>
h5 {
	color: rgb(70, 64, 64);
}

.body {
	display: block;
}

#actePrint {
	background-color: rgb(235, 224, 209);
}

#actePrint {
	min-width: 100%;
	max-width: 100%;
	margin: 0 auto;
}

#actePrint .titre {
	text-decoration: underline;
	text-align: center;
}

.infoActe {
	text-decoration: underline;
	color: rgb(65, 65, 190)
}


.fill {
	overflow: hidden;
	margin-left: 3px;
	max-width: 90%;
	height: auto;
	width: auto;
	margin: 0 auto;
	flex-shrink: 0;
	opacity: 0.2;
	position: absolute;
	top: 115px;
	left: 5%;
}

@media screen and (min-width:1500px) {
	.fill {
		top: 90px;
		left: 24px;
		width: auto;
		opacity: 0.2;
	}

}
</style>