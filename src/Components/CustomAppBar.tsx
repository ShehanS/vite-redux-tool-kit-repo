import {useDrawerContext} from "../context/DrawerContext";
import React, {FC} from "react";

const CustomAppBar: FC = () => {
    const {drawerContext, setDrawerContext} = useDrawerContext();
    const openDrawer = () => {
        setDrawerContext({...drawerContext, isOpen: true});
    }

    return (<React.Fragment>
        <div style={{
            position: "absolute",
            zIndex: 999,
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: 60,
            background: 'linear-gradient(to bottom, #005175, rgba(255,255,255,0))',
            justifyItems:'center',
            alignItems:'center',
            display:'flex',
            justifyContent:'space-between',
        }}>
            <div style={{paddingLeft:20, color:'#ffff', fontFamily:'Ubuntu', fontWeight:'bold'}}>3A Web Console</div>


        </div>

    </React.Fragment>)
}
export default CustomAppBar;
