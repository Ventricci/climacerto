import styled from "styled-components";

interface SidebarContainerProps {
  width: number;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${props => `${props.width}px`};
  background: white;
  border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  cursor: grab;
  touch-action: none;
  
  &:active {
    cursor: grabbing;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 40px;
    background: radial-gradient(circle, #666 1.5px, transparent 1.5px);
    background-size: 6px 8px;
    background-repeat: repeat-y;
    opacity: 0.8;
    transition: all 0.3s ease;
    border-radius: 3px;
  }
  
  &:hover::after {
    opacity: 1;
    background: radial-gradient(circle, #333 1.5px, transparent 1.5px);
    background-size: 6px 8px;
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PlaceholderChart = styled.div`
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #6c757d;
  font-size: 0.9rem;
`;
