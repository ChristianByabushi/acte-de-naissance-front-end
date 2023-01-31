<template>
	<div>
		<h5>identifiant de la fonction : <span>({{ idFonction }})</span></h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-row>
					<v-col lg="6" cols="12">
						<v-text-field v-model="nomFonction" label="nomFonction" required> </v-text-field>
						<v-text-field v-model="baremeSalaire" label="baremeSalaire ($)" required> </v-text-field>
					</v-col>
				</v-row>
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
		idFonction: "",
		nomFonction: "",
		baremeSalaire: "",
		msgAlert: '',
	}),
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
				this.nomFonction = "",
				this.baremeSalaire = ""
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
				formData.append('idAgent', this.idAgent)
				formData.append('idFonction', this.idFonction)
				formData.append('nomFonction', this.nomFonction)
				formData.append('baremeSalaire', this.baremeSalaire)
				
				const response = await axios.post('fonction/editfonction/' + this.idFonction, formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = "Fonction editée avec succés"
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
				this.nomFonction = response.data.nomFonction;
				this.baremeSalaire = response.data.baremeSalaire;
				this.idFonction = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getinfofonction()
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>