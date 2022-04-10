#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/loadRequests.sh

createUser 100
createGroup 100
belongsToGroup 100
followUser 100

readUser 100
readGroup 100
showMembers 100
showFollowed 100
showFollower 100

updateUser 100
updateGroup 100

deleteUser 100
deleteGroup 100
leaveGroup 100
leaveUser 100

