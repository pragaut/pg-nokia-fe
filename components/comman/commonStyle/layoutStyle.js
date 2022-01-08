import styled from 'styled-components'

export const MainNav = styled.div`
position: fixed;
top: ${props => props.offerPopup ? "70px" : "0px"};
left: 0;
width: 100%;
align-items: center;
color: white;
padding: 0px 0px;
box-sizing: border-box;
display:flex;
justify-content:center;
z-index: 10;
height: 70px;
padding:0px 55px;
box-sizing: border-box;
box-shadow: ${props => props.atHome && props.scrolledCompleteVideo ? undefined : '0 0px 20px 0 rgba(0, 0, 0, 0.50)'};
background-color: #ffffff; 
`;

export const SubMainNav = styled.div` 
width: 100%; 
display:flex;
justify-content:space-between;
height: 70px; 
`;


export const LogoDiv = styled.div`
width : 100px;
height:70px;
display:flex;
justify-content:center;
flex-direction:column;
margin-right:${props => props.marginRight ? props.marginRight : "0px"};
background : ${props => props.bgColor ? props.bgColor : "transparent"};
border : ${props => props.border ? props.border : "0px"};
color:#000;
align-items:center;
.logo{
    width : 100%;
    height:30px;
} 
.sideLogo{
    width : 35%;
    height:40px;
}
&:hover{
    background-color:#0d3e99;
    color:#fff;
} 
`;

export const MainDiv_ForLinkWapper = styled.div`
width : 70%;
height:70px;
display:flex;
justify-content:flex-start;
flex-direction:row;
background : transparent ; 
align-items:center;   
`;
export const LinkMainDiv = styled.div`
width : 200px;
height:70px;
display:flex;
justify-content:center;
background: #19aeef;
flex-direction:column;
// background : ${props => props.bgColor ? props.bgColor : "transparent"};
border : ${props => props.border ? props.border : "0px"};
align-items:center; 
color: #ffffff;
font-size:18px;
font-weight: 900;
text-transform:uppercase;
z-index:10;
cursor:pointer;
&:hover{
    text-decoration: underline;
} 
`;
export const Text = styled.div`
    display: inline ;
    font-weight:bold;
    font-size:14px;
`;
export const LinkWapper = styled.div`
    display:${props => props.isVisible === true ? "flex" : 'none'};
    justify-content:space-between;
    padding: 10px 10px; 
    font-weight : bold;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.isLinkActive === true ? "#ffffff" : '#19aeef'};
    background :  ${props => props.isLinkActive === true ? "#19aeef" : '#ffffff'};
    &:hover{
        animation: spinAround 2s linear infinite;
        color:  ${props => props.isLinkActive === true ? "#19aeef" : '#ffffff'};
        background :  ${props => props.isLinkActive === true ? "#ffffff" : '#19aeef'};
    }
    margin-bottom:2px;
    &:last-child{
        margin-bottom:0px;
    }
    text-transform:capitalize;
`;

export const LinkSubDiv = styled.div`
position:absolute;
display:${props => props.isVisible ? "flex" : "none"};
border : ${props => props.border ? props.border : "0px"};
flex-direction:column; 
width:200px;
z-index:11;
height:auto;
min-height:100px;
top:70px;
background:#ffffff;
padding:0px 0px 25px 0px;  
`;
export const LinkSubDiv_Link = styled.div` 
display: flex;  
flex-direction:column; 
padding:0px 10px;
justify-content:center;
align-items:center;
text-align:center;
font-size:14px;
cursor:pointer; 
background-color:${props => props.isActiveLink ? "#0d3e99" : "transparent"};
width:auto; 
height:100%;    
color:${props => props.isActiveLink ? "#fff" : "black"};
&:hover{
    background-color:#0d3e99;
    color:#fff;
} 
`;

export const MainDiv_ForNav = styled.div` 
display: flex;  
flex-direction:row; 
justify-content:flex-start;
align-items:center;
text-align:left;  
width:70%; 
height:70px;    
`;
export const ProfileDiv = styled.div`
position:absolute;
display:${props => props.isVisible ? "block" : "none"};
width:200px;
z-index:11;
height:auto;
top:70px;
background:#19aeef;
padding:0px 0px 25px 0px;
.account{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    font-size: 14px;
    font-family: Asap;
    font-weight: bold;
    color:#000000;
    padding-right:0px;
    border:1px solid grey;
    border-color: #000;
    
    a{
        color:#ffffff ;
        font-size:17px ;
    }
    &:hover{
        color: #a78b44; 
     div > ul > li >  a{
            color:red  !important;
        }
    } 
  }
 
`;