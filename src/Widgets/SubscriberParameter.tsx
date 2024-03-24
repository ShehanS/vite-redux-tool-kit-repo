import React, {FC, useEffect, useState} from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {Link, Spinner, StatusIndicator} from "@cloudscape-design/components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getSubscriberPlan} from "../redux/dashboard/dashboard-slice";
import Pagination from "@cloudscape-design/components/pagination";

type OwnProps = {}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & OwnProps;

type PageStateObj = {
    page: number;
    pageSize: number
}

type StateObj = {
    subscriberParameterResponse: any;
}


const SubscriberParameter: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({subscriberParameterResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})

    useEffect(() => {
        props.getSubscriberParameter(pageRequest);
    }, []);


    if ((stateObj.subscriberParameterResponse === null && props.subscriberParameterResponse !== null) || (stateObj.subscriberParameterResponse !== props.subscriberParameterResponse)) {
        setStateObj({...stateObj, subscriberParameterResponse: props.subscriberParameterResponse})
    }


    return (
        <React.Fragment>
            <span style={{
                fontFamily: 'Ubuntu',
                color: '#349bff'
            }}>{stateObj.subscriberParameterResponse?.data?.totalElements ?? 0} Subscriber Parameters(s) {props.isLoading &&
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
                        id: "parameter_name",
                        header: "Parameter Name",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.parameter_name}</span>) || "-",
                        sortingField: "email"
                    },
                    {
                        id: "parameter_value",
                        header: "Parameter Value",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.parameter_value}</span>) || "-"
                    },
                    {
                        id: "status",
                        header: "Reject on Failure",
                        cell: item => item.reject_on_failure === 1 ?
                            <StatusIndicator><span style={{fontFamily: 'Ubuntu'}}>Active</span></StatusIndicator> :
                            <StatusIndicator type="warning">
                                <span style={{fontFamily: 'Ubuntu'}}>Inactive</span>
                            </StatusIndicator> || "-",
                        sortingField: "status"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.subscriberParameterResponse?.data?.content ?? []}
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
                    props.getSubscriberParameter(page);

                }}
                pagesCount={(stateObj.subscriberParameterResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        subscriberParameterResponse: state.dashboard.subscriberParameterResponse,
        isLoading: state.dashboard.isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSubscriberParameter: (pageRequest) => dispatch(getSubscriberPlan(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SubscriberParameter);
