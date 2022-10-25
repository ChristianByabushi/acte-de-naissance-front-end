<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>
<script> 
import {mapState} from 'vuex'
	export default {
	name: 'Login',
	data() {
		return {
			input: {
				username: "",
				password: ""
			}
		}
	},
	computed:{
		...mapState(['username, password'])
	},
	methods: {
		login() { 
			console.log(this.username)
			if (this.input.username != "" && this.input.password != "") {
				if (this.input.username = this.username  && this.input.password == this.password ) { 
					//this.$emit("autheticated, true"); //create a emit and sends it to true
					alert(this.username + " Connected");					
					//this.$router.replace({ name: "HomeView" });
				} else {
					alert("The user and/ or password is incorrect");
				}
			} else {
				alert('A username and password are required')
			}

		}, 
		
	}
}
</script>
<style scoped>
    #login {
        width: 500px;
        border: 1px solid #9c6060;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }

</style>
