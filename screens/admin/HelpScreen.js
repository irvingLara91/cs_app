import React from "react";

import ContainerAdmin from "~/components/common/ContainerAdmin";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ContainerHelp from "~/components/ContainerList/ContainerHelp";

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket.'

const CONTENT = [
    {
        id: 1,
        title: 'First',
        content: BACON_IPSUM,
    },
    {
        id: 2,
        title: 'Second',
        content: BACON_IPSUM,
    },
    {
        id: 3,
        title: 'Third',
        content: BACON_IPSUM,
    },
    {
        id: 4,
        title: 'Fourth',
        content: BACON_IPSUM,
    },
    {
        id: 5,
        title: 'Fifth',
        content: BACON_IPSUM,
    },
    {
        id: 6,
        title: 'Fifth',
        content: BACON_IPSUM,
    },
    {
        id: 7,
        title: 'Fifth',
        content: BACON_IPSUM,
    },
    {
        id: 8,
        title: 'Fifth',
        content: BACON_IPSUM,
    },
    {
        id: 9,
        title: 'Fifth',
        content: BACON_IPSUM,
    },
];

const HelpScreen = (props) => {
    return (
        <ContainerAdmin title={"Help"}
                        icon={<MaterialCommunityIcons name={"help-circle-outline"} size={30} color={"black"}/>}>
            <ContainerHelp data={CONTENT}/>
        </ContainerAdmin>
    )
}
export default HelpScreen;
