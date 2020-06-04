<script>
    import { closeModal, navigate } from 'svelte-native'
    import FirestoreParser from 'firestore-parser'
    import { reportRule, title } from '../../stores.js'

    // gets firestore URL
    const baseUrl = 'https://firestore.googleapis.com/v1/'
    const gamesUrl = baseUrl + 'projects/gameapp-45001/databases/(default)/documents/reports'
    let key = 'AIzaSyAUz4ZEOXz6VZxXtC7NKftPdgfx8iyRrnI'

    let tilbakemelding = ''
    let listOfItems = ['','støtende','diskriminerende','ikke underholdene', 'dårlig', 'upassende', 'skrivefeil', 'bedre forslag', 'mitt forslag', 'For vanskelig', 'duplikat','For lett', ]

    let i 
    $:report = listOfItems[i] 
 

    // Sends feedback to firestore
    async function send() {
        console.log(' ###### adding report ##### ')
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
                    gameName: {
                        stringValue: $title
                    },
                    reportMessage: {
                        stringValue: tilbakemelding
                    },
                    chosenRule: {
                        stringValue: $reportRule
                    },
                    reportCategory:{
                        stringValue: report
                    },
                    created: {
                        timestampValue: new Date()
                    }
                } 
            })
        })
    closeModal();
    }
</script>

<stackLayout class='main redb whiteo'>
    <gridLayout rows='30,auto,80,*,130,100' class='box'>
        <stackLayout row='0'>
		</stackLayout>
        <!--Title-->
        <stackLayout row='1'>
            <label text='Rapporter:' textWrap='true' class='h1 center white'/>
        </stackLayout>
        <!-- Reported text-->
        <stackLayout row='2'>
            <label text='{$reportRule}' textWrap='true' class='h3 center white'/>
        </stackLayout>
        <!--Input field-->
        <stackLayout row='3'>
            <textView 
                hint='Skriv hvorfor du vil rapporterte denne oppgaven' 
                bind:text={tilbakemelding}  
                color='Gray' 
                backgroundColor='white'
                textFieldHintColor='white'
                textFieldBackgroundColor='white'
                class='h3 big white'
                />
        </stackLayout>
        <!--Like scale-->
        <stackLayout row='4' class='center bold'>
			<label text='Klassefisering:' class='h2 white bold'/>
			<listPicker items={listOfItems} bind:selectedIndex={i} class='white h3'/>
		</stackLayout>
        <!--Send button-->
			<gridLayout row='5'>
				<button text='SEND' class='whiteb red btn bold' on:tap={send}></button>
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
		width: 250;
		margin: 0 auto;
    }
    
    .big{
        height: 90%;
        width: 100%;
        border-width:0;
        border-radius: 20;
    }

</style>