import React, { Component } from 'react'
import {Inject, ScheduleComponent, Day,Week,WorkWeek,Month, DragAndDrop,Resize} from '@syncfusion/ej2-react-schedule'

/*
You have to type npm i @syncfusion/ej2-react-schedule --save before starting the project
vous pouvez aussi saisir la commande npm i @syncfusion/ej2-data pour avoir accès aux données distantes de l'API
*/


class Agenda extends Component {
    constructor(){

        super(...arguments);
        this.data = [{
            Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        Location: 'Space Centre USA',
        StartTime: new Date(2020,4,30,9,30),
        EndTime: new Date(2020,4,30,10,30),
        isAllDay: true
        }]
    }
    render() {
        return (
            <div>
                <ScheduleComponent 
                    eventSettings={{dataSource: this.data}}
                >
                <Inject services={[Day,Week,WorkWeek,Month,DragAndDrop,Resize]} />
                </ScheduleComponent>
            </div>
        )
    }
}

export default Agenda;