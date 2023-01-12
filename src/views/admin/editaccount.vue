<template>
	<div>
		<h5>Editer un compte</h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-text-field v-model="idUser" label="Id" required :counter="255"> </v-text-field>
			<v-text-field v-model="firstname" label="Nom" required :counter="255"> </v-text-field>
			<v-text-field v-model="lastname" label="Prénom" required :counter="255"> </v-text-field>
			<v-text-field v-model="email" label="Adresse email" required :counter="255"> </v-text-field>
			<v-text-field v-model="password" label="Mot de passe par defaut" required :counter="255"> </v-text-field>
			<v-select name="" v-model="scope" :items="items_scope" item-text="title" label="Type d'utilisateur"
				item-value="scope">
			</v-select>
			
			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" class="mr-4 center">
				Editer
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import router from '@/router';
export default {
	name: "editaccount",
	data: () => ({
		idUser: '',
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		created_at: '',
		scope: '',
		msgAlert: '',
		stateaccount: '',
		items_stateaccount: [
			{
				state: "0",
				title: 'activé'
			},
			{
				state: "1",
				title: 'désactivé'
			},
		],
		items_scope: [
			{
				scope: 'nutritionniste',
				title: 'Nutritionniste'
			},
			{
				scope: 'receptionniste',
				title: 'Réceptionniste'
			},
		]
	}),
	methods: {
		
		changetypefonction(type) {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		async editMethod() {
			this.changetypefonction('')
			if (((String(this.password).length) < 8) || ((String(this.newpassword).length) < 8)) {
				this.typeAlert = "error"
				this.msgAlert = "Le mot de passe doit contenir au minimum 8 caractères"
				return
			}
			if (this.scope == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez choisir d'abord le type d'utilisateur"
				return
			}
			try {
				const formData = new FormData()
				formData.append('id', this.idUser)
				formData.append('firstname', this.firstname)
				formData.append('lastname', this.lastname)
				formData.append('password', this.password)
				formData.append('password_confirm', this.password)
				formData.append('email', this.email)
				formData.append('new_email', this.email)
				formData.append('scope', this.scope)
				const response = await axios.post('user/editAccountUser', formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Compte modifié avec succés'
				this.typeAlert = 'info'
			} catch (e) {
				console.log(e)
			}
		},
		async getUserInfo(id) {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('user/getInfoByid/' + paramId)
				this.idUser = response.data.id
				this.firstname = response.data.firstname
				this.lastname = response.data.lastname
				this.email = response.data.email
				this.scope = response.data.scope
				this.stateaccount = response.data.stateaccount
			}

		},
	},
	beforeMount() {
		this.getUserInfo()
	},
}
</script>
<style scoped>
h5 {
	color: rgb(70, 64, 64);
}
</style>