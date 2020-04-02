<script>
    import { goBack } from 'svelte-native'
    import {group, theGame} from '../stores.js'

    console.log('welcome to gamePage')
    //makes rules contain all the rules of the game.
    let rules = $theGame.fields.rules
    let i = 0
    let e = 0

    //Random player
    const player = () =>{
        e = Math.floor(group.length * Math.random())
    }
    player()

    //If random= true, makes questions Random, if not index++
    const next = () =>{
        if ($theGame.fields.random) {
            i = Math.floor(rules.length * Math.random())
            player()
        } else {
            if (i < rules.length) {
                i = 0
                player()
            } else {
                i++
                player()
            }
        }
    }

</script>

<frame>
    <page class='bg-primary'>
        <actionBar title='{theGame.fields.name}'/>
        <cardView elevation='40' margin='50' >
            <flexboxLayout class='flex-centered'>
                {#if $theGame.fields.useName}
                    <label class='h2' text='{group[e]}' />
                {/if}
                <label class='text-center' text='{rules[i]}' textWrap={true} />
                <button text='next' on:tap={next} />
                <button class='end' text='end' on:tap={goBack} />
            </flexboxLayout>
        </cardView>
    </page>
</frame>

<style>
    .end{
        border: none;
        color: white;
        text-align: center;
        appearance: none;
        border-radius: 2rem;
    }
</style>
