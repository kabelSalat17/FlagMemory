document.addEventListener('DOMContentLoaded', () =>{

    //flags array

    const flagArray = [
        {
            name: 'china',
            img: 'images/china.svg',
            isDone:false
        },
        {
            name: 'china',
            img: 'images/china.svg',
            isDone:false
        },  

        {
            name: 'germany',
            img: 'images/germany.svg',
            isDone:false
        } ,       
        {
            name: 'germany',
            img: 'images/germany.svg',
            isDone:false
        },

        {
            name: 'italy',
            img: 'images/italy.svg',
            isDone:false
        } ,       
        {
            name: 'italy',
            img: 'images/italy.svg',
            isDone:false
        },

        {
            name: 'spain',
            img: 'images/spain.svg',
            isDone:false
        } ,       
        {
            name: 'spain',
            img: 'images/spain.svg',
            isDone:false
        },

        {
            name: 'uk',
            img: 'images/uk.svg',
            isDone:false
        },
        {
            name: 'uk',
            img: 'images/uk.svg',
            isDone:false
        }, 

        {
            name: 'usa',
            img: 'images/usa.svg',
            isDone:false
        },
        {
            name: 'usa',
            img: 'images/usa.svg',
            isDone:false
        },

        {
            name: 'france',
            img: 'images/france.svg',
            isDone:false
        },
        {
            name: 'france',
            img: 'images/france.svg',
            isDone:false
        },

        {
            name: 'iceland',
            img: 'images/iceland.svg',
            isDone:false
        },
        {
            name: 'iceland',
            img: 'images/iceland.svg',
            isDone:false
        },

        {
            name: 'portugal',
            img: 'images/portugal.svg',
            isDone:false
        },
        {
            name: 'portugal',
            img: 'images/portugal.svg',
            isDone:false
        },

        {
            name: 'brazil',
            img: 'images/brazil.svg',
            isDone:false
        },
        {
            name: 'brazil',
            img: 'images/brazil.svg',
            isDone:false
        },

        {
            name: 'argentina',
            img: 'images/argentina.svg',
            isDone:false
        },
        {
            name: 'argentina',
            img: 'images/argentina.svg',
            isDone:false
        },

        {
            name: 'canada',
            img: 'images/canada.svg',
            isDone:false
        },
        {
            name: 'canada',
            img: 'images/canada.svg',
            isDone:false
        },

        {
            name: 'romania',
            img: 'images/romania.svg',
            isDone:false
        },
        {
            name: 'romania',
            img: 'images/romania.svg',
            isDone:false
        },

        {
            name: 'san-marino',
            img: 'images/san-marino.svg',
            isDone:false
        },
        {
            name: 'san-marino',
            img: 'images/san-marino.svg',
            isDone:false
        },

        {
            name: 'turkey',
            img: 'images/turkey.svg',
            isDone:false
        },
        {
            name: 'turkey',
            img: 'images/turkey.svg',
            isDone:false
        },
    ]

    //loading audio

    match = new Audio
    match.src = 'audio/match.mp3'
    lose = new Audio
    lose.src = 'audio/lose.mp3'
    win = new Audio
    win.src = 'audio/win.mp3'

    //randomize array

    flagArray.sort(() => 0.5 - Math.random()) //random order //funct returns range -0.5 to 0.5 

    const grid = document.querySelector(".grid")
    const resultDisplay = document.querySelector('#result')
    let flagsChosen = []
    let flagsChosenId = []
    let flagsWon = []

    //create your board

    function CreateBoard() {
        for (let i = 0; i < flagArray.length; i++) {
            let flag = document.createElement('img')
            flag.setAttribute('src', 'images/board.svg')
            flag.setAttribute('data-id', i)
            flag.addEventListener('click', flipFlag) //When click on img #1 step
            grid.appendChild(flag) //append in grid all board img with different id
        }
    }

    //flip the flag #2 step
    function flipFlag() {
        let flagId = this.getAttribute('data-id') //get data id from flag
        if (!flagArray[flagId].isDone) { //not possible click if flag is guessed
            flagsChosen.push(flagArray[flagId].name) // flag clicked in array
            flagsChosenId.push(flagId) //in other array only the id 
            this.setAttribute('src', flagArray[flagId].img) //give this flag a new src //flip the flag
    
            //the matching starts when 2 flags are in the array
    
            if (flagsChosen.length === 2){
                setTimeout(matching, 500)// #3 step //here the funct for matching //after 500ms
            }
        }


    }

    //matching function #3step
    function matching() {
        let flags = document.querySelectorAll('img')
        const optioneOneId = flagsChosenId[0]
        const optioneTwoId = flagsChosenId[1] //take two id from two different flags

        //matching
        if (!(optioneOneId === optioneTwoId)){ //prevent from double clicked
            if (flagsChosen[0] === flagsChosen[1]) { //if two flags are equal
                match.play()
                //then replace with star img
                flags[optioneOneId].setAttribute('src', 'images/done.svg')
                flags[optioneTwoId].setAttribute('src', 'images/done.svg')
                flagsWon.push(flagsChosen)
                flagArray[optioneOneId].isDone = true //set true if guess
                flagArray[optioneTwoId].isDone = true
            } else {
                flags[optioneOneId].setAttribute('src' , 'images/board.svg')
                flags[optioneTwoId].setAttribute('src' , 'images/board.svg')
                lose.play()
            }
        } else {
            flags[optioneOneId].setAttribute('src' , 'images/board.svg')
            flags[optioneTwoId].setAttribute('src' , 'images/board.svg')
            lose.play()
        }



        flagsChosen = []
        flagsChosenId = [] //clear array //if you guess flags go in flagswon

        resultDisplay.textContent = flagsWon.length
        if (flagsWon.length === flagArray.length/2) {
            resultDisplay.textContent = "You won, congratulations!"
            win.play()
            
        }
    }

    CreateBoard()
})