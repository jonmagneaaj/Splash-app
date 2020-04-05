<script>
    import {group} from '../stores.js'

    let player = ''

    const addPlayer = () =>{
        $group = [...$group, player]
        player = ''
    }

</script>

<gridLayout rows='80, 80, *' class='flex-centered purple'>
    <label row='0' class='h1 text-center pinkText title' text='Legg til spillere' />
        <stackLayout row='1' class='border'>
            <searchBar 
                hint='Spillerens navn' 
                bind:text={player} 
                on:submit={addPlayer} 
                color='Gray' 
                backgroundColor='white'
                textFieldHintColor='white'
                textFieldBackgroundColor='white'
                />
         </stackLayout>
    <scrollView row='2'>
        <stackLayout>
            {#each $group as person, index}
                <flexboxLayout class='box' flexDirection='row' flexWrap='nowrap' justifyContent='space-between'>
                    <label class='h2 white' alignSelf='flex-start' text='{person}'/>
                    <button class='btn' text='x' alignSelf='flex-end' on:tap={() => {$group.splice(index,1); $group = $group;}} />
                </flexboxLayout>
            {/each}
        </stackLayout>
    </scrollView>
</gridLayout>

<style>
    .border{
        border-radius: 50px;
        border-width: 2rem;
        border-color: white;
        height: 50rem;
        background-color: white;
    }
    .purple{
        background-color: #02142B;
    }

    .white{
        color: white;
    }

    .btn{
        background-color: transparent;
        color: white;
        font-weight: 800;
    }

    .box{
        margin: 10px;
        width: 200rem;
    }

    .h1{
    font-family: 'Kalam', cursive;
    font-weight: bold;
}


</style>
