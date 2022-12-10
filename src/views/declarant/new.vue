<template>
	<div>
			<h5>Ajouter un déclarant</h5>
			<form @submit.prevent="addMethod()" method="post">

				<v-row>
					<v-col lg="6" cols="12">
						<v-text-field v-model="firstname" label="Nom" required :counter="255"> </v-text-field>
						<v-text-field v-model="lastname" label="Prénom" required :counter="255"> </v-text-field>
					</v-col>
					<v-col lg="6" cols="12">
						<v-text-field v-model="professsion" label="Profession" required :counter="255"> </v-text-field>
						<v-text-field v-model="residence" label="Residence" required :counter="255"> </v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col lg="6" cols="12">
						<v-select name="" v-model="sexe" :items="itemsSexe" item-text="title" label="Genre"
							item-value="scope">
						</v-select>
					</v-col>
					<v-col lg="3" cols="12">
						<v-select name="" v-model="eta_civil" :items="itemsEtatCivil" item-text="title"
							label="Selectionner Etat civil" item-value="scope">
						</v-select>
					</v-col>
					<v-col lg="3" cols="12">
						<v-text-field v-model="bornin" label="DateNaissance" required type="date"> </v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col lg="6" cols="12">
						<v-text-field v-model="email" label="Adresse email" required :counter="255"> </v-text-field>
					</v-col>
					<v-col lg="6" cols="12">
						<v-text-field v-model="password" label="Mot de passe par defaut" required :counter="255">
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
export default {
	name: "newdeclarant",
	data: () => ({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		created_at: '',
		scope: '',
		professsion: '',
		bornin: '',
		eta_civil: '',
		sexe: '',
		residence: '',
		idUser: '',
		itemsEtatCivil: [
			{
				scope: 'marie',
				title: 'Marié'
			},
			{
				scope: 'celibat',
				title: 'Celibataire'
			},

		],
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

	}),
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.firstname = ''
			this.lastname = ''
			this.email = ''
			this.password = ''
			this.created_at = ''
			this.scope = ''
			this.professsion = ''
			this.bornin = ''
			this.eta_civil = ''
			this.sexe = ''
			this.residence = ''
		},
		async addMethod() {
			this.changetypefonction()
			if (((String(this.password).length) < 8) || ((String(this.newpassword).length) < 8)) {
				this.typeAlert = "error"
				this.msgAlert = " Le mot de passe doit contenir au minimum 8 caractères !"
				return
			}
			if (this.sexe == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez choisir le genre !"
				return
			} if ((this.firstname == '') || (this.lastname == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Tous les noms sont pas complets !"
				return
			}
			if (this.eta_civil == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez choisir l'etat civil svp!"
				return
			}
			if (this.bornin == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez entrer une date de naissance svp!"
			}
			if (this.professsion == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez definir la professsion!"
				return
			}
			try {
				const formData = new FormData()
				formData.append('firstname', this.firstname)
				formData.append('lastname', this.lastname)
				formData.append('password', this.password)
				formData.append('password_confirm', this.password)
				formData.append('email', this.email)
				formData.append('scope', "decl")
				formData.append('professsion', this.professsion)
				formData.append('residence', this.residence)
				formData.append('etat_civil', this.eta_civil)
				formData.append('sexe', this.sexe)
				formData.append('bornin', this.bornin)

				const response = await axios.post('user/register', formData)

				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Declarant ajouté avec succés'
				this.typeAlert = 'info'
				this.initializeFields()

			} catch (e) {
			}
		}
	},
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>