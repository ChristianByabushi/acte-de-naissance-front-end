<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Facture et ventes</h3>
		</v-subheader>
		<v-alert dense type="info" color="indigo">
			Cette partie du HumanApp porte sur les fonctionnalités liées à la gestion des factures et vente
		</v-alert>
		<v-card>
			<v-card-title class="d-flex-inline">
				<v-row>
					<h5>Société, Human Atm, Facturation</h5>
				</v-row>
			</v-card-title>
		</v-card>
		<v-container>
			<v-row>
				<v-col cols="5" sm="3">
					<v-select :items="stock_merchandises" @change="verifyAmount();seek_amount_and_price_stock()"
						item-text="title" v-model="id_stock" item-value="id_stock" label="Item">
					</v-select>
				</v-col>
				<v-col>
					<v-text-field v-model="pu_sale" type="number" step="any" label="Pu" required>
					</v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="amount_sale" type="number" step="any" label="Qté" required>
					</v-text-field>
				</v-col>
				<v-col cols="2" sm="4">
					<v-alert color="blue-grey" dark> Prix total: {{Number(amount_sale*pu_sale).toFixed(4)}}
					</v-alert>
				</v-col>
				<v-col cols="12" sm="6" class="d-flex" v-if="pu_by">
					<v-alert color="dense" type="info">Le pua de ce bien était de {{pu_by}} $ et il restait
						{{amount_by}} unités </v-alert>
				</v-col>
				<v-col cols="12" sm="6">
					<v-btn @click="verifyAmount(); submitNewItemInvoice()" class="mb-1">
						<span v-if="indexEdit!='add'">Editer</span>
						<span v-else>Ajouter</span>
					</v-btn>
				</v-col>
			</v-row>

			<v-form method="post" class="mb-10">
				<div>
					<v-simple-table>
						<thead>
							<tr>
								<th class="text-left">
									IdStock
								</th>
								<th class="text-left">
									Marchandise
								</th>
								<th class="text-left">
									Pu
								</th>
								<th class="text-left">
									Qté
								</th>
								<th class="text-left">
									Prix Total
								</th>
								<th class="text-left">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>

							<tr v-for="(item, index) in listOfitemInvoices" :key="item.id_stock">
								<td>{{ item.id_stock }}</td>
								<td>{{ item.title }}</td>
								<td>{{ item.pu_sale }}</td>
								<td>{{ item.amount_sale }}</td>
								<td>{{ Number(item.pu_sale*item.amount_sale).toFixed(3) }}</td>
								<td>
									<v-icon small color="purple" @click="editItemInvoice(index)">mdi-pencil
									</v-icon>
									<v-icon small color="red" @click="deleteItemInvoice(index)">
										mdi-delete
									</v-icon>
								</td>
							</tr>
						</tbody>
					</v-simple-table>
				</div>
				<v-row class="mt-4">
					<v-col cols="12" sm="6">
						<v-text-field v-model="client" type="text" label="Client" required>
						</v-text-field>
						<div v-if="getNumberInvoices()>0">
							<v-text-field v-model="created_at" type="date" label="Date de Vente" value="created_at"
								required>
								{{created_at}}
							</v-text-field>
							<v-text-field v-model="decrease" type="number" step="any" label="Reduction sur facture">
							</v-text-field>
							<v-alert color="indigo" dark v-if="listOfitemInvoices">
								Prix total net à payer : {{getTotalPriceAmount()}}
							</v-alert>
						</div>
					</v-col>
				</v-row>
				<v-btn v-if="printInvoice" @click.stop="exportToPDF()" class="d-flex mt-10">
					Print
				</v-btn>
				<v-btn class="d-flex mt-10" @click.stop="create_new_line_invoice();">
					Enregistrer
				</v-btn>
			</v-form>
			<resultInvoice :key="resultInvoiceKey"></resultInvoice>

		</v-container>
	</div>
