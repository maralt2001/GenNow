
import React, {useEffect, useState} from "react";
import {GlobalFilterProps} from "../Data";
import InputLabel from "@mui/material/InputLabel"
import {MenuItem, Stack, Typography} from "@mui/material";
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {checkArrayDiffColumn, checkArrayDiffAlias, checkArrayDiffPrefix} from "../../data/LoadFile";
import {v4} from "uuid";


export interface SelectedItems {
    selectedMeta: string
    selectedValue: string
}


const GlobalFilter = (props:GlobalFilterProps) => {

    const [selected, setSelected] = useState<SelectedItems>({selectedMeta: "", selectedValue: ""})
    const [filterData, setFilterData] = useState(new Array<string>())






    function handleChangeMeta(event:SelectChangeEvent) {

        setSelected({...selected, selectedMeta: event.target.value})
    }

    function handleChangeValue(event:SelectChangeEvent) {
        setSelected({...selected, selectedValue: event.target.value})
    }

    useEffect(() => {
        let meta = selected.selectedMeta
        let value = selected.selectedValue
        if(meta === "column") {
            if(value === "") {
                setFilterData(checkArrayDiffColumn(props.data))
            }
            else {
                props.onChangeMetaValue(selected)
                setSelected({...selected, selectedMeta: "", selectedValue: ""})
                setFilterData([])
            }
        }
        if(meta === "alias") {
            if(value === "") {
                setFilterData(checkArrayDiffAlias(props.data))
            }
            else {
                props.onChangeMetaValue(selected)
                setSelected({...selected, selectedMeta: "", selectedValue: ""})
                setFilterData([])
            }
        }
        if(meta === "prefix") {
            if(value === "") {
                setFilterData(checkArrayDiffPrefix(props.data))
            }
            else {
                props.onChangeMetaValue(selected)
                setSelected({...selected, selectedMeta: "", selectedValue: ""})
                setFilterData([])
            }
        }

        // eslint-disable-next-line
    }, [selected])

    return (
        <Stack direction="row" spacing={2} mb={1} pb={2}>
            <Typography sx={{marginTop: 1}} color={"darkblue"} variant="subtitle2">Filter Global:</Typography>

            <FormControl sx={{maxWidth: 180, minWidth: 130, textOverflow: "ellipsis", }} size="small" color={"primary"}>

                <InputLabel id="select-filter-meta">meta</InputLabel>
                <Select labelId="select-filter-meta"
                        label="meta"
                        id="select-filter"
                        value={selected.selectedMeta}
                        onChange={handleChangeMeta}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="alias">alias</MenuItem>
                    <MenuItem value="prefix">prefix</MenuItem>
                    <MenuItem value="column">column</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 130, maxWidth: 180, textOverflow: "ellipsis", }} size="small" color={"primary"} disabled={filterData.length === 0}>
                <InputLabel id="select-filter-values">value</InputLabel>
                <Select labelId="select-filter-Values"
                        label="value"
                        id="select-filter"
                        value={selected.selectedValue}

                        onChange={handleChangeValue}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {filterData.length > 0 && filterData.map(item =>
                        <MenuItem key={v4()} value={item}>{item}</MenuItem>
                    )}

                </Select>
            </FormControl>


        </Stack>

    )
}

export {GlobalFilter}