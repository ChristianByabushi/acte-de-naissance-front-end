<template>
	<div>

		<v-alert dense type="info" color="#757575">
			Cette partie du programme porte les fonctionnalités sur l'administrateur du système
		</v-alert>
		<v-container>
			<v-layout align-center justify-center>
				<v-flex xs12 sm12 md10>
					<div>
						<v-btn  class="mb-2" @click="changetypefonction('info')">Informations</v-btn>
						<v-btn class="ml-2 mb-2" @click="changetypefonction('edit')">Modifier</v-btn>
						<v-btn class="ml-2 mb-2" @click="changetypefonction('pwd')">Changer motdepasse</v-btn>
					</div>

					<v-card v-if="typefonction == 'info'">
						<v-toolbar dark color="#757575">
							<v-toolbar-title align-center justify-center> Information sur le compte en connexion
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-toolbar align-center justify-center class="mt-4">
								<p class="userinfo">Firstname : {{ firstname }}</p>
							</v-toolbar>
							<v-toolbar align-center justify-center class="mt-4">
								<p class="userinfo">lastname : {{ lastname }}</p>
							</v-toolbar>

							<v-toolbar align-center justify-center class="mt-4">
								<p class="userinfo">Email: {{ email }}</p>
							</v-toolbar>
						</v-card-text>

					</v-card>
					<v-card class="elevation-6" v-if="typefonction == 'edit'">
						<v-toolbar dark color="#757575">
							<v-toolbar-title align-center justify-center> Modification du compte en connexion
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<div class="d-flex">
									<v-icon>mdi-account</v-icon>
									<v-text-field name="firstname" label="Prénom" required type="text"
										placeholder="premier nom" v-model="firstname">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon>mdi-account</v-icon>
									<v-text-field name="email" label="Nom" required type="text"
										placeholder="Deuxième nom" v-model="lastname">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon>mdi-email</v-icon>
									<v-text-field name="email" label="usermail" required type="text" placeholder="email"
										v-model="email">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon>lock</v-icon>
									<v-text-field required name="password" label="Mot de passe" type="password"
										v-model="password">
									</v-text-field>
								</div>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn @click="editAccount()" dense>Modifier</v-btn>
								</v-card-actions>
								<v-alert :type="typeAlert" v-if="msgAlert">
									{{ msgAlert }}
								</v-alert>
							</v-form>
						</v-card-text>
					</v-card>
					<v-card class="elevation-6" v-if="typefonction == 'pwd'">
						<v-toolbar dark color="#757575">
							<v-toolbar-title align-center justify-center> Changer le mot de passe
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-toolbar align-center justify-center class="mt-4">
									<p class="userinfo">Email: {{ email }}</p>
								</v-toolbar>
								<div class="d-flex">
									<v-icon>lock</v-icon>
									<v-text-field required name="password" label="Ancien mot de passe" type="password"
										v-model="password">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon>lock</v-icon>
									<v-text-field required name="password" label="Nouveau mot de passe" type="password"
										v-model="newpassword">
									</v-text-field>
								</div>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn @click="editPwdAccount()" dense>Changer</v-btn>
								</v-card-actions>
								<v-alert :type="typeAlert" v-if="msgAlert">
									{{ msgAlert }}
								</v-alert>
							</v-form>
						</v-card-text>
					</v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>
</template>

