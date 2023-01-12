<template>
	<div>
		<h5>Informations sur l'enfant, id : <span>({{ idEnfant }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="nom" label="Nom" required :counter="255"> </v-text-field>
					<v-text-field v-model="postnom" label="Postnom" required :counter="255"> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="prenom" label="Prenom" required :counter="255"> </v-text-field>
					<v-select name="" v-model="sexe" :items="itemsSexe" item-text="title" label="Genre"
						item-value="scope">
					</v-select>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="quartier" required label="quartier"> </v-text-field>
					<v-text-field v-model="age" required label="Age"> </v-text-field>
					<v-text-field v-model="tuteur" type="text" required label="Tuteur"> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="commune" required label="commune"> </v-text-field>
					<v-text-field v-model="getCurrentTime" type="date" label="Date d'enregistrement" required
						:counter="255">
					</v-text-field>
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
import router from '@/router';
export default {
	name: "editEnfant",
	data: () => ({
		idEnfant: "",
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		quartier: "",
		tuteur: "",
		commune: "",
		age: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		idDeclarant: "",
		idUser: '',
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
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.nom = "",
				this.postnom = "",
				this.prenom = "",
				this.sexe = "",
				this.quartier = "",
				this.tuteur = "",
				this.commune = "",
				this.age = "";
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
				formData.append('idEnfant', this.idEnfant)
				formData.append('nom', this.nom)
				formData.append('postnom', this.postnom)
				formData.append('prenom', this.prenom)
				formData.append('sexe', this.sexe)
				formData.append('quartier', this.quartier)
				formData.append('tuteur', this.tuteur)
				formData.append('commune', this.commune)
				formData.append('age', this.age)
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				formData.append('dateEnregistrement', this.dateEnregistrement + currentDate)
				const response = await axios.post('enfant/editenfant/' + this.idEnfant, formData)
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

		async getInfoEnfant() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('enfant/getenfantInfo/' + paramId)
				this.nom = response.data.nom;
				this.postnom = response.data.postnom;
				this.prenom = response.data.prenom
				this.sexe = response.data.sexe
				this.quartier = response.data.quartier
				this.tuteur = response.data.tuteur
				this.commune = response.data.commune
				this.age = response.data.age
				this.idEnfant = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getInfoEnfant()
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>