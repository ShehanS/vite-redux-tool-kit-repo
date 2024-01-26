import React, { useState, useEffect } from "react"; //useState
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";

const CustomTableHead = styled(TableHead)({
  backgroundColor: "#6ba9fa",
  "& th": {
    textAlign: "center",
  },
});

interface ViewMyRecordsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  user: any;
}

interface Record {
  date: string;
  project: string;
  task: string;
  worklogTask: string;
  worklogType: string;
  startTime: string;
  endTime: string;
}

const ViewMyRecordsDialog: React.FC<ViewMyRecordsDialogProps> = ({
  isOpen,
  onClose,
  project,
  user,
}) => {
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);

  const records: Record[] = [
    {
      date: "2024-01-01",
      project: "Time Sheet Integration",
      task: "Requirement Analysis",
      worklogTask: "Worklog Task 1",
      worklogType: "Type A",
      startTime: "8:00 AM",
      endTime: "9:00 AM",
    },
    {
      date: "2024-01-02",
      project: "ECommerce Project",
      task: "Implementing the notification service",
      worklogTask: "Worklog Task 1",
      worklogType: "Type B",
      startTime: "10:00 AM",
      endTime: "11:59 AM",
    },
    {
      date: "2024-01-03",
      project: "Payment Project",
      task: "Implementing the payment service",
      worklogTask: "Worklog Task 1",
      worklogType: "Type C",
      startTime: "9:00 AM",
      endTime: "10:00 PM",
    },
  ];

  useEffect(() => {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );

    setSelectedFromDate(startOfDay);
    setSelectedToDate(endOfDay);
  }, [isOpen]);

  useEffect(() => {
    if (
      selectedFromDate &&
      selectedToDate &&
      selectedFromDate <= selectedToDate
    ) {
      const filtered = records.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= selectedFromDate && recordDate <= selectedToDate;
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]);
    }
  }, [selectedFromDate, selectedToDate, records]);

  const calculateTotalHours = () => {
    if (
      !selectedFromDate ||
      !selectedToDate ||
      selectedToDate < selectedFromDate
    ) {
      return 0;
    }

    const totalHours = filteredRecords.reduce((acc, record) => {
      const startDateTime = new Date(`${record.date} ${record.startTime}`);
      const endDateTime = new Date(`${record.date} ${record.endTime}`);
      const hours =
        (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
      return acc + hours;
    }, 0);

    return totalHours;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth style={{ marginTop: "-15vh" }} >
      <DialogTitle style={{ textAlign: "center", fontSize: "30px" }}>
        My Records
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="space-between"
          marginBottom={1}
          marginTop={1}
        >
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="From Date"
                value={selectedFromDate}
                onChange={(newValue) => setSelectedFromDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="To Date"
                value={selectedToDate}
                onChange={(newValue) => setSelectedToDate(newValue)}
              />
            </LocalizationProvider>
          </div>
        </Box>

        <TableContainer>
          <Table>
            <CustomTableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Work Log Task</TableCell>
                <TableCell>Worklog Type</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </CustomTableHead>

            <TableBody style={{ textAlign: "center" }}>
              {filteredRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {record.project}
                  </TableCell>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {record.task}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {record.worklogTask}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {record.worklogType}
                  </TableCell>
                  <TableCell style={{ width: "15%", textAlign: "center" }}>
                    {record.startTime}
                  </TableCell>
                  <TableCell style={{ width: "15%", textAlign: "center" }}>
                    {record.endTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box marginTop={2}>
          {calculateTotalHours() > 0 ? (
            <Typography style={{ textAlign: "right" }}>
              Total (Hours): {calculateTotalHours().toFixed(2)}
            </Typography>
          ) : (
            <Typography style={{ color: "red" }}>
              Invalid date or time selection.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMyRecordsDialog;
