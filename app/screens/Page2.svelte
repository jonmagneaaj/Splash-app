<script>
    import FirestoreParser from 'firestore-parser'
    import { navigate }  from 'svelte-native'
    import {theGame} from '../stores.js'
    import Game from '../pages/Game.svelte'

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
                    console.log(games)
                })
        .catch(error => consolelog('####ERROR: ' + error))
    }
    getGames()
    
    //opens game page
    const goToGame = () => {
        navigate({
            page:Game
        })
    }

    $: console.log($theGame)
</script>

<flexboxLayout class='flex-centered purple'>
    <label class='h1 text-center white' text='Your games' />
        {#each games as game}
             <cardView margin='32' elevation='40'>
                <label class='h2' text={game.fields.name}/>
                <label class='body' text={game.fields.description}/>
                <!--removes any prior games in theGame, then adds game to theGame. -->
                <button text='Play' on:tap={() => {$theGame=[]; $theGame = [...$theGame, game]; goToGame();}}/>
            </cardView>
        {:else}
            <activityIndicator busy={true} />
        {/each}
</flexboxLayout>

<style>
    .purple{
        background-color: purple;
    }
    .white{
        color: white;
    }
</style>