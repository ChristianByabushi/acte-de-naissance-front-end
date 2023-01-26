<template>
	<div>
		<h5>Enregistrement d'une fonction</h5>
		<form @submit.prevent="addMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="nomFonction" label="nomFonction" required > </v-text-field>
					<v-text-field v-model="baremeFonction" label="baremeFonction ($)" required > </v-text-field>
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
		nomFonction: "",
		baremeFonction: "",
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
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.nomFonction = ""
			this.baremeFonction = ""
		},

		async addMethod() {
			this.changetypefonction()
			if ((this.nomFonction == '') || (this.baremeFonction == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entré toutes les identités (le nomFonction et le post-nomFonction) !"
				return
			}
			try {
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				const formData = new FormData()
				formData.append('nomFonction', this.nomFonction)
				formData.append('baremeFonction', this.baremeFonction)
				formData.append('idAgent', this.idAgent)

				const response = await axios.post('fonction/addfonction', formData)

				if ((response.data.errorstate) == true) {
					console.log(2)
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'fonction enregistrée avec succés'
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