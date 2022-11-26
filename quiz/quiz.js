import { useState } from "react";
let c=[];
let questions= [
    {
        que:"MS-Word is an example of _____   ",
        a:"Application software",
        b:"A processing device",
        c:'An input device',
        d:'An operating system',
        ans:'a'
    },
    {
        que: "Ctrl, Shift and Alt are called .......... keys.",
        a:"alphanumeric",
        b:"function",
        c:'modifier',
        d:'adjustment',
        ans:'c'
    },
    {
        que: "A computer cannot 'boot' if it does not have the _____",
        a:"Compiler",
        b:"Loader",
        c:'Operating system',
        d:'Assembler',
        ans:'c'
    }
];


export default function Main(){
    let[question_number,changeQuestion_Number] = useState(0);
    let [question,setQuestion] = useState(questions);
    let [answers,setAnswers] = useState({});

    let [status,setStatus] = useState('answering')
 
    // console.log(question[question_number]);
    let present_question = question[question_number];

    let p_keys = Object.keys(present_question);

    // console.log(p_keys);

    function next(){
        // setQuestion([question_number+1]);
        if(question_number+1 < questions.length)
            changeQuestion_Number(question_number+1)

        console.log(answers);

        
    }


    function prev(){
        // setQuestion([question_number+1]);
        if(question_number > 0)
            changeQuestion_Number(question_number-1)

        
    }

    function check(e){
        // console.log(question_number);
        // console.log(e.target.id);
        setAnswers({
            ...answers,
            [question_number]:e.target.id
        })
        
    }

    function verify(){

        return new Promise ((resolve,reject)=>{

            
            let correct_answers =[];
            for(let a of questions){
                correct_answers.push(a.ans);
            }        
            console.log(correct_answers);
            // console.log(your_answers);
           setTimeout(()=>{
             c = correct_answers.filter((elem,index) => {
                // console.log(elem,answers[index]);
                if(elem === answers[index]){
                    return elem
                    // console.log(elem);
                }
            })
            resolve("checked")
           },2000); 
            
            // console.log(c);
    })
    }
    async function submit(){
        setStatus('checking')
        try{
            await verify()
            setStatus('checked')
        }
        catch(e){
            console.log(e);
            setStatus("answering")
        }
    }



    if(status === "checked"){
        return <h1 style={{textAlign:"center",marginTop:'50px'}}>{` you answered ${c.length} questions out of ${questions.length}`}</h1>
    }
    return(
        
        <>
            <div style={{height:'100px',width:'400px',marginLeft:'450px',border:'2px solid black',backgroundColor:'whitesmoke',textAlign:'center'}}hidden = {status === 'answering'}>
                <h3>checking ...</h3>
            </div>


            <h1 style={{textAlign:'center'}}>welcome to quiz game</h1>
            <div style={{height:'1px',width:'100vw',border:'2px solid black'}}></div>
            <div style={{textAlign:'center',marginTop:'50px'}} disabled={status == 'checking'}>

                <h2 > {present_question['que']}</h2>
                {p_keys.map((elem)=>{
                    if(elem !== 'ans'){
                        if(elem !== 'que'){
                        return(
                            <div key ={elem} style={{display:'flex',marginLeft:'450px'}}>
                               <label htmlFor={elem} style={{marginTop:'25px'}} onClick={check}>{elem}</label> 
                                <input type="radio" key = {elem} name="choice" id={elem} style={{width:'16px',marginLeft:'30px'}} onClick={check} disabled={status == 'checking'}></input>

                                <h2  style={{marginLeft:'30px'}}>{present_question[elem]}</h2>
                                
                            </div>
                )     }  } })}
            </div>

            <div style={{marginLeft:'600px'}}>
                
                <button style={{height:'30px',textTransform:'capitalize'}} onClick={prev} disabled={question_number === 0 || status === 'checking'}>prev</button>
                            
                <button style={{height:'30px',marginLeft:'30px',textTransform:'capitalize'}} onClick={next} disabled={question_number === questions.length-1 || status === 'checking'}>next</button>
           
                <button style={{height:'30px',marginLeft:'30px',textTransform:'capitalize'}} disabled={question_number !== questions.length-1 || status === 'checking'} onClick={submit}>submit</button>


            </div>

            


        </>
    )
}
