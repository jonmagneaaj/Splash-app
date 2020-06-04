<script>
    import { closeModal, navigate } from 'svelte-native'
    import FirestoreParser from 'firestore-parser'

    // gets firestore URL
    const baseUrl = 'https://firestore.googleapis.com/v1/'
    const gamesUrl = baseUrl + 'projects/gameapp-45001/databases/(default)/documents/reviews'
    let key = 'AIzaSyAUz4ZEOXz6VZxXtC7NKftPdgfx8iyRrnI'


    let tilbakemelding = ''
    let whatLike = ''

    //active like radio
	let dislike = false;
	let care = false;
	let like = false;

	const like1 = () =>{
		dislike = true;
		care = false;
		like = false;

		likeness();
	}

	const like2 = () =>{
		dislike = false;
		care = true;
		like = false;

		likeness();
	}

	const like3 = () =>{
		dislike = false;
		care = false;
		like = true;

		likeness();
    }
    
    const likeness = () => {
		if (dislike){
			whatLike = '1'
		}else if (care){
			whatLike = '2'
		}else if(like){
			whatLike = '3'
		}
    }
    
    // Sends feedback to firestore
    async function send() {
        console.log(' ###### adding review ##### ')
        const url = gamesUrl
        // Use fetch to request the API information
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //see all values here: https://cloud.google.com/firestore/docs/reference/rest/v1/Value
            body: JSON.stringify({
                fields: {
                    tilbakemelding: {
                        stringValue: tilbakemelding
                    },
                    created: {
                        timestampValue: new Date()
                    },
                    rating:{
                        stringValue: whatLike
                    }
                }
            })
        })
    closeModal();
    }



</script>

<stackLayout class='main whiteb'>
    <gridLayout rows='20,80,*,130,100' class='box'>
        <stackLayout row='0'>
		</stackLayout>
        <!--Title-->
        <stackLayout row='1'>
            <label text='Tilbakemelding:' class='h1 center'/>
        </stackLayout>
        <!--Input field-->
        <stackLayout row='2'>
            <textView 
                hint='Kom med tilbakemelding, skryt eller forslag til appen!' 
                bind:text={tilbakemelding} 
                color='Gray' 
                backgroundColor='white'
                textFieldHintColor='white'
                textFieldBackgroundColor='white'
                class='h3 big'
                />
        </stackLayout>
        <!--Like scale-->
        <gridLayout rows='60, 30, 30' row='3' class='center bold'>
				<label row='0' text='Gi en anmeldelse:' class='h2 grey'/>
				<gridLayout row='1' columns='*,*,*' class='center'>
					<!--like btn 1-->
					{#if dislike}
						<stackLayout class='radio-active' col='0'>
                            <image src='~/img/frown-solid.png' />
                        </stackLayout>
					{:else}
						<stackLayout class='radio' col='0' on:tap={like1}>
                            <image src='~/img/frown-regular.png' />
                        </stackLayout>
					{/if}
					<!--like btn 2-->
					{#if care}
						<stackLayout class='radio-active' col='1'>
                            <image src='~/img/meh-solid.png' />
                        </stackLayout>
					{:else}
						<stackLayout class='radio' col='1' on:tap={like2}>
                            <image src='~/img/meh-regular.png' />
                        </stackLayout>
					{/if}
					<!--like btn 3-->
					{#if like}
						<stackLayout class='radio-active' col='2'>
                            <image src='~/img/grin-alt-solid.png' />
                        </stackLayout>
					{:else}
						<stackLayout class='radio' col='2' on:tap={like3}>
                            <image src='~/img/grin-alt-regular.png' />
                        </stackLayout>
					{/if}
				</gridLayout>
				<!--Text under like buttons-->
				<gridLayout row='2' columns='*,*,*' class='center'>
                    {#if dislike}
					    <label col='0' text='ugh' class='h3 grey bold'/>
                    {:else}
                        <label col='0' text='ugh' class='h3 grey'/>
                    {/if}
                    {#if care}
					    <label col='1' text='helt ok' class='h3 grey bold'/>
                    {:else}
                        <label col='1' text='helt ok' class='h3 grey'/>
                    {/if}
                    {#if like}
					    <label col='2' text='kult' class='h3 grey bold'/>
                    {:else}
                        <label col='2' text='kult' class='h3 grey'/>
                    {/if}
				</gridLayout>
			</gridLayout>
        <!--Send button-->
			<gridLayout row='4'>
				<button text='SEND' class='white greyb btn bold' on:tap={send}></button>
			</gridLayout>
    </gridLayout>
</stackLayout>

<style>
	.main{
		width: 320;
		height: 500;
		border-radius: 20;
    }

    .box{
		padding: 1;
		width: 300;
		margin: 0 auto;
    }
    
    .big{
        height: 90%;
        width: 100%;
        border-width:0;
        border-radius: 20;
    }

</style>