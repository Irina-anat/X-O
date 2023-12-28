const content = document.querySelector(`.js-content`);

let player = `X`;
const historyX = [];
const history0 = [];

//список переможних комбінацій
const wins = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9],
   [1, 4, 7],
   [2, 5, 8],
   [3, 6, 9],
   [1, 5, 9],
   [3, 5, 7],
 ];

function createMarkup() {
    let markup = ``;
//створюю розмітку на 9 кл. з нумерацією клітинок data-id
    for (let i = 1; i <= 9; i += 1){
     markup += `<div class="item js-target" data-id="${i}"></div>`   
    };
 content.innerHTML = markup;
};

createMarkup()

content.addEventListener(`click`, onClick);

    function onClick(evt) {
    const { target } = evt;
    if (!target.classList.contains(`js-target`) || target.textContent ) {
        return;
        }
        
        const { id } = target.dataset;

        let result = false;

        if (player === `X`) {
            historyX.push(Number(id));
            result = historyX.length < 3 ? false : isWinner(historyX);    
        } else {
            history0.push(Number(id)) 
        result = history0.length < 3 ? false : isWinner(history0)   
        }

        target.textContent = player;

        if (result) {
            const instance = basicLightbox.create(`
        <div><h1 class="title-winner">Winner ${player}</h1><div>`,
                {
                    onShow: () => {
                        window.addEventListener('keydown', onEsc);
                    },
                    onClose: () => {
                        window.removeEventListener('keydown', onEsc);
                    },
                },);
            const onEsc = (event) => {
                if (event.code === 'Escape') {
                    instance.close();
                };
            };
            instance.show()            
            resetGame()
            return

        } else if (history0.length + historyX.length === 9) {
            const instance = basicLightbox.create(`<h1 class="title-again">Try again 😂😂😂</h1>`);
      instance.show();
      resetGame();
            return
        };
        player = player === `X` ? `0` : `X`;
};


function isWinner(arrHistory) {
return wins.some(item => item.every(num=>arrHistory.includes(num)))
};


function resetGame() {
    createMarkup();
    player = "X";
    historyX.length = 0;
    history0.splice(0, history0.length);   
};