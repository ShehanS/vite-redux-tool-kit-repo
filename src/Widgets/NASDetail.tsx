import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {Link, Spinner, StatusIndicator} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getNASList, getSubscribers} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

type StateObj = {
    nasListResponse: any;
}


const NASDetail: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({nasListResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})

    useEffect(() => {
        props.getNASList(pageRequest);
    }, []);


    if ((stateObj.nasListResponse === null && props.nasListResponse !== null) || (stateObj.nasListResponse !== props.nasListResponse)) {
        setStateObj({...stateObj, nasListResponse: props.nasListResponse})
    }


    return (
        <React.Fragment>
            <span style={{fontFamily:'Ubuntu', color:'#349bff'}}>{stateObj.nasListResponse?.data?.totalElements ?? 0} NAS(s) {props.isLoading && <Spinner/>}</span>
            <Table
                columnDefinitions={[
                    {
                        id: "nas_name",
                        header: "NAS Name",
                        cell: item => (
                            <Link href="#"><span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.nas_name || "-"}</span></Link>
                        ),
                        sortingField: "nas_name",
                        isRowHeader: true
                    },
                    {
                        id: "nas_attrgroup_name",
                        header: "Attribute Group Name",
                        cell: item =>(<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.nas_attrgroup_name}</span>) || "-",
                        sortingField: "nas_attrgroup_name"
                    },
                    {
                        id: "nas_type",
                        header: "NAS Type",
                        cell: item => (<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.nas_type}</span>) || "-"
                    },
                    {
                        id: "nas_secret",
                        header: "NAS Secret",
                        cell: item =>(<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.nas_secret}</span>) || "-"
                    },
                    {
                        id: "created_date",
                        header: "Created Date",
                        cell: item =>(<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.created_date}</span>) || "-"
                    },
                ]}
                enableKeyboardNavigation
                items={stateObj.nasListResponse?.data?.content ?? []}
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
                    props.getNASList(page);

                }}
                pagesCount={(stateObj.nasListResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        nasListResponse: state.dashboard.nasListResponse,
        isLoading: state.dashboard.isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getNASList: (pageRequest) => dispatch(getNASList(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(NASDetail);
