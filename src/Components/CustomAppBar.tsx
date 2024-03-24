import React, {FC} from "react";

const CustomAppBar: FC = () => {
    // const {drawerContext, setDrawerContext} = useDrawerContext();
    const imageUrl = '/digicel.png';
    // const openDrawer = () => {
    //     setDrawerContext({...drawerContext, isOpen: true});
    // }

    return (<React.Fragment>
        <div style={{
            position: "fixed",
            zIndex: 999,
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: 60,
            background: 'linear-gradient(180deg, rgba(168,0,0,1) 0%, rgba(91,0,0,0.3841911764705882) 73%)',
            justifyItems: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <div style={{paddingLeft: 20, color: '#ffff', fontFamily: 'Ubuntu', fontWeight: 'bold'}}>3A Web Console
            </div>

            <div style={{paddingRight: 20}}>
                <img width={160} height={50} src={imageUrl}/>
            </div>

        </div>

    </React.Fragment>)
}
export default CustomAppBar;
