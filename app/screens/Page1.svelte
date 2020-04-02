<script>
    import {group} from '../stores.js'

    let player = ''

    const addPlayer = () =>{
        $group = [...$group, player]
        player = ''
    }

    $: console.log($group)

</script>



<flexboxLayout class='flex-centered purple'>
    <label class='h1 text-center' text='Add players' />  
    <searchBar class='search' hint='Player name' bind:text={player} on:submit={addPlayer}/> 
    <flexboxLayout flexDirection='column'>
        {#each $group as person, index}
            <flexboxLayout class='center' flexDirection='row'>
                <label class='white h2' text='{person}'/>
                <button class='btn h2' text='x' on:tap={() => {$group.splice(index,1); $group = $group;}} />
            </flexboxLayout>
        {/each}
    </flexboxLayout>
</flexboxLayout>


<style>
    .purple{
        background-color: purple;
    }
    .h1{
        color: white;
    }

    .white{
        color: white;
    }

    .btn{
        background-color: transparent;
        color: white;
    }

    .search{
        color: purple;
        border-radius: 20;
    }

    .center{
        display: flex;
        justify-content: center;
    }
</style>
