var pickedHero = false;
var hasAttacked = false;
var enemyPicked = false;
var fullBoard = true;
var buttonsActive = true;
var enemyKDs = 0;

var ironman = {
    name: "Tony Stark",
    hp: 600,
    attack: 75,
    defence: 20,
    attkSpeed: 40,
    specialOne: 120,
    specialTwo: 250,
};


var  blackwidow = {
    name:  "Natasha Romanoff",
    hp: 500,
    attack: 50,
    defence: 50,
    attkSpeed: 100,
    specialOne: 120,
    specialTwo: 250,

};
var captainamerica = {
    name : "Steve Rodgers",
    hp: 650,
    attack: 85,
    defence: 20,
    attkSpeed: 30,
    specialOne: 120,
    specialTwo: 250,
};

var scarletwitch = {
    name: "Wanda Maximoff",
    hp: 300,
    attack: 300,
    defence: 40,
    attkSpeed: 10,
    specialOne: 350,
    specialTwo: 450,
    
};

var heros = [ironman, blackwidow, captainamerica, scarletwitch];
var enemyHero;
var userHero;
start = 0;




//$("#ironman").html("hp: " + ironman.hp);
// $("#blackwidow").html("hp: " + blackwidow.hp);
// $("#captainamerica").html("hp: " + captainamerica.hp);
// $("#scarletwitch").html("hp: " + scarletwitch.hp);


// function to set stats for each char
function setStats(selector, stats) {
    $(selector).html("hp: " + stats.hp + "<br>attack: " + stats.attack + "<br>defence: " + stats.defence + "<br>attkspd: " + stats.attkSpeed)
}


// main , sets stats listens for clicks on the hero divs
$(document).ready(function(){
   
     // sets stats 
    setStats('#ironmanStats', ironman);
    setStats('#blackwidowStats', blackwidow);
    setStats('#captainamericaStats', captainamerica);
    setStats('#scarletwitchStats', scarletwitch);
//main click function


    $(".character").on("click", function (){
        
         
        

        // checks if selected char is ironman and applies stats
    if( $(this).attr("id") ===  "ironman" && !enemyPicked){
         
        alert("you choose ironman as your character");
        //assigns the special buttons
        assignHeroButtons("#specialBtn1", "Repulsor Force Beam", "#specialBtn2", "Uni-Beam from Chest");
        assignHero(ironman,"#ironmanStats","#ironman");      
        $(this).css("background-color", "white");
        $(this).appendTo("#ring");
       //turns off the click for this char after selected
        $(this).off();

    }
     // checks if selected char is blackwidow and applies stats
    else if ($(this).attr("id") === "blackwidow" && !enemyPicked ) {
                //assigns the special buttons
        assignHeroButtons("#specialBtn1", "Sweep Kick", "#specialBtn2", "Perfect Shot");
        assignHero(blackwidow, "#blackwidowStats", "#blackwidow");     
        $(this).css("background-color", "white");
        //moves char to bottom div to battle 
        $(this).appendTo("#ring");
        //turns off the click for this char after selected
        $(this).off();
        
        
    }
     // checks if selected char is captainamerica and applies stats
    else if($(this).attr("id") === "captainamerica" && !enemyPicked){
        //assigns the special buttons      
        assignHeroButtons("#specialBtn1", "Shield Slash", "#specialBtn2", "Stars and Strips Charge"); 
        //assigns to either hero or enemy. look at function for more detail      
        assignHero(captainamerica, "#captainamericaStats", "#captainamerica");
        $(this).css("background-color", "white");   
        $(this).appendTo("#ring");
    }
     // checks if selected char is scarlet and applies stats
    else if($(this).attr("id") === "scarletwitch" && !enemyPicked){
        //assigns the special buttons
        assignHeroButtons("#specialBtn1", "Hex Bolt", "#specialBtn2", "Chaos Magic Blast");
        //assigns to either hero or enemy. look at function for more detail
        assignHero(scarletwitch, "#scarletwitchStats", "#scarletwitch");
        $(this).css("background-color", "white");
        //moves char to bottom div to battle 
        $(this).appendTo("#ring");  
     
    }
    
    });

});

//switch to assign user hero and enemy hero
//avoids duplicate of userHero or enemyHero assignment
// applies correct stats for each char
//
function assignHero(hero, selectorStats, selectorId) {
if (!pickedHero) {
    userHero = hero;
    pickedHero = true;
    userHeroStatsId = selectorStats;
    userHeroId = selectorId;
}
else {
    enemyHero = hero;
    enemyHeroStatsId = selectorStats;
    enemyHeroId = selectorId;
    enemyPicked = true;
    enemyKDs ++;
}

};
//assigns the special ability buttons for each char
// only used for userHero
function assignHeroButtons(btn1selectorId, btn1Text, btn2selectorId, btn2Text ) {
        if (!pickedHero) {
         $(btn1selectorId).html(btn1Text);
        $(btn2selectorId).html(btn2Text);
        
    }
 
    };




//Attack function, sets user basic attack animation
$("#attack").click(function (){
if (enemyPicked){
      if(userHero.hp <= 0) {
        alert("Your character has died and now the earth is doomed. Next time bring your A game.\nClick ok to restart the game.");
        location.reload(); // page reload
       } else if (buttonsActive) {
          setTimeout(function(){
            
              $(userHeroId).animate({right: '-=50px'}).animate({right: '+=50px'});
                damage = userHero.attack;
                enemyHero.hp = enemyHero.hp - damage;  
                hasAttacked = true;
           
                updateStatsEnemy();   //updates new hp after attack
           }, 2000); //delay timer to avoid spamming quick attacks
      }
    } 
    else {
        alert("You need a target to preform that");
    }

    if (enemyKDs === 3) {
        alert("you win!");
    }
});







