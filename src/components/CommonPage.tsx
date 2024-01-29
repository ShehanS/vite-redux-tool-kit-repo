import { InputLabel, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Radio, FormControlLabel, RadioGroup, TextField, Select, MenuItem } from '@mui/material';
import { RootState } from '../redux/store';

type ReduxProps = ConnectedProps<typeof connector>;

const CommonPage: React.FC<ReduxProps> = (props) => {
  const [selectedValue, setSelectedValue] = React.useState('Project');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  
  const [priority, setPriority] = React.useState('');

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value);
  };

  return (
    <Box border="1px solid #ccc" padding="10px" borderRadius="5px">
     

    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    // Map your state props as needed
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // Map your dispatch actions as needed
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CommonPage);
