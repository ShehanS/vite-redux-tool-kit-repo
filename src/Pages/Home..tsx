import React, {FC, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import Header from "@cloudscape-design/components/header";
import BoardItem from '@cloudscape-design/board-components/board-item';
import {Board} from "@cloudscape-design/board-components";
import SubscriberInfo from "../Widgets/SubscriberInfo";
import DataUsageSession from "../Widgets/DataUsageSession";
import DataBundle from "../Widgets/DataBundle";
import SubscriberPlan from "../Widgets/SubscriberPlan";
import SubscriberParameter from "../Widgets/SubscriberParameter";
import DeviceWhiteList from "../Widgets/DeviceWhiteList";
import AuthLog from "../Widgets/AuthLog";
import NASDetail from "../Widgets/NASDetail";

const Home: FC = () => {
    // const menu = [
    //     {
    //         label: 'Home',
    //         icon: 'pi pi-home'
    //     },
    //     {
    //         label: 'Features',
    //         icon: 'pi pi-star'
    //     },
    //     {
    //         label: 'Projects',
    //         icon: 'pi pi-search',
    //         items: [
    //             {
    //                 label: 'Components',
    //                 icon: 'pi pi-bolt'
    //             },
    //             {
    //                 label: 'Blocks',
    //                 icon: 'pi pi-server'
    //             },
    //             {
    //                 label: 'UI Kit',
    //                 icon: 'pi pi-pencil'
    //             },
    //             {
    //                 label: 'Templates',
    //                 icon: 'pi pi-palette',
    //                 items: [
    //                     {
    //                         label: 'Apollo',
    //                         icon: 'pi pi-palette'
    //                     },
    //                     {
    //                         label: 'Ultima',
    //                         icon: 'pi pi-palette'
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Contact',
    //         icon: 'pi pi-envelope'
    //     }
    // ];
    const [items, setItems] = useState([
        {
            id: "1",
            rowSpan: 4,
            columnSpan: 2,
            data: {title: "Subscribers Info", content: <SubscriberInfo/>}
        },
        {
            id: "2",
            rowSpan: 4,
            columnSpan: 2,
            data: {title: "Subscribers Usage/ Sessions", content: <DataUsageSession/>}
        },
        {
            id: "3",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "Data", content: <DataBundle/>}
        },
        {
            id: "4",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "Subscribers Plan", content: <SubscriberPlan/>}
        },
        {
            id: "5",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "Subscriber Parameters", content: <SubscriberParameter/>}
        },
        {
            id: "6",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "Device Whitelist", content: <DeviceWhiteList/>}
        },
        {
            id: "7",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "Auth Logs", content: <AuthLog/>}
        },
        {
            id: "8",
            rowSpan: 3,
            columnSpan: 2,
            data: {title: "NAS Details", content: <NASDetail/>}
        }
    ]);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    useEffect(() => {
        setAppDataContext({...appDataContext, title: "Home", subTitle: "Home"})
    }, []);

    return (<React.Fragment>
        <div style={{paddingTop: 60}}>
            <Board
                renderItem={item => (
                    <BoardItem
                        style={{backgroundColor: 'red'}}
                        header={<Header>{item.data.title}</Header>}
                        i18nStrings={{
                            dragHandleAriaLabel: "Drag handle",
                            dragHandleAriaDescription:
                                "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
                            resizeHandleAriaLabel: "Resize handle",
                            resizeHandleAriaDescription:
                                "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard."
                        }}
                    >
                        {item.data.content}
                    </BoardItem>
                )}
                onItemsChange={event =>
                    setItems(event.detail.items)
                }
                items={items}
                i18nStrings={(() => {
                    function createAnnouncement(
                        operationAnnouncement,
                        conflicts,
                        disturbed
                    ) {
                        const conflictsAnnouncement =
                            conflicts.length > 0
                                ? `Conflicts with ${conflicts
                                    .map(c => c.data.title)
                                    .join(", ")}.`
                                : "";
                        const disturbedAnnouncement =
                            disturbed.length > 0
                                ? `Disturbed ${disturbed.length} items.`
                                : "";
                        return [
                            operationAnnouncement,
                            conflictsAnnouncement,
                            disturbedAnnouncement
                        ]
                            .filter(Boolean)
                            .join(" ");
                    }

                    return {
                        liveAnnouncementDndStarted: operationType =>
                            operationType === "resize"
                                ? "Resizing"
                                : "Dragging",
                        liveAnnouncementDndItemReordered: operation => {
                            const columns = `column ${operation.placement
                                .x + 1}`;
                            const rows = `row ${operation.placement.y +
                            1}`;
                            return createAnnouncement(
                                `Item moved to ${
                                    operation.direction === "horizontal"
                                        ? columns
                                        : rows
                                }.`,
                                operation.conflicts,
                                operation.disturbed
                            );
                        },
                        liveAnnouncementDndItemResized: operation => {
                            const columnsConstraint = operation.isMinimalColumnsReached
                                ? " (minimal)"
                                : "";
                            const rowsConstraint = operation.isMinimalRowsReached
                                ? " (minimal)"
                                : "";
                            const sizeAnnouncement =
                                operation.direction === "horizontal"
                                    ? `columns ${operation.placement.width}${columnsConstraint}`
                                    : `rows ${operation.placement.height}${rowsConstraint}`;
                            return createAnnouncement(
                                `Item resized to ${sizeAnnouncement}.`,
                                operation.conflicts,
                                operation.disturbed
                            );
                        },
                        liveAnnouncementDndItemInserted: operation => {
                            const columns = `column ${operation.placement
                                .x + 1}`;
                            const rows = `row ${operation.placement.y +
                            1}`;
                            return createAnnouncement(
                                `Item inserted to ${columns}, ${rows}.`,
                                operation.conflicts,
                                operation.disturbed
                            );
                        },
                        liveAnnouncementDndCommitted: operationType =>
                            `${operationType} committed`,
                        liveAnnouncementDndDiscarded: operationType =>
                            `${operationType} discarded`,
                        liveAnnouncementItemRemoved: op =>
                            createAnnouncement(
                                `Removed item ${op.item.data.title}.`,
                                [],
                                op.disturbed
                            ),
                        navigationAriaLabel: "Board navigation",
                        navigationAriaDescription:
                            "Click on non-empty item to move focus over",
                        navigationItemAriaLabel: item =>
                            item ? item.data.title : "Empty"
                    };
                })()}
            />
        </div>

    </React.Fragment>)
}

export default Home;
