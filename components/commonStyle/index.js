import styled from 'styled-components'


export const Overlay = styled.div`
  z-index: 112;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
`;

export const Button_Header = styled.button`
    padding: 7px 17px;
    color: #000;
    margin-bottom: 5px;
    // height: 35px;
    background: #f9f9f9;
    cursor: pointer;
    border-radius: 4px;
    margin-right:10px;
    border: .5px solid #01bcd4;
    transition: all 0.2s;
    position:relative;
    outline:none;
    &:hover{
        color: #fff;
        background: #01bcd4;
    }
`;

export const Wrapper_OnOverlay = styled.div`
    position: fixed;
    right:0px;
    width: ${props => props.width || '369px'} ;
    height:${props => props.height || '510px'} ;
    padding:${props => props.padding || '20px 0px'} ;
    border-radius: 20px;
    background-color: #ffffff;
    box-sizing: border-box;  
    z-index: 115;
    display:  ${props => props.visible ? 'block' : 'none'};
    box-shadow: -1px 1px 10px rgba(0,0,0,0.2);
    /* overflow-y: scroll; */
    transition: all .2s linear;
    left: 50%;
    bottom: 0px;
    // top: 50%;
    top:${props => props.top || '50%'} ;
    transform: translate(-50%, -42%);
    /* overflow: auto; */
    /* display: flex;
    align-items:${props => props.alignitems || 'center'} ;
    justify-content: ${props => props.justifycontent || 'center'} ;
    flex-direction: column; */ 

    @media(max-width:600px)
    {
      width: 100vw !important;
      height: 80vh !important;
    }
`;
export const CloseButtonForModel = styled.div`
display:flex;
position:absolute;
width:25px;
height:25px;
border-radius:50%;
background:#ea8b0e;
right: 7px;
color: #fff;
top: 7px;
justify-content:center;
align-items:center;
text-align:center;
font-size:18px;
font-weight:bold;
cursor:pointer;
`
export const MainDiv = styled.div`
    width : ${props => props.width ? props.width : '100%'};
    height : ${props => props.height ? props.height : 'auto'};
    background-color:${props => props.bgColor ? props.bgColor : 'transparent'};
    padding : ${props => props.padding ? props.padding : '0px 0px 0px 0px'};
    flex-wrap : ${props => props.flexwrap ? props.flexwrap : 'nowrap'};
    display : ${props => props.display ? props.display : 'flex'};
    flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'row'};
    justify-content : ${props => props.justifycontent ? props.justifycontent : 'center'};
    align-items : ${props => props.alignitems ? props.alignitems : 'center'};
    text-align : ${props => props.textalign ? props.textalign : 'center'};
    border : ${props => props.border ? props.border : '0px'};
    border-radius : ${props => props.borderradius ? props.borderradius : '0px'};
    font-family:${props => props.fontfamily ? props.fontfamily : 'Asap'} ;
    color:  ${props => props.color ? props.color : '#000'} ;
    .disabled{
        cursor: not-allowed;
    }
    .pg-logo-style{
      height: 40px;
      width: 140px;
    }
    &:hover{
      transform: ${props => props.hoverscalerequired === true ? 'scale(1.1)' : undefined};
    }
    .sticky-table-cell{
      border-left : 1px solid black !important;
    }
    .sticky-table-row{
      border-top : 1px solid black !important;
    }
    .sticky-table{
      border : 1px solid black !important;
    } 
`;

export const FormDiv = styled.div` 
  width:${props => props.width ? props.width : "100%"}; 
  display : ${props => props.display ? props.display : 'flex'};
  flex-wrap : ${props => props.flexwrap ? props.flexwrap : 'wrap'};
  flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'row'};
  justify-content:${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  padding:0px 0px 0px 0px;

  @media(max-width : 768px)
  {
    width : 100;
  }
`;

