<template>
	<div>
		<h1 class="title"  >Product List</h1> 
		<img>
		<router-link :to="{ name: 'HomeView' }" class="button is-primary">Add New</router-link>
		<button @click="showModal = !showModal">Start</button>
		<div v-show="showModal" class="modal"> Je suis la</div>  
	</div>
</template>
 
<script>
import axios from "axios";

export default {
	name: "Product",
	data() {
		return {
			products: [],
			showModal: false
		};
	},
	created() {
		this.getProducts();
	},
	methods: {
		async getProducts() {
			try {
				const response = await axios.get("purchase_good_by/getListGoodby/2015");
				this.products = response.data;
				return this.products
			} catch (error) {
				console.log(error);
			}
		},
		async deleteProduct(id) {
			try {
				await axios.delete(`product/${id}`);
				this.getProducts();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
 
<style>
</style>