<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Messages</h3>
		</v-subheader>
		<v-card>
			<v-timeline dense>
				<v-timeline-item v-for="(item, index) in msgs" :key="item.idService">
					<v-card class="ml-16 mb-2" v-if="item.writer == userInfo.id">
						<v-card-title class="text-h5">
							Moi
						</v-card-title>
						<small class="ml-4"> Le {{ item.created_at }}</small>

						<v-card-text>
							{{ item.message }}
						</v-card-text>
					</v-card>
					<v-card class="elevation-2 ml-1" v-else>
						<v-card-title class="text-h5" :load="getInfoByid(item.writer)">
								{{receiverEmail}}
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
				console.log(this.userInfo.id)
				const response = await axios.post('messages/getMessages/' + this.userInfo.id)
				this.msgs = response.data; 
				console.log(this.msgs)
			} catch (error) {
				console.log(error)
			}
		},
		async getInfoByid(item) { 
			try {
				const response = await axios.post('user/getInfoByid/' + item)
				this.receiverEmail=	response.data.email

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