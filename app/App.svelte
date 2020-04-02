<script>
//first: tns plugin add @nstudio/nativescript-cardview

import { registerNativeViewElement } from 'svelte-native/dom'
 
registerNativeViewElement("cardView", () => 
    require("@nstudio/nativescript-cardview").CardView
)

    import Page1 from './screens/Page1.svelte'
    import Page2 from './screens/Page2.svelte'

    let selectedTab = 0

</script>

<page actionBarHidden={true} class='purple'>
   	<tabs bind:selectedIndex={selectedTab} tabsPosition='bottom'>
		<tabStrip class='purple white center'>
			<tabStripItem>
				<label text="Players" />
			</tabStripItem>
			<tabStripItem>
				<label text="Games" />
			</tabStripItem>
		</tabStrip>

		<tabContentItem>
				<Page1 bind:selectedTab={selectedTab}/>
		</tabContentItem>

		<tabContentItem>
				<Page2/>
		</tabContentItem>
	</tabs>
</page>

<style>
    .purple{
        background-color: purple;
    }
	.white{
		color: white;
		font-weight: bold;
	}
	.center{
		display: flex;
		justify-content: center;
	}
</style>
