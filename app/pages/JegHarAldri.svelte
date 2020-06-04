<script>
    import { goBack, showModal } from 'svelte-native'
    import {color, bgcolor, text, title, grad, diff, reportRule} from '../stores.js'
    import {shuffle} from '../scripts/shuffle.js'
    import {jegHarAldriMildRules} from '../json/jegHarAldriMild.js'
    import {jegHarAldriGrovRules} from '../json/jegHarAldriGrov.js'

    //modals
    import reportModal from '../pages/popups/reportModal.svelte'

    let arules = [...jegHarAldriMildRules]
    let brules = [...jegHarAldriGrovRules]
    let crules = [...jegHarAldriMildRules,...jegHarAldriGrovRules]
    let srules = ''

    const startGame = () =>{
        //Contains all the rules of the game.
        if($diff == 'e'){
            srules = shuffle(arules)
        }else if($diff == 'h'){
            srules= shuffle(brules)
        }else{
            srules= shuffle(crules)
        }
        console.log('####' + srules.length +'####')
    }
    startGame()

    // Variable colors
    let frontColor=$color
    let frontColor2='grey'
    let buttonColor='white'
    let backColor='white'
    let backColor2=$bgcolor

    let i = 0
    let p = 1
    let finish = false
   
    //Goes to next rule. If through all rules, start gameOver sequence
    const next = () =>{
        i++
        console.log('####'+i + ' '+srules.length)
        // If i is bigger than the length of rules, run gameOver
        if (i >= srules.length){
            gameOver()
        }
    }

    // Starts when players have gone trough all of the game
    const gameOver= () =>{
        finish=true
    }

    // Restarts the game from the beginning
    const startOver = () =>{
        finish = false;
        i = 0
    }

    const leave = () =>{
        srules=[]
        goBack()
    }

    // Open report modal
    const report = () =>{
        $reportRule = srules[i]
        showModal({
            page: reportModal 
                })
    }

</script>

<page class='{backColor}'>
    <gridLayout rows='100, *, 100, 50'>
        <!--Title of the game-->
        <label row='0' text='{$title}' class='h1 {frontColor} flex-centered' textAlignment='center' textWrap='true'/>
        <stackLayout row='1'>
            <flexboxLayout class='flex-centered center'>
                <!--Question that comes up-->
                {#if finish}
                    <stackLayout width='90%'>
                        <label class='h2 {frontColor2} bold' text='Dere har gått igjennom alt som er inne. Bra jobbet!' textWrap='true'  textAlignment='center'/>
                    </stackLayout>
                {:else}
                    <stackLayout width='90%'>
                        <label class='h2 {frontColor2} center bold' text='{srules[i]}' textWrap='true'/>
                    </stackLayout>
                {/if}
            </flexboxLayout>
            <!-- Report button-->
            <stackLayout class='icon'>
                {#if srules[i]===true}
                    <stackLayout on:tap={report}>
                        <image src='~/img/report-white.png' class='right' />
                    </stackLayout>
                {:else}
                    <stackLayout on:tap={report}>
                        <image src='~/img/report.png' class='right' />
                    </stackLayout>
                {/if}
            </stackLayout>
        </stackLayout>
        <!--Buttons-->
        <stackLayout row='2'>
            {#if finish}
                <button text='Restart' class='btn {backColor2} {buttonColor}' on:tap={startOver} />
            {:else}
                <button text='Neste' class='btn white {backColor2} {buttonColor}' on:tap={next} />
            {/if}
        </stackLayout>
        <stackLayout row='3'>
                <button text='Ferdig'  class='ubtn {frontColor}' on:tap={leave} android:stateListAnimator="@null"/>
        </stackLayout>
    </gridLayout>
 </page>