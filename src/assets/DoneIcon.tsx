import React from "react";

type Props = {
    color?: string
}

const DoneIcon: React.FC<Props> = ({color}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
             focusable="false" aria-hidden="true"
             viewBox="0 0 24 24" data-testid="CheckIcon"
             fill={color || "#ffffff"}>

            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
        </svg>
    )
}

export default DoneIcon

