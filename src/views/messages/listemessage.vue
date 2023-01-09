<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Messages</h3>
		</v-subheader>
		<v-card>
			<v-timeline dense>
				<v-timeline-item color="#607D8B" v-for="(item, index) in msgs" :key="item.idService">
					<v-card class="ml-16 mb-2" v-if="item.writer == userInfo.id">
						<v-card-title class="text-h5" >
							Moi
						</v-card-title>
						<small class="ml-4"> Le {{ item.created_at }}</small>

						<v-card-text>
							{{ item.message }}
						</v-card-text>
					</v-card>
					<v-card class="elevation-2 ml-1" v-else>
						<v-card-title class="text-h6">
							{{ item.emailReceiver }} - {{item.firstnameWriter}}
						</v-card-title>
						<small class="ml-4"> Le {{ item.created_at }}</small>

						<v-card-text>
							{{ item.message }}
						</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card>
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
		kind: '',
		receiverEmail: '',
		idReceiver: '',
		msgs: [],
		created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
	}), 
	methods: {
		async getMessage() {
			try {
				const response = await axios.post('messages/getMessages/' + this.userInfo.id)
				this.msgs = response.data;
			} catch (error) {
				console.log(error)
			}
		}
	}, 

	beforeMount() {
		this.getMessage()
	}
}
</script>
<style scoped>
.text-h5{ 
	color : rgb(248, 248, 253);
	background-color: rgb(154, 144, 133);	
}
.text-h6{ 
	color : rgb(248, 248, 253);
	background-color: #607D8B;
}
</style>