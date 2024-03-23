import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {Link, Spinner, StatusIndicator} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getSubscribers} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

type StateObj = {
    subscriberResponse: any;
}


const SubscriberInfo: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({subscriberResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})

    useEffect(() => {
        props.getSubscribers(pageRequest);
    }, []);


    if ((stateObj.subscriberResponse === null && props.subscriberResponse !== null) || (stateObj.subscriberResponse !== props.subscriberResponse)) {
        setStateObj({...stateObj, subscriberResponse: props.subscriberResponse})
    }


    return (
        <React.Fragment>
            <span style={{fontFamily:'Ubuntu', color:'#349bff'}}>{stateObj.subscriberResponse?.data?.totalElements ?? 0} Subscriber(s) {props.isLoading && <Spinner/>}</span>
            <Table
                columnDefinitions={[
                    {
                        id: "username",
                        header: "Username",
                        cell: item => (
                            <Link href="#"><span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.username || "-"}</span></Link>
                        ),
                        sortingField: "username",
                        isRowHeader: true
                    },
                    {
                        id: "email",
                        header: "Email",
                        cell: item =>(<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.email}</span>) || "-",
                        sortingField: "email"
                    },
                    {
                        id: "contact_no",
                        header: "Contact",
                        cell: item => (<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.contact_no}</span>) || "-"
                    },
                    {
                        id: "updated_time",
                        header: "Update Time",
                        cell: item =>(<span style={{fontFamily:'Ubuntu', color:'#4f5c7a'}}>{item.updated_time}</span>) || "-"
                    },
                    {
                        id: "status",
                        header: "Status",
                        cell: item => item.status === "ACTIVE" ? <StatusIndicator>Active</StatusIndicator> :
                            <StatusIndicator type="warning">
                                Inactive
                            </StatusIndicator> || "-",
                        sortingField: "status"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.subscriberResponse?.data?.content ?? []}
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
                            <Button>Create resource</Button>
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
                    props.getSubscribers(page);

                }}
                pagesCount={(stateObj.subscriberResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        subscriberResponse: state.dashboard.subscriberResponse,
        isLoading: state.dashboard.isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSubscribers: (pageRequest) => dispatch(getSubscribers(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SubscriberInfo);
