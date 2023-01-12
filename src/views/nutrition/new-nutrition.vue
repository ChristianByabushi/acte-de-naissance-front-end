<template>
	<div>
		<h5>Suivi d'un enfant</h5>
		<form @submit.prevent="addMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-select v-model="idEnfant" :items="itemsEnfants" item-text="nom" label="Choisir l'enfant"
						item-value="idEnfant">
					</v-select>
					<v-text-field v-model="nbreFoisManger" type="number"
						label="Nombre des fois que l'enfant mange par jour" required> </v-text-field>
					<v-col lg="6" cols="12">

					</v-col>
					<textarea name="" v-model="medicament" placeholder="Médicaments à prendre et traitement relatifs" id="textAreaMedicament"
						cols="30" rows="3"></textarea>

				</v-col>
				<v-col lg="6" cols="12">
					<v-text-field v-model="dateEnregistrement" type="date" label="DateEnregistrement" required>
					</v-text-field>
					<v-text-field v-model="taille" type="number" step=0.01 label="Taille" required>
					</v-text-field>
					<v-text-field v-model="poids" type="number" step=0.01 label="Poids" required> </v-text-field>

				</v-col>

			</v-row>

			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" color="dense" class="mr-4 mt-4 center">
				Enregistrer Cas
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	name: "newnutrition",
	data: () => ({
		idEnfant: "",
		taille: "",
		poids: "",
		nbreFoisManger: "",
		medicament: "",
		itemsEnfants: [],
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		msgAlert: '',
		itemsDeclarant: []
	}),
	mounted() {
		this.$store.dispatch('getInfoUser')
		this.idAgent = this.userInfo.id
	},
	computed: mapState([
		'userInfo'
	]),
	beforeMount() {
		this.getAllEnfants()
	},
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.taille = "";
			this.poids = "";
			this.nbreFoisManger = "";
			this.medicament = "";
			this.idEnfant = "";
			this.dateEnregistrement = ""
			
		},
		async getAllEnfants() {
			try {
				const response = await axios.post("enfant/getallenfants")
				this.itemsEnfants = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async addMethod() {
			this.changetypefonction()
			if ((this.taille < 0) || (this.poids < 0) || (this.age < 0)) {
				this.typeAlert = "error"
				this.msgAlert = "Les caracteristiques numériques ne doivent pas etre nulles"
				return
			}

			try {
				const dateObj = new Date();
				const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
				const formData = new FormData()

				formData.append('taille', this.taille)
				formData.append('poids', this.poids)
				formData.append('medicament', this.medicament)
				formData.append('prenom', this.prenom)
				formData.append('idAgent', this.idAgent)
				formData.append('nbreFoisManger', this.nbreFoisManger)
				formData.append('idEnfant', this.idEnfant)
				formData.append('dateEnregistrement', this.dateEnregistrement + currentDate)

				const response = await axios.post('nutrition/addCaracteristics', formData)

				if ((response.data.errorstate) == true) {
					console.log(2)
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Enfant enregistré avec succés'
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},

		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},

}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}

#textAreaMedicament {
	border-radius: 5px;
	width: 100%;
	box-sizing: border-box;
	border: 1px solid rgb(151, 135, 135);
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
}
</style>