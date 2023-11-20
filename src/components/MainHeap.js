import { useState } from "react";
import { instruction } from "../assets/script/heap";
import styled from "styled-components";

export default function MainHeap() {

    const [nForms, setNForms] = useState(1);

    function handleForm(e){
        e.preventDefault();
        
    }

    const operation = (n) => {
        let template = (
            <TemplateForm onSubmit={handleForm}>
                <TemplateInput required type="op1" name="op1" />
                <TemplateInput required type="op2" name="op2" />
                <TemplateInput required type="op3" name="op3" />
                <TemplateButton type="submit" > go! </TemplateButton>
            </TemplateForm>
        );
        let ret = <></>;
        for(;n!=0;n--)
            ret = <>{template}{ret}</>;
        return ret;
    }

    return (
      <>
        {operation(nForms)}
        <Container>
        <TemplateButton onClick={()=> setNForms(nForms+1)} > + </TemplateButton>
        {nForms > 1? <TemplateButton onClick={()=> setNForms(nForms-1)} > - </TemplateButton> : ""}
        </Container>
      </>
    );
}

const Container = styled.div`
    display: flex;
`;

const TemplateForm = styled.form`
    display: flex;
`;

const TemplateInput = styled.input`
    width: 60px;
    height: 60px;
    background: #FFFFFF;
    border-radius: 5px;
    font-size: 20px;
    font-family: 'Raleway';
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