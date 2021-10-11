import styled from 'styled-components';




export const Input = styled.input`
  width: ${props => props.width || "100%"};
  height:${props => props.height || "57px"};
  border-radius: ${props => props.borderRadius || '29px'};
  border: solid 1px ${props => props.borderColor || '#7c7c7c'};
  background-color: ${props => props.bgColor || 'transparent'};
  font-size: 14px;
  font-weight: normal;
  line-height: 2.86;
  text-align: left;
  color: ${props => props.color || '#777777'};
  padding-left: ${props => props.paddingLeft || "33px"};
  outline: none;
  font-family:Asap;
 &::-webkit-input-placeholder { /* Edge */
  font-size: ${props => props.placeholderFontSize || '14px'} ;
  font-weight: normal;
  line-height: 2.86;
  text-align: ${props => props.placeholderTextalign || 'left'} ;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap;
}

&:-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-size: ${props => props.placeholderFontSize || '14px'} ;
  font-weight: normal;
  line-height: 2.86;
  text-align:${props => props.placeholderTextalign || 'left'} ;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap ;
}

&::placeholder {
  font-size: ${props => props.placeholderFontSize || '14px'} ;
  font-weight: normal;
  line-height: 2.86;
  text-align: ${props => props.placeholderTextalign || 'left'} ;;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap ;
}
 
`;

export const SpanLabelForDDl = styled.span`
color : blue;
font-size:13px;
margin-left : 8px;

`;


export const InputCheckbox = styled.input`
  width: 100%;
  height:${props => props.height || "57px"};
  border-radius: ${props => props.borderRadius || '29px'};
  border: solid 1px ${props => props.borderColor || '#7c7c7c'};
  background-color: ${props => props.bgColor || 'transparent'};
  font-size: 14px;
  font-weight: normal;
  line-height: 2.86;
  text-align: left;
  color: ${props => props.color || '#777777'};
  padding-left: ${props => props.paddingLeft || "33px"};
  outline: none;
  font-family:Asap ;
 &::-webkit-input-placeholder { /* Edge */
  font-size: 14px;
  font-weight: normal;
  line-height: 2.86;
  text-align: left;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap ;
}

&:-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-size: 14px;
  font-weight: normal;
  line-height: 2.86;
  text-align: left;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap ;
}

&::placeholder {
  font-size: 14px;
  font-weight: normal;
  line-height: 2.86;
  text-align: left;
  color: ${props => props.placeholderColor || '#ffffff'};
  font-family:Asap ;
}
`;


// textarea 

export const Textarea = styled.textarea`
    width:${props => props.width || "100%"};
    margin:${props => props.margin || '0px'};
    height: ${props => props.height || '132px'};
    padding: ${props => props.padding || '5px'};
    border-radius: ${props => props.borderRadius || '14px'};
    border: solid 1px ${props => props.borderColor || '#7c7c7c'};
    background-color: ${props => props.bgColor || 'transparent'};
    outline: none;
    padding-left: ${props => props.paddingLeft || "33px"};
    font-size: 14px;
    font-weight: normal;
    line-height: 2.86;
    text-align: left;
    color: #fff;
    resize: none;
    font-family:'Asap', sans-serif ;
`;


// button style 







