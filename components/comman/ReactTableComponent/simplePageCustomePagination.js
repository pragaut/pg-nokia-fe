import React, { Component } from 'react' 
import Button from "@material-ui/core/Button"; 
import { withStyles } from "@material-ui/core/styles"; 
import  classes1  from "classnames"; 
const styles = {
     button: {
        minWidth: 20,
     }
};

const defaultButton = props => (
  <button type="button" {...props} className="-btn">
    {props.children}
  </button>
)
 class CustomPagination extends Component {
  constructor (props) {
    super();

    this.getSafePage = this.getSafePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.applyPage = this.applyPage.bind(this)
    this.state = {
      page: props.page,
      anchorEl: null
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({ page: nextProps.page })
  }

  getSafePage (page) {
    if (Number.isNaN(page)) {
      page = this.props.page
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1)
  }

  changePage (page) {
    page = this.getSafePage(page)
    this.setState({ page })
    if (this.props.page !== page) {
      this.props.onPageChange(page)
    }
  }

  applyPage (e) {
    if (e) {
      e.preventDefault()
    }
    const page = this.state.page
    this.changePage(page === '' ? this.props.page : page)
  }
  toogelFilter(e){

  }

  // state = {
  //   anchorEl: null
  // };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };



  render () {
    const {
      // Computed
      pages,
      classes,
      columns,
      onColumnUpdate,
      changeFilter,
      handleDownloadToJson,
      handleDownload,
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      //PreviousComponent = defaultButton,
      NextComponent = defaultButton,
    } = this.props
      const { anchorEl } = this.state;

    return (
      <div className={classes1(className, '-pagination')} style={this.props.style,{alignItems:'center'}}>
        <div className="-previous">
          <Button  size="small" variant="outlined" className={classes.button} style={{backgroundColor:'white',height:'22px',textTransform: 'lowercase'}}
             onClick={() => {
              if (!canPrevious)return
              this.changePage(page - 1)

             }}disabled={!canPrevious}>back</Button>

        </div>
        {/* <ColumnChooser columns={columns}  onColumnUpdate={onColumnUpdate} /> */}
        <div  style={{display:"flex",justifyContent:'space-around',flexDirection:'row',flexWrap:'nowrap'}} className="-center">
          <span  style={{height:'22px',fontSize:'12px'}} className="-pageInfo">

            {showPageJump ? (
              <div className="-pageJump">
                <input
                  type={this.state.page === '' ? 'text' : 'number'}
                  onChange={e => {
                    const val = e.target.value
                    const page = val - 1
                    if (val === '') {
                      return this.setState({ page: val })
                    }
                    this.setState({ page: this.getSafePage(page) })
                  }}
                  style={{height:'22px',fontSize:'12px'}}
                  value={this.state.page === '' ? '' : this.state.page + 1}
                  onBlur={this.applyPage}
                  onKeyPress={e => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage()
                    }
                  }}
                />
              </div>
            ) : (
              <span className="-currentPage">{page + 1}</span>
            )}{' '}
            {this.props.ofText} <span  style={{height:'22px',fontSize:'12px'}} className="-totalPages">{pages || 1}</span>
          </span>

          {showPageSizeOptions && (

            <span className="select-wrap -pageSizeOptions">
            {/* <span style={{textTransform: 'lowercase',fontFamily:'serif',padding:'5px',fontSize:'12px'}}>
              Now Showing
                </span> */}
              <select style={{fontSize:'12px'}} onChange={e => onPageSizeChange(Number(e.target.value))} value={pageSize}>
                {pageSizeOptions.map((option, i) => ( 
                  <option key={i} value={option}>
                    {`${option} ${this.props.rowsText}`}
                  </option>
                ))}
              </select>
            </span>
          )}

        </div>
        {/* <Tooltip id="tooltip-icon" title="download grid">
          <Button variant="outlined"size="small"mini style={{marginRight:2, height:22,padding:'5px',fontSize:'12px',fontFamily:'Asap'}} onClick={this.handleClick}>
                Export
               </Button>
              </Tooltip>
              <Popover
              
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "bottom"
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "bottom"
                }}>
                <Typography className={classes.typography} onClick={() => {handleDownloadToJson();}} style ={{padding: "10px",cursor: 'pointer',fontSize:'12px'}} >
                    json
                </Typography>
                <Typography className={classes.typography} onClick={() => {handleDownload();}} style ={{padding: "10px",cursor: 'pointer',fontSize:'12px'}}>
                    csv
                </Typography>
              </Popover> */}

        <div className="-next">
          <Button size="small" variant="outlined" style={{backgroundColor:'white',padding:'0px',textTransform: 'lowercase'}}
            onClick={() => {
              if (!canNext) return
              this.changePage(page + 1)
            }}
            disabled={!canNext}
          >
            {this.props.nextText}
          </Button>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(CustomPagination);
