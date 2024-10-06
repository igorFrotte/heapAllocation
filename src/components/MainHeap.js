import { useState } from "react";
import { instruction, heap, pointers, method, setMethod, msgErro } from "../assets/script/heap";
import git from "../assets/img/git.png";
import styled from "styled-components";

export default function MainHeap() {

    const [nForms, setNForms] = useState(1);
    const [heapList, setHeapList] = useState(heap);
    const [att, setAtt] = useState(true);

    function setMet(valor){
        setMethod(valor);
        setAtt(!att);
    }

    function handleForm(e){
        e.preventDefault();
        instruction(e.target[0].value);  
        setHeapList([...heap]);
    }

    const operation = (n) => {
        let template = (
            <TemplateForm onSubmit={handleForm}>
                <TemplateInput required type="command" name="command" />
                <TemplateButton color="#031634" type="submit" > go! </TemplateButton>
            </TemplateForm>
        );
        let ret = <></>;
        for(;n!==0;n--)
            ret = <>{template}{ret}</>;
        return ret;
    }

    return (
      <Page>
        <div>
        <TemplateButton color={method === "first"? "#031634" : "#447390"} onClick={()=> setMet("first")} > First </TemplateButton>
        <TemplateButton color={method === "best"? "#031634" : "#447390"} onClick={()=> setMet("best")} > Best </TemplateButton>
        <TemplateButton color={method === "worst"? "#031634" : "#447390"} onClick={()=> setMet("worst")} > Worst </TemplateButton>
        <TemplateButton color={method === "next"? "#031634" : "#447390"} onClick={()=> setMet("next")} > Next </TemplateButton>
        </div>
        {operation(nForms)}
        <Container>
        <TemplateButton color="#031634" onClick={()=> setNForms(nForms+1)} > + </TemplateButton>
        {nForms > 1? <TemplateButton color="#031634" onClick={()=> setNForms(nForms-1)} > - </TemplateButton> : ""}
        </Container>
        <Heap>
            {heapList.map( (e, i) => <div className={e? "green" : "red"} key={i}></div>)}
        </Heap>
        <MsgE>{msgErro}</MsgE>
        <Pointers>
            {pointers.map( (e, i) => <div key={i}>
                <div>{e.names.map( (el) => el+" ")}</div>
                <div>
                    <div>Inicial:</div>
                    <div>{e.init}</div>
                </div>
                <div>
                    <div>Tamanho:</div>
                    <div>{e.length}</div>
                </div>
            </div>)}
        </Pointers>
        <Legend>
                <p>Exemplo:</p>
                <div>new a 3</div>
                <div>new b 2</div>
                <div>new c 4</div>  
                <div>d = b</div>
                <div>del d</div>
                <div>new e 1</div>            
        </Legend>
        <Git href="https://github.com/igorFrotte/heapAllocation">
            <img src={git} />
        </Git>
      </Page>
    );
}

const Git = styled.a`
    position: fixed;
    top: 30px;
    right: 30px;
    
    img {
        width: 80px;
        border-radius: 20px;
    }

`;

const MsgE = styled.div`
    color: #c33;
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0px;
`;

const Legend = styled.div`
    display: flex;
    z-index: -1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #447390;
    border-radius: 20px;    
    border: solid #031634 2px;
    margin: 15px;
    padding: 10px;
    font-family: 'Raleway';

    p {
        font-weight: bold;
        margin: 5px;    
    }
`;

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway';

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Pointers = styled.div`
    & > div {
        background-color: #447390;
        width: 150px;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        flex-direction: column;

        & > div:first-child {
            font-weight: bold;
            font-size: 22px;
        }

        & > div {
            display: flex;
            margin: 3px;
            font-size: 18px;

            & > div {
                padding: 0 5px;
            }
        }
    }
`;

const Heap = styled.div`
    display: flex;
    div {
        width: 40px;
        height: 40px;
        margin: 8px;
        border-radius: 10px;
        border: 2px black solid;
    }
    .green {
        background-color: green;
    }
    .red {
        background-color: red;
    }
`;

const Container = styled.div`
    display: flex;
`;

const TemplateForm = styled.form`
    display: flex;
`;

const TemplateInput = styled.input`
    width: 300px;
    height: 60px;
    background: #FFFFFF;
    border-radius: 5px;
    font-size: 20px;
    color: #031634;
    padding-left: 10px;
    margin: 10px;
`;

const TemplateButton = styled.button`
    width: 60px;
    height: 60px;
    background: ${props => props.color};
    border-radius: 5px;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    cursor: pointer;
    font-weight: 700;
    margin: 10px;
`;