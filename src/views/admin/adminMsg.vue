<template>
	<div>
		<v-subheader class="d-flex justify-space-between align-center">
			<h3>Messages</h3>
		</v-subheader>
		<v-alert dense type="info" color="#757575">
			Cette partie contient toutes fonctions sur les statistiques des actes dans la commune de bagira
		</v-alert>
		<v-card>
			<v-card-title>Messages</v-card-title>
			<v-timeline dense>
				<v-timeline-item v-for="n in 2" :key="n">
					<span slot="opposite">Tus eu perfecto</span>
					<v-card class="elevation-2">
						<v-card-title class="text-h5">
							Lorem ipsum
						</v-card-title>
						<v-card-text>
							Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed
							euismod
							convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus,
							vix an
							salutandi sententiae.
						</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card>
	</div>
</template> 