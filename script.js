let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear any existing timers  
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds *1000;
    dispalyTimeleft(seconds);
    displayEndTime(then);
    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //when to stop the function 
        if (secondsLeft < 0){
            clearInterval(countDown);
            return ;
        }
        dispalyTimeleft(secondsLeft);
    },1000);
}

function dispalyTimeleft(seconds){
    const minutes = Math.round(seconds/60);
    const remainSeconds = seconds%60;
    const dispaly = `${minutes} : ${remainSeconds <10 ? '0': ''}${remainSeconds}`;
    timerDisplay.textContent = dispaly;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour} : ${minutes <10 ? '0': ''}${minutes}`;   
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
    console.log(mins);
});
