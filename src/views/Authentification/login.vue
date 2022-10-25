<template>
	<v-app id="inspire">
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md4>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title align-center justify-center>HumanAtm</v-toolbar-title>
						</v-toolbar>
						<v-img id="logoHuman" src="@/assets/atmlogo.jpg"></v-img>

						<v-card-text>
							<v-form @submit.prevent="handleSubmit">
								<div class="d-flex">
									<v-icon>person</v-icon>
									<v-text-field name="email" label="Login" required type="text" placeholder="email"
										v-model="email">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon class="lockIcon" @click="activePassWord = !activePassWord">lock</v-icon>
									<v-text-field v-if="activePassWord" required name="password" label="Password"
										type="text" v-model="password"></v-text-field>
									<v-text-field v-else name="password" label="Password" type="password"
										v-model="password">
									</v-text-field>
								</div>
								<alert v-if="msgAlert" :activeClass="classAlert" :msg="msgAlert"></alert>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn type="submit" color="primary">Login</v-btn>
								</v-card-actions>
							</v-form>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
import alert from '@/components/alert.vue'
import axios from 'axios'
export default {
	name: 'Login',
	passwordEnable: true,
	components: {
		alert
	},
	data() {
		return {
			password: '',
			email: '',
			msgAlert: null,
			classAlert: '',
			activePassWord: false,
			logo: ''
		}
	},
	props: {
		source: String,
	},
	methods: {
		async handleSubmit() {
			this.msgAlert = ''
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
					localStorage.setItem('email', this.email)
					if (this.$route.path !== '/')
						this.$router.push('/')
				} else {
					this.msgAlert = "Mot de passe ou email incorrect"
					this.classAlert = "error"
				}
			} catch (e) {
				this.msgAlert = "Mot de passe ou email incorrect"
				this.classAlert = "error"
			}
		},
		method_activePassWord() {
			if (this.activePassWord == '') {
				this.logo = 'lock'
			} else {
				this.logo = 'eye'
			}
			return this.activePassWord
		}
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
</style>
