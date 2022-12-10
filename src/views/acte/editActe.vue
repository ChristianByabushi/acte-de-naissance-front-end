<template>
	<div>
		<h5>Editer un acte de naissance</h5>
		<form @submit.prevent="editMethod()" method="post">
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="idActe" label="idActe" disabled required :counter="255"> </v-text-field>
					<v-text-field v-model="nom" label="Nom" required :counter="255"> </v-text-field>
					<v-text-field v-model="postnom" label="Postnom" required :counter="255"> </v-text-field>
					<v-text-field v-model="prenom" label="Prenom" required :counter="255"> </v-text-field>
				</v-col>
				<v-col lg="6" cols="12">
					<v-select name="" v-model="sexe" :items="itemsSexe" item-text="title" label="Genre"
						item-value="scope">
					</v-select>
					<v-text-field v-model="dateNaissance" type="date" label="Date de Naissance" required :counter="255">
					</v-text-field>
					<v-text-field v-model="lieuNaissance" label="Lieu de Naissance" required :counter="255">
					</v-text-field>
					<v-text-field v-model="nomPere" label="Nom du père" required :counter="255">
					</v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col lg="6" cols="12">
					<v-text-field v-model="nomMere" label="Nom de la Mère" required :counter="255">
					</v-text-field>
				</v-col>
				<v-col lg="6">
					<v-text-field v-model="province" label="Province" required :counter="255">
					</v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col md="6" cols="12">
					<v-text-field v-model="ville" label="ville" required :counter="255">
					</v-text-field>
					<v-text-field v-model="origine" label="Origine" required :counter="255">
					</v-text-field>

					<v-text-field v-model="avenue" label="Avenue" required :counter="255">
					</v-text-field>
					<v-text-field v-model="numero" type="number" label="Numero" required :counter="255">
					</v-text-field>
				</v-col>
				<v-col md="6" cols="12">
					<v-text-field v-model="nationalite" label="Nationnalité" required :counter="255">
					</v-text-field>
					<v-text-field v-model="commune" label="Commune" required :counter="255">
					</v-text-field>
					<v-text-field v-model="territoire" label="Territoire" required :counter="255">
					</v-text-field>
					<v-text-field v-model="quartier" label="quartier" required :counter="255">
					</v-text-field>
					<v-select name="" v-model="idDeclarant" :items="itemsDeclarant" item-text="firstname"
						label="Declarant" item-value="idDeclarant">
					</v-select>
				</v-col>
			</v-row>
			<v-alert :type="typeAlert" v-if="msgAlert" class="mb-4">
				{{ msgAlert }}
			</v-alert>
			<v-btn type="submit" color="blue" class="mr-4 mt-4 center">
				Editer
			</v-btn>
		</form>
	</div>
</template>
<script>
import axios from 'axios' 
import router from '@/router';
export default {
	name: "editActe",
	data: () => ({
		idActe: "",
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		dateNaissance: "",
		lieuNaissance: "",
		nationalite: "",
		nomPere: "",
		nomMere: "",
		province: "",
		ville: "",
		origine: "",
		commune: "",
		territoire: "",
		quartier: "",
		avenue: "",
		numero: "",
		dateEnregistrement: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
		idDeclarant: "",
		idUser: '',
		itemsSexe: [
			{
				scope: 'masculin',
				title: 'Masculin'
			},
			{
				scope: 'feminin',
				title: 'Féminin'
			},

		],
		msgAlert: '',
		itemsDeclarant: []
	}),
	methods: {
		changetypefonction() {
			this.typeAlert = ''
			this.msgAlert = ''
		},
		initializeFields() {
			this.nom = "";
			this.postnom = "";
			this.prenom = "";
			this.sexe = "";
			this.dateNaissance = "";
			this.lieuNaissance = "";
			this.nationalite = "";
			this.nomPere = "";
			this.nomMere = "";
			this.province = "";
			this.ville = "";
			this.origine = "";
			this.commune = "";
			this.territoire = "";
			this.quartier = "";
			this.avenue = "";
			this.numero = "";
			this.dateEnregistrement = "";
			this.idDeclarant = "";
		},
		async editMethod() {
			this.changetypefonction()
			if ((this.nom == '') || (this.postnom == '')) {
				this.typeAlert = "error"
				this.msgAlert = "Rassurez d'avoir entré tous les identités (le nom et le post-nom) !"
				return
			}
			if (this.idDeclarant == '') {
				this.typeAlert = "error"
				this.msgAlert = "Vous devez definir le déclarant de cet acte de naissance"
				return
			}
			if (this.quartier == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez taper le quartier svp!"
				return
			}
			if (this.ville == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez entrer une ville svp!"
			}
			if (this.avenue == '') {
				this.typeAlert = "error"
				this.msgAlert = "Veuillez definir l'avenue!"
				return
			}
			try {
				const formData = new FormData()
				formData.append('nom', this.nom)
				formData.append('postnom', this.postnom)
				formData.append('prenom', this.prenom)
				formData.append('sexe', this.sexe)
				formData.append('dateNaissance', this.dateNaissance)
				formData.append('lieuNaissance', this.lieuNaissance)
				formData.append('nomPere', this.nomPere)
				formData.append('nomMere', this.nomMere)
				formData.append('province', this.province)
				formData.append('ville', this.ville)
				formData.append('origine', this.origine)
				formData.append('avenue', this.avenue)
				formData.append('commune', this.commune)
				formData.append('nationalite', this.nationalite)
				formData.append('quartier', this.quartier)
				formData.append('numero', this.numero)
				formData.append('territoire', this.territoire)
				formData.append('commune', this.commune)
				formData.append('idDeclarant', this.idDeclarant)
				formData.append('idActe', this.idActe)
				formData.append('dateEnregistrement', this.dateEnregistrement + this.getCurrentTime())
				const response = await axios.post('actenaissance/editActe/' + this.idActe, formData)
				if ((response.data.errorstate) == true) {
					this.typeAlert = 'error'
					this.msgAlert = response.data.error
					console.log(response.data.error)
					return
				}
				this.msgAlert = 'Acte de naissance edité avec succés'
				this.typeAlert = 'success'
				this.initializeFields()

			} catch (e) {
			}
		},
		async getAllDeclarant() {
			try {
				const response = await axios.post("user/getDeclarant")
				this.itemsDeclarant = response.data
			} catch (e) {
				console.log(e)
			}
		},
		async getInfoActe() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				const response = await axios.post('actenaissance/getActeInfo/' + paramId)
				this.nom = response.data.nom;
				this.postnom = response.data.postnom;
				this.prenom = response.data.prenom;
				this.sexe = response.data.sexe;
				this.dateNaissance = response.data.dateNaissance;
				this.lieuNaissance = response.data.lieuNaissance;
				this.nationalite = response.data.nationalite;
				this.nomPere = response.data.nomPere;
				this.nomMere = response.data.nomMere;
				this.province = response.data.province;
				this.ville = response.data.ville;
				this.origine = response.data.origine;
				this.commune = response.data.commune;
				this.territoire = response.data.territoire;
				this.quartier = response.data.quartier;
				this.avenue = response.data.avenue;
				this.numero = response.data.numero;
				this.dateEnregistrement = response.data.dateEnregistrement;
				this.idDeclarant = response.data.idDeclarant 
				this.idActe = paramId
			}
		},
		getCurrentTime() {
			const dateObj = new Date();
			const currentDate = ":" + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
			return currentDate
		},
	},
	beforeMount() {
		this.getAllDeclarant() 
		this.getInfoActe()
	}
}
</script>

<style>
h5 {
	color: rgb(70, 64, 64);
}
</style>