export const Button = styled.button`
    width:${props => props.width || "100%"};
    margin:${props => props.margin || '0px'};
    height: ${props => props.height || '55px'};
    padding: ${props => props.padding || '0px'};
    border-radius:${props => props.borderRadius || '29px'}; 
    background-color: ${props => {
    if (props.disabled) {
      return props.disabledBGColor || '#b7b5b0'
    }
    return props.bgColor || '#a78b44'
  }
  };
    box-shadow: ${props => props.boxshadow ? props.boxshadow : "0"};
    font-size: ${props => props.fontsize || '17px'} ;
    font-weight: bold;
    line-height:${props => props.lineheight || '2.22'} ;
    text-align: ${props => props.align || 'center'};
    color:${props => {
    if (props.disabled) {
      return props.disabledColor || '#9e9e9d'
    }
    return props.color || '#ffffff'
  }};
    text-transform : ${props => props.textTranform || 'uppercase'};
    border: ${props => props.border || "0px"};
    outline: none;
    cursor: pointer;
    font-family:${props => props.fontfamily ? props.fontfamily : "Asap"};
    transition: all 0.2s;
     z-index :${props => props.zIndex ? props.zIndex : "7"};
    &:hover{
      
       
       background-color: ${props => {
    //  if(props.bgColor === 'transparent'){
    //    return '#eaeaea'
    //  }
    if (props.bgChangeHover) {
      return props.bgChangeHover
    }
    else {
      return
    }
  }};
       color: ${props => {
    if (props.hoverColor) {
      return props.hoverColor
    }
    else {
      return undefined
    }
  }};

       
      // transform: translateY(-3px);
       /* opacity: 0.8; */
    }
    &:active{
       transform: translateY(-2px);
    }
    span{ 
      font-family: Asap;
      display:inline-block;
      font-size:  ${props => props.fontsize || '14px'};
      font-weight: bold;
      letter-spacing: ${props => props.letterspacing || 'normal'}  ;
      line-height: ${props => props.lineheight || '2.86'};
      text-align: ${props => props.align || 'center'};
      color:${props => {
    if (props.disabled) {
      return props.disabledColor || '#9e9e9d'
    }
    return props.color || '#ffffff'
  }};
      text-transform : ${props => props.textTranform || 'uppercase'};
      } 
[class*="icono"] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  box-sizing: border-box;
  &:after,
  &:before {
    content: "";
    box-sizing: border-box;
  }
}
[class*="icono-arrow1"] {
  width: 9px;
  height: 9px;
  border-width: 2.2px 2.2px 0 0;
  border-style: solid;
  margin-left: 14px;
  margin-top: -1px;
  &:before {
    right: 0;
    top: -2.2px;
    position: absolute;
    height: 2.2px;
    box-shadow: inset 0 0 0 32px;
    transform: rotate(-45deg);
    width: 16px;
    transform-origin: right top;
  }
  &[class*="-left"] {
    transform: rotate(45deg);
    &[class*="-up"] {
      transform: none;
    }
    &[class*="-down"] {
      transform: rotate(90deg);
    }
  }
} 
.disabled{
  cursor: not-allowed !important;
}

>div{
  display:none;
    left: 50%;
    z-index:200;
    
    transform: translate(20%, 0%);
    position:absolute;
    width: 301px;
    margin-top:-60px;
    height: auto;
    padding:10px;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.7);
    border: solid 1px #333333;
    background-color: #c3c3c3; 
    font-family: Asap;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    color: #333333; 
    @media(max-width:768px)
    {
        transform: translate(-50%,0%);
    }
}
&:hover{
  >div{
    display:block;
  }
}
`;


export const ButtonWithGradient = styled.button`
    width:${props => props.width || "100%"};
    margin:${props => props.margin || '0px'};
    height: ${props => props.height || '55px'};
    padding: ${props => props.padding || '0px'};    
    border-radius:  ${props => props.borderradius || '29px'};
    box-shadow: ${props => props.boxshadow ? props.boxshadow : "0 3px 6px 0 rgba(0, 0, 0, 0.4)"};
    background-image: ${props => props.backgrundImage || 'linear-gradient(to bottom, #a78b44, #775b21)'};
    font-size: ${props => props.fontsize || '17px'} ;
    font-weight: bold;
    line-height:${props => props.lineheight || '2.22'};
    text-align: ${props => props.align || 'center'};
    color:${props => {
    if (props.disabled) {
      return props.disabledColor || '#9e9e9d'
    }
    return props.color || '#ffffff'
  }};
    text-transform : ${props => props.textTranform || 'uppercase'};
    border: ${props => props.border || "0px"};
    outline: none;
    cursor: pointer;
    font-family:Asap;
    transition: all 0.2s;
    z-index :${props => props.zIndex ? props.zIndex : "7"};
    &:hover{
       background-image: ${props => props.HoverbackgrundImage || 'linear-gradient(to bottom, #d5b159, #a78b44)'};
       color: ${props => {
    if (props.hoverColor) {
      return props.hoverColor
    }
    else {
      return undefined
    }
  }}; 
    }
    &:active{
       transform: translateY(-2px);
    }
    span{ 
      font-family: Asap;
      display:inline-block;
      font-size:  ${props => props.fontsize || '14px'};
      font-weight: bold;
      line-height:${props => props.lineheight || '2.86;'} 
      text-align: ${props => props.align || 'center'};
      color:${props => {
    if (props.disabled) {
      return props.disabledColor || '#9e9e9d'
    }
    return props.color || '#ffffff'
  }};
      text-transform : ${props => props.textTranform || 'uppercase'};
      } 
[class*="icono"] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  box-sizing: border-box;
  &:after,
  &:before {
    content: "";
    box-sizing: border-box;
  }
}
[class*="icono-arrow1"] {
  width: 9px;
  height: 9px;
  border-width: 2.2px 2.2px 0 0;
  border-style: solid;
  margin-left: 14px;
  margin-top: -1px;
  &:before {
    right: 0;
    top: -2.2px;
    position: absolute;
    height: 2.2px;
    box-shadow: inset 0 0 0 32px;
    transform: rotate(-45deg);
    width: 16px;
    transform-origin: right top;
  }
  &[class*="-left"] {
    transform: rotate(45deg);
    &[class*="-up"] {
      transform: none;
    }
    &[class*="-down"] {
      transform: rotate(90deg);
    }
  }
} 
`;






