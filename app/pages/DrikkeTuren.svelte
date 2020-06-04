<script>
    import { goBack, showModal } from 'svelte-native'
    import {color, bgcolor, text, title, diff, reportRule} from '../stores.js'
    import {shuffle} from '../scripts/shuffle.js'
    import {drikkeTurRules} from '../json/drikkeTurContent.js'

    //modals
    import reportModal from '../pages/popups/reportModal.svelte'
    
    let arules = [...drikkeTurRules]
    let srules = ''

    const startGame = () =>{
        srules = ''
        //Contains all the rules of the game.
        srules = shuffle(arules)
        console.log('####' + srules.length +'####')

        //Adds a true to the array, used to give new message at each 10th interval
        const addTen = () =>{
            let f = 1
            let k = 0
            for (let r = 0; r < srules.length+1; r++) {
                f++
                k++
                if(f == 10){
                    srules.splice(k,0,true)
                    f=0
                } 
            }
        }
        addTen()
    }
    startGame()

    // Variable colors
    let frontColor=$color
    let frontColor2='grey'
    let buttonColor='white'
    let backColor='white'
    let backColor2=$bgcolor

    //Normal color style
    const style = () =>{
        frontColor=$color
        frontColor2='grey'
        buttonColor='white'
        backColor='white'
        backColor2=$bgcolor
    }

    //Color style for each 10th rule
    const newStyle = () =>{
        frontColor='white'
        frontColor2='white'
        buttonColor='orange'
        backColor='orangeb'
        backColor2='whiteb'
    }

    let i = 0
    let p = 1
    let k = 0
    let finish = false
    let change = false

    console.log(finish)
   
    //Goes to next rule. If through all rules, start gameOver sequence
    const next = () =>{
        p++
        i++
        console.log('####'+i + ' '+srules.length)
        // If i is bigger than the length of rules, run gameOver
        if (i >= srules.length){
            gameOver()
        }

        //Changes style when 10th comes up
        if(p>=10){
            newStyle()
            k ++
            p=0
        }else{
            style()
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
        k = 0
    }

    const leave = () =>{
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
    <gridLayout rows='100,*, 100, 50'>
        <!--Title of the game-->
        <label row='0' text='{$title}' class='h1 {frontColor} flex-centered' textAlignment='center' textWrap='true'/>
        <stackLayout row='1'>
            <flexboxLayout class='flex-centered center'>
                <!--Question that comes up-->
                {#if finish}
                    <stackLayout width='90%'>
                        <label class='h2 {frontColor2} bold' text='Dere har klart å gå igjennom alle alternativene... gærninger... Starte på nytt?' textWrap='true'  textAlignment='center'/>
                    </stackLayout>
                {:else if srules[i]===true}
                    {#if $diff=='m'}
                        {#if k===1}
                            <stackLayout width='90%'>
                                <label class='h2 {frontColor2} center bold' text='Gratulerer {i+1} spørsmål!! Alle ta {k} slurk' textWrap='true'/>
                            </stackLayout>
                        {:else}
                            <stackLayout width='90%'>
                                <label class='h2 {frontColor2} center bold' text='Gratulerer {i+1} spørsmål!! Alle ta {k} slurker' textWrap='true'/>
                            </stackLayout>
                        {/if}
                    {:else}
                        <stackLayout width='90%'>
                            <label class='h2 {frontColor2} center bold' text='Gratulerer {i+1} spørsmål!! ta en gruppeskål!' textWrap='true'/>
                        </stackLayout>
                    {/if}
                {:else}
                    <stackLayout width='90% '>
                        <label class='h2 {frontColor2} center bold' text='{srules[i]}' textWrap='true'/>
                    </stackLayout>
                {/if}
            </flexboxLayout>
            <!-- Report button-->
            <stackLayout class='icon'>
                {#if !finish}
                    {#if srules[i]===true}
                        <stackLayout>
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
                <button text='Neste' class='btn white {backColor2} {buttonColor}' on:tap={next} />
            {/if}
        </stackLayout>
        <stackLayout row='3'>
            <button text='Ferdig' class='ubtn {frontColor}' on:tap={leave} android:stateListAnimator="@null"/>
        </stackLayout>
    </gridLayout>
 </page>

