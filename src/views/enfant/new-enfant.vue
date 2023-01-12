<template>
	<div>
		<h5>Enregistrement d'un enfant</h5>
		<form @submit.prevent="addMethod()" method="post">
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
				Ajouter
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	name: "newacte",
	data: () => ({
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		quartier: "",
		tuteur: "",
		commune: "",
		age: "",
		idAgent: "",
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
	}),
	mounted() {
		this.$store.dispatch('getInfoUser')
		this.idAgent = this.userInfo.id
	},
	computed: mapState([
		'userInfo'
	]),
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.nom = ""
			this.postnom = ""
			this.prenom = ""
			this.sexe = ""
			this.quartier = ""
			this.tuteur = ""
			this.commune = ""
			this.age = ""
			this.dateEnregistrement = ""
		},

		async addMethod() {
			this.changetypefonction()
			if ((this.nom == '') || (this.postnom == '') || (this.prenom == '')) {
				console.log(this.prenom)
				console.log(this.nom)
				console.log(this.postnom)
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entré toutes les identités (le nom et le post-nom) !"
				return
			}
			if ((this.quartier == '') || (this.commune == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Le quartier et la commune ne doivent pas etre vide!"
				return
			}
			try {
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				const formData = new FormData()
				formData.append('nom', this.nom)
				formData.append('nom', this.nom)
				formData.append('postnom', this.postnom)
				formData.append('prenom', this.prenom)
				formData.append('sexe', this.sexe)
				formData.append('quartier', this.quartier)
				formData.append('tuteur', this.tuteur)
				formData.append('commune', this.commune)
				formData.append('age', this.age)
				formData.append('idAgent', this.idAgent)
				formData.append('dateEnregistrement', this.dateEnregistrement + currentDate)

				const response = await axios.post('enfant/addenfant', formData)

				if ((response.data.errorstate) == true) {
					console.log(2)
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Enfant enregistré avec succés'
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},

		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},

}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>