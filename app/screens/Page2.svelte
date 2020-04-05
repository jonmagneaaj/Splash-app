<script>
    import FirestoreParser from 'firestore-parser'
    import { navigate }  from 'svelte-native'
    import {theGame} from '../stores.js'
    import Game from '../pages/Game.svelte'

    import { registerNativeViewElement } from 'svelte-native/dom'
 
    registerNativeViewElement("cardView", () => 
        require("@nstudio/nativescript-cardview").CardView
    )

    let games = []

    // gets firestore URL
    const baseUrl = 'https://firestore.googleapis.com/v1/'
    const gamesUrl = baseUrl + 'projects/splash-d4f10/databases/(default)/documents/games'

    //imports Firestore to games array
    const getGames = () =>{
        fetch(gamesUrl)
        .then(response => response.json())
            .then(json => FirestoreParser(json))
                .then(parsed => {
                    games = parsed.documents
                })
        .catch(error => consolelog('####ERROR: ' + error))
    }
    getGames()

    const prepareGame = async (game) =>{
        $theGame = []
        await theGame.set(game)
        goToGame()
    }
    
    //opens game page
    const goToGame = () => {
        navigate({
            page:Game
        })
    }

</script>

<gridLayout rows='80, *' class='flex-centered'>
    <label row='0' class='h1 text-center  white' text='Dine spill' />
        <scrollView row='1' class=''>
            <stackLayout>
                {#each games as game}
                <stackLayout class='box' flexDirection='row'>
                        <label class='h2 blackText' textWrap='true' textAlignment='center' text={game.fields.name}/>
                        <label class='blackText' textWrap='true' textAlignment='center' text={game.fields.description}/>
                        <!--removes any prior games in theGame, then adds game to theGame. -->
                        <button text='Spill' class='btn pink' on:tap={() => prepareGame(game)}/>
                    </stackLayout>
                {:else}
                    <activityIndicator busy={true} />
                {/each}
            </stackLayout>
        </scrollView>
</gridLayout>

<style>
    .white{
        color: white;
    }

    .box{
        background-color: white;
        margin: 30px;
        border-radius: 20px;
        width: 500rem;
        padding: 5rem;
    }

    .btn{
        color: white;
        width: 70rem;
        border-radius: 20px;
        margin-top: 20rem;
    }

    .h1{
    font-family: 'Permanent Marker', cursive;
    font-weight: bold;
}

 .h2{
    font-family: 'kalam', cursive;
    font-weight: bold;
}

</style>