import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {Link, Spinner} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getDataBundle, getDataRollover} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

type StateObj = {
    dataBundleResponse: any;
    dataRollOverResponse: any;
}


const DataBundle: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({dataBundleResponse: null, dataRollOverResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})
    const [pageRequest2, setPageRequest2] = useState<PageStateObj>({page: 1, pageSize: 5});
    useEffect(() => {
        props.getDataBundle(pageRequest);
        props.getDataRollover(pageRequest2);
    }, []);


    if ((stateObj.dataBundleResponse === null && props.dataBundleResponse !== null) || (stateObj.dataBundleResponse !== props.dataBundleResponse)) {
        setStateObj({...stateObj, dataBundleResponse: props.dataBundleResponse})
    }

    if ((stateObj.dataRollOverResponse === null && props.dataRollOverResponse !== null) || (stateObj.dataRollOverResponse !== props.dataRollOverResponse)) {
        setStateObj({...stateObj, dataRollOverResponse: props.dataRollOverResponse})
    }



    return (
        <React.Fragment>
            <span style={{
                fontFamily: 'Ubuntu',
                color: '#349bff'
            }}>{stateObj.dataBundleResponse?.data?.totalElements ?? 0} Data Bundle(s) {props.isLoading &&
                <Spinner/>}</span>
            <Table
                columnDefinitions={[
                    {
                        id: "username",
                        header: "Username",
                        cell: item => (
                            <Link href="#"><span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.username || "-"}</span></Link>
                        ),
                        sortingField: "username",
                        isRowHeader: true
                    },
                    {
                        id: "valid_till",
                        header: "Valid till",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.valid_till}</span>) || "-",
                        sortingField: "email"
                    },
                    {
                        id: "bundle_name",
                        header: "Bundle Name",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.bundle_name}</span>) || "-"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.dataBundleResponse?.data?.content ?? []}
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
                    props.getDataBundle(page);

                }}
                pagesCount={(stateObj.dataBundleResponse?.data?.totalPages ?? 0)}
            />

            <span style={{
                fontFamily: 'Ubuntu',
                color: '#349bff'
            }}>{stateObj.dataBundleResponse?.data?.totalElements ?? 0} Data Rollover(s) {props.isLoading &&
                <Spinner/>}</span>
            <Table
                columnDefinitions={[
                    {
                        id: "username",
                        header: "Username",
                        cell: item => (
                            <Link href="#"><span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.username || "-"}</span></Link>
                        ),
                        sortingField: "username",
                        isRowHeader: true
                    },
                    {
                        id: "rollover_date",
                        header: "Rollover Data",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.rollover_date}</span>) || "-",
                        sortingField: "rollover_date"
                    },
                    {
                        id: "rollover_quota_bytes",
                        header: "Rollover Data Quota",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item?.rollover_quota_bytes}kb</span>) || "-"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.dataRollOverResponse?.data?.content ?? []}
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
                currentPageIndex={pageRequest2.page}
                onChange={({detail}) => {
                    setPageRequest2({...pageRequest2, page: detail.currentPageIndex});
                    const page: PageStateObj = {
                        page: detail.currentPageIndex,
                        pageSize: 5
                    }
                    props.getDataBundle(page);

                }}
                pagesCount={(stateObj.dataRollOverResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        dataBundleResponse: state.dashboard.dataBundleResponse,
        isLoading: state.dashboard.isLoading,
        dataRollOverResponse: state.dashboard.dataRollOverResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDataBundle: (pageRequest) => dispatch(getDataBundle(pageRequest)),
        getDataRollover: (pageRequest) => dispatch(getDataRollover(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DataBundle);
