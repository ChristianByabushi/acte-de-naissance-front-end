<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Analyses</h3>
		</v-subheader>

		<v-alert dense type="info" color="#757575">
			Cette partie contient les fonctionnalités sur l'analyse du déroulement des activités et des résulats sur les
			stocks et les vantes
		</v-alert>


		<v-card>
			<v-card-title style="display : inline">
				Mouvement des stocks des biens
			</v-card-title>
			<v-row class="ml-5">
				<v-col cols="5" sm="3">
					<v-select :items="merchandises" item-text="title" @change="getAllInvoices()" v-model="itemSelected"
						item-value="id" label="Item à considérer">
					</v-select>

				</v-col>
				<v-col cols="6" sm="4">
					<v-text-field v-model="created_at" type="date" @change="getAllInvoices()"
						label="Date à partir de laquelle commencer">
					</v-text-field>
				</v-col>
				<v-col class="mt-3" cols="6" sm="4" @click="actualiser">
					<v-btn append-icon="">
						<v-icon>
							mdi-refresh
						</v-icon>Actualiser
					</v-btn>
				</v-col>
			</v-row>

			<div id="element-print-invoices">
				<v-card-title v-if="printDisplay=true">
					<v-row>
						<v-col>
							<div style="display: inline">
								<h4>Sté HumanATM</h4>
								<h6 id="dateReport">Date : {{created_at}}</h6>
							</div>
						</v-col> 
						
					</v-row>
				</v-card-title>

				<v-card-text>
					<v-data-table :headers="header_invoices" :items="list_invoices" :items-per-page="7"
						class="elevation-1">
					</v-data-table>

					<v-card class="mt-4">
						<v-card-text style=" display: inline-block;">
							<div>
								<h5 class="font-weight-bold">Calcul du résultat</h5>
							</div>
							<div>
								<h6 class="font-weight-bold">Prix total Achat : {{resultatInvoices.price_by}} </h6>
							</div>
							<div>
								<h6 class="font-weight-bold">Prix total Vente : {{resultatInvoices.price_sale}} </h6>
							</div>
							<div>
								<h6 class="font-weight-bold">Résultat : {{resultatInvoices.result}}</h6>
							</div>
						</v-card-text>
					</v-card>
				</v-card-text>
			</div>
		</v-card>
		<v-btn class="mt-4" color="error" @click="printDisplay=true;printEtatInvoices() ">
			<v-icon>mdi-printer</v-icon> Imprimer
		</v-btn>
	</div>
</template>
<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
export default {
	name: "analysis",
	data: () => ({
		header_invoices: [
			{ text: 'Facture Idop', value: 'id_line' },
			{ text: 'Date de Vente', value: 'created_at' },
			{ text: 'Item', value: 'title' },
			{ text: 'PUA', value: 'pu_by' },
			{ text: 'PUV', value: 'pu_sale' },
			{ text: 'Qte Vendue', value: 'amount_sale' },
			{ text: 'Prix Achat Total', value: 'price_by' },
			{ text: 'Prix Vente Total', value: 'price_sale' },
			{ text: 'Résultat', value: 'result' },
		],
		list_invoices: [],
		created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
		itemSelected: '',
		merchandises: [],
		resultatInvoices: [],
		printDisplay: false
	}),
	methods: {
		async printEtatInvoices() {
			html2pdf(document.getElementById("element-print-invoices"), {
				margin: 2,
				filename: "Rapport stock du" + this.created_at,
				jsPDF: {
					format: 'a4',
					orientation: 'portrait'
				},
			});
			this.printDisplay = false
		},
		async getAllInvoices() {
			try {
				const formData = new FormData()
				formData.append("created_at", this.created_at)
				formData.append("itemSelected", this.itemSelected)
				const response = await axios.post('/lineInvoice/getResultInvoices', formData)
				this.list_invoices = response.data[0]
				this.resultatInvoices = response.data[1]
			} catch (e) {
				console.log(e)
			}
		},
		async get_stock_merchandise() {
			try {
				const response = await axios.post('/humanapp/public/merchandise/')
				this.merchandises = response.data
			} catch (e) {
				alert(e)
			}
		},
		actualiser() {
			this.created_at = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
			this.itemSelected = ''
			this.resultatInvoices
			this.getAllInvoices()
		}
	},
	created() {
		this.getAllInvoices()
		this.get_stock_merchandise()
	}

}
</script> 
<style scoped>
#element-print-invoices {
	background-image: url('@/assets/atmlogo.jpg'); 
	background-size: 200px 90px; 	
}
#dateReport{
}
</style>
