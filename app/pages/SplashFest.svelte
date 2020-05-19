<script>
    import { goBack, showModal } from 'svelte-native'
    import {text, title, diff, reportRule, group} from '../stores.js'
    import {shuffle} from '../scripts/shuffle.js'
    import {splashFestMild} from '../json/splashFest.js'

    //modals
    import reportModal from '../pages/popups/reportModal.svelte'
    
    let arules = [...splashFestMild.rules]
    let srules = ''

    const startGame = () =>{
        srules = ''
        //Contains all the rules of the game.
        srules = shuffle(arules)
        console.log('####' + srules.length +'####')

        //Add games within game here:
        
    }
    startGame()

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
    let k = players.length
    let p = 0

    //Random player
    const player = () =>{
        shuffle(players)
    }
    player()
   
    //Goes to next rule. If through all rules, start gameOver sequence
    const next = () =>{
        //Only go thrugh name array if name is displayed
            if(srules[i].navn==true){
                p++
            }
        i++
        // If i is bigger than the length of rules, run gameOver
        if (i >= srules.length){
            i = 0
            gameOver()
        }else{
            //Randomizes players if all players have played
            if(k <= p){
                player()
                p= 0
            }
            //changes color based on difficulity
            styleChange()
            console.log('#### Index: '+i + ' Array Length: '+srules.length + ' Player: ' +players[p])
        }
    }
    console.log('#### Index: '+i + ' Array Length: '+srules.length + ' Player: ' +players[p])


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
    <gridLayout rows='200,*, 100'>
        <!--Title of the game-->
        <label row='0' text='{$title}' class='h1 {frontColor} flex-centered' textAlignment='center' textWrap='true'/>
        <stackLayout row='1'>
            <flexboxLayout class='flex-centered center'>
                {#if finish}
                    <!--Gratulerer message if finished-->
                    <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='GRATULERER!' />
                {:else}
                    <!--Player name if true-->
                    {#if srules[i].navn==true}
                        <label class='h1 bold {frontColor2}' textWrap='true' textAlignment='center' text='{players[p]}' />
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
                <button text='Ferdig' class='ubtn {frontColor}' on:tap={leave} />
        </stackLayout>
    </gridLayout>
 </page>