<template>
	<div>
		<v-subheader>
			<h3>Nouveau message</h3>
		</v-subheader>
		<v-card>
			<h6>Expéditeur : {{ userInfo.email }}</h6>
		</v-card>
		<form @submit.prevent="envoyerMessage()" method="post">
			<v-card>
				<v-card-title class="text-h5">
					<v-text-field v-model="receiverEmail" label="email Destinaire" width="50%"></v-text-field>
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="msg" label="Contenu" required :counter="255"> </v-text-field>
				</v-card-text>
				<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
					{{ msgAlert }}
				</v-alert>
			</v-card>
			<v-btn type="submit" class="mt-2">
				Envoyer
			</v-btn>
		</form>
	</div>
</template> 
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
	name: "newmessage",
	computed: mapState([
		'userInfo',
	]),
	data: () => ({
		msg: '',
		kind: '',
		receiverEmail: '',
		idReceiver: '',
		users: [],
		created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		typeAlert: '',
		msgAlert: ''
	}),
	methods: {
		initializeComponent() {
			this.msgAlert = ''
			this.typeAlert = ''
		},
		async envoyerMessage() {
			this.initializeComponent()
			try {
				const formData = new FormData()
				formData.append('email', this.receiverEmail)
				formData.append('message', this.msg)
				formData.append('writer', this.userInfo.id)
				formData.append('receiver', this.idReceiver)
				formData.append('kind', 0)
				formData.append('created_at', this.created_at + this.getCurrentTime())
				const response = await axios.post('messages/create', formData)
				if (response.data.errorstate == true) {
					this.typeAlert = 'error'
					this.msgAlert = "Veuillez Verifier l'adresse email, (message non envoyé !)"
					console.log(response.data)
					return
				}
				this.typeAlert = 'success'
				this.msgAlert = "Message envoyé avec succès"
				console.log(response.data)
			} catch (error) {
				console.log(error)
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = " : " + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		}

	},


}
</script>
<style>

</style>