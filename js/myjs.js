class Game{
  constructor(){
    this.gameSection = document.querySelector('#game');
    this.shirt = 'girl';
    this.difficulty = '5/2';
    this.cardsOnScreen = 10;
    this.cards = [{id:1,value:"img/1.png"},{id:1,value:"img/1.png"},
                  {id:2,value:"img/2.png"},{id:2,value:"img/2.png"},
                  {id:3,value:"img/3.png"},{id:3,value:"img/3.png"},
                  {id:4,value:"img/4.png"},{id:4,value:"img/4.png"},
                  {id:5,value:"img/5.png"},{id:5,value:"img/5.png"},
                  {id:6,value:"img/6.png"},{id:6,value:"img/6.png"},
                  {id:7,value:"img/7.png"},{id:7,value:"img/7.png"},
                  {id:8,value:"img/8.png"},{id:8,value:"img/8.png"},
                  {id:9,value:"img/9.png"},{id:9,value:"img/9.png"},
                  {id:10,value:"img/10.png"},{id:10,value:"img/10.png"},
                  {id:11,value:"img/11.png"},{id:11,value:"img/11.png"},
                  {id:12,value:"img/12.png"},{id:12,value:"img/12.png"}];
    this.currentCards = [{id:1,value:"img/1.png"},{id:1,value:"img/1.png"},
                         {id:2,value:"img/2.png"},{id:2,value:"img/2.png"},
                         {id:3,value:"img/3.png"},{id:3,value:"img/3.png"},
                         {id:4,value:"img/4.png"},{id:4,value:"img/4.png"},
                         {id:5,value:"img/5.png"},{id:5,value:"img/5.png"}];

    this.timer;
    this.countOfClicks = 0;
    this.twoCards = [];

    this.onGameProcess = this.onGameProcess.bind(this);
    this.onPlayerWin = this.onPlayerWin.bind(this);

    this.player = {};
    this.currentplayer;


  }
  addInitialListeners(){

    const shirts = document.querySelector('#shirts');
    shirts.addEventListener('click',this.pickShirt.bind(this));

    const level = document.querySelector('#level');
    level.addEventListener('click',this.pickLevel.bind(this));

    const submit = document.getElementById('form');
    submit.addEventListener('submit',this.sendInfo.bind(this));

    const startButton = document.querySelector('#startButton');
    startButton.addEventListener('click',this.startGame.bind(this));
  }

  sendInfo(event){
    const FirstName = document.querySelector('.first-name');
    const LastName = document.querySelector('.last-name');
    const email = document.querySelector('.email');
    const submit = document.querySelector('#form');
    const form = document.querySelector('.form');
    const submited = document.querySelector('.submited');

    submit.classList.remove("formdidntsend");
    submit.classList.add("formsent");
    submited.style.display = 'block';

    this.player.FirstName = FirstName.value;
    this.player.LastName = LastName.value;
    this.player.email = email.value;
    this.player.scoreOnDifficulty52 = 0;
    this.player.scoreOnDifficulty63 = 0;
    this.player.scoreOnDifficulty83 = 0;


    let length = Object.keys(localStorage).length + 1;

    this.currentplayer = 'player' + length;
    localStorage.setItem(this.currentplayer, JSON.stringify(this.player));
    event.preventDefault();

  };

  startGame(e){
    
    const submited = document.querySelector('.submited');
    if(submited){
      if(submited.style.display === 'none'){
        alert('fill out the form below');
        return;
      };
    };
    
  
    clearInterval(this.timer);
    this.gameSection.removeEventListener('click', this.onGameProcess);
    this.cardsOnScreen = this.difficulty[0] * this.difficulty[2];
    this.twoCards = [];
    this.countOfClicks = 0;
    if(this.cardsOnScreen === 10){
      this.shuffleCards(this.currentCards);
      let output = '';
      for(let i = 0; i < this.currentCards.length; i++){
        if (i < 5){
          output +='<div class="cards-low-firstrow flip3d" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="120" height="120"></div></div>';
        }else{
         output +='<div class="cards-low-secondrow flip3d" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="120" height="120"></div></div>';
        }
      }
      output +='<div id="time"></div>';
      document.querySelector('#game').innerHTML = output;
    }
    else if (this.cardsOnScreen === 18) {
      this.shuffleCards(this.currentCards);
      let output = '';
      for(let i = 0; i < this.currentCards.length; i++){
        if(i<6){
          output +='<div class="cards-medium-firstrow flip3d-medium" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }else if (i >= 6 && i < 12) {
          output +='<div class="cards-medium-secondrow flip3d-medium" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }else{
          output +='<div class="cards-medium-thirdrow flip3d-medium" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }

      }
      output +='<div id="time"></div>';
      document.querySelector('#game').innerHTML = output;
    }
    else if (this.cardsOnScreen === 24){
      this.shuffleCards(this.currentCards);
      let output = '';
      for(let i = 0; i < this.currentCards.length; i++){
        if(i < 8){
          output +='<div class="cards-hight-firstrow flip3d-hight" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }else if (i >= 8 && i < 16) {
          output +='<div class="cards-hight-secondrow flip3d-hight" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }else{
          output +='<div class="cards-hight-thirdrow flip3d-hight" id=" '+this.currentCards[i].id+' " data-value="'+this.currentCards[i].value+'"><div class="back" style="background-image:url(img/'+this.shirt+'.png); background-repeat: no-repeat; background-position:center;"></div><div class="front"><img src="'+this.currentCards[i].value+'" width="100" height="100"></div></div>';
        }
      }
      output +='<div id="time"></div>';
      document.querySelector('#game').innerHTML = output;
    }
    let sec = 60;
    let count = 0;
    this.timer = setInterval(()=>{
      let time = document.querySelector('#time');
      if(count === 0){
        time.innerHTML = '2:00';
      }else if (count > 0 && count <= 50) {
        time.innerHTML = '1:'+sec+'';
      }else if (count >50 && count <= 59 ) {
        time.innerHTML = '1:0'+sec+'';
      }else if (count === 60) {
        time.innerHTML = '1:00';
        sec = 60;
      }else if (count > 60 && count <= 110) {
        time.innerHTML = '0:'+sec+''
      }else if (count > 110) {
        time.innerHTML = '0:0'+sec+''
      }
      count++;
      sec--;
      if(sec === -2){
        clearInterval(this.timer);
        this.onPlayerLose();
      }
    }, 1000);
    this.gameSection.addEventListener('click', this.onGameProcess);
  }

  onGameProcess (e) {
  	let target = e.target;
    let back = document.querySelectorAll('.back');
    for (let i = 0; i < back.length; i++){
      if(target === back[i]){
        target.style.cssText="transform: perspective(600px) rotateY(-180deg);"
        target.style.backgroundImage = 'url(img/'+this.shirt+'.png)';
        target.style.backgroundRepeat = 'no-repeat';
        target.style.backgroundPosition = 'center';
        target.nextElementSibling.style.cssText="transform: perspective(600px) rotateY(0);";

        this.countOfClicks++;

        this.twoCards.push(target.parentNode);
      }
    }

    let twoCardsTwin = this.twoCards;
    let shirtNew = this.shirt;
    let gameSectionNew = this.gameSection;

    if(this.countOfClicks === 2){
      this.gameSection.removeEventListener('click', this.onGameProcess);
      if(this.twoCards[0].dataset.value === this.twoCards[1].dataset.value){
        setTimeout(function(){
          twoCardsTwin[0].style.visibility = "hidden";
          twoCardsTwin[1].style.visibility = "hidden";
        },2000);
        this.cardsOnScreen -= 2;
        if(this.cardsOnScreen === 0){
          if(this.difficulty === '5/2'){
            this.player.scoreOnDifficulty52 = time.innerHTML;
            localStorage.setItem(this.currentplayer, JSON.stringify(this.player));
          } else if (this.difficulty === '6/3'){
            this.player.scoreOnDifficulty63 = time.innerHTML;
            localStorage.setItem(this.currentplayer, JSON.stringify(this.player));
          } else if(this.difficulty === '8/3'){
            this.player.scoreOnDifficulty83 = time.innerHTML;
            localStorage.setItem(this.currentplayer, JSON.stringify(this.player));
          };
          clearInterval(this.timer);
          setTimeout(this.onPlayerWin, 3000);

        }
      } else {
        setTimeout(function(){
          twoCardsTwin[0].firstElementChild.style.cssText="transform: perspective(600px) rotateY(0);";
          twoCardsTwin[0].firstElementChild.style.backgroundImage = 'url(img/'+shirtNew+'.png)';
          twoCardsTwin[0].firstElementChild.style.backgroundRepeat = 'no-repeat';
          twoCardsTwin[0].firstElementChild.style.backgroundPosition = 'center';
          twoCardsTwin[0].lastElementChild.style.cssText="transform: perspective(640px) rotateY(180);";
          twoCardsTwin[1].firstElementChild.style.cssText="transform: perspective(600px) rotateY(0);";
          twoCardsTwin[1].firstElementChild.style.backgroundImage = 'url(img/'+shirtNew+'.png)';
          twoCardsTwin[1].firstElementChild.style.backgroundRepeat = 'no-repeat';
          twoCardsTwin[1].firstElementChild.style.backgroundPosition = 'center';
          twoCardsTwin[1].lastElementChild.style.cssText="transform: perspective(640px) rotateY(180);";
        },2000);
      }
      this.countOfClicks = 0;
      this.twoCards = [];
      setTimeout(()=>{this.gameSection.addEventListener('click', this.onGameProcess);},2000);
    }
  }

  pickShirt(e){
    let target = e.target;
    for(let i = 0; i < shirts.children.length; i++){shirts.children[i].style.background = 'white';}
    if(target.tagName === 'IMG'){target.parentNode.style.background = 'yellow'; this.shirt = target.dataset.img;}
    else{target.style.background = 'yellow'; this.shirt = target.firstElementChild.dataset.img;}
  }

  pickLevel(e){
    let target = e.target;
    for(let i = 0; i < level.children.length; i++){level.children[i].style.background = 'white';}
    target.style.background = 'yellow';
    this.difficulty = target.dataset.dif;
    this.addCards();
  }

  addCards(){
    this.cardsOnScreen = this.difficulty[0] * this.difficulty[2];
    this.currentCards = this.cards.slice(0,this.cardsOnScreen);
  }

  shuffleCards(arr){
    let i = arr.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
  }

  onPlayerWin() {
    this.gameSection.innerHTML = '<div class="lost">Congratulation, you won!</div>';
    this.gameSection.innerHTML += '<div class="table"><table id="table"><caption>Best 10 results</caption><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Time left playing 5 on 2</th><th>Time left playing 6 on 3</th><th>Time left playing 8 on 3</th></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr><tr><td class="table-first-name">none</td><td class="table-last-name">none</td><td class="table-email">none</td><td class="table-five-on-two">0</td><td class="table-six-on-three">0</td><td class="table-eight-on-three">0</td></tr></table></div>';

    const table = document.getElementById('table');

    table.style.display = 'block';


    let array = Object.values(localStorage);
    array.forEach((item,i,arr)=>{

      array[i] = JSON.parse(item);
    });
    
    array.sort((a, b) => {
      if(this.difficulty === '5/2'){
        if (a.scoreOnDifficulty52 < b.scoreOnDifficulty52) {
          return 1;
        }
        if (a.scoreOnDifficulty52 > b.scoreOnDifficulty52) {
          return -1;
        }
      }else if (this.difficulty === '6/3'){
          if (a.scoreOnDifficulty63 < b.scoreOnDifficulty52) {
            return 1;
          }
          if (a.scoreOnDifficulty63 > b.scoreOnDifficulty52) {
            return -1;
        }
      } else if(this.difficulty === '8/3'){
          if (a.scoreOnDifficulty83 < b.scoreOnDifficulty52) {
            return 1;
          }
          if (a.scoreOnDifficulty83 > b.scoreOnDifficulty52) {
            return -1;
        }
      }      
      return 0;
    });

   
    if(array.length < 10){
      for(let index = 0; index < array.length; index++){
        table.rows[index+1].cells[0].innerHTML = array[index].FirstName;
        table.rows[index+1].cells[1].innerHTML = array[index].LastName;
        table.rows[index+1].cells[2].innerHTML = array[index].email;
        table.rows[index+1].cells[3].innerHTML = array[index].scoreOnDifficulty52;
        table.rows[index+1].cells[4].innerHTML = array[index].scoreOnDifficulty63;
        table.rows[index+1].cells[5].innerHTML = array[index].scoreOnDifficulty83;
      };
    } else {
      for(let index = 0; index < 10; index++){
        table.rows[index+1].cells[0].innerHTML = array[index].FirstName;
        table.rows[index+1].cells[1].innerHTML = array[index].LastName;
        table.rows[index+1].cells[2].innerHTML = array[index].email;
        table.rows[index+1].cells[3].innerHTML = array[index].scoreOnDifficulty52;
        table.rows[index+1].cells[4].innerHTML = array[index].scoreOnDifficulty63;
        table.rows[index+1].cells[5].innerHTML = array[index].scoreOnDifficulty83;
      };
    }

  }

  onPlayerLose () {
  	this.gameSection.innerHTML = '<div class="lost">You lost</div>';
  }
}

const game = new Game;
game.addInitialListeners();
