<template>
	<div>
		<h5>Informations sur le malade, id : <span>({{ idmalade }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="nom" label="Nom" required :counter="255"> </v-text-field>
					<v-text-field v-model="postnom" label="Postnom" required :counter="255"> </v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="prenom" label="Prenom" required :counter="255"> </v-text-field>
					<v-select name="" v-model="sexe" :items="itemsSexe" item-text="title" label="Genre"
						item-value="scope">
					</v-select>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="quartier" required label="quartier"> </v-text-field>
					<v-text-field v-model="age" type="number" required label="Age"> </v-text-field>

				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="etat" type="text" required label="etat"> </v-text-field>
					<v-text-field v-model="getCurrentTime" type="date" label="Date d'enregistrement" required
						:counter="255">
					</v-text-field>
				</v-col>
			</v-row>

			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" color="dense" class="mr-4 mt-4 center">
				Editer
			</v-btn>
		</form>

	</div>
</template>
<script>
import axios from 'axios'
import router from '@/router';
export default {
	name: "editmalade",
	data: () => ({
		idmalade: "",
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		quartier: "",
		etat: "",
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
			this.nom = "";
			this.postnom = "";
			this.prenom = "";
			this.sexe = "";
			this.quartier = "";
			this.tuteur = "";
			this.commune = "";
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
				console.log(this.quartier)
				const formData = new FormData()
				formData.append('idMalade', this.idmalade)
				formData.append('nom', this.nom)
				formData.append('postNom', this.postnom)
				formData.append('prenom', this.prenom)
				formData.append('sexe', this.sexe)
				formData.append('quartier', this.quartier)
				formData.append('etat', this.etat)
				formData.append('age', this.age)
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				formData.append('dateEnregistrement', this.dateEnregistrement + currentDate)
				const response = await axios.post('malade/editmalade/' + this.idmalade, formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = "Enregistrement de l'malade edité avec succés"
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},

		async getInfomalade() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('malade/getmaladeinfo/' + paramId)
				this.nom = response.data.nom;
				this.postnom = response.data.postNom;
				this.prenom = response.data.prenom
				this.sexe = response.data.sexe
				this.quartier = response.data.quartier
				this.tuteur = response.data.tuteur
				this.etat = response.data.etat
				this.commune = response.data.commune
				this.age = response.data.age
				this.idmalade = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getInfomalade()
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>