import React from "react";
import UpdateComplaint from "./UpdateComplaint";

export default function  (props) {

    return(
        <div>
            <h2>Все жалобы</h2>
            {props.complaints && props.complaints.length ? (
                <ul>
                    {props.complaints.map((c, i) => (
                        <li key={i}>{c.complaint}
                        <button className={`btn btn-danger`} onClick={()=>props.deleteComplaint(c.id)}>X</button>
                        <UpdateComplaint id={c.id} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Жалоб нет</div>
            )}
            {/*complaint: "что-то не так"*/}
            {/*complaint_to_id: 2*/}
            {/*created_at: "2020-07-13T13:42:12.000000Z"*/}
            {/*id: 4*/}
            {/*status_id: 1*/}
            {/*type_id: 5*/}
            {/*updated_at: "2020-07-13T13:42:13.000000Z"*/}
            {/*user_id: 20*/}
        </div>
    )
}