<script>
import alert from '@/components/alert.vue'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
	name: 'Login',
	passwordEnable: true,
	components: {
		alert
	},
	data() {
		return {
			hidepassword: '',
			password: '',
			typefonction: 'info',
			isadmin: false,
			simularpassword: '',
			newpassword: '',
			email: '',
			msgAlert: '',
			classAlert: '',
			activePassWord: false,
			firstname: '',
			lastname: '',
			typeAlert: 'info',
			logo: ''
		}
	},
	props: {
		source: String,
	},
	methods: {
		changetypefonction(type) {
			this.typefonction = type
			this.typeAlert = 'error'
			this.msgAlert = ''
		},
		async handleSubmit() {
			if (this.password == '' || this.email == '') {
				this.msgAlert = "Veuillez d'abord remplir tous  les champs"
				this.classAlert = "info"
				return
			}

			try {
				const formData = new FormData()
				formData.append('client_id', this.email)
				formData.append('username', this.email)
				formData.append('client_secret', this.password)
				formData.append('password', this.password)
				formData.append('grant_type', 'password')
				const response = await axios.post('user/login', formData)
				if (response.data['access_token']) {
					localStorage.setItem('token', response.data['access_token'])
					if (this.$route.path !== '/')
						this.$router.push('/')
				} else {
					this.msgAlert = "Mot de passe ou email incorrect"
				}
			} catch (e) {
				this.msgAlert = "Mot de passe ou email incorrect"
			}
		},
		method_activePassWord() {
			if (this.activePassWord == '') {
				this.logo = 'lock'
			} else {
				this.logo = 'eye'
			}
			return this.activePassWord
		},

		verifyFormAdd() {
			if (this.email == '' || this.password == '' || this.firstname == '' || this.lastname == '') {
				this.msgAlert = "Aucun champ ne doit etre vide !"
				return false
			}

			if (this.password != this.simularpassword) {
				this.msgAlert = "Vous devez saisir les mots de passe simulaires!"
				return false
			}

			if (this.email == '' || this.firstname == '' || this.lastname == '') {
				this.msgAlert = "Aucun champ ne doit etre vide !"
				return false
			}

			if ((this.password.length) < 8) {
				this.msgAlert = " Le mot de passe doit contenir au minimum 8 caractères"
			}
			//if all work willingly then
		},

		async editPwdAccount() {
			if ((this.password == '') || (this.newpassword == '')) {
				this.msgAlert = " Aucn champ de mot de passe ne ne doit etre vide!"
				return
			}
			if (((this.password.length) < 8) || (this.newpassword.length < 8)) {
				this.msgAlert = " Le mot de passe doit contenir au minimum 8 caractères"
				return
			}
			try {
				const formData = new FormData()
				formData.append('password', this.password)
				formData.append('newpassword', this.newpassword)
				formData.append('email', this.userInfo.email)
				formData.append('idUser', this.userInfo.id)
				const response = await axios.post('user/editPwdAccount', formData)
				this.typeAlert = 'primary'
				this.msgAlert = 'Mot de passe changé avec succès'
				if (this.$route.path !== '/login')
					this.$router.push('/login')
			} catch (e) {
				console.log(e)
				this.msgAlert = 'Erreur survenue, rassurez vous que le mot de passe est correct'
			}

		},
		async addAccount() {
			if (this.verifyFormAdd() == false)
				return
			try {
				const formData = new FormData()
				formData.append('firstname', this.firstname)
				formData.append('lastname', this.lastname)
				formData.append('password_confirm', this.simularpassword)
				formData.append('password', this.password)
				formData.append('email', this.email)
				const response = await axios.post('user/editAccount', formData)
				console.log(response.data)
			} catch (e) {
				alert(e)
			}
		},

		verifyFormEdit() {
			if (this.email == '' || this.password == '' || this.firstname == '' || this.lastname == '') {
				this.msgAlert = "Aucun champ ne doit etre vide, rechargez la page pour à partir du dahsboard ou reconnectez vous !"
				return false
			}
			if ((this.password.length) < 8) {
				this.typeAlert = "primary"
				this.msgAlert = " Le mot de passe doit contenir au minimum 8 caractères"
				return false
			}
		},

		async editAccount() {
			if (this.verifyFormEdit() == false) {
				return
			};
			try {
				const formData = new FormData()
				formData.append('firstname', this.firstname)
				formData.append('lastname', this.lastname)
				formData.append('password', this.password)
				formData.append('new_email', this.email)
				formData.append('email', this.userInfo.email)
				formData.append('idUser', this.userInfo.id)
				const response = await axios.post('user/editAccount', formData)
				this.typeAlert = 'primary'
				this.msgAlert = 'Compte mise à jour avec succès'
				if (this.$route.path !== '/login')
					this.$router.push('/login')
			} catch (e) {
				console.log(e)
				this.msgAlert = 'Erreur survenue, rassurez vous que le mot de passe est correct'
			}
		},
	},
	mounted() {
		this.$store.dispatch('getInfoUser')
		this.email = this.userInfo.email
		this.lastname = this.userInfo.lastname
		this.firstname = this.userInfo.firstname
	},
	computed: mapState([
		'userInfo'
	]),
	created() {

	}
};
</script>
<style scoped>
.lockIcon {
	width: 20px;
	padding-bottom: 10px;
	cursor: pointer;
}

#logoHuman {
	position: absolute;
	height: 120px;
	width: 220px;
	margin-left: 5rem;
	margin-top: 2rem;
	opacity: 0.2;
}

p.userinfo {
	size: 20px;
	font-size: large
}
</style>
