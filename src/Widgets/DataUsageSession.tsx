import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import {Link} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getDataUsage, getSession} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type StateObj = {
    dataUsageResponse: any;
    sessionResponse: any;

}

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

const DataUsageSession: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({dataUsageResponse: null, sessionResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5});

    useEffect(() => {
        props.getSubscriberDataUsage(pageRequest);
        props.getSubscriberSession(pageRequest);
    }, []);


    if ((stateObj.dataUsageResponse === null && props.dataUsageResponse !== null) || (stateObj.dataUsageResponse !== props.dataUsageResponse)) {
        setStateObj({...stateObj, dataUsageResponse: props.dataUsageResponse});
    }

    if ((stateObj.sessionResponse === null && props.sessionResponse !== null) || (stateObj.sessionResponse !== props.sessionResponse)) {
        setStateObj({...stateObj, sessionResponse: props.sessionResponse});
    }

    return (
        <React.Fragment>
            <Box>
                <span style={{
                    fontFamily: 'Ubuntu',
                    color: '#349bff'
                }}>{stateObj.dataUsageResponse?.data?.totalElements ?? 0} Subscriber(s)</span>
                <Table
                    columnDefinitions={[
                        {
                            id: "username",
                            header: "Username",
                            cell: item => (
                                <Link href="#"><span style={{
                                    fontFamily: 'Ubuntu',
                                    color: '#4f5c7a'
                                }}>{item.username || "-"}</span></Link>
                            ),
                            sortingField: "username",
                            isRowHeader: true
                        },
                        {
                            id: "total_download",
                            header: "Total Downloads",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#00a827'}}>{item.total_download}kb</span>) || "-",
                            sortingField: "email"
                        },
                        {
                            id: "total_upload",
                            header: "Total Uploads",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#349bff'}}>{item.total_upload}kb</span>) || "-"
                        },
                        {
                            id: "total_usage",
                            header: "Total Usage",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.total_usage}kb</span>) || "-"
                        },
                        {
                            id: "ob_usage",
                            header: "OB Usage",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.ob_usage}</span>) || "-"
                        },
                        {
                            id: "report_date",
                            header: "Report Date",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.report_date}</span>) || "-"
                        },
                        {
                            id: "last_reset",
                            header: "Last Reset Date",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.last_reset}</span>) || "-"
                        },
                        {
                            id: "next_reset",
                            header: "Next Reset Date",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.next_reset}</span>) || "-"
                        }

                    ]}
                    enableKeyboardNavigation
                    items={stateObj.dataUsageResponse?.data?.content ?? []}
                    loadingText="Loading resources"
                    sortingDisabled
                    empty={
                        <Box
                            margin={{vertical: "xs"}}
                            textAlign="center"
                            color="inherit"
                        >
                            <SpaceBetween size="m">
                                <b>No usage record</b>

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
                        props.getSubscriberDataUsage(page);

                    }}
                    pagesCount={(stateObj.dataUsageResponse?.data?.totalPages ?? 0)}
                />


                <span style={{
                    fontFamily: 'Ubuntu',
                    color: '#349bff'
                }}>{stateObj.sessionResponse?.data?.totalElements ?? 0} Subscribers Session(s)</span>
                <Table
                    columnDefinitions={[
                        {
                            id: "username",
                            header: "Username",
                            cell: item => (
                                <Link href="#"><span style={{
                                    fontFamily: 'Ubuntu',
                                    color: '#4f5c7a'
                                }}>{item.user_name || "-"}</span></Link>
                            ),
                            sortingField: "username",
                            isRowHeader: true
                        },
                        {
                            id: "session_id",
                            header: "Session ID",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.session_id}kb</span>) || "-",
                            sortingField: "email"
                        },
                        {
                            id: "start_time",
                            header: "Start Time",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.start_time}kb</span>) || "-"
                        },
                        {
                            id: "nas_ipv4",
                            header: "NAS IPV 4",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.nas_ipv4}kb</span>) || "-"
                        },
                        {
                            id: "nas_ipv6",
                            header: "NAS IPV 6",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.nas_ipv6}</span>) || "-"
                        },
                        {
                            id: "nas_port",
                            header: "NAS Port",
                            cell: item => (
                                <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.nas_port}</span>) || "-"
                        },
                        {
                            id: "nas_port_type",
                            header: "NAS Port Type",
                            cell: item => (<span
                                style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.nas_port_type}</span>) || "-"
                        }

                    ]}
                    enableKeyboardNavigation
                    items={stateObj.sessionResponse?.data?.content ?? []}
                    loadingText="Loading resources"
                    sortingDisabled
                    empty={
                        <Box
                            margin={{vertical: "xs"}}
                            textAlign="center"
                            color="inherit"
                        >
                            <SpaceBetween size="m">
                                <b>No usage record</b>

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
                        props.getSubscriberDataUsage(page);

                    }}
                    pagesCount={(stateObj.dataUsageResponse?.data?.totalPages ?? 0)}
                />
            </Box>
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        dataUsageResponse: state.dashboard.dataUsageResponse,
        sessionResponse: state.dashboard.sessionResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSubscriberDataUsage: (pageRequest) => dispatch(getDataUsage(pageRequest)),
        getSubscriberSession: (pageRequest) => dispatch(getSession(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DataUsageSession);
