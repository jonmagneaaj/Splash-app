<script>
    import { goBack } from 'svelte-native'
    import {group, theGame} from '../stores.js'


    //makes rules contain all the rules of the game.
    let rules = $theGame.fields.rules
    let i = 0
    let e = 0

    //Random player
    const player = () =>{
        e = Math.floor($group.length * Math.random())
    }
    player()

    //If random= true, makes questions Random, if not index++
    const next = () =>{
        if ($theGame.fields.random) {
            i = Math.floor(rules.length * Math.random())
            player()
        } else {
            if (i > rules.length) {
                i = 0
                player()
            } else {
                i++
                player()
            }
        }
    }

</script>

<page class='purple'>
        <gridLayout rows='*, 200, *'>
        <label row='0' text='{$theGame.fields.name}' class='h1 white flex-centered' textAlignment='center' textWrap='true'/>
        <stackLayout row='1'>
            <flexboxLayout class='flex-centered center'>
                {#if $theGame.fields.useName}
                    <label class='h1 pinkText' textWrap='true' textAlignment='center' width='90%' text='{$group[e]}' />
                {/if}
                <label class='h2 white' text='{rules[i]}' textWrap='true' width='90%' textAlignment='center'/>
            </flexboxLayout>
        </stackLayout>
        <stackLayout row='2'>
            <button text='Neste' class='btn' on:tap={next} />
            <button class='end' text='Ferdig' on:tap={goBack} />
        </stackLayout>
    </gridLayout>
 </page>

<style>
    .end{
        background-color: transparent;
        border: 2px solid #EB00C7;
        color: #EB00C7;
        width: 70rem;
        border-radius: 20px;
    }
    
    .btn{
        background-color: #EB00C7;
        color: white;
        width: 70rem;
        border-radius: 20px;
    }

    .purple{
        background-color: rgb(1, 72, 165);
    }

    .white{
        color: white;
        margin-bottom: 40rem;
    }

    .center{
        justify-content: center;
        align-content: center;
    }

    .h1{
    font-family: 'Kalam', cursive;
    font-weight: bold;
}



</style>
