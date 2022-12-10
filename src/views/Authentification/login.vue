<template>
	<v-app id="inspire">
		<v-container fluid fill-height>
			<v-layout align-center justify-center fill-height class="ContainLogin">

				<v-flex xs10 sm8 md6>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title align-center justify-center>BagiraActo</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form @submit.prevent="handleSubmit">
								<div class="d-flex">
									<v-icon>person</v-icon>
									<v-text-field name="username" label="Login" required type="text"
										placeholder="username" v-model="username">
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
									<v-btn type="submit" @click="verifyFieled()">Login</v-btn>
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
			username: '',
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
		verifyFieled() {
			this.msgAlert = ''
			if (this.password == '' || this.username == '') {
				this.msgAlert = "Veuillez d'abord remplir tous  les champs"
				this.classAlert = "danger"
			}
		},
		async handleSubmit() {
			try {
				const formData = new FormData()
				formData.append('client_id', this.username)
				formData.append('username', this.username)
				formData.append('client_secret', this.password)
				formData.append('password', this.password)
				formData.append('grant_type', 'password')
				const response = await axios.post('user/login', formData)
				console.log(response.data)
				if (response.data['access_token']) {
					localStorage.setItem('token', response.data['access_token'])
					localStorage.setItem('username', this.username)

					if (response.data['scope'] === "admin") {
						this.$router.push('/admin')
					}
					if (response.data['scope'] === "agent") {
						this.$router.push('/agent')
					}
					if (response.data['scope'] === "receptionniste") {
						this.$router.push('/welcome')
					}
					if (response.data['scope'] === "decl") {
						this.$router.push('/welcome')
					}

				} else {
					this.msgAlert = "Mot de passe ou email incorrect"
					this.classAlert = "danger"
				}
			} catch (e) {
				this.msgAlert = "Mot de passe ou email incorrect"
				this.classAlert = "danger"
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
</style>