export const MainWrapper = styled.div`
    height: 48vh;
    min-height:380px;
    margin: 5px 10px;
    filter: drop-shadow(-1px 5px 3px #ccc);

    .info-wrapper {
        margin-top: 15px;
        font-size:9px;
        text-align:left !important;
      }
      .map-details {
        text-align: center;
        font-size: 1.2em;
      }
      .map-details span {
        font-weight: bold;
      }
      .search-input {
        font-size: 1.2em;
        width: 90%;
        padding:5px;
        margin-left:-20px;
        margin-top:-30px;
      }
      @media(max-width:1300px){
        height: 49vh;
      }
      //@media(max-width:1100px){
      //     height: 50vh;
      //}
`;

export const InputControlsDiv = styled.div`
    width : ${props => props.width ? props.width : '20%'};
    height : ${props => props.height ? props.height : 'auto'};
    background-color:${props => props.bgColor ? props.bgColor : 'transparent'};
    padding : ${props => props.padding ? props.padding : '0px 10px 5px 10px'};
    display : ${props => props.display ? props.display : 'flex'};
    flex-wrap : ${props => props.flexwrap ? props.flexwrap : 'wrap'};
    flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'column'};
    justify-content : ${props => props.justifycontent ? props.justifycontent : 'start'};
    align-items : ${props => props.alignitems ? props.alignitems : 'baseline'};
    text-align : ${props => props.textalign ? props.textalign : 'left'};
    border-radius : ${props => props.borderradius ? props.borderradius : '0px'};
    .width100p{
      margin-top:10px;
      width:100%;
    }
`;

export const ChevroletButton = styled.button`
border:unset;
position: absolute;
background: transparent;
cursor:pointer;

transform:${props => props.translateY ? props.translateY : 'translateY(0px)'} ;
margin :  ${props => props.margin ? props.margin : '0px 0px 0px 0px'};
height : 66px; 
img{
    height : 66px;
width:33px;
}
`;

export const DivWithBgImage = styled.div`
    //width : ${props => props.width ? props.width : '100%'};
    height : ${props => props.height ? props.height : '530px'};
    background-color:${props => props.bgColor ? props.bgColor : '#403f34'};
    padding : ${props => props.padding ? props.padding : '0px 0px 0px 0px'};
    display : ${props => props.display ? props.display : 'flex'};
    flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'column'};
    justify-content : ${props => props.justifycontent ? props.justifycontent : 'center'};
    align-items : ${props => props.alignitems ? props.alignitems : 'center'};
    text-align : ${props => props.textalign ? props.textalign : 'center'};
    background-image: url(${prop => prop.backgroundimage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
`;

export const TextDiv = styled.div` 
    width: ${props => props.width ? props.width : '100%'};
    max-width : ${props => props.maxwidth ? props.maxwidth : '100%'};
    min-height: ${props => props.minheight ? props.minheight : 'auto'};
    padding : ${props => props.padding ? props.padding : '0px 0px 0px 0px'};
    font-family:${props => props.fontfamily ? props.fontfamily : 'Asap'} ;
    font-size:${props => props.fontsize ? props.fontsize : '14px'} ;
    display : ${props => props.display ? props.display : 'flex'};
    justify-content : ${props => props.justifycontent ? props.justifycontent : 'start'};
    align-items : ${props => props.alignitems ? props.alignitems : 'baseline'};
    font-weight:  ${props => props.fontWeight ? props.fontWeight : 'bold'};
    font-stretch: ${props => props.fontstretch ? props.fontstretch : 'normal'} ;
    font-style:  ${props => props.fontstyle ? props.fontstyle : 'normal'} ;
    line-height:${props => props.lineheight ? props.lineheight : '1.05'} ;
    letter-spacing: ${props => props.letterspacing ? props.letterspacing : 'normal'} ;
    text-align: ${props => props.textalign ? props.textalign : 'center'} ;
    color:  ${props => props.color ? props.color : '#000'} ;
    a{
        font-family:${props => props.fontfamily ? props.fontfamily : 'Asap'} ;
        font-size:${props => props.fontsize ? props.fontsize : '14px'} ;
        color:  ${props => props.acolor ? props.acolor : '#000'} ;
    }
`;





