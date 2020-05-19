<script>
	import { closeModal, navigate} from 'svelte-native'

	//stores
	import {color, bgcolor, text, title, diff, gameChoice, grad} from '../../stores.js'

	//active radio
	let col1 = true;
	let col2 = false;
	let col3 = false;

	const radio1 = () =>{
		col1 = true;
		col2 = false;
		col3 = false;

		difficulity();
	}

	const radio2 = () =>{
		col1 = false;
		col2 = true;
		col3 = false;

		difficulity();
	}

	const radio3 = () =>{
		col1 = false;
		col2 = false;
		col3 = true;

		difficulity();
	}


	const difficulity = () => {
		if (col1){
			$diff = 'e'
		}else if (col2){
			$diff = 'm'
		}else if(col3){
			$diff = 'h'
		}
		console.log('### '+ $diff + ' ###')
	}

	const play = () =>{
		closeModal()
		navigate({
            page:$gameChoice
		})
	}
	
</script>

	<stackLayout class='{$bgcolor} main'>
		<gridLayout rows='20,50,200,150,100' class='box'>
			<!--empty room-->
			<stackLayout row='0'>
			</stackLayout>
			<!--Title-->
			<stackLayout row='1'>
				<label text='{$title}' class='white h1 center'/>
			</stackLayout>
			<!--information Text-->
			<stackLayout row='2'>
				<label text='{$text}' textWrap='true' class='h3 center white bold'/>
			</stackLayout>
			<!--Radio buttons-->
			<gridLayout rows='50, 30, 30' row='3' class='center bold'>
				{#if $grad==1}
					<label row='0' text='Hvor grovt?' class='h2 white'/>
				{:else if $grad==2}
					<label row='0' text='Hvor hardt?' class='h2 white'/>
				{:else}
					<label row='0' text='Hvor grovt?' class='h2 white'/>
				{/if}
				<!--Raio for challenge-->
				{#if $grad===1}
					<gridLayout row='1' columns='*' class='center'>
						<!--Radio btn 1-->
						<stackLayout class='radio-active' col='0'></stackLayout>
					</gridLayout>
				{:else if $grad===2}
					<gridLayout row='1' columns='*,*' class='center'>
						<!--Radio btn 1-->
						{#if col1}
							<stackLayout class='radio-active' col='0'></stackLayout>
						{:else}
							<stackLayout class='radio {$bgcolor}' col='0' on:tap={radio1}></stackLayout>
						{/if}
						<!--Radio btn 2-->
						{#if col2}
							<stackLayout class='radio-active' col='1'></stackLayout>
						{:else}
							<stackLayout class='radio {$bgcolor}' col='1' on:tap={radio2}></stackLayout>
						{/if}
					</gridLayout>
				{:else}
					<!--Radio for how deranged-->
					<gridLayout row='1' columns='*,*,*' class='center'>
						<!--Radio btn 1-->
						{#if col1}
							<stackLayout class='radio-active' col='0'></stackLayout>
						{:else}
							<stackLayout class='radio {$bgcolor}' col='0' on:tap={radio1}></stackLayout>
						{/if}
						<!--Radio btn 2-->
						{#if col2}
							<stackLayout class='radio-active' col='1'></stackLayout>
						{:else}
							<stackLayout class='radio {$bgcolor}' col='1' on:tap={radio2}></stackLayout>
						{/if}
						<!--Radio btn 2-->
						{#if col3}
							<stackLayout class='radio-active' col='2'></stackLayout>
						{:else}
							<stackLayout class='radio {$bgcolor}' col='2' on:tap={radio3}></stackLayout>
						{/if}
					</gridLayout>
				{/if}
				<!--Text under radio buttons-->
				{#if $grad==1}
					<gridLayout row='2' columns='*' class='center'>
						<label col='0' text='normal' class='h3 white bold'/>
					</gridLayout>
				{:else if $grad==2}
					<gridLayout row='2' columns='*,*' class='center'>
                    {#if col1}
					    <label col='0' text='normal' class='h3 white bold'/>
                    {:else}
                        <label col='0' text='normal' class='h3 white'/>
                    {/if}
                    {#if col2}
					    <label col='1' text='ekstra' class='h3 white bold'/>
                    {:else}
                        <label col='1' text='ekstra' class='h3 white'/>
                    {/if}
					</gridLayout>
				{:else}
					<gridLayout row='2' columns='*,*,*' class='center'>
                    {#if col1}
					    <label col='0' text='rolig' class='h3 white bold'/>
                    {:else}
                        <label col='0' text='rolig' class='h3 white'/>
                    {/if}
                    {#if col2}
					    <label col='1' text='mix' class='h3 white bold'/>
                    {:else}
                        <label col='1' text='mix' class='h3 white'/>
                    {/if}
                    {#if col3}
					    <label col='2' text='grovt' class='h3 white bold'/>
                    {:else}
                        <label col='2' text='grovt' class='h3 white'/>
                    {/if}
					</gridLayout>
				{/if}
			</gridLayout>
			<!--Start Game button-->
			<gridLayout row='4'>
				<button text='SPILL!' class='{$color} whiteb btn bold' on:tap={play}></button>
			</gridLayout>
		</gridLayout>
	</stackLayout>

<style>
	.box{
		padding: 1;
		width: 250;
		margin: 0 auto;
	}
	.main{
		width: 300;
		height: 500;
		border-radius: 20;
	}

	.radio{
		border-color: white;
		border-width: 3;
		border-radius: 50;
		width: 30;
		height: 30;
	}
	.radio-active{
		border-color: white;
		border-width: 3;
		border-radius: 50;
		width: 30;
		height: 30;
		background-color: white;
	}

</style>