</template> 
<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
import resultInvoice from "@/views/invoices/resultInvoice.vue"
export default {
	name: "Invoice",
	components: {
		resultInvoice
	},
	data: () => ({
		indexEdit: 'add',
		resultInvoiceKey: false,
		printInvoice: null,
		editOradd: null,
		created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		client: '',
		title: '',
		decrease: '',
		pu_sale: '',
		amount_sale: '',
		id_stock: '',
		stock_merchandises: [],
		pu_by: '',
		amount_by: '',
		listOfitemInvoices: [],
		lastIdLine: '',
		invoicesRequests: [],
		desserts: [
			{
				name: 'Frozen Yogurt',
				calories: 159,
			}
		],
	}),

	methods: {
		getNumberInvoices() {
			return this.listOfitemInvoices.length
		},

		getTotalPriceAmount() {
			let totalNetPrice = 0
			this.listOfitemInvoices.forEach(element => {
				totalNetPrice += element.amount_sale * element.pu_sale
			});
			totalNetPrice = Number(totalNetPrice - this.decrease).toFixed(3)
			return totalNetPrice
		},

		submitNewItemInvoice() {
			if (this.id_stock == '' || this.pu_sale == '' || this.amount_sale == '') {
				alert('Veuillez completer tous les éléments du formulaire')
				return
			}

			//verify if the amount convey
			if (Math.abs(this.amount_by) < Math.abs(this.amount_sale)) {
				alert('Quantité en stock non suffisante pour effectuer cette opération !')
				return
			}

			//case of edit now
			if (this.indexEdit != 'add') {
				this.listOfitemInvoices[this.indexEdit].pu_sale = Math.abs(this.pu_sale);
				this.listOfitemInvoices[this.indexEdit].amount_sale = Math.abs(this.amount_sale);
				this.listOfitemInvoices[this.indexEdit].id_stock = Math.abs(this.id_stock);
			}

			//case of add 
			else {

				//case of item exesting already on the invoice
				var verifyIfItemExistAlready = false
				this.listOfitemInvoices.forEach(element => {
					if (element.id_stock == this.id_stock) {
						verifyIfItemExistAlready = true
						alert("Au lieu d'insérer le meme item veuillez éditer celui qui est déjà présent sur la facture")
					}
				});
				if (verifyIfItemExistAlready == true) {
					return;
				}
				//case of all works funny
				this.listOfitemInvoices.push({
					id_stock: this.id_stock,
					title: this.title,
					pu_sale: Math.abs(this.pu_sale),
					amount_sale: Math.abs(this.amount_sale),
				})
				//to make difference with edit task
			}
			//initiation
			this.title = ''
			this.pu_sale = ''
			this.amount_sale = ''
			this.id_stock = ''
			this.pu_by = ''
			this.indexEdit = 'add'
		},
		editItemInvoice(index) {
			this.title = this.listOfitemInvoices[index].title;
			this.pu_sale = this.listOfitemInvoices[index].pu_sale;
			this.amount_sale = this.listOfitemInvoices[index].amount_sale;
			this.id_stock = this.listOfitemInvoices[index].id_stock;
			this.indexEdit = index
		},
		deleteItemInvoice(index) {
			this.listOfitemInvoices.splice(index, 1);
			// if the item deleted is what we re editing we reinitiate the form!
			if (this.indexEdit == index) {
				this.title = ''
				this.pu_sale = ''
				this.amount_sale = ''
				this.id_stock = ''
				this.indexEdit = 'add'
				this.pu_by = ''
			}
		},
		seek_amount_and_price_stock() {
			this.stock_merchandises.forEach(element => {
				if (element.id_stock == this.id_stock) {
					this.pu_by = element.pu_by
					this.title = element.title
				}
			});
		},

		async get_stock_merchandise() {
			try {
				const response = await axios.post('stock_merchandise/')
				this.stock_merchandises = response.data
			} catch (e) {
				alert(e)
			}
		},
		async verifyAmount() {
			if (this.id_stock != '') {
				const response = await axios.post('invoice/verifyAmount/' + this.id_stock)
				this.amount_by = response.data
			}
		},
		async create_new_line_invoice() {
			if (this.client != '' && this.getNumberInvoices() > 0) {
				try {
					const form = new FormData()
					form.append('client', this.client)
					form.append('decrease', this.decrease)
					form.append('created_at', this.created_at + this.getCurrentTime())
					form.append('listOfitemInvoices', this.created_at + this.listOfitemInvoices)
					const response = await axios.post('lineInvoice/create', form)
					this.lastIdLine = response.data 
					this.async_create_each_invoice()
					alert("Facture enregistrée avec succès")

				} catch (e) {
					alert(e)
				}
			} else {
				alert("Veuiller d'abord compléter tous les champs requis pour une facture")
			}
		},
		async async_create_each_invoice() {
			const formData = new FormData()
			formData.append("listOfitemInvoices", JSON.stringify(this.listOfitemInvoices))
			try {
				const response = await axios.post('invoice/create', formData)
				this.listOfitemInvoices = []
				this.decrease = ''
				this.client = ''
				//we update the list of inlines displayed !
				this.resultInvoiceKey = !this.resultInvoiceKey
				console.log("Opération éffectuée avec succès ! ")
			} catch (e) {
				console.log(e)
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	created() {
		this.get_stock_merchandise()
	}
}
</script>

<style scoped>
thead {
	border: 2px solid rgb(220, 217, 217);
	border-collapse: collapse;
}

tbody {
	border-right: 1px solid rgb(221, 204, 204);
	border-left: 1px solid rgb(220, 217, 217);
	border-bottom: 2px solid rgb(220, 217, 217);
}
</style>