export const DetailsList = styled.div`
width:${props => props.width ? props.width : "70%"};
display:block;
padding: ${props => props.padding ? props.padding : "2px 0px 0px 0px"} ;

@media(max-width : 768px)
{
 width : 100;
}
`;


export const InputLabel = styled.div`
    font-family: Asap;
    font-size:${props => props.fontsize ? props.fontsize : "14px"} ;
    padding:${props => props.padding ? props.padding : "20px 0px 8px 5px"} ;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: ${props => props.lineheight ? props.lineheight : "1.29"} ;
    letter-spacing: normal;
    text-align: ${props => props.textalign ? props.textalign : "left"} ;
    color : ${props => props.color ? props.color : "#000"} ;
`;

export const ButtonDiv = styled.div`
width:${props => props.width ? props.width : "100%"} ;
padding: ${props => props.padding ? props.padding : "0px 0px 0px 0px"} ;
display:flex;
justify-content: ${props => props.justifycontent ? props.justifycontent : "space-between"};
`;


export const InputDiv = styled.div`
    width:  ${props => props.width ? props.width : "100%"} ;
    padding: ${props => props.padding ? props.padding : "0px 0px 0px 0px"} ;
    display: ${props => props.Display ? props.Display : "flex"} ; 
    flex-direction : ${props => props.flexdirection ? props.flexdirection : "row"} ; 
    text-align : ${props => props.textalign ? props.textalign : "left"};
    justify-content: ${props => props.justifycontent ? props.justifycontent : "space-between"};

    .inputtextclass{
      width: 100%;
      height: 51px;
      border-radius:15px;
      border: solid 1px #7c7c7c;
      background-color: #49A0A2;
      font-size: 14px;
      font-weight: normal;
      line-height: 2.86;
      text-align: left;
      color:  #000;
      padding-left: 0px;
      outline: none;
      font-family:Asap;
     &::-webkit-input-placeholder { /* Edge */
      font-size:14px;
      font-weight: normal;
      line-height: 2.86;
      text-align: left;
      color: #c3c3c3;
      font-family:Asap;
    }
    
    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      font-size:14px;
      font-weight: normal;
      line-height: 2.86;
      text-align:letf ;
      color:  #c3c3c3;
      font-family:Asap ;
    }
    
    &::placeholder {
      font-size: 14px;
      font-weight: normal;
      line-height: 2.86;
      text-align: letf;
      color: #c3c3c3;
      font-family:Asap ;
    }
    }
   `;

export const TABLE = styled.table`
border-collapse: collapse; 
width: 100%;
td 
{
  border: 1px solid #000;
  padding: 8px;
  font-family: Asap;
  font-size: 14px  ; 
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height:  1.29 ;
  letter-spacing: normal;
  text-align:  center  ; 
  .novisibilty
  {
    visibility: collapse;
  }
 
}
 th
{
 
  border: 1px solid #000;
  padding: 8px;
  font-family: Asap;
  font-size: 14px  ; 
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height:  1.29 ;
  letter-spacing: normal;
  text-align:  center  ;
  .novisibilty
  {
    visibility: collapse;
  }
 
   
}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}
th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: teal;
    color: white; 
  }
  td{
      color:#000; 
  }
  button{
    margin-right:5px;
    &:last-child{
      margin-right:0px;
    }
  }
 
  .edit{
    width:max-content; 
    height: 25px;
    padding: 5px;
    border-radius: 3px;
    background-color:#eca628;
    font-size:12px ;
    font-weight: bold;
    line-height:1;
    text-align:  center;
    color:#ffffff;
    text-transform :uppercase;
    border:0px;
    outline: none;
    cursor: pointer;
    font-family:Asap;
    transition: all 0.2s;
     z-index :7; 
      
    &:active{
       transform: translateY(-2px);
    }
  }
  .delete{
    width:max-content; 
    height: 25px;
    padding: 5px;
    border-radius: 3px;
    background-color:#c73b0f;
    font-size:12px ;
    font-weight: bold;
    line-height:1;
    text-align:  center;
    color:#ffffff;
    text-transform :uppercase;
    border:0px;
    outline: none;
    cursor: pointer;
    font-family:Asap;
    transition: all 0.2s;
     z-index :7; 
      
    &:active{
       transform: translateY(-2px);
    }
  }
  .info{
    width:max-content; 
    height: 25px;
    padding: 5px;
    border-radius: 3px;
    background-color:#438880;
    font-size:12px ;
    font-weight: bold;
    line-height:1;
    text-align:  center;
    color:#ffffff;
    text-transform :uppercase;
    border:0px;
    outline: none;
    cursor: pointer;
    font-family:Asap;
    transition: all 0.2s;
     z-index :7; 
      
    &:active{
       transform: translateY(-2px);
    }
  }
  .textalignleft{
    text-align:  left  ; 
  }
`;


