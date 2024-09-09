let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");
let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");

let curMode = "light"; // Initialize with light mode

modeBtn.addEventListener("click", () => {
    if (curMode === "light") {
        curMode = "dark";
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        modeBtn.textContent = "Light Mode";
    } else {
        curMode = "light";
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        modeBtn.textContent = "Dark Mode";
    }
    console.log(curMode);
});

let turn0 = true; // This is likely for alternating between two players


const resetGame= () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const winPatterns = [ // Typo: 'winPaterns' corrected to 'winPatterns'
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if(turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X"; 
            turn0 = true;    
        }
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide")
    disabledBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
    
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
        } 
    }
};

resetbtn.addEventListener("click", resetGame);

