<script>
    import { navigate, showModal }  from 'svelte-native'

    //Games
    import Game1 from '../pages/DrikkeTuren.svelte'
    import Game2 from '../pages/JegHarAldri.svelte'
    import Game3 from '../pages/SplashFest.svelte'

    //alert
    import { alert } from '@nativescript/core/ui/dialogs'

    //stores
    import {color, text, title, bgcolor, grad, group, gameChoice} from '../stores.js'
    
    //modals
    import masterModal from '../pages/popups/masterModal.svelte'
    import reviewModal from '../pages/popups/reviewModal.svelte'
    import infoModal from '../pages/popups/infoModal.svelte'
    import { registerNativeViewElement } from 'svelte-native/dom'

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

    //Opens modal
    //Drikketuren settings
    const Drikketuren = () =>{
        $color = 'green'
        $bgcolor = 'greenb'
        $text = 'Gå igjennom påstandene vist på skjermen, og gi ut passende straff til den påstanden passer best. Gå til neste påstand ved å trykke på neste!.  Mobilens eier starter, mens den som mottar forsetter leken, osv.'
        $title = 'Drikketuren'
        $grad = 2
        $gameChoice = Game1
        
		showModal({
                page: masterModal
                })
    }

    //Jeg har aldri rules
    const JegHarAldri = () =>{
        $color = 'pink'
        $bgcolor = 'pinkb'
        $text = 'Gå igjennom påstandene som kommer opp på skjermen, og si de høyt. Om en har gjort en påstand som blir nevnt, så må en ta en passende straff! Gå videre til neste påstand ved å trykke på "neste"'
        $title = 'Jeg har aldri'
        $grad = 3
        $gameChoice = Game2
        
		showModal({
                page: masterModal 
                })
    }

     //Splash fest rules
    const SplashFest = () =>{
        $color = 'blue'
        $bgcolor = 'blueb'
        $text = 'Få oppgaver, svar på spørsmål og spill med! Splash fest sikrer en god start på vorset. Velg ut en som skal lese opp reglene, det er viktig at alle gir denne personen sin fulle oppmerksomhet! Bytt påstander ved å trykke på "neste"'
        $title = 'Splash fest'
        $grad = 1
        $gameChoice = Game3
        
        if($group.length == 0){
            alert({
	            title: "Ops!",
	            message: "Du må legge til spillere for å prøve ut dette spillet",
	            okButtonText: "Ok"
                }).then(() => {
	            console.log("Alert dialog closed")
                })
        }else{
            showModal({
                page: masterModal 
                })
        }   
    }
</script>

<gridLayout rows='auto, auto, *' class='flex-centered'>
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
    <!--title-->
    <label row='1' text='Spill' class='h1 white center'/>
    <!--The games-->
    <stackLayout row='2' class='games'>
        <scrollView orientation="vertical">
            <gridLayout rows='auto, auto, auto'>
                <!--Splash fest-->
                <stackLayout row='0' class='box blueb' on:tap='{SplashFest}'>
                    <label class='h2 white bold center game-title' textWrap='true' text='Splash fest'/>
                </stackLayout>
                <!--Drikketuren-->
                <stackLayout row='1' class='box greenb' on:tap='{Drikketuren}'>
                    <label class='h2 white bold center game-title' textWrap='true' text='Drikketuren!'/>
                </stackLayout>
                <!--Jeg har aldri-->
                <stackLayout row='2' class='box pinkb' on:tap='{JegHarAldri}'>
                    <label class='h2 white bold center game-title' textWrap='true' text='Jeg har aldri'/>
                </stackLayout>
            </gridLayout>
        </scrollView>
    </stackLayout>
</gridLayout>

<style>
    .box{
        margin: 15 0;
        width: 90%;
        max-width: 200;
        padding: 18 0;
        border-radius: 20;
    }
    .game-title{
        align-content: center;
        justify-items: center;
    }

    .games{
        height: 100%;
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