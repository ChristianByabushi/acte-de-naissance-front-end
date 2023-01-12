<template>
	<v-app-bar absolute app elevation="4">
		<v-app-bar-nav-icon ></v-app-bar-nav-icon>
		<v-toolbar-title dense>Acte de Naissance</v-toolbar-title>
		<v-col lg="6" cols="5">
			<v-spacer></v-spacer>
			<v-form class="ml-14 mt-8">
				<v-text-field rounded outlined placeholder="Rechercher ici" append-icon="mdi-magnify" dense>
				</v-text-field>

			</v-form>
		</v-col>
		<v-spacer></v-spacer>
		<v-menu offset-y>
			<template v-slot:activator="{on, attrs}">
				<span v-bind="attrs" v-on="on" style="cursor:pointer" class="">
					<v-chip link>
						<v-badge dot bottom offset-y-x="10" color="inherit">
							<v-avatar size="40">
								<img src="@/assets/atmlogo.jpg" alt="error" />
							</v-avatar>
						</v-badge>
						<span>{{username}}</span>
					</v-chip>
				</span>
			</template>
			<v-list width="250" class="py-0">
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="@/assets/atmlogo.jpg" alt="error" />
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item v-for="(menu, index) in menus" :key="index" link :to="menu.link">
					<v-list-item-icon>
						<v-icon>{{menu.icon}}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							{{menu.title}}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>