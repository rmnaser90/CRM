import { Typography } from '@material-ui/core'
import React from 'react'

const Badge = ({ num, name, icon }) => {

    return (
        <div className="badge">
            <img className="badgeImg" src={icon} alt="email" />
            <div className="badgeTitles">

                <Typography variant='h3'>{num}</Typography>
                <Typography variant='subtitle1'>{name}</Typography>
            </div>

        </div>
    )
}

export default Badge
