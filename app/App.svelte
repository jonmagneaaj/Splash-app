<script>
    const atStart = () =>{
		alert({
	        title: "Viktig!",
	        message: "Drikk med omhu! Det er ditt/deres ansvar å ta vare på hverandre, og passe på at dere ikke drikker for mye! ",
			okButtonText: "Jeg forstår"
            }).then(() => {
		  
		  console.log("Alert")})
	}
	atStart()

	//import screens
    import Spillere from './screens/Spillere.svelte'
	import Spill from './screens/Spill.svelte'

	let selectedTab = 0
	let active = false

</script>

<page actionBarHidden={true} class='greyb'>
   	<tabs bind:selectedIndex={selectedTab} tabsPosition='bottom' >
		<tabStrip class='center greyb'>
			<tabStripItem>
				<label text="Spillere" class='h2 white one whiteb' highlightColor='white'/>
			</tabStripItem>
			<tabStripItem class:active>
				<label text="Spill" class='h2 white two whiteb' highlightColor='white'/>
			</tabStripItem>
		</tabStrip>

		<tabContentItem class='greyb'>
				<Spillere bind:selectedTab={selectedTab} />
		</tabContentItem>

		<tabContentItem class='greyb'>
				<Spill/>
		</tabContentItem>
	</tabs>
</page>

<style>
	TabStrip {
		font-size: 20;
		color: white;
	}	

	TabStripItem {
		highlight-color: white;
		font-size: bold;
	}	
</style>
