import React from "react";
import { connect } from "react-redux";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Wrapper from "../../shared/Wrapper";


class MenuList extends Wrapper {
    state = {
        men: false,
        gift: false,
        women: false,
        accessories: false,
        account: false,
        shop: true,
        WatchLessonActive: false,
        PokerResourceActive: false,
    };
    render() {

        return (
            <div>
                <ProSidebar
                    image="../../../static/bg1.jpg"
                >
                    <SidebarHeader>
                        <img src="../../../static/AnandGroup.png" alt="Anand Group" />
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem  >Dashboard</MenuItem>
                            <SubMenu title="Components"  >
                                <MenuItem>Component 1</MenuItem>
                                <MenuItem>Component 2</MenuItem>
                            </SubMenu>
                    </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, null)(MenuList);


