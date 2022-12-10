<template>
	<div>
		<h5>Ajouter un compte</h5>
		<form @submit.prevent="addMethod()" method="post">
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
				Ajouter
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: "addaccount",
	data: () => ({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		created_at: '',
		scope: '',
		msgAlert: '',
		items_scope: [
			{
				scope: 'agent',
				title: 'Agent'
			},
			{
				scope: 'decl',
				title: 'Déclarant'
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
		async addMethod() {
			this.changetypefonction('')
			if (((String(this.password).length) < 8) || ((String(this.newpassword).length) < 8)) {
				this.typeAlert = "error"
				this.msgAlert = " Le mot de passe doit contenir au minimum 8 caractères"
				return
			}
			if (this.scope == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez choisir d'abord le type d'utilisateur"
				return
			}
			try {
				const formData = new FormData()
				formData.append('firstname', this.firstname)
				formData.append('lastname', this.lastname)
				formData.append('password', this.password)
				formData.append('password_confirm', this.password)
				formData.append('email', this.email)
				formData.append('scope', this.scope)
				const response = await axios.post('user/register', formData)

				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Compte ajouté avec succés'
				this.typeAlert = 'info'

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