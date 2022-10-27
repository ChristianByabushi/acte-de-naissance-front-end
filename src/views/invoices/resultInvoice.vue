<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Résultats</h3>
		</v-subheader>

		<v-card>
			<v-card-title class="d-flex-inline">
				<v-row>
					<h6>All</h6>
				</v-row>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="header_lineinvoices" :items="listInlines" :items-per-page="5"
					class="elevation-1">
					<template v-slot:item.actions="{ item }" class="d-flex justify-space-between align-center">
						<v-icon small color="purple" @click="printInvoiceInline(item)">
							mdi-printer
						</v-icon>
						<v-icon small class="mr-2" @click.stop="deleteInvoiceInline(item)" color="red">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
		<v-card v-if="printLinePermit" class="mt-10">
			<div id="element-to-convert">
				<v-card-title>
					<v-row>
						<v-col>
							<div style="display: inline">
								<h4>Sté HumanATM</h4>
								<h4>Client : {{inlineInfo.client}}</h4>
								<h6>Date : {{inlineInfo.created_at}}</h6>
							</div>
						</v-col>
					</v-row>
				</v-card-title>
				<v-card-text>
					<v-simple-table>
						<thead>
							<tr>
								<th class="text-left">
									Title
								</th>
								<th class="text-left">
									P.U
								</th>
								<th class="text-left">
									Qté
								</th>
								<th class="text-left">
									Pt
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in listInvoicesPrint">
								<td>{{ item.title }}</td>
								<td>{{ item.pu_sale }}</td>
								<td>{{ item.amount_sale }}</td>
								<td>{{ Number(item.pt).toFixed(3) }}</td>
							</tr>
						</tbody>
					</v-simple-table>
					<div style="display: inline; text-align: right; margin-right:10px ; ">
						<h6 class="mt-10 font-weight-black">Total Brut: {{Number(computeTotalPriceTopay()).toFixed(3)}}$
						</h6>
						<h6 class="font-weight-black">Réduction : {{inlineInfo.decrease}}$</h6>
						<h6 class="font-weight-black">Prix total à payer : {{Number(computeTotalPriceTopay() -
						inlineInfo.decrease).toFixed(3)}}$
						</h6>
					</div>
				</v-card-text>
			</div>
			<v-btn color="error" class="mt-10" @click="printMethode()">imprimer</v-btn>
			<v-btn color="info" class="ml-10 mt-10" @click="printLinePermit = !printLinePermit">Annuler</v-btn>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";

export default {
	name: "resultInvoice",
	components: {

	},
	data: () => ({
		listInvoices: [],
		urlImage: "../assets/atmlogo.jpg",
		listInlines: [],
		printLinePermit: false,
		printinline: [],
		listInvoicesPrint: [],
		inlineInfo: [],
		header_lineinvoices: [
			{
				text: 'idOp',
				align: 'start',
				sortable: true,
				value: 'id_line',
			},
			{ text: 'Client', value: 'client' },
			{ text: 'Date', value: 'created_at' },
			{ text: 'Prix Total ', value: 'totalprice' },
			{ text: 'Reduction Accordée', value: 'decrease' },
			{ text: 'Net à payer', value: 'net_total_price' },
			{ text: 'actions', value: 'actions' },
		],

	}),
	methods: {
		computeTotalPriceTopay() {
			var r = 0;
			this.listInvoicesPrint.forEach(element => {
				r += element.pt
			});
			return r;
		},
		async printInvoiceInline(idlineinvoice) {
			try {
				const response = await axios.post('lineInvoice/getInvoiceInfo/' + idlineinvoice.id_line)
				this.listInvoicesPrint = response.data
				this.printinlineinfo(idlineinvoice.id_line)
			} catch (e) {
				console.log(e)
			}
		},
		async printinlineinfo(id_line) {
			try {
				const response = await axios.post('lineInvoice/getInlineInfo/' + id_line)
				this.inlineInfo = response.data
				console.log(this.inlineInfo) 
				this.printLinePermit = !this.printLinePermit
			} catch (e) {
				console.log(e)
			}
		},
		async printMethode() {
			html2pdf(document.getElementById("element-to-convert"), {
				margin: 5,
				filename: "facture -" + this.inlineInfo.client + "-" + this.inlineInfo.created_at,
				jsPDF: {
					format: 'a6',
					orientation: 'portrait'
				},
			}); 
			this.printLinePermit = !this.printLinePermit
		},
		async deleteInvoiceInline(idlineinvoice) {
			if (confirm("Voulez-vous supprimer cette facture de l'operation " + idlineinvoice.id_line + " ?")) {
				try {
					const response = await axios.post('/lineInvoice/deleteInvoice/' + idlineinvoice.id_line)
					this.listInvoices = response.data
					this.get_listInlines()
				} catch (e) {
					console.log(e)
				}
			}

		},
		async get_listInvoices() {
			try {
				const response = await axios.post('/humanapp/public/invoice/')
				this.listInvoices = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async get_listInlines() {
			try {
				const response = await axios.post('/humanapp/public/lineInvoice/')
				this.listInlines = response.data
			} catch (e) {
				console.log(e)
			}
		},
	},
	created() {
		this.get_listInvoices()
		this.get_listInlines()
	}

}
</script>

<style>
#element-to-convert {
	background-image: url('@/assets/atmlogo.jpg');
	background-size: 300px 300px;
}
</style>


