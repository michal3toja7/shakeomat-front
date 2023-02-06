import React, {useEffect, useState} from "react";
import IContentSwitcher from "../../../types/contentSwitcher.type";
import findInList from "../../../helpers/findInList";
import {useSearchParams} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";


type ControlPanelComponentProps = {}

const initContentSwitcher: IContentSwitcher[] = [
    {
        key: "private",
        isSelected: true,
        text: "twoje zniżki",
    },
    {
        key: "public",
        isSelected: false,
        text: "zniżki publiczne",
    },
    {
        key: "reserved",
        isSelected: false,
        text: "zarezerwowane",
    }
]


const ControlPanelComponent: React.FC<ControlPanelComponentProps> = () => {
    const [contentSwitchers, setContentSwitchers] = useState<IContentSwitcher[]>(initContentSwitcher)
    const [isSelected, setIsSelected] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        let index = findInList(contentSwitchers, "isSelected", true)
        searchParams.set('type', contentSwitchers[index].key);
        setIsSelected(contentSwitchers[index].key)
        setSearchParams(searchParams)
    }, []);

    const updateSwitchersList = (list: IContentSwitcher[], index: number) => {
        for (let item of list) {
            item.isSelected = false
        }
        list[index].isSelected = true
        return list
    }

    const contentSwitcherHandler = (event: React.SyntheticEvent, switcherKey: string) => {
        let index = findInList(contentSwitchers, "key", switcherKey)
        setContentSwitchers(prevState => {
            return [...updateSwitchersList(prevState, index)]

        })
        setIsSelected(switcherKey)
        searchParams.set('type', switcherKey);
        setSearchParams(searchParams)


    }

    return (
        <Box sx={
            {
                position: "fixed",
                width: "100%",
                bottom: 0
            }
        }>
                <Tabs value={isSelected} centered onChange={contentSwitcherHandler}>
                    {contentSwitchers.map((contentSwitcher) => {
                        return (
                            <Tab value={contentSwitcher.key} key={contentSwitcher.key} label={contentSwitcher.text}/>
                        )
                    })}
                </Tabs>
        </Box>

    )
}

export default ControlPanelComponent