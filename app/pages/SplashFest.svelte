<script>
    import { goBack, showModal } from 'svelte-native'
    import {text, title, diff, reportRule, group} from '../stores.js'
    import {shuffle} from '../scripts/shuffle.js'
    //Games / rules etc.
    import {splashFestMild} from '../json/splashFest.js'
    import {splashFestGames} from '../json/splashFestGames.js'

    //modals
    import reportModal from '../pages/popups/reportModal.svelte'
    
    //Array with rules from json
    let arules = [...splashFestMild.rules]
    let srules = ''

    //Array with games from json
    let krules = [...splashFestGames.rules]
    let grules = ''

    const startGame = () =>{
        grules = ''
        srules = ''
        //Contains all the rules of the game.
        grules = shuffle(krules)
        srules = shuffle(arules)
        console.log('####' + srules.length +'####')
        console.log('####' + grules.length +'####')
        console.log(grules[1])

        //Add games within game here:
        let baseNumber = 0
        let randomNumber 
        let randomNumberB

        if (baseNumber <= srules.length+10){
            for (let i = 0; i < grules.length; i++) {

                //Creates a random number, based on what number and adds that to baseNumber
                //Adds the first rule of the random game
                randomNumber = baseNumber + Math.floor((Math.random() * 7) + 1);
                srules.splice(randomNumber,0,grules[i].game[0])

                //Adds the second rule of the game, at a random distance from first. but minimum 3
                randomNumberB = randomNumber + Math.floor((Math.random() * 7) + 3);
                srules.splice(randomNumberB,0,grules[i].game[1])

                //Basenumber keeps RandomNumberB`s value
                baseNumber = randomNumberB
                console.log('#### Basenumber: ' +baseNumber+' ####')
            }
        }
        
    }
    startGame()
    console.log('### number of questions: ' + srules.length)

    // Variable colors
    let frontColor='white'
    let frontColor2='white'
    let buttonColor='blue'
    let backColor='blueb'
    let backColor2='whiteb'


    let finish = false
    const styleChange = () =>{
            //Changes style based on challenge
            if(finish){
                //game over style
                frontColor='grey'
                frontColor2='grey'
                buttonColor='white'
                backColor='whiteb'
                backColor2='greyb'
            }else{
                if(srules[i].grad==1){
                    //easy color style
                    buttonColor='green'
                    backColor='greenb'
                }else if(srules[i].grad==2){
                    // medium color style
                    buttonColor='orange'
                    backColor='orangeb'
                }else if(srules[i].grad==3){
                    //hard color style
                    buttonColor='red'
                    backColor='redb'
                } else if(srules[i].grad==4){
                    //Extreme color style
                    buttonColor='grey'
                    backColor='greyb'
                }else{
                    //Game color style
                    buttonColor='blue'
                    backColor='blueb'
                }
            }
        }

    let i = 0

    styleChange()

    let players = [...$group]
    let p = 0

    let gamePlayers = [...$group]
    //The player in the array
    let gpl = 0
    //At what stage the game is in
    let pg = 0

    //Random player in MiniGame
    const miniGamePlayers = () =>{
        shuffle(gamePlayers)
    }
    miniGamePlayers()

    //Random player
    const player = () =>{
        shuffle(players)
    }
    player()
   
    //Goes to next rule. If through all rules, start gameOver sequence
    const next = () =>{
        //Only go thrugh name array if name is displayed and not rule=0
        if(srules[i].navn==true&&srules[i].grad==1||srules[i].grad==2||srules[i].grad==3||srules[i].grad==4){
            p++
        }
        i++

        // If i is bigger than the length of rules, run gameOver
        if (i >= srules.length){
            i = 0
            gameOver()
        }else{
            //Randomizes players if all players have played
            if(players.length <= p){
                player()
                p= 0
            }
            //changes color based on difficulity
            styleChange()

            //Runs minigame rules, if grad=0. Uses own player array. 
            if(srules[i].grad==0){
                // When game is at end, go to next player, and restart counter.
                if(pg >= 2){
                    pg=0

                    //if all players have played, shuffle player array, and start over
                    if((gamePlayers.length-1) <= gpl){
                        gpl = 0
                        miniGamePlayers()
                        console.log('## randomizes players:' + gpl)
                    } else{
                        gpl++
                    }
                    console.log('## new player:' + gpl)
                }
                //holds track of if on start of game, or end. 
                pg++
                console.log('## add pg:' + pg)
            }
        }
    }

    // Starts when players have gone trough all of the game
    const gameOver= () =>{
        finish=true
    }

    // Restarts the game from the beginning
    const startOver = () =>{
        player()
        finish = false;
        i = 0
    }

    //return to game select screen
    const leave = () =>{
        goBack()
    }

    // Open report modal
    const report = () =>{
        $reportRule = srules[i].regel
        showModal({
            page: reportModal
                })
    }
</script>

<page class='{backColor}'>
    <gridLayout rows='100,*, 100,50'>
        <!--Title of the game-->
        <label row='0' text='{$title}' class='h1 {frontColor} flex-centered' textAlignment='center' textWrap='true'/>
        <stackLayout row='1'>
            <flexboxLayout class='flex-centered center'>
                {#if finish}
                    <!--Gratulerer message if finished-->
                    <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='GRATULERER!' />
                {:else}
                    <!--Player name if true-->
                    {#if srules[i].navn==true&&srules[i].grad==1||srules[i].grad==2||srules[i].grad==3||srules[i].grad==4}
                        <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='{players[p]}' />
                    {:else if srules[i].grad==0}
                        <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='{gamePlayers[gpl]}' />
                    {:else}
                        <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='ALLE' />
                    {/if}
                {/if}
                <!--Question that comes up-->
                {#if finish}
                    <!--If finished, show this-->
                    <stackLayout width='90%'>
                        <label class='h2 {frontColor2} bold' text='Dere har klart å gå igjennom alle alternativene... gærninger... Starte på nytt?' textWrap='true'  textAlignment='center'/>
                    </stackLayout>
                {:else}
                    <stackLayout width='90% '>
                        <label class='h2 {frontColor2} center bold' text='{srules[i].regel}' textWrap='true'/>
                    </stackLayout>
                {/if}
            </flexboxLayout>
            <!-- Report button-->
            <stackLayout class='icon'>
                {#if finish}
                    <stackLayout></stackLayout>
                {:else}
                    {#if srules[i].grad==3}
                        <stackLayout on:tap={report}>
                            <image src='~/img/report-white.png' class='right' />
                        </stackLayout>
                    {:else}
                        <stackLayout on:tap={report}>
                            <image src='~/img/report.png' class='right' />
                        </stackLayout>
                    {/if}
                {/if}
            </stackLayout>
        </stackLayout>
        <!--Buttons-->
        <stackLayout row='2'>
            {#if finish}
                <button text='Restart' class='btn {backColor2} {buttonColor}' on:tap={startOver} />
            {:else}
                <button text='Neste' class='btn {backColor2} {buttonColor}' on:tap={next} />
            {/if}
        </stackLayout>
        <stackLayout row='3'>
            <button text='Ferdig' class='ubtn {frontColor}' on:tap={leave} android:stateListAnimator="@null" />
        </stackLayout>
    </gridLayout>
 </page>