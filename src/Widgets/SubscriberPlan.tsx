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
    subscriberPlanResponse: any;
}


const SubscriberPlan: FC<Props> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({subscriberPlanResponse: null});
    const [pageRequest, setPageRequest] = useState<PageStateObj>({page: 1, pageSize: 5})

    useEffect(() => {
        props.getSubscriberPlan(pageRequest);
    }, []);


    if ((stateObj.subscriberPlanResponse === null && props.subscriberPlanResponse !== null) || (stateObj.subscriberPlanResponse !== props.subscriberPlanResponse)) {
        setStateObj({...stateObj, subscriberPlanResponse: props.subscriberPlanResponse})
    }


    return (
        <React.Fragment>
            <span style={{
                fontFamily: 'Ubuntu',
                color: '#349bff'
            }}>{stateObj.subscriberPlanResponse?.data?.totalElements ?? 0} Subscriber Plan(s) {props.isLoading &&
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
                        id: "plan_name",
                        header: "Plan Name",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.plan_name}</span>) || "-",
                        sortingField: "email"
                    },
                    {
                        id: "status_date",
                        header: "Status Time",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.status_date}</span>) || "-"
                    },
                    {
                        id: "created_date",
                        header: "Created Date",
                        cell: item => (
                            <span style={{fontFamily: 'Ubuntu', color: '#4f5c7a'}}>{item.created_date}</span>) || "-"
                    },
                    {
                        id: "status",
                        header: "Status",
                        cell: item => item.plan_state === "ACTIVE" ?
                            <StatusIndicator><span style={{fontFamily: 'Ubuntu'}}>Active</span></StatusIndicator> :
                            <StatusIndicator type="warning">
                                <span style={{fontFamily: 'Ubuntu'}}>Inactive</span>
                            </StatusIndicator> || "-",
                        sortingField: "status"
                    }
                ]}
                enableKeyboardNavigation
                items={stateObj.subscriberPlanResponse?.data?.content ?? []}
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
                    props.getSubscriberPlan(page);

                }}
                pagesCount={(stateObj.subscriberPlanResponse?.data?.totalPages ?? 0)}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        subscriberPlanResponse: state.dashboard.subscriberPlanResponse,
        isLoading: state.dashboard.isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSubscriberPlan: (pageRequest) => dispatch(getSubscriberPlan(pageRequest))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SubscriberPlan);
