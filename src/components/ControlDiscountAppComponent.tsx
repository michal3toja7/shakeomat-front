import React, {useEffect, useState} from "react";
import IContentSwitcher from "../types/contentSwitcher.type";
import findInList from "../helpers/findInList";
import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext} from "@mui/lab";
import DiscountContainerComponent from "./discounts/DiscountContainerComponent";


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


const ControlDiscountAppComponent: React.FC<ControlPanelComponentProps> = () => {
    const [contentSwitchers, setContentSwitchers] = useState<IContentSwitcher[]>(initContentSwitcher)
    const [isSelected, setIsSelected] = useState<string>("")
    useEffect(() => {
        let index = findInList(contentSwitchers, "isSelected", true)
        setIsSelected(contentSwitchers[index].key)
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


    }

    return (
        <React.Fragment>

            <TabContext value={isSelected}>
                {contentSwitchers.map((contentSwitcher) => {
                    return (
                        <TabPanel value={contentSwitcher.key} sx={{paddingBottom: "5em"}}>
                            <DiscountContainerComponent discountsType={contentSwitcher.key}/>
                        </TabPanel>
                    )
                })}
                <Box bgcolor={"#f5f5f5"} sx={
                    {
                        boxShadow:"0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)",
                        position: "fixed",
                        width: "100%",
                        bottom: 0
                    }
                }>
                    <Tabs value={isSelected} centered onChange={contentSwitcherHandler}>
                        {contentSwitchers.map((contentSwitcher) => {
                            return (
                                <Tab value={contentSwitcher.key} key={contentSwitcher.key}
                                     label={contentSwitcher.text}/>
                            )
                        })}
                    </Tabs>
                </Box>
            </TabContext>
        </React.Fragment>
    )
}

export default ControlDiscountAppComponent