export const TABLE_ForExecuteAudit = styled.table`
  border-collapse: collapse; 
  width: 100%;
  td 
  {
    border: 1px solid #000;
    padding: 5px;
    font-family: Asap;
    font-size: 12px  ; 
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height:  1.29 ;
    letter-spacing: normal;
    text-align:  center  ; 
    .novisibilty
    {
      visibility: collapse;
    }
  
  }
  th
  {
  
    border: 1px solid #000;
    padding: 5px;
    font-family: Asap;
    font-size: 12px  ; 
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height:  1.29 ;
    letter-spacing: normal;
    text-align:  center  ;
    .novisibilty
    {
      visibility: collapse;
    }
  
    
  }
  tr:nth-child(even){background-color: #f2f2f2;}
  tr:hover {background-color: #ddd;}
  th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: teal;
      color: white; 
    }
    td{
        color:#000; 
    }
    button{
      margin-right:5px;
      &:last-child{
        margin-right:0px;
      }
    }
  
    .edit{
      width:max-content; 
      height: 25px;
      padding: 5px;
      border-radius: 3px;
      background-color:#eca628;
      font-size:12px ;
      font-weight: bold;
      line-height:1;
      text-align:  center;
      color:#ffffff;
      text-transform :uppercase;
      border:0px;
      outline: none;
      cursor: pointer;
      font-family:Asap;
      transition: all 0.2s;
      z-index :7; 
        
      &:active{
        transform: translateY(-2px);
      }
    }
    .delete{
      width:max-content; 
      height: 25px;
      padding: 5px;
      border-radius: 3px;
      background-color:#c73b0f;
      font-size:12px ;
      font-weight: bold;
      line-height:1;
      text-align:  center;
      color:#ffffff;
      text-transform :uppercase;
      border:0px;
      outline: none;
      cursor: pointer;
      font-family:Asap;
      transition: all 0.2s;
      z-index :7; 
        
      &:active{
        transform: translateY(-2px);
      }
    }
    .info{
      width:max-content; 
      height: 25px;
      padding: 5px;
      border-radius: 3px;
      background-color:#438880;
      font-size:12px ;
      font-weight: bold;
      line-height:1;
      text-align:  center;
      color:#ffffff;
      text-transform :uppercase;
      border:0px;
      outline: none;
      cursor: pointer;
      font-family:Asap;
      transition: all 0.2s;
      z-index :7; 
        
      &:active{
        transform: translateY(-2px);
      }
    }
    .width120px{
      width:120px !important;
    }
    .input-type-file{
      width:140px !important;
    }
`;


