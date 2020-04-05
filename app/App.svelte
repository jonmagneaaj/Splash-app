<script>
    import Page1 from './screens/Page1.svelte'
    import Page2 from './screens/Page2.svelte'

    let selectedTab = 0

</script>

<page actionBarHidden={true} class='purple'>
   	<tabs bind:selectedIndex={selectedTab} tabsPosition='bottom'>
		<tabStrip class='white center'>
			<tabStripItem >
				<label text="Spillere" highlightColor='white'/>
			</tabStripItem>
			<tabStripItem >
				<label text="Spill" highlightColor='white'/>
			</tabStripItem>
		</tabStrip>

		<tabContentItem class='yellow'>
				<Page1 bind:selectedTab={selectedTab} />
		</tabContentItem>

		<tabContentItem class='green'>
				<Page2/>
		</tabContentItem>
	</tabs>
</page>

<style>
	
	.white{
		color: white;
		font-weight: bold;
	}
	.center{
		display: flex;
		justify-content: center;
		background-color: transparent;
	}

	TabStripItem.tabstripitem-active:active {
    	font-weight: 800;
	} 

</style>
