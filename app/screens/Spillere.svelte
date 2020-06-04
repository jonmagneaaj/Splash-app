<script>
    import { navigate, showModal}  from 'svelte-native'

    //Stores
    import {group} from '../stores.js'

    //Modals
    import reviewModal from '../pages/popups/reviewModal.svelte'
    import infoModal from '../pages/popups/infoModal.svelte'


    //Opens review page
    const review = () =>{
        showModal({
            page:reviewModal
            })
    }

    //Opens info page
    const info = () =>{
        showModal({
            page:infoModal
            })
    }

    let player = ''
    //add player to group, in store
    const addPlayer = () =>{
        $group = [...$group, player]
        player = ''
    }
    
</script>

<gridLayout rows='auto,auto, auto, *' class='flex-centered greyb'>
 <!--Top buttons-->
    <gridLayout row='0' columns='*,*' class='margin-under'>
        <!--info button-->
        <flexboxLayout class='parent' col='0'>
            <stackLayout on:tap={info} class='icon'>
                <image src='~/img/info.png'/>
            </stackLayout>
        </flexboxLayout>
        <!--Feedback button-->
        <flexboxLayout class='parent2' col='1'>
            <stackLayout on:tap={review} class='icon'>
                <image src='~/img/feedback.png'/>
            </stackLayout>
        </flexboxLayout>
    </gridLayout>
    <label row='1' class='h1 text-center white margin-under' text='Spillere' />
    <!--Add players-->
    <gridLayout row='2' columns='*,70'class='border margin-under'>
        <textField 
            hint='Spillerens navn' 
            bind:text={player} 
            on:returnPress={addPlayer} 
            color='Gray' 
            backgroundColor='white'
            textFieldHintColor='white'
            textFieldBackgroundColor='white'
            class='h2 textfield'
            col='0'
            />
        <button on:tap={addPlayer} class='add white' text='+' col='1'/>
    </gridLayout>
    <!--Each player-->
    <scrollView row='3'>
        <stackLayout>
            {#each $group as person, index}
                <flexboxLayout class='box' flexDirection='row' flexWrap='nowrap' justifyContent='space-between' alignItems='center' >
                    <label class='h2 white center bold' alignSelf='flex-start' text='{person}'/>
                    <stackLayout on:tap={() => {$group.splice(index,1); $group = $group;}} alignSelf='flex-end' class='delete'>
                        <image src='~/img/cross-white.png'/>
                    </stackLayout>
                </flexboxLayout>
            {/each}
        </stackLayout>
    </scrollView>
</gridLayout>

<style>

    .add{
        border-radius: 50;
        background-color: rgb(73, 174, 120);
    }

    .border{
        border-radius: 50;
        border-width: 2;
        border-color: white;
        height: 50;
        background-color: white;
    }

    .box{
        margin: 10;
        width: 250;
    }
    .textfield{
        border-width:0
    }
    .delete{
        height: 15;
    }

    .parent{
        display: flex;
        justify-content: flex-start;
    }
    .parent2{
        display: flex;
        justify-content: flex-end;
    }
</style>