export const TABLE_FORVIEW = styled.table`
border-collapse: collapse;

width: 100%;
td 
{
  border:${props => props.td_Border || '1px solid #000'};
  padding: 8px;
  font-family: Asap;
  font-size:${props => props.td_FontSize || '14px'}; 
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height:  1.29 ;
  letter-spacing: normal;
  background-color: ${props => props.td_bgColor ? props.td_bgColor : "transparent"}  !important; 
  text-align:  center  ; 
  .novisibilty
  {
    visibility: collapse;
  }
 
}
 th
{
 
  border: ${props => props.th_Border || '1px solid #000'} ;
  padding: 8px;
  font-family: Asap;
  font-size:${props => props.th_FontSize || '14px'}   ; 
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height:  1.29 ;
  letter-spacing: normal;
  text-align:  center  ;
  background-color: ${props => props.th_bgColor ? props.th_bgColor : "transparent"}  !important; 
 .novisibilty
  {
    visibility: collapse;
  } 
}   
`;
export const TR = styled.tr`
th{
  background-color: ${props => props.thbgColor ? props.thbgColor : "#4CAF50"}  !important; 
}
td{
  background-color: ${props => props.tdbgColor ? props.tdbgColor : "#ffffff"}  !important; 
}
&:nth-child(even){background-color: #f2f2f2;}
&:hover {background-color: #ddd;}
`;

export const TR_ONLY_OUTER = styled.tr` 
`;

export const THEAD = styled.thead`

`;

export const TBODY = styled.tbody`

`;

export const TABLE_ONLYOUTER = styled.table`
border-collapse: collapse; 
width: 100%; 
`;

export const TH = styled.th` 
  border: 1px solid #ddd !important;
  padding: 8px !important; 
  font-family: Asap !important;
  font-size:  ${props => props.fontsize ? props.fontsize : "14px"}   !important  ; 
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height:  1.29 !important ;
  letter-spacing: normal !important;
  text-align: ${props => props.textAlign ? props.textAlign : "left"}    !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important; 
   background-color: ${props => props.bgColor ? props.bgColor : "transparent"}  !important;
  color:${props => props.color ? props.color : "#000000"}  !important;   
`

export const TD = styled.td`
overflow :visible !important;
border: 1px solid #ddd !important; 
  padding: 8px !important;
  font-family: Asap !important;
  font-size: 14px  !important ; 
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height:  1.29  !important;
  letter-spacing: normal !important;
  text-align:  left !important  ;
  color:#000 !important;  
  background-color: ${props => props.bgColor ? props.bgColor : "transparent"}  !important; 
`;


