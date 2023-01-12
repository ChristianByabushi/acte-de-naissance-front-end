<template>
	<div>
		<h5>Informations sur le cas, id : <span>({{ idCas }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-select v-model="idEnfant" :items="itemsEnfants" item-text="nom" label="Choisir l'enfant"
						item-value="idEnfant">
					</v-select>
					<v-text-field v-model="nbreFoisManger" type="number" step=0.01
						label="Nombre des fois que l'enfant mange par jour" required> </v-text-field>
					<v-col lg="6" cols="12">

					</v-col>
					<textarea name="" v-model="medicament" placeholder="Médicaments à prendre et traitement relatifs"
						id="textAreaMedicament" cols="30" rows="3"></textarea>

				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="dateEnregistrement" type="date" label="DateEnregistrement" required>
					</v-text-field>
					<v-text-field v-model="taille" type="number" step=0.01 label="Taille" required>
					</v-text-field>
					<v-text-field v-model="poids" type="number" step=0.01 label="Poids" required> </v-text-field>

				</v-col>

			</v-row>

			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" color="blue" class="mr-4 mt-4 center">
				Editer
			</v-btn>
		</form>

	</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import router from '@/router';
export default {
	name: "editNutrition",
	data: () => ({
		idCas: "",
		taille: "",
		poids: "",
		nbreFoisManger: "",
		medicament: "",
		itemsEnfants: [],
		idAgent: "",
		idEnfant: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
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
	}), computed: mapState([
		'userInfo'
	]), mounted() {
		this.$store.dispatch('getInfoUser')
		this.idAgent = this.userInfo.id
	},
	methods: {

		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.taille = "";
			this.poids = "";
			this.nbreFoisManger = "";
			this.medicament = "";
			this.itemsEnfant = [];
			this.dateEnregistrement = ""
		},
		async editMethod() {
			this.changetypefonction()
			if ((this.nom == '') || (this.postnom == '') || (this.prenom == "")) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entrées toutes les identités (le nom et le post-nom) !"
				return
			}
			if ((this.quartier == '') || (this.commune == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Le quartier et la commune ne doivent pas etre vide!"
				return
			}

			try {
				const formData = new FormData()
				formData.append('taille', this.taille)
				formData.append('poids', this.poids)
				formData.append('medicament', this.medicament)
				formData.append('prenom', this.prenom)
				formData.append('idAgent', this.idAgent)
				formData.append('idCas', this.idCas)
				formData.append('nbreFoisManger', this.nbreFoisManger)
				formData.append('idEnfant', this.idEnfant)
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				formData.append('dateEnregistrement', this.dateEnregistrement + currentDate)
				const response = await axios.post('nutrition/editCaracteristics/' + this.idCas, formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = "Enregistrement de l'enfant edité avec succés"
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},
		async getAllEnfants() {
			try {
				const response = await axios.post("enfant/getallenfants")
				this.itemsEnfants = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async getInfoCaracteristics() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('nutrition/getCaracteristicsInfo/' + paramId)
				this.taille = response.data.taille
				this.poids = response.data.poids
				this.nbreFoisManger = response.data.nbreFoisManger
				this.medicament = response.data.medicament
				this.dateEnregistrement = response.data.dateEnregistrement
				this.age = response.data.age
				this.idEnfant = response.data.idEnfant
				this.idCas = paramId
				console.log(response.data)
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getInfoCaracteristics()
		this.getAllEnfants()
	}
}
</script>

<style>
#textAreaMedicament {
	border-radius: 5px;
	width: 100%;
	box-sizing: border-box;
	border: 1px solid rgb(151, 135, 135);
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
}

h5 {
	color: rgb(70, 64, 64);
}
</style>