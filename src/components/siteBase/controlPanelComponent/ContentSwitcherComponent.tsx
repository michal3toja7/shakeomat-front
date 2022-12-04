import React from "react";
import style from './ControlPanelComponent.module.css'


type ContentSwitcherComponentProps = {
    children?: | React.ReactChild
        | React.ReactChild[]
    isSelected: boolean
    contentSwitcher: Function
    switcherKey: string
}

const ContentSwitcherComponent: React.FC<ContentSwitcherComponentProps> = ({
                                                                               children,
                                                                               isSelected,
                                                                               contentSwitcher,
                                                                               switcherKey
                                                                           }: ContentSwitcherComponentProps) => {
    const onContentSwitcherHandler = () => {
        contentSwitcher(switcherKey)
    }

    return (
        <div className={`${style["content-switcher"]} ${isSelected && style["selected"]}`}
             onClick={onContentSwitcherHandler}>
            {children}
        </div>
    )
}

export default ContentSwitcherComponent