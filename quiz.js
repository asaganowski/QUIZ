function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


fetch('./questions.json').then(response => {
    return response.json();
}).then(data => {

    
    const submitBtn = document.querySelector('#btn');
    const options = document.querySelector('#category');
    document.getElementsByClassName('checkBtn')[0].style.display='none'
    submitBtn.onclick = (event) => {
       
        event.preventDefault();
        
        const whichCat = options.selectedIndex
        switch (whichCat) {
            case 0: startQuiz(data.javascript)
                break;
            case 1: startQuiz(data.motocykle)
                break;
            case 2: startQuiz(data.siatkowka)
                break;
        }
    
    }
}).catch(err => {
    
});

function startQuiz(category) {
    document.getElementById("container").style.display='none';
    document.getElementsByClassName('checkBtn')[0].style.display='block'
    let numberOfQuest = [];
    numberOfQuest = [getRand(0, 4),
    getRand(0, 4),
    getRand(0, 4)]
    

    while(numberOfQuest[0]==numberOfQuest[2] || 
          numberOfQuest[1]==numberOfQuest[2] || 
          numberOfQuest[1]==numberOfQuest[0]){
            numberOfQuest[2]=getRand(0,4)
            numberOfQuest[1]=getRand(0,4)
    }   

    let questions=["question1","question2","question3"]

    function showQuestions(){
        let quest=[]
        
        for(let i=0;i<numberOfQuest.length;i++){
        
          quest[i]=document.createElement("p")
            quest[i].innerHTML=i+1+". "+category[numberOfQuest[i]].quest;
            document.getElementsByClassName(questions[i])[0].appendChild(quest[i])
            quest[i].classList.add="questions"
        }
    }
    const nav=["firstQuestAnswers","secondQuestAnswers","thirdQuestAnswers"]
            
    function showPossibleAnswers(whichQuest, IdInHTML){
      
        let radioInput=[]
        let label=[]

    for(let i=0;i<questions.length;i++){
        
         label[i] = document.createElement("label");
         radioInput[i] = document.createElement("input");
         radioInput[i].type = "radio";
         radioInput[i].name=IdInHTML[whichQuest]
         radioInput[i].value=category[numberOfQuest[whichQuest]].answers[i]
         const id = i.toString()+whichQuest.toString()
         radioInput[i].id = id
         label[i].setAttribute("for", id);
         label[i].innerHTML = category[numberOfQuest[whichQuest]].answers[i]+"<br>";
     
         radioInput[i].classList.add('answBtn');
         label[i].classList.add('answBtn');
    
          // console.log(answer[1].id)
           document.getElementsByClassName(IdInHTML[whichQuest])[0].appendChild(radioInput[i])
           document.getElementsByClassName(IdInHTML[whichQuest])[0].appendChild(label[i])
        }
           
     }
    
     showQuestions();

for(let i=0;i<3;i++)
    showPossibleAnswers(i,nav)

const radioInput=document.querySelectorAll("input.answBtn")
const label=document.querySelectorAll("label.answBtn")

let points=0
function checkAnswers() {
    
     for (i=0; i < radioInput.length; i++) {
          
        if (radioInput[i].value == category[numberOfQuest[0]].correctAnswer ||  
            radioInput[i].value == category[numberOfQuest[1]].correctAnswer ||
            radioInput[i].value == category[numberOfQuest[2]].correctAnswer){	
                   
                label[i].style.color="green"
              
            if(radioInput[i].checked)
                    points+=1;					
        }

    }
}


  let name=document.getElementsByClassName('nameInput')[0].value
  const checkBtn=document.querySelector('.checkBtn')
  checkBtn.addEventListener('click', ()=>{
      points=0;
      checkAnswers();
    if(name.endsWith('a')){
        document.getElementById('id').innerHTML=name+", zdobylas "+points+'/3 pkt';
    }else if(name==""){
        document.getElementById('id').innerHTML="Otrzymano "+points+'/3 pkt';
    }else{
        document.getElementById('id').innerHTML=name+", zdobyles "+points+'/3 pkt';
        
    }
    document.getElementsByClassName('checkBtn')[0].style.display='none'
    
  });
  
}