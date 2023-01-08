import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PresentationList from "../presentationList";
import sseApi from "../../api/sseAPI";

export default function PostList({
    isHavingPresentationNow,
    presentationId,
    presentationTitle,
    groupId,
    isOwnerOfGroup,
}) {
    useEffect(() => {
        const eventListener = sseApi.presentationNotify();
        console.log(eventListener)
        return () => {
            eventListener.close();
        };
    }, []);
    const navigate = useNavigate();
    return (
        <div>
            {isHavingPresentationNow &&
                <div className="m-4 p-4 rounded-md border-2 border-gray-300 bg-green-400 bg-opacity-70">
                    <h2>Now Presenting...</h2>
                    <h2 className="text-2xl font-bold text-emerald-800">{presentationTitle}</h2>
                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            navigate(`/presentations/${presentationId}/show`);
                        }}
                    >
                        Join
                    </button>
                </div>
            }
            <div className="bg-slate-100 pb-9 pt-3">
                <PresentationList groupId={groupId} shouldShowCreatePresentationButton={isOwnerOfGroup} />
            </div>

        </div>
    );
}

