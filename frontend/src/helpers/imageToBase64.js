const imageToBase64 = async (profile)=> {
    const reader = new FileReader();
    reader.readAsDataURL(profile);

    const data = await new Promise((resolve, reject)=>{
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    return data
}

export default imageToBase64