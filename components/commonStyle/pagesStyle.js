import styled from 'styled-components'
export const MainWrapper = styled.div`
    width:100%;  
    background-color:#ffffff;
    display:flex;
    justify-content:center;
`;

export const ContentWapper = styled.div` 
  padding : ${props =>props.padding ? props.padding :'0px 55px 0px 55px'};
  width : ${props =>props.width ? props.width :'100%'};
  display:flex;
  flex-direction:column;
  
`;

export const AnchorMain = styled.div`
    width:99.3vw;
    height:${props => props.height ? props.height : '86vh'};
    overflow:hidden;
    background-color:#ffffff;
    display:flex;
    justify-content:space-between;
`; 
export const WrapperMenu = styled.div`
    overflow:hidden;
    width:${props => props.showSidebar ? "20%" : "20%"};
    height:100vh; 
    background-color: #333333; //rgb(26, 26, 26); //#64b4db; 
    .menu_content {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-direction:column;
    color:#000;
    }
`;

export const MainLabel = styled.div` 
    height: 43px;
    width:100%;
    align-items : center;
    padding-left : 10px;
    display:flex;
        img{
            width:10px;
            height:20px;
            margin-right:20px;
        }
        .text{
            font-family: Asap;
            font-size: 30px; 
            font-stretch: normal;
            font-style: normal;
            line-height: 1.3;
            letter-spacing: normal;
            text-align: left;
            color: #333333; 
        
        }
`;

export const Icon = styled.div`
    margin:auto;
    margin-right:10px;
  
`;
export const Text = styled.div`
    display:${props => props.textShow ? "inline" : "none"};
    font-weight:bold;
    font-size:14px;
`;
export const SwitchText = styled.div`
    display:${props => props.textShow ? "inline" : "none"};
    font-family: Asap; 
    font-size: 16px;
    display : flex;
    font-weight: bold;
    font-stretch: normal; 
    font-style: normal;
    line-height: 1.29;
    letter-spacing:normal; 
    color:#ffffff;
    text-transform:uppercase;
    &:hover{
        color:#00aeef;
    }
`;

export const LinkWapper = styled.div`
    display:${props => props.isVisible === true ? "flex" : 'none'};
    justify-content:space-between;
    padding: 10px 35px; 
    font-weight : bold;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.isLinkActive === true ? "#00aeef" : '#ffffff'};
    &:hover{
        animation: spinAround 2s linear infinite;
        color:  ${props => props.isLinkActive === true ? "#ffffff" : '#00aeef'};
    }
`;
export const SwitchLinkWapper = styled.div`
    display:${props => props.isVisible === true ? "flex" : 'none'};
    justify-content:space-between;
    padding:${props => props.padding ? props.padding : '10px 30px 0px 30px'} ; 
    font-weight : bold;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.isLinkActive === true ? "#00aeef" : '#ffffff'};
    &:hover{
        color:  ${props => props.isLinkActive === true ? "#ffffff" : '#00aeef'};
    }
`;

export const MenuItems = styled.div`
    font-family: Asap;
    min-height:20px;
    font-size: 16px;
    display : flex;
    font-weight: bold;
    font-stretch: normal;
    padding: 10px 30px; 
    font-style: normal;
    line-height: 1.29;
    letter-spacing:normal;
    text-align: left;
    text-transform:uppercase;
    cursor:pointer;
    color:  ${props => props.isActive === true ? '#00aeef' : '#ffffff'} ;
        padding-bottom:0px;
    .imgDown{
        margin-left:9px;
        width: 6px;
        height: 12px;
        transform: rotate(90deg);
    }
    &:hover{
        color:  ${props => props.isActive === true ? '#ffffff' : '#00aeef'} ;
    }
    .imgUp{
        margin-left:9px;
        width: 6px;
        height: 12px;
        transform: rotate(-90deg);
    }
`;
