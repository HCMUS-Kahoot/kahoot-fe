import React from "react";
import { useNavigate } from "react-router-dom";
import PresentationList from "../presentationList";

export default function PostList({
    groupId,
    isOwnerOfGroup,
    presenstingNow,
}) {
    const navigate = useNavigate();

    return (
        <div>
            {presenstingNow.length > 0 &&
                presenstingNow.map(({ title, pin }) => (
                    <div className="m-4 p-4 rounded-md border-2 border-gray-300 bg-green-400 bg-opacity-70">
                        <h2>Now Presenting...</h2>
                        <h2 className="text-2xl font-bold text-emerald-800">{title}</h2>
                        <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                navigate(`/presentations/${pin}/choose`);
                            }}
                        >
                            Join
                        </button>
                    </div>))
            }
            <div className="bg-slate-100 pb-9 pt-3">
                <PresentationList groupId={groupId} shouldShowCreatePresentationButton={isOwnerOfGroup} />
            </div>

        </div>
    );
}

