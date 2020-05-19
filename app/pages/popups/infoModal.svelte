<script>
    import { closeModal, navigate } from 'svelte-native'

    let hjelpere = ['Peder W.','Stine Marie V.','Kristina L.','Emma Elise L.','Christina R.','Iselin R.','Gløer L.','Simon M.']

</script>

<stackLayout class='main whiteb'>
    <gridLayout rows='20,30,60,60,*,50' class='box'>
        <stackLayout row='0'>
		</stackLayout>
        <!--Title-->
        <stackLayout row='1'>
            <label text='Informasjon' class='h1 center'/>
        </stackLayout>
        <!--Takk-->
        <stackLayout row='2'>
            <label text='Dette er et partyspill som ble laget som en avsluttende oppgave på et Front-end utviklings fag år. ' class='p grey center' textWrap='true' />
        </stackLayout>
        <!--small text-->
        <stackLayout row='3'>
            <label text='Men jeg hadde ikke klart det uten hjelp fra:' class='p grey center' textWrap='true' />
        </stackLayout>
        <!--Names of helpers-->
        <scrollView row='4'>
            <stackLayout>
                {#each hjelpere as hjelper}
                    <label text='{hjelper}' class='h3 grey center' />
                {/each}
        </scrollView>
        <stackLayout row='5'>
            <label text='Takk.' class='h3 grey center bold' textWrap='true' />
        </stackLayout>
    </gridLayout>
</stackLayout>

<style>
	.main{
		width: 300;
		height: 500;
		border-radius: 20;
    }

    .box{
		padding: 1;
		width: 250;
		margin: 0 auto;
    }
</style>