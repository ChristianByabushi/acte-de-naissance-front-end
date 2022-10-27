<template>
	<div>
		<form @submit.prevent="submit_merchandise()" method="post">
			<v-text-field v-model="title" :counter="255" required label="Name">
			</v-text-field>
			<v-text-field v-model="description" label="description" required :counter="255"> </v-text-field>
			<v-select :items="items_categorie" v-model="categorie" label="Catégorie"></v-select>
			<v-btn type="submit" class="mr-4 center">
				Enregistrer
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'  
export default {
	name: "new_merchandise",
	data: () => ({
		title: '',
		description: '',
		categorie: '',
		items_categorie: ['Voitures', 'Matelas', 'Vetements', 'Autres'],
	}),
	methods: {
		async submit_merchandise() {
			try {
				const formData = new FormData()
				formData.append('title', this.title)
				formData.append('description', this.description)
				formData.append('categorie', this.categorie)
				const response = await axios.post('/merchandise/create', formData)
				alert('Bien ' + this.title + ' ajouté avec succès')
			} catch (e) {
				alert(e)
			}
		},
	},
}
</script>