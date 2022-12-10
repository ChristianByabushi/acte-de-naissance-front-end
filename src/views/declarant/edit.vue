<template>
	<div>
		<h5>Editer un déclarant</h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="idDeclarant" disabled label="idDeclarant" required> </v-text-field>
					<v-text-field v-model="professsion" label="Profession" required :counter="255"> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="residence" label="Residence" required :counter="255"> </v-text-field>
					<v-select name="" v-model="sexe" :items="itemsSexe" item-text="title" label="Genre"
						item-value="scope">
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col lg="6" cols="12">
					<v-select name="" v-model="etat_civil" :items="itemsEtatCivil" item-text="title"
						label="Selectionner Etat civil" item-value="scope">
					</v-select>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="bornin" label="DateNaissance" required type="date"> </v-text-field>
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
	name: "editdeclarant",
	data: () => ({
		idDec: '',
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		idDeclarant: '',
		created_at: '',
		scope: '',
		professsion: '',
		bornin: '',
		etat_civil: '',
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
			this.professsion = ''
			this.bornin = ''
			this.idDeclarant = ''
			this.etat_civil = ''
			this.sexe = ''
			this.residence = ''
		},
		async getDeclarant() {
			let paramId = router.currentRoute.params.idDecl
			if (paramId != null) {
				const response = await axios.post('user/oneDeclarant/' + paramId)
				this.professsion = response.data.professsion
				this.bornin = response.data.bornin
				this.idDeclarant = paramId
				this.etat_civil = response.data.etat_civil
				this.sexe = response.data.sexe
				this.residence = response.data.residence  
			}
		},
		async editMethod() {
			this.changetypefonction()
			if (this.idDeclarant == "") {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez d'abord saisir un identifiant"
			}

			if (this.sexe == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez choisir le genre !"
				return
			}
			if (this.etat_civil == '') {
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

				formData.append('professsion', this.professsion)
				formData.append('residence', this.residence)
				formData.append('etat_civil', this.etat_civil)
				formData.append('sexe', this.sexe)
				formData.append('idDeclarant', this.idDeclarant)
				formData.append('bornin', this.bornin)
				const response = await axios.post('user/editDeclarant', formData)

				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					return
				}
				this.msgAlert = 'Declarant edité avec succés'
				this.typeAlert = 'info'
				this.initializeFields()

			} catch (e) {
			}
		}
	},
	beforeMount() {
		this.getDeclarant()
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>