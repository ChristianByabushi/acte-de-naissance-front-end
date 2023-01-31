<template>
	<div>
		<h5>identifiant du Salaire : <span>({{ idSalaire }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-select name="" v-model="idUtilisateur" :items="itemsUsers" item-text="nom" label="Agent"
						item-value="id">
					</v-select> 
				
					<v-text-field v-model="motif" label="description" required> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="indemnites" label="indemnites ($)" required> </v-text-field>
					<v-text-field v-model="autresReduction" label="autresReduction ($)" required> </v-text-field>

					<v-text-field type="date" v-model="datePayement" label="Jour du payement" required> </v-text-field>
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
	name: "editsalairecomponent",
	data: () => ({
		idUtilisateur: "",
		idSalaire :"",
		indemnites: "",
		autresReduction: "",
		motif: "",
		itemsUsers: [],
		datePayement: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		msgAlert: '',
	}),
	methods: {
		changetypesalaire() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.montantSalaire = "",
				this.raison = ""
		},
		async getlisteUsers() {
			try {
				const response = await axios.post('user/getlisteUsers')
				this.itemsUsers = response.data;
			} catch (e) {
				console.log(e)
			}
		},
		async editMethod() {
			this.changetypesalaire()
			if ((this.nom == '') || (this.postnom == '') || (this.prenom == "")) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entrées toutes les coordonnées !"
				return
			}


			try {
				const formData = new FormData()

				formData.append('indemnites', this.indemnites)
				formData.append('motif', this.motif)
				formData.append('datePayement', this.datePayement)
				formData.append('autresReduction', this.autresReduction)
				formData.append('idUtilisateur', this.idUtilisateur)
				formData.append('idAgent', this.idAgent)

				const response = await axios.post('Salaire/editSalaire', formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = "Salaire editée avec succés"
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},

		async getinfosalaire() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('salaire/getsalaireinfo/' + paramId)
				this.autresReduction = response.data.autresReduction;
				this.indemnites = response.data.indemnites;
				this.datePayement = response.data.datePayement;
				this.idSalaire = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getinfosalaire();
		this.getlisteUsers
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>