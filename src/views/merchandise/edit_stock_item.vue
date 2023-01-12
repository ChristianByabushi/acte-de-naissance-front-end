<template>
	<div>
		<v-container>
			<h4>Editer stock record <small>{{id_stock}}</small> </h4>
			<v-row>
				<v-form @submit.prevent="function_edit_stock_item()" method="post">
					<v-select :items="merchandises_title" v-model="title_merchandise" label="Bien à stocker"></v-select>
					<v-text-field v-model="created_at" type="date" label="Date" required> </v-text-field>
					<v-text-field v-model="pu_by" label="Prix unitaire ($)" required type="number"> </v-text-field>
					<v-text-field v-model="amount_by" type="number" step="any" label="Nbre d'unités"> </v-text-field>
					<v-text-field v-model="decrease" type="number" step="any" label="Reduction reçue lors de l'achat">
					</v-text-field>
					<v-select :items="items_salers" v-model="saler" label="Fournisseur" required></v-select>
					<v-alert dense type="info" color="#717175">
						Le prix total avec reduction incluse vaut {{Number(pu_by*amount_by-decrease).toFixed(3)}}
					</v-alert>

					<v-row>
						<v-col>
							<v-btn type="submit" @click="findIdMerchandise()" class="d-flex justify-start">
								Edit
							</v-btn>
						</v-col>
						<v-col class="mb-2">
							<v-btn class="d-flex justify-end" @click="emitForHideEditForm()">
								Annuler
							</v-btn>
						</v-col>
					</v-row>

				</v-form>

			</v-row>
		</v-container>
	</div>

</template>
<script>
import axios from 'axios'
export default {
	name: "edit_stock_item",
	props: ["info_stock_item", "prop_merchandises"],
	data() {
		return {
			title_merchandise: '',
			id_merchandise: '',
			id_stock: '',
			created_at: '',
			decrease: '',
			pu_by: '',
			saler: '',
			merchandises_id: [],
			merchandises_title: [],
			amount_by: '',
			items_salers: ['Bralima', 'Shalina', 'Dar-salem', 'Kivu Busness'],
		}
	},
	mounted() {
		this.created_at = this.info_stock_item.created_at
		this.title_merchandise = this.info_stock_item.title
		this.amount_by = this.info_stock_item.amount_by
		this.pu_by = this.info_stock_item.pu_by
		this.decrease = this.info_stock_item.decrease
		this.id_merchandise = this.info_stock_item.id_merchandise
		this.description = this.info_stock_item.description
		this.saler = this.info_stock_item.saler
		this.id_stock = this.info_stock_item.id_stock

		this.prop_merchandises.forEach(element => {
			this.merchandises_title.push(element.title)
		});
	},

	methods: { 
		async function_edit_stock_item() {
			try {
				if (this.id_merchandise != '') {
					const form = new FormData()
					form.append('id_merchandise', this.id_merchandise)
					form.append('pu_by', this.pu_by)
					form.append('decrease', this.decrease)
					form.append('amount_by', this.amount_by)
					form.append('created_at', this.created_at)
					form.append('saler', this.saler)
					form.append('id_stock', this.id_stock)
					const response = await axios.post('stock_merchandise/edit/' + this.id_stock, form)
					alert("Stockage de l'item " + this.id_stock + " édité avec succès") 
					this.emitForHideEditForm()
				} else {
					alert("Veuillez compléter le formulaire comme il se doit, surtout ne pas oublier de selectionner un bien!")
				}
			} catch (e) {
				alert(e)
			}
		},
		findIdMerchandise() {
			this.prop_merchandises.forEach(element => {
				if (element.title == this.title_merchandise) {
					this.id_merchandise = element.id
				}
			});
		}, 
		emitForHideEditForm() {
			this.$emit('event-setting-hide-edit-stock-form', { editStockItem: false })
		}
	}
}
</script>


