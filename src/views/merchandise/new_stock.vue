<template>
	<div>
		<form @submit.prevent="submit_stock()" method="post">
			<v-select :items="merchandises_title" v-model="title_merchandise" label="Bien à stocker"></v-select>
			<v-text-field v-model="description" label="Description" required :counter="255"> </v-text-field>
			<v-text-field v-model="date" type="date" label="Date" required> </v-text-field>
			<v-text-field v-model="pu_by" label="Prix unitaire ($)" required type="number"> </v-text-field>
			<v-text-field v-model="amount_by" type="number" label="Nbre d'unités"> </v-text-field>
			<v-text-field v-model="decrease" type="number" label="Reduction reçue lors de l'achat"> </v-text-field>
			<v-select :items="items_salers" v-model="saler" label="Fournisseur" required></v-select>
			<v-alert dense type="info" color="#717175">
				Le prix total avec reduction incluse vaut {{ pu_by*amount_by-decrease}}
			</v-alert>
			<v-btn type="submit" @click="findIdMerchandise()" class="mr-4 center">
				Enregistrer
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: "new_stock",
	props: ["prop_merchandises"],
	data: () => ({
		title_merchandise: '',
		id_merchandise: '',
		description: '',
		date: '',
		decrease: '',
		pu_by: '',
		saler: '',
		merchandises_id: [],
		merchandises_title: [],
		amount_by: '',
		items_salers: ['Dodoma', 'flexi', 'compfy', 'Kampala', 'Dubai', 'Japon', 'Toyota', 'Kenya'],

	}),
	mounted() {
		this.prop_merchandises.forEach(element => {
			this.merchandises_title.push(element.title)
		});
	},
	methods: {
		findIdMerchandise() {
			this.prop_merchandises.forEach(element => {
				if (element.title == this.title_merchandise) {
					this.id_merchandise = element.id
				}
			});
		},

		async submit_stock() {
			try {
				if (this.id_merchandise != '') {
					const formData = new FormData()
					formData.append('id_merchandise', this.id_merchandise)
					formData.append('pu_by', this.pu_by)
					formData.append('decrease', this.decrease)
					formData.append('amount_by', this.amount_by)
					formData.append('created_at', this.date)
					formData.append('description', this.description)
					formData.append('saler', this.saler) 
					const response = await axios.post('stock_merchandise/create', formData)
					alert(response.data.amount_by + " de " + this.title_merchandise + " achété(s) avec succès")
				} else {
					alert("Veuillez compléter le formulaire comme il se doit, surtout ne pas oublier de selectionner un bien!")
				}
			} catch (e) {
				alert(e)
			}
		}
	},
}
</script>