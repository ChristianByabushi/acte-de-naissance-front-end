<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Marchandises</h3>
		</v-subheader>
		<v-alert dense type="info" color="#757575">
			Cette partie contient toutes fonctions sur les affaires d'achat, de ravitaillement des marchandises
		</v-alert>
		<v-row>
			<v-col lg="12" cols="12">
				<v-row>
					<v-row v-if="editStockItem">
						<v-col class="mt-10" cols="12">
							<v-card>
								<edit_stock_item :info_stock_item="infoStockMerchandise"
									:prop_merchandises="merchandises"
									@event-setting-hide-edit-stock-form="setEditStockItem">
								</edit_stock_item>
							</v-card>
						</v-col>
					</v-row>
					<v-col cols="2">
						<v-btn color="#ffff" @click="addNewStockItem = !addNewStockItem; get_stock_merchandise()">
							<span v-if="addNewStockItem">Liste des stocks</span>
							<span v-else>Ravitailler Stock</span>
						</v-btn>
					</v-col>
					<v-row>
						<v-card elevation="2" class="rounded-lg ml-4 mb-10">
							<v-card-title>Stock</v-card-title>
							<v-card-text class>
								<new_stock v-if="addNewStockItem" :prop_merchandises="merchandises"></new_stock>
								<v-data-table v-else :headers="header_stocks" :items="stock_merchandises"
									:items-per-page="5" class="elevation-1">
									<template v-slot:item.actions="{ item }"
										class="d-flex justify-space-between align-center">
										<v-icon small color="purple" @click="edit_stock_merchandise_Item(item)">
											mdi-pencil
										</v-icon>
										<v-icon small class="mr-2" @click.stop="deleteMerchandiseStockItem(item)"
											color="red">
											mdi-delete
										</v-icon>
									</template>
								</v-data-table>
							</v-card-text>
						</v-card>
					</v-row>
				</v-row>
			</v-col>
			<v-col lg="12" cols="12">
				<v-row>
					<v-row v-if="editNewMerchandise">
						<v-col class="mt-10" cols="12">
							<v-card>
								<edit_merchandise :info_merchandise="infoMerchandise"
									@event-setting-hide-edit-merch-form="setEditNewMerchandise">
								</edit_merchandise>
							</v-card>
						</v-col>
					</v-row>
					<v-col cols="2">
						<v-btn color="#ffff" @click="addNewMerchandise=!addNewMerchandise; get_merchandise()">
							<span v-if="addNewMerchandise">Liste des biens</span>
							<span v-else>Ajouter bien</span>
						</v-btn>
					</v-col>
					<v-card elevation="2" class="rounded-lg ml-2">
						<v-card-title>Biens</v-card-title>
						<v-card-text>
							<new_merchandise v-if="addNewMerchandise"></new_merchandise>
							<v-data-table v-else :headers="header_merchandises" :items="merchandises"
								:items-per-page="5" class="elevation-1">
								<template v-slot:item.actions="{ item }"
									class="d-flex justify-space-between align-center">
									<v-icon small color="purple" @click="{edit_merchandise_Item(item)}">mdi-pencil
									</v-icon>
									<v-icon small color="red" @click="{deleteMerchandiseItem(item)}">
										mdi-delete
									</v-icon>
								</template>

							</v-data-table>
						</v-card-text>
					</v-card>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import new_merchandise from '@/views/merchandise/new_merchandise.vue'
import new_stock from '@/views/merchandise/new_stock.vue'
import edit_merchandise from '@/views/merchandise/edit_merchandise.vue'
import edit_stock_item from '@/views/merchandise/edit_stock_item.vue'
import axios from 'axios'

export default {
	name: "Dashboard",
	components: {
		new_merchandise,
		new_stock,
		edit_merchandise,
		edit_stock_item
	},
	data: () => ({
		dialog: false,
		addNewMerchandise: false,
		addNewStockItem: false,
		editNewMerchandise: false,
		editStockItem: false,
		infoMerchandise: '',
		infoStockMerchandise: '',
		header_merchandises: [
			{
				text: 'id',
				align: 'start',
				sortable: true,
				value: 'id',
			},
			{ text: 'Libéllé', value: 'title' },
			{ text: 'Categorie', value: 'categorie' },
			{ text: 'Description', value: 'description' },
			{ text: 'Date', value: 'created_at' },
			{ text: 'action', value: 'actions' },
		],
		merchandises: [],
		stock_merchandises: [],
		header_stocks: [
			{
				text: 'id_stock',
				align: 'start',
				sortable: true,
				value: 'id_stock',
			},
			{ text: 'Bien', value: 'title' },
			{ text: 'Pu', value: 'pu_by' },
			{ text: 'Qté', value: 'amount_by' },
			{ text: 'Reduction', value: 'decrease' },
			{ text: 'Prix Total', value: 'total_price' },
			{ text: 'Date Enreg', value: 'created_at' },
			{ text: 'fournisseur', value: 'saler' },
			{ text: 'actions', value: 'actions' },
		],
	}),
	methods: {
		async get_merchandise() {
			try {
				const response = await axios.post('merchandise/')
				this.merchandises = response.data
			} catch (e) {
				alert(e)
			}
		},
		async get_stock_merchandise() {
			try {
				const response = await axios.post('stock_merchandise/')
				this.stock_merchandises = response.data
			} catch (e) {
				alert(e)
			}
		},
		async deleteMerchandiseItem(info) {
			try {
				if (confirm("Voulez vous supprimer l'item " + info.id)) {
					const response = await axios.post('merchandise/delete/' + info.id)
					this.get_merchandise()
					alert("Suppression réussie")
				}
			} catch (e) {
				alert("Il y a une erreur. Il est imposible de supprimer un bien présent en stock!")
			}
		},
		async deleteMerchandiseStockItem(info) {
			try {
				if (confirm("Voulez vous supprimer l'enregistrement de l'achat " + info.id_stock)) {
					const response = await axios.post('stock_merchandise/delete/' + info.id_stock)
					this.get_stock_merchandise()
					alert("Suppression réussie")
				}
			} catch (e) {
				alert("Il y a une erreur est survenue!")
			}
		},
		edit_merchandise_Item(info) {
			this.infoMerchandise = info
			this.editNewMerchandise = !this.editNewMerchandise
		}, edit_stock_merchandise_Item(info) {
			this.infoStockMerchandise = info
			this.editStockItem = !this.editStockItem
		},

		setEditNewMerchandise(payload) {
			this.editNewMerchandise = payload.editNewMerchandise
			this.get_merchandise()
		},
		setEditStockItem(payload) {
			this.editStockItem = payload.editStockItem
			this.get_stock_merchandise()
		},
	},
	created() {
		this.get_merchandise();
		this.get_stock_merchandise()
	}

}
</script>
