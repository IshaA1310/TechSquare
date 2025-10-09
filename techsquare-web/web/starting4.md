🔙 BACKEND SIDE 🔙
Updated status enum value with firstletter uppercase.
[ 'Ignored', 'Interested', 'Accepted', 'Rejected' ]
updated send() -> json format send({});
missed await 🫸while db call.

🕸️FRONTEND SIDE 🕸️
Connection Routing -> connection.jsx(friends lists) -> connectionSlice -> app Store fetch -> disptach() -> selector()
Requests Routing -> Requests.jsx(List of those who sends requests to me) -> Request Slice -> app store fetch -> dispatch() -> selector
set Toast() for error & success with setTimeout().
set Error() for catch.
set Toast Message() for customize message directly show to UI.
Completed API's Ignored, Accepted, Rejected, Interested.
RemoveRequest() one 1️⃣ Requests from redux store 🏬
