<template>
	<div>
		<v-form @submit.prevent="editInfoMerchandise()">
			<v-container>
				<h4>Edit item <small>{{id}}</small> </h4>
				<v-row>
					<v-text-field cols="12" md="4" v-model="title" :counter="255" required label="Libellé">{{title}}
					</v-text-field>
					<v-text-field v-model="description" label="description" required :counter="255">
						{{description}}
					</v-text-field>
					<v-select :items="items_categorie" v-model="categorie" label="Catégorie"></v-select>
					<v-row>
						<v-col>
							<v-btn type="submit"
								class="d-flex justify-start">
								Edit
							</v-btn>
						</v-col>
						<v-col class="mb-2">
							<v-btn class="d-flex justify-end" @click="emitForHideEditForm()">
								Annuler
							</v-btn>
						</v-col>
					</v-row>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: "edit_merchandise",
	props: ["info_merchandise"],
	data() {
		return {
			dialog: false,
			id: "",
			title: '',
			description: '',
			categorie: '',
			items_categorie: ['Matelas', 'Matériels', 'Consommation Directe', 'Meubles', 'Vetements', 'Documents'],
		}
	}, mounted() {
		this.title = this.info_merchandise.title
		this.id = this.info_merchandise.id
		this.description = this.info_merchandise.description
		this.categorie = this.info_merchandise.categorie
	},
	methods: {
		emitForHideEditForm() {
			this.$emit('event-setting-hide-edit-merch-form', { editStockItem: false })
		},
		async editInfoMerchandise() {
			try {
				const formData = new FormData()
				formData.append('title', this.title)
				formData.append('description', this.description)
				formData.append('categorie', this.categorie)
				const response = await axios.post('merchandise/edit/' + this.id, formData)
				alert('Bien ' + response.data.title + ' edité avec succès') 
				this.emitForHideEditForm()
			} catch (e) {
				alert(e)
			}
		},
	}
}
</script>


