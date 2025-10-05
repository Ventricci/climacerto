import styled from "styled-components";

export const CardContainer = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const IconContainer = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border: 2px solid #573B88;
`;

export const CardHeader = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 100%;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
