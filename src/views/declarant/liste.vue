<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Listes des déclarants</h3>
		</v-subheader>
		<v-row>
			<v-col cols="6">
				<v-text-field v-model="seekfirstname" :on-keyup="onSearchFirstname" rounded outlined
					placeholder="Rechercher ici" append-icon="mdi-magnify" dense>
				</v-text-field>
			</v-col>
		</v-row>
		<v-simple-table>
			<thead>
				<tr>
					<th>id</th>
					<th>Nom</th>
					<th>Prénom</th>
					<th>Genre</th>
					<th>Email</th>
					<th>Profession</th>
					<th>Residence</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in onSearchFirstname" :key="item.idDeclarant">
					<td>{{ item.idDeclarant }}</td>
					<td>{{ item.firstname }}</td>
					<td>{{ item.lastname }}</td>
					<td>{{ item.sexe }}</td>
					<td>{{ item.email }}</td>
					<td>{{ item.professsion }}</td>
					<td>{{ item.residence }}</td>
					<td>
						<v-btn x-small class="btnAction" color="info" link
							:to="{ name: 'editclarant', params: { idDecl: item.idDeclarant } }">
							<v-icon x-small color="purple"> mdi-pencil
							</v-icon>
						</v-btn>

					</td>
				</tr>
			</tbody>
		</v-simple-table>

	</div>
</template> 

<script>
import axios from 'axios'
export default {
	name: "listeacte",
	data: () => ({
		seekfirstname: '',
		created_at: '',
		scope: '',
		msgAlert: '',
		itemsDeclarant: [],
	}),
	computed: {
		onSearchFirstname() {
			let seek = this.seekfirstname
			return this.itemsDeclarant.filter(item => {
				return item.firstname.toLowerCase().indexOf(seek.toLowerCase()) > -1
			})
		},
	},
	methods: {
		async getAllDeclarant() {
			try {
				const response = await axios.post("user/getDeclarant")
				this.itemsDeclarant = response.data
			} catch (e) {
				console.log(e)
			}
		}

	},
	beforeMount() {
		this.getAllDeclarant()
	},
}
</script>
<style scoped>
h5 {
	color: rgb(70, 64, 64);
}
</style>