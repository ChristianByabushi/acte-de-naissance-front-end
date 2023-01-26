<template>
	<div>
		<h5>identifiant de la dette : <span>({{ idDette }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="raison" label="Raison" required> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="montantDette" label="montantDette ($)" required> </v-text-field>

					<v-text-field type="date" v-model="dateDette" label="date d'emprunt" required> </v-text-field>

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
	name: "editfonctioncomponent",
	data: () => ({
		idUtilisateur: "",
		montantDette: "",
		raison: "",
		itemsUsers: [],
		dateDette: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		msgAlert: '',
	}),
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.montantDette = "",
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
			this.changetypefonction()
			if ((this.nom == '') || (this.postnom == '') || (this.prenom == "")) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entrées toutes les coordonnées !"
				return
			}


			try {
				const formData = new FormData()

				formData.append('montantDette', this.montantDette)
				formData.append('raison', this.raison)
				formData.append('montantDette', this.montantDette)
				formData.append('dateDette', this.dateEnregistrement)
				formData.append('idUtilisateur', this.idUtilisateur)
				formData.append('idAgent', this.idAgent)

				const response = await axios.post('dette/editdette', formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = "Dette editée avec succés"
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},

		async getinfofonction() {
			let paramId = router.currentRoute.params.id
			console.log(router.currentRoute.params.id)
			if (paramId != null) {
				const response = await axios.post('fonction/getfonctioninfo/' + paramId)
				this.montantDette = response.data.montantDette;
				this.raison = response.data.raison;
				this.idDette = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getinfofonction();
		this.getlisteUsers
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>