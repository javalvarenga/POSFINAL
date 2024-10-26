export const useQueryConfig = {
    refetchOnWindowFocus: false, // No refetch when window is focused
    refetchOnMount: false, // No refetch on component mount
    refetchOnReconnect: true, // No refetch on reconnect
    staleTime: Infinity // Data is permanent until I wish
  };


  export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export const isImageFile = (image) => {
  if(image instanceof File){
    return false;
  }else{
    return true;
  }
};

export const PROD_URL = 'https://sevenpos.lat';
//export const PROD_URL = 'http://localhost:3001';