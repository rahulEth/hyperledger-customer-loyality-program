

/* this file hold transaction logics */
'use strict';
/*
* earnPoints transaction
*@param {org.clp.biznet.EarnPoints} earnPoints;
*@transaction
*/
async function EarnPoints(earnPoints){
    // update member points
    earnPoints.member.points = earnPoints.member.points + earnPoints.points;
    // update member regustry
    const memberRegistry = await getParticipantRegistry('org.clp.biznet.Member');
    await memberRegistry.update(earnPoints.member);
    // check wheter partner exist or not
    const partnerRegistry = await getParticipantRegistry('org.clp.biznet.Partner');
    partnerExist = await partnerRegistry.exists(earnPoints.partner.id); 
    if(!partnerExist){
        throw new Error('Partner does not exist, please check partner id'); 
    }



}
/* use points transaction 
*@param {org.clp.biznet.UsePoints} usePoints;
*@transaction
*/

async function UsePoints(usePoints){

    // check whether use have enough points to spent
    if(usePoints.member.points < usePoints.points){
        throw new Error('Insufficent Points');
    }
    // update member points
    usePoints.member.points = usePoints.member.points - usePoints.points
    const memberRegistry = await getParticipantRegistry('org.clp.biznet.Member');
    memberRegistry.update(usePoints.member);
    // check wheter partner exist
    const partnerRegistry = await getParticipantRegistry('org.clp.biznet.Partner');
    partnerExist = await partnerRegistry.exists(usePoints.partner.id);

    if(!partnerExist){
        throw new Error('Partner dose not exist, please check partner id');
    }

}