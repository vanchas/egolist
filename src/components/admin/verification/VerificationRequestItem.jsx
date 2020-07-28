import React, {useState} from "react";
import s from "./verification.module.scss";
import VerificationMessageForm from "./VerificationMessageForm";


export default function ({user}) {
    const [showLargePhoto, setShowLargePhoto] = useState(false)

    return (
        <li>
            {/*{console.log(user)}*/}
            <div>
                <span>пользователь: {user.name}</span><br />
                <small className={`text-secondary`}>
                    подано: &nbsp;
                    {new Date(user.updated_at).getDate()}.
                    {new Date(user.updated_at).getMonth() + 1}.
                    {new Date(user.updated_at).getFullYear()}, &nbsp;
                    {new Date(user.updated_at).getHours()}:
                    {new Date(user.updated_at).getMinutes()}
                </small>
            </div>
            <div>
                {user && user.files
                ? JSON.parse(user.files).map((photo, i) => (
                        <img src={photo} key={i}
                             onClick={()=>setShowLargePhoto(!showLargePhoto)}
                             alt={user.name}
                             className={showLargePhoto ? s.verification_photo_large : s.verification_photo}
                        />
                    )): null}
            </div>
            <VerificationMessageForm user={user} />
            <hr />
        </li>
    )
}