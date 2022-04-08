
import React from "react";
import {Stack, TextField, IconButton, Switch, FormGroup, FormControlLabel} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {EditPrefixName} from "../Data";

const PrefixSetter = (props: EditPrefixName) => {

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Stack direction={"column"} spacing={0}>
            <Stack direction="row" padding={2} spacing={1}>
                <TextField id="standard-basic"
                           label="prefix name"
                           color="primary"
                           margin="normal"
                           fullWidth
                           size="small"
                           focused
                           placeholder={props.originPrefix}
                           onChange={(name) => props.handleChange(name.currentTarget.value)}
                           variant="standard" />
                <IconButton aria-label="filter-alias" color="primary" onClick={() => props.handleConfirm(checked) }>
                    <CheckIcon/>
                </IconButton>
            </Stack>
            <Stack direction="row" padding={2}>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch size={"small"} checked={checked} onChange={handleChange}/>} label="Set to similar prefix" />
                </FormGroup>
            </Stack>
        </Stack>
    )
}

export {PrefixSetter}