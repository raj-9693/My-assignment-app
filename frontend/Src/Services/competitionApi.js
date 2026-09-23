import ApiServices from "./ApiServices"

   export const getActiveCompetition = async () => {

      const Endpoints = '/api/competitions/active';

      console.log(`🚀 [API START] - Calling Competitions (Get) | Endpoint: ${Endpoints}`);
      try {
         const response = await ApiServices.get(Endpoints);
           console.log(`✅ [API SUCCESS] - |  Success:${response.data.success} | Status: ${response.status} | message:${response.data?.message}`)
         console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
         console.log('All Response',response)
         return response


   } catch (err) {
    if(err.response){
       console.error(`❌ [API ERROR] - |  Success: ${err.response?.data?.message} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
       console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - | ${err.message} || Check Network `)
    }
      throw err;
    }
   };

// 2. POST User Registration Function (Jo abhi backend banaya)

export const registerForCompetition = async ( userData) => {
   const competitionId ='6ab2c3b1fcd9dc1bb23f5ffd'
   const Endpoints= `/api/competitions/${competitionId}/register`
    console.log(`🚀 [API START] - Calling Registrations (post) | Endpoint: ${Endpoints}`)

 
  try{
        const response=await ApiServices.post(Endpoints,userData)
           console.log(`✅ [API SUCCESS] - |  Success:${response.data.success} | Status: ${response.status} | message:${response.data?.message}`)
         console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
         console.log('All Response',response)
         return response


    }catch(err){
    if(err.response){
       console.error(`❌ [API ERROR] - |  Success: ${err.response?.data?.message} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
       console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)
    }
       throw err
    }
};


