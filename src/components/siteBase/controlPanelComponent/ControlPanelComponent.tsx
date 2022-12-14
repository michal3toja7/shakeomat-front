import React, {useEffect, useState} from "react";
import style from './ControlPanelComponent.module.css'
import ContentSwitcherComponent from "./ContentSwitcherComponent";
import IContentSwitcher from "../../../types/contentSwitcher.type";
import findInList from "../../../helpers/findInList";
import {useSearchParams} from "react-router-dom";


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
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        let index = findInList(contentSwitchers, "isSelected", true)
        searchParams.set('type', contentSwitchers[index].key);
        setSearchParams(searchParams)
    }, []);

    const updateSwitchersList = (list: IContentSwitcher[], index: number) => {
        for (let item of list) {
            item.isSelected = false
        }
        list[index].isSelected = true
        return list
    }

    const contentSwitcherHandler = (switcherKey: string) => {
        let index = findInList(contentSwitchers, "key", switcherKey)
        setContentSwitchers(prevState => {
            return [...updateSwitchersList(prevState, index)]

        })
        searchParams.set('type', switcherKey);
        setSearchParams(searchParams)


    }

    return (
        <div className={style["control"]}>
            <div className={style["control-container"]}>

                <div className={style["switch-container"]}>
                    {contentSwitchers.map((contentSwitcher) => {
                        return (
                            <ContentSwitcherComponent key={contentSwitcher.key}
                                                      isSelected={contentSwitcher.isSelected}
                                                      contentSwitcher={contentSwitcherHandler}
                                                      switcherKey={contentSwitcher.key}
                            >
                                {contentSwitcher.text}
                            </ContentSwitcherComponent>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ControlPanelComponent