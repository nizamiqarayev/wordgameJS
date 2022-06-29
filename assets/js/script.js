const body=document.querySelector('body')

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const words=[
    {
        word:"penguin",
        description:"A penguin has a large head, short neck, and elongated body. The tail is short, stiff, and wedge-shaped. The legs and webbed feet are set far back on the body, which gives penguins their upright posture on land."

    },
    {
        word:"amongus",
        description:"gregory, do you see the small vent on the floor? have you ever heard of among us, gregory? you need to vent. i know it will be hard for you to be sus but i know you can do it gregory."
        
    },
    {
        word:"minecraft",
        description:"Minecraft is a 3-D computer game where players can build anything. The game which has been described as like an 'online Lego' involves building blocks and creating structures across different environments and terrains. Set in a virtual world the game involves resource gathering, crafting items, building, and combat."
        
    }
]
let currentindex
let currentwordlength=0
let currentletterindex=0


let score=10


let interval

function loadgame(){
    document.getElementById('time').style.display="block"
    document.getElementById('score').style.display="block"
    const word=document.getElementById('word')
    const keyboard=document.getElementById('alphabet')
    document.getElementById('startbutton').style.display='none'

    let x = Math.floor((Math.random() * words.length));
    loadword(x,word)
    loadkeyboard(keyboard)
    document.getElementById('nextword').style.display="block"
    document.getElementById('hint').style.display="block"
   interval=timer()
    scoredisplayer(score)

    console.log(words[currentindex].word)
}

function loadword(wordindex,div)
{   console.log(words[wordindex].word)
    for(let i=0;i<words[wordindex].word.length;i++){
        let tempdiv=document.createElement('div')
        tempdiv.setAttribute('class','wordcell')
        div.appendChild(tempdiv)
    }
    currentindex=wordindex
    console.log(currentindex)
    currentwordlength=words[wordindex].word.length

}



function loadnextword(){
    let x
    while(true){
         x = Math.floor((Math.random() * words.length));
        if(x==currentindex){
            continue
        }
        else{
            break
        }
    }
    const word=document.getElementById('word')
    word.innerHTML=""
    for(let i=0;i<words[x].word.length;i++){
        let tempdiv=document.createElement('div')
        tempdiv.setAttribute('class','wordcell')
        word.appendChild(tempdiv)
    }
    if(document.getElementById('hintdiv')!=null){
        document.getElementById('actions').removeChild(document.getElementById('hintdiv'))

        }
    currentwordlength=words[x].word.length
    currentletterindex=0
    currentindex=x

}
function loadkeyboard(div){
    for(let i=0;i<alphabet.length;i++){
        let tempdiv=document.createElement('div')
        tempdiv.setAttribute('class','keyboardcell')
        tempdiv.id=alphabet[i]
        tempdiv.innerText=alphabet[i]
        tempdiv.addEventListener('click',function(){
            insertLetter(i)
        })
        div.appendChild(tempdiv)
    }
    currentletterindex=0

}


function insertLetter(letter){
    console.log(currentindex)
    const currentword=words[currentindex].word.toUpperCase()
    console.log(currentword.length)
    if(currentletterindex<currentword.length-1){
        const buttons=document.getElementsByClassName('keyboardcell')
        const wordcells=document.getElementsByClassName('wordcell')
        if(words[currentindex].word.toUpperCase().match(buttons[letter].id)){
            console.log(currentletterindex)

            let letterindexes=[]
            
            for (let index = 0; index < words[currentindex].word.toUpperCase().length; index++) {
                if (words[currentindex].word.toUpperCase()[index] === buttons[letter].id) {
                    letterindexes.push(index);
                }
              }

            console.log(letterindexes+" index")
            for (let index = 0; index < letterindexes.length; index++) {
                wordcells[letterindexes[index]].innerText=buttons[letter].id                
            }
           
            currentletterindex++;
        }
        else{
            score-=1
            scoredisplayer(score)
            if(score==0){
                resultchecker()
            }
        }
        
    }
    else{
        
        const buttons=document.getElementsByClassName('keyboardcell')
        const wordcells=document.getElementsByClassName('wordcell')
        console.log(currentletterindex)
        wordcells[currentletterindex].innerText=buttons[letter].id
        resultchecker()
    }
   
}

function resultchecker(){
    const wordcells=document.getElementsByClassName('wordcell')
    let insertedword=''
    for(let i=0;i<wordcells.length;i++){
        insertedword=insertedword+wordcells[i].innerText
    }
    

        if(insertedword==words[currentindex].word.toUpperCase()){
            clearInterval(interval)
            timer()
            score+=5
            scoredisplayer(score)
            loadnextword()
        }
        else{
            if(score==0){
                document.getElementById('primary').style.display='none'
                document.getElementById('utility').style.display='none'
                document.getElementById('header').innerText=`Your final score is ${score}`
    
            }
        }
}
function hintdisplay(){
    if(document.getElementById('hintdiv')!=null){
        document.getElementById('actions').removeChild(document.getElementById('hintdiv'))

    }

    const hintdiv=document.createElement('div')
    hintdiv.setAttribute('class','hintdiv')
    hintdiv.id='hintdiv'
    hintdiv.innerText=words[currentindex].description
    document.getElementById('actions').appendChild(hintdiv)
}


function timer(){
    let time=60
    const timediv=document.getElementById("time")
    timediv.innerText=`Time:${time}`
    const interval=setInterval(function(){
        time-=1
        timediv.innerText=`Time:${time}`
        if(time==0){
            clearInterval(interval)
            document.getElementById('primary').style.display='none'
            document.getElementById('utility').style.display='none'
            document.getElementById('header').innerText=`Your final score is ${score}`
        }
    },1000)
    return interval
    
}
function scoreloss(){
    document.getElementById('primary').style.display='none'
    document.getElementById('utility').style.display='none'
    document.getElementById('header').innerText=`Your final score is ${score}`

}
function scoredisplayer(currentscore){
    document.getElementById('score').innerText=`Score:${currentscore}`

}



