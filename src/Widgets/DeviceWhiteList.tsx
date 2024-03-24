import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import {Link, Spinner, StatusIndicator} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getDeviceWhiteList, getSubscribers} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

type StateObj = {
    deviceWhiteListResponse: any;
}


const DeviceWhiteList: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({deviceWhiteListResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})

    useEffect(() => {
        props.getDeviceWhiteList(pageRequest);
    }, []);


    if ((stateObj.deviceWhiteListResponse === null && props.deviceWhiteListResponse !== null) || (stateObj.deviceWhiteListResponse !== props.deviceWhiteListResponse)) {
        setStateObj({...stateObj, deviceWhiteListResponse: props.deviceWhiteListResponse})
    }


    return (
        <React.Fragment>
            <span style={{
                fontFamily: 'Ubuntu',
                color: '#349bff'
            }}>{stateObj.deviceWhiteListResponse?.data?.totalElements ?? 0} Device(s) {props.isLoading &&
                <Spinner/>}</span>
            <Table
                columnDefinitions={[
                    {
                        id: "username",
                        header: "Username",
                        cell: item => (
                            <Link href="#"><span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.username || "-"}</span></Link>
                        ),
                        sortingField: "username",
                        isRowHeader: true
                    },
                    {
                        id: "device_mac",
                        header: "Device MAC",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.device_mac}</span>) || "-",
                        sortingField: "device_mac"
                    },
                    {
                        id: "created_date",
                        header: "Created Time",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.created_date}</span>) || "-"
                    },
                    {
                        id: "status",
                        header: "Status",
                        cell: item => item.status === "ACTIVE" ?
                            <StatusIndicator><span style={{fontFamily: 'Ubuntu'}}>Active</span></StatusIndicator> :
                            <StatusIndicator type="warning">
                                <span style={{fontFamily: 'Ubuntu'}}>Inactive</span>
                            </StatusIndicator> || "-",
                        sortingField: "status"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.deviceWhiteListResponse?.data?.content ?? []}
                loadingText="Loading resources"
                sortingDisabled
                empty={
                    <Box
                        margin={{vertical: "xs"}}
                        textAlign="center"
                        color="inherit"
                    >
                        <SpaceBetween size="m">
                            <b>No resources</b>
                        </SpaceBetween>
                    </Box>
                }
                // header={<Header> Simple table </Header>}
            />
            <Pagination
                currentPageIndex={pageRequest.page}
                onChange={({detail}) => {
                    setPageRequest({...pageRequest, page: detail.currentPageIndex});
                    const page: PageStateObj = {
                        page: detail.currentPageIndex,
                        pageSize: 5
                    }
                    props.getDeviceWhiteList(page);

                }}
                pagesCount={(stateObj.deviceWhiteListResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        deviceWhiteListResponse: state.dashboard.deviceWhiteListResponse,
        isLoading: state.dashboard.isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDeviceWhiteList: (pageRequest) => dispatch(getDeviceWhiteList(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DeviceWhiteList);
