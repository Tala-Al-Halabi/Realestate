import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
    investors: Profile[];
}
export default observer( function PropertyListItemInvestor({investors}: Props) {

    return (
        <List horizontal>
            {investors.map(investor => (
                <Popup
                    hoverable
                    key={investor.username}
                    trigger={
                        <List.Item key={investor.username} as={Link} to={`/profile/${investor.username}`}>
                                <Image size='mini' circular src={investor.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={investor} />
                    </Popup.Content>
                </Popup>
              
            ))}
        </List>
    )

}) 