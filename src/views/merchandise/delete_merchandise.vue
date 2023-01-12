<template>
	<v-dialog v-model="dialog" persistent max-width="290">
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="primary" dark v-bind="attrs" v-on="on">
				Open Dialog
			</v-btn>
		</template>
		<v-card>
			<v-card-title class="text-h5">
				Suppression de l'item
			</v-card-title>
			<v-card-text>Voulez vous vraiment supprimer cet item ?.
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="dialog = false">
					Confirmer
				</v-btn>
				<v-btn color="green darken-1" text @click="dialog = false">
					Annuler
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>



</template>
<script>
export default {
	name: "deleteMerchandise",
	props: ['item']
}
</script>