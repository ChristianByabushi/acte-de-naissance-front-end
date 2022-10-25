<template>
		<v-alert dense type="info" color="error" >
			{{msg}}
        </v-alert>		

	

</template>
<script>
export default{
	props:['msg', 'activeClass'],
}

</script>