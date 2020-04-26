import React from 'react'
import {Inject, ScheduleComponent, Day,Week,WorkWeek,Month} from '@syncfusion/ej2-react-schedule'

/*
You have to type npm i @syncfusion/ej2-react-schedule --save before starting the project
vous pouvez aussi saisir la commande npm i @syncfusion/ej2-data pour avoir accès aux données distantes de l'API
*/

function Agenda() {
    return (
        <div>
            <ScheduleComponent >
                <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
            </ScheduleComponent>
        </div>
    )
}

export default Agenda;
