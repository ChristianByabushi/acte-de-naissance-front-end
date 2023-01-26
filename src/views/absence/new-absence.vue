<template>
	<div>
		<h5>Enregistrement d'une absence</h5>
		<form @submit.prevent="addMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-select name="" v-model="idUtilisateur" :items="itemsUsers" item-text="nom" label="Agent"
						item-value="id">
					</v-select> 
				
					<v-text-field v-model="motif" label="motif" required> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="coutAbsence" label="coutAbsence ($)" required> </v-text-field>

					<v-text-field type="date" v-model="dateAbsence" label="Jour de l'appel" required> </v-text-field>

				</v-col>
			</v-row>

			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" color="dense" class="mr-4 mt-4 center">
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
		idUtilisateur: "",
		coutAbsence: "",
		motif: "",
		itemsUsers: [],
		dateAbsence: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		msgAlert: '',
	}),
	mounted() {
		this.$store.dispatch('getInfoUser')
		this.idAgent = this.userInfo.id
	},
	computed: mapState([
		'userInfo'
	]),
	methods: {
		changetypeabsence() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.coutAbsence = "",
				this.motif = ""
		},

		async addMethod() {
			this.changetypeabsence()
			if ((this.nomabsence == '') || (this.baremeabsence == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entré toutes les identités (le nomet le post-nom) !"
				return
			}
			try {
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				const formData = new FormData()
				
				formData.append('coutAbsence', this.coutAbsence)
				formData.append('motif', this.motif)
				formData.append('dateAbsence', this.dateEnregistrement)
				formData.append('idUtilisateur', this.idUtilisateur)
				formData.append('idAgent', this.idAgent)

				const response = await axios.post('absence/addabsence', formData)

				if ((response.data.errorstate) == true) {
					console.log(2)
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				} 

				this.msgAlert = 'absence enregistrée avec succés'
				this.typeAlert = 'success'
				this.initializeFields()
			} catch (e) {
			}
		},
		async getlisteUsers() {
			try {
				const response = await axios.post('user/getlisteUsers')
				this.itemsUsers = response.data;
			} catch (e) {
				console.log(e)
			}
		},

		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getlisteUsers()
	}

}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>