<template>
	<div>
		<v-card  class=" mt-2 pt-2 pl-2" width="50%">
			<h5> {{ idActe }}</h5>
			<div style="display:inline">
				<h4> Nom : {{ nom }}</h4>
				<h4> postnom: {{ postnom }}</h4>
			</div>

			<h4> Sexe : {{ sexe }}</h4>
			<h4> LieuNaissance : {{ lieuNaissance }}</h4>
			<h4> nomPere : {{ nomPere }}</h4>
			<h4> Ville : {{ ville }}</h4>
			<h4> Origine : {{ origine }}</h4>
			<h4> Commune : {{ commune }}</h4>
			<h4> Territoire {{ territoire }}</h4>
			<h4> Quartier : {{ quartier }}</h4>
			<h4> Avenue :{{ avenue }}</h4>
			<h4> Numero : {{ numero }}</h4>
		</v-card>
	</div>
</template>
<script>
import router from '@/router';
import axios from 'axios'
export default {
	name: "showacte",
	data: () => ({
		idActe: '',
		nom: "",
		postnom: "",
		prenom: "",
		sexe: "",
		lieuNaissance: "",
		dateNaissance: "",
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
	}),
	methods: {
		async getActeInfo() {
			let paramId = router.currentRoute.params.id
			if (paramId != null) {
				try {
					const response = await axios.post("actenaissance/getActeInfo/" + paramId)
					this.idAct = response.data.idActe
					this.nom = response.data.nom
					this.postnom = response.data.postnom
					this.prenom = response.data.prenom
					this.sexe = response.data.sexe
					this.lieuNaissance = response.data.lieuNaissance
					this.dateNaissance = response.data.dateNaissance
					this.nationalite = response.data.nationalite
					this.nomPere = response.data.nomPere
					this.nomMere = response.data.nomMere
					this.province = response.data.province
					this.ville = response.data.ville
					this.origine = response.data.origine
					this.commune = response.data.commune
					this.territoire = response.data.territoire
					this.quartier = response.data.quartier
					this.avenue = response.data.avenue
					this.numero = response.data.numero
				} catch (e) {
					console.log(e)
				}
			}
		}
	},
	beforeMount() {
		this.getActeInfo()
	}
}

</script>