// checkbox checkmark radion 


export const RadioCheckMark = styled.span`
  position: relative;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: transparent;
  border: 2px solid ${props => props.bColor || '#a78b44'};
  border-radius: 50%;
  box-sizing: border - box;
  cursor: pointer;
  &:: after {
    content: '';
    visibility: ${props => props.checked ? "none" : 'hidden'};
    position: absolute;
    top: 3.3px;
    left: 3.4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.dColor || '#a78b44'};
}
`;

// checkbox label 

export const CheckBoxLabel = styled.span`
      width: calc(100% - 35px);
      font-size: 18px;
      font-weight: normal;
      line-height: 1;
      text-align: left;
      color: #ffffff;
`;

export const InputDiv = styled.div`
width:  ${props => props.width ? props.width : "100%"} ;
padding: ${props => props.padding ? props.padding : "0px 0px 0px 0px"} ;
display: ${props => props.Display ? props.Display : "flex"} ; 
flex-direction : ${props => props.flexdirection ? props.flexdirection : "row"} ; 
text-align : ${props => props.textalign ? props.textalign : "left"};
justify-content:${props => props.justifyContent ? props.justifyContent : "space-between"};
.anchorlink{
  color:#fff;
  &:hover{
    color: #ffb319;
    text-decoration:underline;
  }
}
   `;

export const SuccessMessage = styled.div`
   position:fixed;
   right:60px;
   top:80px;
   display:flex;
   justify-content:center;
   align-items:center;
   width:400px;
   height:70px;
   border-radius:10px;
   background-color:green;  
   font-family: Asap;
   font-size: 20px  ;
   padding: 0px ;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height:  1.29 ;
   letter-spacing: normal;
   text-align:  center  ;
   color : #ffffff  ;
  `;

export const ErrorMessage = styled.div`
  position:fixed;
  right:60px;
   top:80px;
  display:flex;
  justify-content:center;
  align-items:center;
  width:400px;
  height:70px;
  border-radius:10px;
  background-color:red;  
  font-family: Asap;
  font-size: 20px  ;
  padding: 0px ;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height:  1.29 ;
  letter-spacing: normal;
  text-align:  center  ;
  color : #ffffff  ;
 `;

 export const SelectDiv = styled.div`
 height:auto;
 width:100%;
 &:hover ~ .focus_border,
 &:focus ~ .focus_border {
     width: 100%;
     transition: 0.4s;
 }
 
 .focus_border{
     position: absolute;
     bottom: 0;
     left: 0;
     width: 0;
     height: 2px;
     background-color: ${props => props.focusbordercolor ? props.focusbordercolor : '#3399FF'}; ;
     transition: 0.4s;
 }
 `;

export const SELECT = styled.select`
 width: ${props => props.width || "100%"};
 margin :${props => props.margin || "opx"};
 height:${props => props.height || "57px"};
 border-radius: ${props => props.borderRadius || '29px'};
 border: solid 1px ${props => props.borderColor || '#7c7c7c'};
 background-color: ${props => props.bgColor || 'transparent'};
 font-size: 13px;
 font-weight: normal;
 line-height: 1;
 text-align: left;
 color: ${props => props.color || '#777777'};
 padding-left: ${props => props.paddingLeft || "33px"};
 outline: none;
 font-family:Asap;
 option{
   width: 100%;
   font-size: 16px;
   font-weight: normal;
   line-height: 1;
   text-align: left;
   background-color: ${props => props.bgColor || 'transparent'};
   color: ${props => props.color || '#777777'};
   padding-left: ${props => props.paddingLeft || "33px"};
   outline: none;
   font-family:Asap;
   display:block;
 }
 &:hover ~ .focus_border,
    &:focus ~ .focus_border {
        width: 100%;
        transition: 0.4s;
    }
    
    .focus_border{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: ${props => props.focusbordercolor ? props.focusbordercolor : '#3399FF'}; ;
        transition: 0.4s;
    }
 `;