//Attack function, sets user basic attack animation
   /* $("#attack").click(function (){
        setTimeout(function(){
        $(userHeroId).animate({right: '-=50px'}).animate({right: '+=50px'});
        damage = userHero.attack;
        enemyHero.hp = enemyHero.hp - damage;  
        hasAttacked = true;
        updateStatsEnemy();   //updates new hp after attack
    }, 700); //delay timer to avoid spamming quick attacks
    });
*/

//auto attack function for AI
    window.setInterval(function(){
    enemyAttack();
    }, 1600); //timer for AI attacks

  function enemyAttack(){
    if (hasAttacked && enemyHero.hp<= 0) {    //will be deleting and making a different funtion with but currently alerts if enemy defeated
        alert("you have defeated " + enemyHero.name + "selected another character to fight");
        $(enemyHeroId).hide(); // hides enemy if defeated
        hasAttacked = false; // switch to turn auto attack off
        enemyPicked = false;
       
    } 
    if (hasAttacked && userHero.hp > 0) {   // main content of this, this is the attack function thats set on the timer above
        enemyDamage = enemyHero.attack;
        userHero.hp = userHero.hp - enemyDamage;
    $(enemyHeroId).animate({left: '-=50px'}).animate({left: '+=50px'});  //enemy attk animate
    
        updateStatsHero(); // updates new userHero stats after attack, slight delay ***fix this
    }
    
    else if (hasAttacked && userHero.hp <= 0) {  // will be remomving with the defeat alert *has page reload in it
        
                alert("Your character has died and now the earth is doomed. Next time bring your A game.\nClick ok to restart the game.");
                location.reload(); // page reload

    }
   
    if (enemyKDs === 3) {
        alert("you win!");
    }
    
    };



// updates the stats per attack
    function updateStatsEnemy(){
    setStats(enemyHeroStatsId, enemyHero);
 
 
    };
// updates the stats per attack

    function updateStatsHero(){
    setStats(userHeroStatsId, userHero);
  
    };
//specailAttk1
    $("#specialBtn1").click(function (){
        if (enemyPicked){
        if(userHero.hp <= 0) {
            alert("Your character has died and now the earth is doomed. Next time bring your A game.\nClick ok to restart the game.");
            location.reload(); // page reload
           }else if(buttonsActive) {
    setTimeout(function(){
    $(userHeroId).animate({right: '+=50px'}, 700).animate({right: '-=50px'}, 200);

        sp1Damage = userHero.specialOne; // sets dmg for attack
        enemyHero.hp = enemyHero.hp - sp1Damage; // sets new enemyHero hp 
        hasAttacked = true; // starts the auto attack function for enemy
      
        updateStatsEnemy();
        
    }, 2300); // delay timer to avoid spamming the button
}
        }else {
            alert("You need a target to preform that");
        }

    });


//special attk 2
    $("#specialBtn2").click(function (){
        if (enemyPicked){
        if(userHero.hp <= 0) {
            alert("Your character has died and now the earth is doomed. Next time bring your A game.\nClick ok to restart the game.");
            location.reload(); // page reload
           } else if (buttonsActive) {
        setTimeout(function(){           
        $(userHeroId).animate({right: '+=50px'}, 1100).animate({right: '-=150px'}, 100).animate({right: '+=100px'}, 200);    
        sp2Damage = userHero.specialTwo;
        enemyHero.hp = enemyHero.hp - sp2Damage;
        hasAttacked = true; // starts auto attack function for enemy 
     
    updateStatsEnemy();    
    }, 3300); // delay timer to avoid spamming the button
}
    }else {
        alert("You need a target to preform that");
    }
});

// shout out credit goes to jackwanders on stackover flow for this, i made my own version however it wasnt excuting  well
// im also out of time again sooo..... sadly jack gave me this win. 
$('#attack').click(function(){
    var attackButton = $(this);
    attackButton.prop('disabled',true);
    window.setTimeout(function(){ 
    attackButton.prop('disabled',false);
    },1000);
});

$('#specialBtn1').click(function(){
    var specialButton1 = $(this);
    specialButton1.prop('disabled',true);
    window.setTimeout(function(){ 
    specialButton1.prop('disabled',false);
    },2300);
});

$('#specialBtn2').click(function(){
    var specialButton2 = $(this);
    specialButton2.prop('disabled',true);
    window.setTimeout(function(){ 
    specialButton2.prop('disabled',false);
    },3300);
});
  
document.onkeyup = function(event) {
    

if (event.keyCode === 49) {
    // Trigger the button element with a click
    $("#attack").click();
  }
if (event.keyCode === 50){
    $("#specialBtn1").click();
}
if (event.keyCode === 51){
    $("#specialBtn2").click();
}

}



//Create the audio tag
var soundFile = document.createElement("audio");
soundFile.preload = "auto";

//Load the sound file (using a source element for expandability)
var src = document.createElement("source");
src.src = fileName + ".mp3";
soundFile.appendChild(src);

//Load the audio tag
//It auto plays as a fallback
soundFile.load();
soundFile.volume = 0.000000;
soundFile.play();

//Plays the sound
function play() {
   //Set the current time for the audio file to the beginning
   soundFile.currentTime = 0.01;
   soundFile.volume = volume;

   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){soundFile.play();},1);
}