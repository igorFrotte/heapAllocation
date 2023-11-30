import { useState } from "react";
import { instruction, heap, pointers } from "../assets/script/heap";
import styled from "styled-components";

export default function MainHeap() {

    const [nForms, setNForms] = useState(1);
    const [heapList, setHeapList] = useState(heap);

    function handleForm(e){
        e.preventDefault();
        instruction(e.target[0].value);  
        instruction("exibe");
        setHeapList([...heap]);
    }

    const operation = (n) => {
        let template = (
            <TemplateForm onSubmit={handleForm}>
                <TemplateInput required type="command" name="command" />
                <TemplateButton type="submit" > go! </TemplateButton>
            </TemplateForm>
        );
        let ret = <></>;
        for(;n!==0;n--)
            ret = <>{template}{ret}</>;
        return ret;
    }

    console.log(pointers);

    return (
      <Page>
        {operation(nForms)}
        <Container>
        <TemplateButton onClick={()=> setNForms(nForms+1)} > + </TemplateButton>
        {nForms > 1? <TemplateButton onClick={()=> setNForms(nForms-1)} > - </TemplateButton> : ""}
        </Container>
        <Heap>
            {heapList.map( (e, i) => <div className={e? "green" : "red"} key={i}></div>)}
        </Heap>
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
      </Page>
    );
}

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
        background-color: aqua;
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
    color: #8C11BE;
    padding-left: 10px;
    margin: 10px;
`;

const TemplateButton = styled.button`
    width: 60px;
    height: 60px;
    background: #A328D6;
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