export const MainDivForReactTable = styled.div`
width:100%;
color:#000000; 
.ReactTable{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border:1px solid rgba(0,0,0,0.1);}.ReactTable *{box-sizing:border-box}.ReactTable .rt-table{-webkit-box-flex:1;-ms-flex:auto 1;flex:auto 1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%;border-collapse:collapse;overflow:auto}.ReactTable .rt-thead{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.ReactTable .rt-thead.-headerGroups{background:rgba(0,0,0,0.03);border-bottom:1px solid rgba(0,0,0,0.05)}.ReactTable .rt-thead.-filters{border-bottom:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-thead.-filters input,.ReactTable .rt-thead.-filters select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline-width:0}.ReactTable .rt-thead.-filters .rt-th{border-right:1px solid rgba(0,0,0,0.02)}.ReactTable .rt-thead.-header{box-shadow:0 2px 15px 0 rgba(0,0,0,0.15)}.ReactTable .rt-thead .rt-tr{text-align:center}.ReactTable .rt-thead .rt-th,.ReactTable .rt-thead .rt-td{padding:5px 5px;line-height:normal;position:relative;border-right:1px solid rgba(0,0,0,0.05);transition:box-shadow .3s cubic-bezier(.175,.885,.32,1.275);box-shadow:inset 0 0 0 0 transparent;}.ReactTable .rt-thead .rt-th.-sort-asc,.ReactTable .rt-thead .rt-td.-sort-asc{box-shadow:inset 0 3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-sort-desc,.ReactTable .rt-thead .rt-td.-sort-desc{box-shadow:inset 0 -3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-cursor-pointer,.ReactTable .rt-thead .rt-td.-cursor-pointer{cursor:pointer}.ReactTable .rt-thead .rt-th:last-child,.ReactTable .rt-thead .rt-td:last-child{border-right:0}.ReactTable .rt-thead .rt-th:focus{outline-width:0}.ReactTable .rt-thead .rt-resizable-header{overflow:visible;}.ReactTable .rt-thead .rt-resizable-header:last-child{overflow:hidden}.ReactTable .rt-thead .rt-resizable-header-content{overflow:hidden;text-overflow:ellipsis}.ReactTable .rt-thead .rt-header-pivot{border-right-color:#f7f7f7}.ReactTable .rt-thead .rt-header-pivot:after,.ReactTable .rt-thead .rt-header-pivot:before{left:100%;top:50%;border:solid transparent;content:" ";height:0;width:0;position:absolute;pointer-events:none}.ReactTable .rt-thead .rt-header-pivot:after{border-color:rgba(255,255,255,0);border-left-color:#fff;border-width:8px;margin-top:-8px}.ReactTable .rt-thead .rt-header-pivot:before{border-color:rgba(102,102,102,0);border-left-color:#f7f7f7;border-width:10px;margin-top:-10px}.ReactTable .rt-tbody{-webkit-box-flex:99999;-ms-flex:99999 1 auto;flex:99999 1 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:auto;}.ReactTable .rt-tbody .rt-tr-group{border-bottom:solid 1px rgba(0,0,0,0.05);}.ReactTable .rt-tbody .rt-tr-group:last-child{border-bottom:0}.ReactTable .rt-tbody .rt-td{border-right:1px solid rgba(0,0,0,0.02);}.ReactTable .rt-tbody .rt-td:last-child{border-right:0}.ReactTable .rt-tbody .rt-expandable{cursor:pointer;text-overflow:clip}.ReactTable .rt-tr-group{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.ReactTable .rt-tr{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.ReactTable .rt-th,.ReactTable .rt-td{-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;white-space:nowrap;text-overflow:ellipsis;padding:7px 5px;overflow:hidden;transition:.3s ease;transition-property:width,min-width,padding,opacity;}.ReactTable .rt-th.-hidden,.ReactTable .rt-td.-hidden{width:0 !important;min-width:0 !important;padding:0 !important;border:0 !important;opacity:0 !important}.ReactTable .rt-expander{display:inline-block;position:relative;margin:0;color:transparent;margin:0 10px;}.ReactTable .rt-expander:after{content:'';position:absolute;width:0;height:0;top:50%;left:50%;-webkit-transform:translate(-50%,-50%) rotate(-90deg);transform:translate(-50%,-50%) rotate(-90deg);border-left:5.04px solid transparent;border-right:5.04px solid transparent;border-top:7px solid rgba(0,0,0,0.8);transition:all .3s cubic-bezier(.175,.885,.32,1.275);cursor:pointer}.ReactTable .rt-expander.-open:after{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}.ReactTable .rt-resizer{display:inline-block;position:absolute;width:36px;top:0;bottom:0;right:-18px;cursor:col-resize;z-index:10}.ReactTable .rt-tfoot{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;box-shadow:0 0 15px 0 rgba(0,0,0,0.15);}.ReactTable .rt-tfoot .rt-td{border-right:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-tfoot .rt-td:last-child{border-right:0}.ReactTable.-striped .rt-tr.-odd{background:rgba(0,0,0,0.03)}.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover{background:rgba(0,0,0,0.05)}.ReactTable .-pagination{z-index:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:3px;box-shadow:0 0 15px 0 rgba(0,0,0,0.1);border-top:2px solid rgba(0,0,0,0.1);}.ReactTable .-pagination input,.ReactTable .-pagination select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline-width:0}.ReactTable .-pagination .-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:100%;border:0;border-radius:3px;padding:6px;font-size:1em;color:rgba(0,0,0,0.6);background:rgba(0,0,0,0.1);transition:all .1s ease;cursor:pointer;outline-width:0;}.ReactTable .-pagination .-btn[disabled]{opacity:.5;cursor:default}.ReactTable .-pagination .-btn:not([disabled]):hover{background:rgba(0,0,0,0.3);color:#fff}.ReactTable .-pagination .-previous,.ReactTable .-pagination .-next{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.ReactTable .-pagination .-center{-webkit-box-flex:1.5;-ms-flex:1.5;flex:1.5;text-align:center;margin-bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ReactTable .-pagination .-pageInfo{display:inline-block;margin:3px 10px;white-space:nowrap}.ReactTable .-pagination .-pageJump{display:inline-block;}.ReactTable .-pagination .-pageJump input{width:70px;text-align:center}.ReactTable .-pagination .-pageSizeOptions{margin:3px 10px}.ReactTable .rt-noData{display:block;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:1;pointer-events:none;padding:20px;color:rgba(0,0,0,0.5)}.ReactTable .-loading{display:block;position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:-1;opacity:0;pointer-events:none;}.ReactTable .-loading > div{position:absolute;display:block;text-align:center;width:100%;top:50%;left:0;font-size:15px;color:rgba(0,0,0,0.6);-webkit-transform:translateY(-52%);transform:translateY(-52%);transition:all .3s cubic-bezier(.25,.46,.45,.94)}.ReactTable .-loading.-active{opacity:1;z-index:2;pointer-events:all;}.ReactTable .-loading.-active > div{-webkit-transform:translateY(50%);transform:translateY(50%)}.ReactTable .rt-resizing .rt-th,.ReactTable .rt-resizing .rt-td{transition:none !important;cursor:col-resize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
 
.rt-td
{
   padding-left:10px;
   font-size:12px;
   border : 1px solid #eaeaea;
   white-space: pre-wrap;
}
.-header
{
  background-color:#eaeaea;
}
.rt-th{
  font-size:14px;
    border : 1px solid #eaeaea;
} 
.primmary{
    border-radius : 3px;
    min-width:70px;
    color : #ffffff;
    text-align:center;
    background-color:#008CBA;
    padding:3px  5px;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none; 
}
.primary{
    border-radius : 3px;
    min-width:70px;
    color : #ffffff;
    background-color:#008CBA;
    text-align:center;
    padding:3px  5px;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none; 
}
.disabled{
  border-radius : 3px;
  min-width:70px;
  color : #ffffff;
  background-color:#fb7b7b;
  text-align:center;
  padding:3px  5px;
  font-size:15px;
  display: inline-block;
  font-family:Asap;
  font-weight:normal;
  cursor:pointer;
  margin:3px 0px;
  border : none; 
}
.warning{
    border-radius : 3px;
    min-width:70px;
    color : #ffffff;
    background-color:#ff9800;
    text-align:center;
    padding:3px  5px;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none;
}
.info{
    border-radius : 3px;
    min-width:70px;
    color : #ffffff;
    background-color:#25a36d;
    padding:3px  5px;
    text-align:center;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none;
}
.success{
    border-radius : 3px;
    min-width:70px;
    text-align:center;
    color : #ffffff;
    background-color:green;
    padding:3px  5px;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none;
}
.danger{
    border-radius : 3px;
    min-width:70px;
    color : #ffffff;
    background-color:red;
    padding:3px  5px;
    text-align:center;
    font-size:15px;
    display: inline-block;
    font-family:Asap;
    font-weight:normal;
    cursor:pointer;
    margin:3px 0px;
    border : none;
}
.width150px{
  width:150px;
}
.width120px{
  width:120px;
}
.width130px{
  width:130px;
}
.width100px{
  width:100px  !important;
}
.width50px{
  width:50px !important;
} 
.width60px{
  width:60px !important;
} 
.width70px{
  width:70px !important;
}
.width80px{
  width:80px !important;
}

`;

export const Button_Success_AddNewItem = styled.button`
border: none;
color: white;
padding: 5px 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px; 
border-radius: 4px;
text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); 
background: rgb(28, 184, 65);  
`;


export const Button_Warning_AddNewItem = styled.button`
border: none;
color: white;
padding: 5px 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px; 
border-radius: 4px;
text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); 
background: rgb(223, 117, 20);  
`;